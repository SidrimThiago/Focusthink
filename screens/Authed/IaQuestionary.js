import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { useNavigation } from '@react-navigation/native'

const storage = new MMKV()

export default function IaQuestionary() {
  const navigation = useNavigation()
  const UserDetails = storage.getString('user.nameUser') || 'User'
  const professionalBot = 'Dr. Psicólogo'
  const apiKey = 'sk-proj-vbx5FzIZwVnO7f7dcxOWT3BlbkFJjl7GIGqYuQ3Jn0VUNWhc'
  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const prompt = `Você é um psicólogo especializado em TDAH. Você está realizando o questionário ASRS-18 para ajudar a avaliar sintomas de TDAH em adultos. O questionário consiste em 18 perguntas que você deve fazer ao paciente. Após cada resposta, prossiga com a próxima pergunta do questionário.`

  useEffect(() => {
    const storedMessages = storage.getString('chatMessages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    } else {
      setMessages([
        {
          _id: 1,
          text: 'Olá, eu sou Dr. Psicólogo. Vou realizar o questionário ASRS-18 para avaliar sintomas de TDAH. Vamos começar?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: professionalBot,
          },
        },
      ])
    }
  }, [])

  const saveMessages = (messages) => {
    storage.set('chatMessages', JSON.stringify(messages))
  }

  const HandlerSend = useCallback(async (newMessages = []) => {
    setLoading(true)

    // Add user message to chat
    setMessages((previousMessages) => {
      const updatedMessages = GiftedChat.append(previousMessages, newMessages)
      saveMessages(updatedMessages)
      return updatedMessages
    })

    const userMessage = newMessages[0]?.text || ''

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
            { role: 'system', content: prompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.3,
          max_tokens: 500,
          top_p: 1,
        }),
      })

      const data = await response.json()
      const botResponse =
        data.choices?.[0]?.message?.content ||
        'Desculpe, não entendi. Poderia repetir?'

      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: professionalBot,
        },
      }

      setMessages((previousMessages) => {
        const updatedMessages = GiftedChat.append(previousMessages, [
          botMessage,
        ])
        saveMessages(updatedMessages)
        return updatedMessages
      })
    } catch (error) {
      console.log(error)
      alert('Erro ao obter resposta do bot. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={styles.header}>
          <Image
            alt="image"
            style={styles.profileImage}
            source={require('../../assets/memory/death.png')}
          />
          <Text style={styles.userName}>{UserDetails}</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => HandlerSend(messages)}
          user={{
            _id: 1,
            name: UserDetails,
          }}
          placeholder="Digite sua resposta..."
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
