import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import { API_URL } from '../../.env/config';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const socket = io(API_URL);

export default function EspecifedChat() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chat } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const flatListRef = useRef();
  const nomeUser = storage.getString('user.nameUser');

  useEffect(() => {
    if (chat && chat.id) {
      socket.emit('findRoom', chat.id);

      socket.on('foundRoom', (roomMessages) => {
        setMessages(roomMessages);
      });

      socket.on('roomMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('foundRoom');
        socket.off('roomMessage');
      };
    }
  }, [chat]);

  const handleSend = () => {
    if (userInput.trim()) {
      const newMessage = {
        room_id: chat.id,
        text: userInput,
        user: nomeUser,
        timestamp: {
          hour: new Date().getHours(),
          mins: new Date().getMinutes(),
        },
      };
      socket.emit('newMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserInput('');
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const makeCall = () => {
    const callId = generateRandomId(5);
    navigation.navigate('CallPage', { id: callId });
  };

  const generateRandomId = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  if (!chat || !chat.id) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Chat não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{chat.roomName}</Text>
          <Feather name="video" size={26} color="white" onPress={makeCall} />
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageUser}>{item.user}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Diga algo"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 10,
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
  messageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  messageUser: {
    fontWeight: 'bold',
  },
  messageText: {
    marginVertical: 5,
  },
  messageTime: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});