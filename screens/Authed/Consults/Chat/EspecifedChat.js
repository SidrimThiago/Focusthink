import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  GiftedChat,
  Send,
  Bubble,
  Avatar,
  Actions,
} from 'react-native-gifted-chat'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../../../.env/config'
import socket from '../../../../utils/socket'
import * as ImagePicker from 'expo-image-picker'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

const storage = new MMKV()
const audioRecorderPlayer = new AudioRecorderPlayer()

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9)
}

export default function EspecifedChat() {
  const navigation = useNavigation()
  const route = useRoute()
  const { chatId, recipientName, recipientImage } = route.params
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const nomeUser = storage.getString('user.nameUser')
  const [recording, setRecording] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.recipientInfo}>
          {recipientImage ? (
            <Image
              alt="image"
              source={{ uri: `data:image/jpeg;base64,${recipientImage}` }}
              style={styles.recipientImage}
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <Text style={styles.headerTitle}>{recipientName}</Text>
          <View style={styles.iconContainer}>
            <Feather
              name="video"
              size={26}
              color="white"
              onPress={makeCall}
              style={styles.icon}
            />
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="white"
              style={styles.icon}
            />
          </View>
        </View>
      ),
    })
  }, [navigation, recipientName, recipientImage])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/chat/${chatId}/messages`)
        const data = await response.json()
        const formattedMessages = data.map((msg) => ({
          _id: msg._id,
          text: msg.message,
          createdAt: new Date(msg.timestamp),
          user: {
            _id: msg.user === nomeUser ? 1 : 2,
            name: msg.user === nomeUser ? '' : msg.user,
            avatar:
              msg.user === nomeUser
                ? ''
                : `data:image/jpeg;base64,${recipientImage}`,
          },
        }))
        setMessages(formattedMessages)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching messages:', error)
        setLoading(false)
      }
    }

    fetchMessages()

    socket.on('foundRoom', (roomMessages) => {
      const formattedMessages = roomMessages.map((msg) => ({
        _id: msg._id,
        text: msg.message,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.user === nomeUser ? 1 : 2,
          name: msg.user === nomeUser ? '' : msg.user,
          avatar:
            msg.user === nomeUser
              ? ''
              : `data:image/jpeg;base64,${recipientImage}`,
        },
      }))
      setMessages(formattedMessages)
    })

    socket.on('roomMessage', (newMessage) => {
      const formattedMessage = {
        _id: newMessage._id,
        text: newMessage.message,
        createdAt: new Date(newMessage.timestamp),
        user: {
          _id: newMessage.user === nomeUser ? 1 : 2,
          name: newMessage.user === nomeUser ? '' : newMessage.user,
          avatar:
            newMessage.user === nomeUser
              ? ''
              : `data:image/jpeg;base64,${recipientImage}`,
        },
      }
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [formattedMessage]),
      )
    })

    return () => {
      socket.off('foundRoom')
      socket.off('roomMessage')
    }
  }, [chatId, nomeUser, recipientImage])

  const handleSend = useCallback(
    (newMessages = []) => {
      const userMessage = newMessages[0]
      const newMessage = {
        _id: generateUniqueId(),
        room_id: chatId,
        message: userMessage.text,
        user: nomeUser,
        timestamp: new Date().toISOString(),
      }

      socket.emit('newMessage', newMessage)
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages),
      )
      saveMessagesToBackend(newMessage)
    },
    [nomeUser, chatId],
  )

  const saveMessagesToBackend = (newMessage) => {
    fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, messages: [newMessage] }),
    }).catch((error) => console.error('Error saving messages:', error))
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const newMessage = {
        _id: generateUniqueId(),
        room_id: chatId,
        message: '',
        user: nomeUser,
        timestamp: new Date().toISOString(),
        image: result.uri,
      }

      socket.emit('newMessage', newMessage)
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [newMessage]),
      )
      saveMessagesToBackend(newMessage)
    }
  }

  const startRecording = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissão para Gravar Áudio',
          message: 'Este app precisa de acesso ao microfone para gravar áudio.',
          buttonNeutral: 'Perguntar Depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Permitir',
        },
      )
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de gravação negada')
        return
      }
    }
    setRecording(true)
    const result = await audioRecorderPlayer.startRecorder()
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('recording', e.current_position)
    })
    console.log('result', result)
  }

  const stopRecording = async () => {
    setRecording(false)
    const result = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    console.log('result', result)
    const newMessage = {
      _id: generateUniqueId(),
      room_id: chatId,
      message: '',
      user: nomeUser,
      timestamp: new Date().toISOString(),
      audio: result,
    }

    socket.emit('newMessage', newMessage)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage]),
    )
    saveMessagesToBackend(newMessage)
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#DB6510',
          },
          left: {
            backgroundColor: '#633DE8',
          },
        }}
        renderMessageImage={
          props.currentMessage.image ? renderMessageImage : null
        }
        renderMessageAudio={
          props.currentMessage.audio ? renderMessageAudio : null
        }
      />
    )
  }

  const renderMessageImage = (props) => {
    return (
      <Image
        source={{ uri: props.currentMessage.image }}
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
    )
  }

  const renderMessageAudio = (props) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() =>
            audioRecorderPlayer.startPlayer(props.currentMessage.audio)
          }
        >
          <Ionicons name="play-circle" size={36} color="#633DE8" />
        </TouchableOpacity>
      </View>
    )
  }

  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: { width: 40, height: 40, borderRadius: 20 },
          right: { width: 40, height: 40, borderRadius: 20 },
        }}
      />
    )
  }

  const makeCall = () => {
    const callId = generateRandomId(5)
    navigation.navigate('CallPage', { id: callId })
  }

  const generateRandomId = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          'Escolher imagem': pickImage,
          'Gravar áudio': recording ? stopRecording : startRecording,
        }}
        icon={() => <Ionicons name="attach" size={24} color="#633DE8" />}
        onSend={(args) => console.log(args)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#3E278D', '#1C233F']} style={styles.background}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#633DE8" />
          </View>
        ) : (
          <GiftedChat
            messages={messages}
            onSend={(messages) => handleSend(messages)}
            user={{
              _id: 1,
              name: nomeUser,
            }}
            placeholder="Diga algo..."
            alwaysShowSend
            renderBubble={renderBubble}
            renderAvatar={renderAvatar}
            renderActions={renderActions}
            renderSend={(props) => (
              <Send {...props}>
                <View style={styles.sendingContainer}>
                  <Ionicons name="send" size={24} color="#633DE8" />
                </View>
              </Send>
            )}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: 10,
  },
  recipientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 16,
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
