import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../../../.env/config'

const storage = new MMKV()

export default function Chats() {
  const [chats, setChats] = useState([])
  const navigation = useNavigation()
  const nomeUser = storage.getString('user.nameUser')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log(`Fetching chats for user: ${nomeUser}`)
        const response = await axios.get(API_URL + '/chats', {
          params: { nomeUser },
        })
        console.log('Chats fetched:', response.data)
        setChats(response.data)
      } catch (error) {
        console.error('Error fetching chats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [nomeUser])

  const handleChatPress = (chat) => {
    const recipientName = chat.participants.find(
      (participant) => participant !== nomeUser,
    )

    navigation.navigate('especifedChat', {
      chatId: chat.id,
      recipientName,
      recipientImage: chat.recipientImage,
    })
  }

  const handleStartChatPress = () => {
    navigation.navigate('Profissionals')
  }

  const renderChatItem = ({ item }) => {
    const recipientName = item.participants.find(
      (participant) => participant !== nomeUser,
    )

    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() => handleChatPress(item)}
      >
        {item.recipientImage ? (
          <Image
            alt="image"
            source={{ uri: `data:image/jpeg;base64,${item.recipientImage}` }}
            style={styles.chatImage}
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatName}>{recipientName}</Text>
          <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
          <Text style={styles.chatTime}>{item.lastMessageTime}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#633DE8', '#1C233F']}
          style={styles.background}
        >
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Text style={styles.title}>Conversas</Text>
        {chats.length === 0 ? (
          <View style={styles.noChatsContainer}>
            <Button title="Iniciar Chat" onPress={handleStartChatPress} />
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  chatTextContainer: {
    flex: 1,
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
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
