/* eslint-disable prettier/prettier */
import { React, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
 FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../.env/config'

const storage = new MMKV()


export default function Chats() {
  const navigation = useNavigation()

  useEffect(() => {
    const ExplainChats = async () => {
      const nomeUser = storage.getString('nomeUser')
      try {
        const response = await axios.get(API_URL + '/ExplainChats', nomeUser)
        const data = response.data
        console.log(data)
      } catch (error) {
        console.error('Error fetching professionals:', error)
      }
    }

    ExplainChats()
  }, [])


  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
    <LinearGradient
      colors={['#633DE8', '#1C233F']}
      style={styles.background}
      className="justify-between flex-1 h-full"
    >
      
    </LinearGradient>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
    marginBottom: 30,
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
  },
  quicksandMedium: {
    fontFamily: 'Quicksand-SemiBold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
  },
  profileImage: {
    width: 190,
    height: 190,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
