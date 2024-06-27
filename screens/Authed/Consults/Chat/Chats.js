import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native'
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
      <TouchableHighlight
        onPress={() => handleChatPress(item)}
        activeOpacity={0.8}
        underlayColor="#6148B6"
      >
        <View style={styles.chatContainer}>
          <View style={styles.chatContent}>
            {item.recipientImage ? (
              <Image
                alt="image"
                source={{
                  uri: `data:image/jpeg;base64,${item.recipientImage}`,
                }}
                style={styles.chatImage}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <View style={styles.chatTextContainer}>
              <Text style={styles.chatName}>{recipientName}</Text>
              <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
            </View>
          </View>
          <View style={styles.chatTimeContainer}>
            <Text style={styles.chatTime}>{item.lastMessageTime}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {chats.length === 0 ? (
        <View style={styles.noChatsContainer}>
          <Button title="Iniciar Chat" onPress={handleStartChatPress} />
        </View>
      ) : (
        <FlatList
          initialNumToRender={10}
          scrollEventThrottle={16}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E278D',
  },
  chatContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImage: {
    width: 65,
    height: 65,
    borderRadius: 90,
  },
  placeholderImage: {
    width: 65,
    height: 65,
    borderRadius: 90,
    backgroundColor: '#ccc',
  },
  chatTextContainer: {
    marginLeft: 8,
    justifyContent: 'space-between',
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
  chatLastMessage: {
    fontSize: 13,
    fontFamily: 'Quicksand-SemiBold',
    color: '#D5D5D5',
    marginBottom: 5,
  },
  chatTimeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
    color: '#AFB7E1',
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
