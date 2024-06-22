import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../../../.env/config'
import socket from '../../../../utils/socket'

const storage = new MMKV()

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
  }, [chatId, nomeUser])

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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
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
          </View>
          <Feather name="video" size={26} color="white" onPress={makeCall} />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: StatusBar.currentHeight - 15,
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
