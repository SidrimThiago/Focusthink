import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from '@react-navigation/native'

const storage = new MMKV()

export default function Consults() {
  const navigation = useNavigation()
  const UserDetails = storage.getString('user.nameUser')
  const focusbot = 'Focusbot'
  const apiKey = 'sk-proj-z8i4RZVJosExo5JRpji3T3BlbkFJvRQIuN3sI6C7ooSn7bIV'
  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: focusbot,
        },
      },
    ])
  }, [])

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    )

    const userMessage = newMessages[0].text

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: userMessage,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
          top_p: 1,
        }),
      })

      const data = await response.json()
      const botResponse = data.choices[0].message.content

      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: focusbot,
        },
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage),
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={styles.header}>
          <Image
            alt="image"
            style={styles.profileImage}
            source={require('../assets/memory/death.png')}
          />
          <Text style={styles.userName}>Focusbot</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
            name: UserDetails,
          }}
          placeholder="Type a message..."
          alwaysShowSend
          renderSend={(props) => <Send {...props} />}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const Send = (props) => {
  return (
    <TouchableOpacity
      style={styles.sendButton}
      onPress={() => {
        if (props.text && props.onSend) {
          props.onSend({ text: props.text.trim() }, true)
        }
      }}
    >
      <Ionicons name="send" size={24} color="#633DE8" />
    </TouchableOpacity>
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
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: '#fff',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
})
