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

export default function Profissionals() {
  const navigation = useNavigation()
  const [professionalsData, setProfessionalsData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState(null)

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          'https://3dce-138-204-129-254.ngrok-free.app/ExplainProfissionals',
        )
        const data = response.data
        setProfessionalsData(data.data)
      } catch (error) {
        console.error('Error fetching professionals:', error)
      }
    }

    fetchProfessionals()
  }, [])

  const handleProfessionalPress = (professional) => {
    setSelectedProfessional(professional)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedProfessional(null)
  }

  const follow = async () => {
    await console.log('segui')
  }

  const sendMessage = async (professional) => {
    if (!selectedProfessional) return

    try {
      setModalVisible(false)
      setSelectedProfessional(professional)
      navigation.navigate(() => 'chats', { professionalData: professional })

      setSelectedProfessional(null)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }
  }

  const renderProfessionalItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      onTouchEnd={() => handleProfessionalPress(item)}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.nome}</Text>
        <Text>{item.especialidade}</Text>
      </View>
      <Button title="Seguir" onPress={() => follow} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1 }}
          className="h-full w-full"
        >
          <View>
            <Text style={styles.title}>Lista de Profissionais</Text>
            <FlatList
              data={professionalsData}
              renderItem={renderProfessionalItem}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
        <Button
          title="chatbot"
          onPress={() => navigation.navigate('Chatbot')}
        />
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          className="w-full h-0"
        >
          <View style={styles.modalContainer} className="w-full h-full">
            <View style={styles.modalContent}>
              {selectedProfessional && (
                <View>
                  <Text style={styles.professionalName}>
                    {selectedProfessional.nome}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Especialidade: {selectedProfessional.especialidade}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Conselho Regional: {selectedProfessional.conselhoRegional}
                  </Text>

                  <Text style={styles.professionalDetail}>
                    Data de Nascimento: {selectedProfessional.dataNascimento}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Endereço: {selectedProfessional.rua},{' '}
                    {selectedProfessional.numero}, {selectedProfessional.bairro}
                    , {selectedProfessional.cidade},{' '}
                    {selectedProfessional.estado}, CEP:{' '}
                    {selectedProfessional.cep}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Telefone: {selectedProfessional.telefone}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Email: {selectedProfessional.email}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Biografia: {selectedProfessional.biografia}
                  </Text>
                  <Button title="Mensagens" onPress={sendMessage} />
                  <Button title="Fechar" onPress={closeModal} />
                  <Button title="Seguir" onPress={() => follow} />
                </View>
              )}
            </View>
          </View>
        </Modal>
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
