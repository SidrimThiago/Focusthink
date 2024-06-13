import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Button,
  Modal,
  Pressable,
} from 'react-native'
import axios from 'axios'
import { API_URL } from '../../.env/config'
import { MMKV } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native'

const storage = new MMKV()

export default function Console() {
  const [pendingProfessionals, setPendingProfessionals] = useState([])
  const [selectedProfessional, setSelectedProfessional] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    const fetchPendingProfessionals = async () => {
      try {
        const response = await axios.get(`${API_URL}/pendingProfessionals`)
        if (response.data.status === 'ok') {
          setPendingProfessionals(response.data.data)
        } else {
          console.error(response.data.message)
        }
      } catch (error) {
        console.error('Erro ao buscar profissionais pendentes:', error)
      }
    }

    fetchPendingProfessionals()
  }, [])

  const handleProfessionalPress = (professional) => {
    setSelectedProfessional(professional)
    setModalVisible(true)
  }

  const handleApprove = async () => {
    try {
      await axios.post(`${API_URL}/approveProfessional`, {
        id: selectedProfessional._id,
      })
      setModalVisible(false)
      setPendingProfessionals((prev) =>
        prev.filter((prof) => prof._id !== selectedProfessional._id),
      )
    } catch (error) {
      console.error('Erro ao aprovar profissional:', error)
    }
  }

  const handleDisapprove = async () => {
    try {
      await axios.post(`${API_URL}/disapproveProfessional`, {
        id: selectedProfessional._id,
      })
      setModalVisible(false)
      setPendingProfessionals((prev) =>
        prev.filter((prof) => prof._id !== selectedProfessional._id),
      )
    } catch (error) {
      console.error('Erro ao desaprovar profissional:', error)
    }
  }

  const renderProfessionalItem = ({ item }) => (
    <Pressable onPress={() => handleProfessionalPress(item)}>
      <View style={styles.professionalContainer}>
        <Text style={styles.professionalName}>{item.nome}</Text>
        <Text style={styles.professionalEmail}>{item.email}</Text>
        <Text style={styles.professionalSpecialty}>{item.especialidade}</Text>
      </View>
    </Pressable>
  )

  const logout = async () => {
    storage.set('user.nameUser', '')
    storage.set('user.token', '')
    navigation.navigate('login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Text style={styles.headerTitle}>Pending Professionals</Text>
        <FlatList
          data={pendingProfessionals}
          renderItem={renderProfessionalItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
        <Button title="Sair da conta" onPress={logout} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedProfessional && (
                <>
                  <Text style={styles.modalText}>
                    Nome: {selectedProfessional.nome}
                  </Text>
                  <Text style={styles.modalText}>
                    Nome de Usuário: {selectedProfessional.nomeUser}
                  </Text>
                  <Text style={styles.modalText}>
                    Tipo: {selectedProfessional.tipo}
                  </Text>
                  <Text style={styles.modalText}>
                    Biografia: {selectedProfessional.biografia}
                  </Text>
                  <Text style={styles.modalText}>
                    CEP: {selectedProfessional.cep}
                  </Text>
                  <Text style={styles.modalText}>
                    Telefone: {selectedProfessional.telefone}
                  </Text>
                  <Text style={styles.modalText}>
                    Email: {selectedProfessional.email}
                  </Text>
                  <Text style={styles.modalText}>
                    Especialidade: {selectedProfessional.especialidade}
                  </Text>
                  <Text style={styles.modalText}>
                    CRM: {selectedProfessional.crm}
                  </Text>

                  <View style={styles.buttonContainer}>
                    <Button title="Aprovar" onPress={handleApprove} />
                    <Button title="Desaprovar" onPress={handleDisapprove} />
                  </View>
                </>
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
    paddingTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  professionalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  professionalEmail: {
    fontSize: 16,
    color: '#888',
  },
  professionalSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
})
