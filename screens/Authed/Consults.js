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

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          'https://e52d-2804-d4b-b716-8600-bc05-bb02-5682-2ec4.ngrok-free.app/ExplainProfissionals',
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

  const sendMessage = () => {
    setModalVisible(false)
    setSelectedProfessional(null)
    // aqui você deve abrir uma outra modal entretanto essa deve ocupar toda a tela 100% para iniciar uma conversa aí monte um protótipo simples de tela de chat
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
      <Button
        title="Seguir"
        onPress={() => {
          // Lógica para seguir o profissional
        }}
      />
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
        <Button
          title="Profissionais"
          onPress={() => navigation.navigate('Chats')}
        />
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          className="w-full h-full"
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
                    Gênero: {selectedProfessional.genero}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Data de Nascimento: {selectedProfessional.dataNascimento}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Endereço: {selectedProfessional.contato.endereco.rua},{' '}
                    {selectedProfessional.contato.endereco.numero},{' '}
                    {selectedProfessional.contato.endereco.bairro},{' '}
                    {selectedProfessional.contato.endereco.cidade},{' '}
                    {selectedProfessional.contato.endereco.estado}, CEP:{' '}
                    {selectedProfessional.contato.endereco.cep}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Telefone: {selectedProfessional.contato.telefone}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Email: {selectedProfessional.contato.email}
                  </Text>
                  <Text style={styles.professionalDetail}>
                    Biografia: {selectedProfessional.biografia}
                  </Text>
                  <Button title="Mensagens" onPress={closeModal} />
                  <Button title="Fechar" onPress={closeModal} />
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
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
