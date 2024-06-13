import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import io from 'socket.io-client'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../.env/config'

const storage = new MMKV()
const socket = io(API_URL)

export default function EspecifedChat() {
  const navigation = useNavigation()
  const route = useRoute()
  const { chatId } = route.params
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const nomeUser = storage.getString('user.nameUser')

  useEffect(() => {
    socket.emit('findRoom', chatId)

    socket.on('foundRoom', (roomMessages) => {
      const formattedMessages = roomMessages.map((msg) => ({
        _id: msg.id,
        text: msg.text,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.user === nomeUser ? 1 : 2,
          name: msg.user,
        },
      }))
      setMessages(formattedMessages)
    })

    socket.on('roomMessage', (newMessage) => {
      const formattedMessage = {
        _id: newMessage.id,
        text: newMessage.text,
        createdAt: new Date(newMessage.timestamp),
        user: {
          _id: newMessage.user === nomeUser ? 1 : 2,
          name: newMessage.user,
        },
      }
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [formattedMessage]),
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
        room_id: chatId,
        message: userMessage.text,
        user: nomeUser,
        timestamp: new Date().toISOString(),
      }

      socket.emit('newMessage', newMessage)
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages),
      )
    },
    [nomeUser, chatId],
  )

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
          <Text style={styles.headerTitle}>Chat</Text>
          <Feather name="video" size={26} color="white" onPress={makeCall} />
        </View>
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
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#633DE8" />
            </View>
          )}
          isLoadingEarlier={loading}
        />
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
