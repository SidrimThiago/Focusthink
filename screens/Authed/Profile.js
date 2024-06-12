/* eslint-disable prettier/prettier */
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
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
            <View>
              <Button title="Sair da conta" onPress={logout} />
              <Button
                title="Apagar minha conta"
                onPress={() => setExcluirModal(true)}
              />
              <Button title="Editar perfil" onPress={EditarPerfil} />
            </View>
            <Text style={styles.label}>Nome de usuário:</Text>
            <Text style={styles.value}>{details.userName}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{details.email}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{details.telefone}</Text>
            <Text style={styles.label}>Biografia:</Text>
            <Text style={styles.value}>{details.biografia}</Text>
            <Text style={styles.label}>Diagnóstico:</Text>
            <Text style={styles.value}>{details.diagnostico}</Text>
            <Text style={styles.label}>Seguidores:</Text>
            <Text style={styles.value}>{details.followers}</Text>
            <Text style={styles.label}>Seguindo:</Text>
            <Text style={styles.value}>{details.following}</Text>
            <Text style={styles.label}>Focuspoints:</Text>
            <Text style={styles.value}>{details.focuspoints}</Text>
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
            <View>
              <Button title="Sair da conta" onPress={logout} />
              <Button
                title="Apagar minha conta"
                onPress={() => setExcluirModal(true)}
              />
              <Button title="Editar perfil" onPress={EditarPerfil} />

              <Button title="Consultório" onPress={() => navigation.navigate('Consultorio')} />
            </View>
          </View>
        )
      }
    }
    return null
  }

  const logout = async () => {
    storage.set('user.nameUser', '')
    storage.set('tokenVerify', '')
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
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 10,
          }}
        >
          <Feather name="settings" size={32} color="white" />
        </View>

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
              <Button title="Salvar" onPress={saveEdits} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
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
              <Text style={styles.label}>{nomeUser}</Text>
              <TextInput
                placeholder={`Digite "${nomeUser}" para confirmar`}
                value={excloseAccount}
                onChangeText={setExcloseAccount}
                style={styles.input}
              />
              <Button title="Confirmar Exclusão" onPress={ExcluirConta} />
              <Button title="Cancelar" onPress={() => setExcluirModal(false)} />
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    fontSize: 18,
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
  },
})
