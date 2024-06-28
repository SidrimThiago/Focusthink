import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../.env/config'
import { useNavigation } from '@react-navigation/native'

const storage = new MMKV()

export default function Profissionals() {
  const navigation = useNavigation()
  const [professionalsData, setProfessionalsData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState(null)
  const [followingStatus, setFollowingStatus] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(API_URL + '/ExplainProfissionals')
        const data = response.data

        // Convert image URLs to base64
        const updatedProfessionals = data.data.map((professional) => {
          if (professional.image) {
            return {
              ...professional,
              image: `data:image/jpeg;base64,${professional.image}`,
            }
          }
          return professional
        })

        setProfessionalsData(updatedProfessionals)

        // Fetch following status for each professional
        const userName = storage.getString('user.nameUser')
        const followingStatusPromises = updatedProfessionals.map(
          (professional) =>
            axios.post(API_URL + '/isFollowing', {
              nome: professional.nome,
              nomeUser: userName,
            }),
        )

        const followingStatusResponses = await Promise.all(
          followingStatusPromises,
        )
        const followingStatus = updatedProfessionals.reduce(
          (acc, professional, index) => {
            acc[professional.nome] =
              followingStatusResponses[index].data.isFollowing
            return acc
          },
          {},
        )

        setFollowingStatus(followingStatus)
      } catch (error) {
        console.error('Error fetching professionals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionals()
  }, [])

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

  const handleProfessionalPress = (professional) => {
    setSelectedProfessional(professional)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedProfessional(null)
  }

  const sendMessage = async (professional) => {
    if (!selectedProfessional) return

    try {
      const userName = storage.getString('user.nameUser')
      const response = await axios.post(`${API_URL}/startChat`, {
        userName,
        professionalName: professional.nomeUser,
      })
      setModalVisible(false)
      navigation.navigate('especifedChat', { chatId: response.data._id })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }
  }

  const follow = async (professional) => {
    try {
      const nome = professional.nome
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(API_URL + '/FollowProfessional', {
        nome,
        nomeUser,
      })
      const data = response.data

      if (response.status === 200 || response.status === 201) {
        setFollowingStatus((prevState) => ({
          ...prevState,
          [professional.nome]: data.isFollowing,
        }))
        console.log(data.message)
      } else {
        console.log('error')
      }
    } catch (error) {
      console.error('Error in follow this person because:', error)
    }
  }

  const renderProfessionalItem = ({ item }) => (
    <View style={styles.professionalContainer}>
      <TouchableOpacity
        style={styles.professionalInfo}
        onPress={() => handleProfessionalPress(item)}
      >
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              alt="image"
              source={{ uri: item.image }}
              style={styles.professionalImage}
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
        <View style={styles.professionalTextContainer}>
          <Text style={styles.professionalName}>{item.nome}</Text>
          <Text style={styles.professionalSpecialty}>{item.especialidade}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => follow(item)}
      >
        <Text style={styles.followButtonText}>
          {followingStatus[item.nome] ? 'Seguindo' : 'Seguir'}
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={{ width: '100%' }}>
          <FlatList
            data={professionalsData}
            renderItem={renderProfessionalItem}
            keyExtractor={(item) => item._id}
          />
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedProfessional && (
                <View>
                  <Text style={styles.professionalNameModal}>
                    {selectedProfessional?.nome}
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
                  <Button
                    title="Mensagens"
                    onPress={() => sendMessage(selectedProfessional)}
                  />
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
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
    textAlign: 'center',
  },
  professionalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 90,
    overflow: 'hidden',
  },
  professionalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
  },
  placeholderImage: {
    width: 65,
    height: 65,
    borderRadius: 90,
    backgroundColor: '#ccc',
  },
  professionalTextContainer: {
    marginLeft: 10,
  },
  professionalName: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: '#3E278D',
  },
  professionalSpecialty: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    color: '#888',
  },
  followButton: {
    backgroundColor: '#633DE8',
    borderRadius: 5,
    padding: 10,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  professionalNameModal: {
    fontSize: 22,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10,
  },
  professionalDetail: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    marginBottom: 5,
  },
})
