import { React, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../.env/config'

const storage = new MMKV()

export default function Chats() {
  const [chats, setChats] = useState([])
  const navigation = useNavigation()
  const nomeUser = storage.getString('user.nameUser')

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(API_URL + '/chats', nomeUser)
        setChats(response.data)
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }

    fetchChats()
  }, [nomeUser])

  const handleChatPress = (chat) => {
    navigation.navigate('especifedChat', { professional: chat.professional })
  }

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => handleChatPress(item)}
    >
      <Text style={styles.chatName}>{item.professional.nome}</Text>
      <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Text style={styles.title}>Conversas</Text>
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item._id}
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  chatContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatLastMessage: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  chatTime: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
  },
})
