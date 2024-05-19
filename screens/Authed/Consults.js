import { React, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  FontAwesome6,
} from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function Consults() {
  const navigation = useNavigation()
  const [professionalsData, setProfessionalsData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState(null)

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Button
          title="chatbot"
          onPress={() => navigation.navigate('Chatbot')}
        />
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
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  professionalDetail: {
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: '#fff',
  },
  modalContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
