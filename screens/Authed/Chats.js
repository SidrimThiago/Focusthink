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
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


export default function Chats() {
  const navigation = useNavigation()
  const [professionalsData, setProfessionalsData] = useState([])

  useEffect(() => {
    fetch('https://4859-201-72-240-122.ngrok-free.app/ExplainProfissionals')
      .then((response) => response.json())
      .then((data) => setProfessionalsData(data))
      .catch((error) => console.error('Error fetching professionals:', error))
  }, [])

  const renderProfessionalItem = ({ item }) => (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.nome}</Text>
      <Text>{item.descricao}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="justify-start flex-1"
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>
            Lista de Profissionais
          </Text>
          <FlatList
            data={professionalsData}
            renderItem={renderProfessionalItem}
            keyExtractor={(item) => item._id}
          />
        </View>
        
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
