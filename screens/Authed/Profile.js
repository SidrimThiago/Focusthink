/* eslint-disable prettier/prettier */
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { API_URL } from '../../.env/config'
import { TextInputMask } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker'

const storage = new MMKV()

export default function Profile() {
  const [details, setDetails] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [userType, setUserType] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingDetails, setEditingDetails] = useState({})
  const [excloseAccount, setExcloseAccount] = useState('')
  const [excluirModal, setExcluirModal] = useState(false)
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)

  const nomeUser = storage.getString('user.nameUser')

  const loadDetails = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(`${API_URL}/UserDetails`, { nomeUser })
      const { status, data } = response.data

      if (status === 'ok') {
        setDetails(data)
        setUserType(data.tipo)
        setEditingDetails(data)

        if (data.image) {
          console.log(data.consultorio)
          setImageUrl(`data:image/jpeg;base64,${data.image}`)
        }
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetails()
  }, [])

  const handleInputChange = (key, value) => {
    setEditingDetails({
      ...editingDetails,
      [key]: value,
    })
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      })

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const { base64 } = result.assets[0]
        setImageUrl(`data:image/jpeg;base64,${base64}`)
        setEditingDetails({
          ...editingDetails,
          image: base64,
        })
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error)
    }
  }

  const saveEdits = async () => {
    try {
      const nameUser = storage.getString('user.nameUser')
      editingDetails.nomeUser = nameUser

      const response = await axios.post(
        `${API_URL}/UpdateUserDetails`,
        editingDetails,
      )

      if (response.data.status === 'ok') {
        setDetails(editingDetails)
        setModalVisible(false)
      } else {
        console.error('Erro ao salvar alterações no perfil')
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error)
    }
  }
  const renderProfileDetails = () => {
    if (details) {
      if (userType === 'Paciente') {
        return (
          <View style={{ height: '100%', justifyContent: 'space-evenly' }}>
            <LinearGradient colors={['#8863FF', '#6D53C0']} style={{ flexDirection: 'row', padding: 20, borderRadius: 35 }}>
              <View>
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 26, color: 'white' }}>{details.userName}</Text>
                <Text style={[styles.value, { maxWidth: 240, marginVertical: 15 }]}>{details.biografia}</Text>
                <Text style={styles.label}>Email: <Text style={styles.value}>{details.email}</Text></Text>
                <Text style={styles.label}>Telefone: <Text style={styles.value}>{details.telefone}</Text></Text>
                <Text style={styles.label}>Diagnóstico: <Text style={styles.value}>{details.diagnostico}</Text></Text>
                <Text style={styles.value}>{details.focuspoints}</Text>
              </View>

              {editingDetails.image || imageUrl ? (
                <Image
                  alt="image"
                  source={{ uri: imageUrl }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={[styles.profileImage, styles.placeholder]}>
                  <Text>Adicionar Foto</Text>
                </View>
              )}
            </LinearGradient>

            <View style={styles.actionsContainer}>
              <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Desempenho')}>
                <Text style={styles.actionText}>Desempenho</Text>
                <Ionicons name="desktop-outline" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => setSettingsModalVisible(true)}>
                <Text style={styles.actionText}>Configurações</Text>
                <Ionicons name="settings-outline" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.actionButton} onPress={EditarPerfil}>
                <Text style={styles.actionText}>Editar perfil</Text>
                <Ionicons name="pencil-outline" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        )
      } else if (userType === 'Profissional') {
        return (
          <View style={styles.userInfo}>
            {editingDetails.image || imageUrl ? (
              <Image
                alt="image"
                source={{ uri: imageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={[styles.profileImage, styles.placeholder]}>
                <Text>Adicionar Foto</Text>
              </View>
            )}
            <Text style={styles.label}>Nome de usuário:</Text>
            <Text style={styles.value}>{details.nomeUser}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{details.email}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{details.telefone}</Text>
            <View style={styles.actionsContainer}>
              <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Desempenho')}>
                <Text style={styles.actionText}>Desempenho</Text>
                <Ionicons name="desktop-outline" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => setSettingsModalVisible(true)}>
                <Text style={styles.actionText}>Configurações</Text>
                <Ionicons name="settings-outline" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.actionButton} onPress={EditarPerfil}>
                <Text style={styles.actionText}>Editar perfil</Text>
                <Ionicons name="pencil-outline" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Consultorio')}>
                <Text style={styles.actionText}>Consultório</Text>
                <Ionicons name="briefcase-outline" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        )
      }
    }
    return null
  }

  const logout = async () => {
    storage.set('user.nameUser', '')
    storage.set('user.token', '')
    navigation.navigate('login')

  }

  const ExcluirConta = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')

      if (nomeUser === excloseAccount) {
        const response = await axios.post(`${API_URL}/DeleteUser`, { nomeUser })
        if (response.data.status === 'ok') {
          navigation.navigate('login')
          console.log('Conta apagada com sucesso')
        }
      } else {
        console.log('Nome de usuário não corresponde')
      }
    } catch (error) {
      console.error('Erro ao excluir a conta:', error)
    }
  }

  const EditarPerfil = () => {
    setModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>


        {renderProfileDetails()}

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              {userType === 'Paciente' && (
                <>
                  <TouchableOpacity onPress={pickImage}>
                    {imageUrl ? (
                      <Image
                        alt="image"
                        source={{ uri: imageUrl }}
                        style={styles.profileImage}
                      />
                    ) : (
                      <View style={[styles.profileImage, styles.placeholder]}>
                        <Text>Adicionar Foto</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.label}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    value={editingDetails.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                  />
                  <Text style={styles.label}>Telefone:</Text>
                  <TextInputMask
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    style={styles.input}
                    value={editingDetails.telefone}
                    onChangeText={(value) =>
                      handleInputChange('telefone', value)
                    }
                  />
                  <Text style={styles.label}>Biografia:</Text>
                  <TextInput
                    style={styles.input}
                    value={editingDetails.biografia}
                    onChangeText={(value) =>
                      handleInputChange('biografia', value)
                    }
                  />
                  <Text style={styles.label}>Diagnóstico:</Text>
                  <TextInput
                    style={styles.input}
                    value={editingDetails.diagnostico}
                    onChangeText={(value) =>
                      handleInputChange('diagnostico', value)
                    }
                  />
                </>
              )}
              {userType === 'Profissional' && (
                <>
                  <TouchableOpacity onPress={pickImage}>
                    {imageUrl ? (
                      <Image
                        alt="image"
                        source={{ uri: imageUrl }}
                        style={styles.profileImage}
                      />
                    ) : (
                      <View style={[styles.profileImage, styles.placeholder]}>
                        <Text>Adicionar Foto</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.label}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    value={editingDetails.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                  />
                  <Text style={styles.label}>Telefone:</Text>
                  <TextInput
                    style={styles.input}
                    value={editingDetails.telefone}
                    onChangeText={(value) =>
                      handleInputChange('telefone', value)
                    }
                  />
                </>
              )}
              <TouchableOpacity style={{ backgroundColor: '#FF7121', borderRadius: 50, padding: 18, paddingHorizontal: 80, marginVertical: 10 }} onPress={saveEdits}><Text className="font-quick-bold text-white">Salvar</Text></TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#FF7121', borderRadius: 50, padding: 18, paddingHorizontal: 80, marginVertical: 10 }} title="Cancelar" onPress={() => setModalVisible(false)}><Text className="font-quick-bold text-white">Cancelar</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={excluirModal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Excluir Conta</Text>
              <Text>
                Para confirmar a exclusão da conta, escreva seu nome de usuário
                abaixo:
              </Text>
              <Text className="font-quick-bold text-lg" style={styles.label}>{nomeUser}</Text>
              <TextInput
                placeholder={`Digite "${nomeUser}" para confirmar`}
                value={excloseAccount}
                onChangeText={setExcloseAccount}
                style={styles.input}
              />
              <TouchableOpacity style={{ backgroundColor: '#FF7121', borderRadius: 50, padding: 18, paddingHorizontal: 80, marginVertical: 10 }} onPress={ExcluirConta}><Text className="font-quick-bold text-white">Excluir</Text></TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#FF7121', borderRadius: 50, padding: 18, paddingHorizontal: 80, marginVertical: 10 }} onPress={() => setExcluirModal(false)}><Text className="font-quick-bold text-white">Cancelar</Text></TouchableOpacity>
            </View>
            <View>
              <Pressable>
                <Text>Desempenho</Text>
                <Ionicons name="desktop-outline" width="24" color="black" />
              </Pressable>
              <Pressable>
                <Text>Configurações</Text>
                <Ionicons name="settings" width="24" color="black" />
              </Pressable>
              <Pressable>
                <Text>Editar perfil</Text>
                <Ionicons name="airplane" width="24" color="black" />
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          visible={settingsModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Configurações</Text>
              <Pressable style={styles.settingsButton} onPress={logout}>
                <Text style={styles.settingsText}>Logout</Text>
              </Pressable>
              <Pressable
                style={styles.settingsButton}
                onPress={() => setExcluirModal(true)}
              >
                <Text style={styles.settingsText}>Excluir Conta</Text>
              </Pressable>

              <Pressable style={styles.settingsButton} onPress={EditarPerfil}>
                <Text style={styles.settingsText}>Editar Perfil</Text>
              </Pressable>
              <TouchableOpacity
                onPress={() => setSettingsModalVisible(false)}
              ><Text style={styles.settingsText}>Cancelar</Text></TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF8A8A',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    color: '#E0E0E0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#6D53C0', // Updated background color to match the design
    padding: 20,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Updated text color to white
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 10,
    fontSize: 18,
    padding: 10,
    borderRadius: 10, // Added border radius
    width: '100%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  actionText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    marginBottom: 5,
  },
  settingsButton: {
    backgroundColor: '#FF7D34',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  settingsText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#FF7D34', // Updated button color to match the design
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#FF7D34', // Updated button color to match the design
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: 'white',
  },
});
