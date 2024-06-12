/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Text,
  Button,
  Pressable,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ButtonComponent from '../../../components/button'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import ReturnButton from '../../../components/returnbutton'
import axios from 'axios'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../../.env/config'

const storage = new MMKV({ id: 'user' })

export default function ProfileCreate({ navigation, route }) {
  const [nomeUser, setNomeUser] = useState('')
  const [biografia, setBiografia] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [image, setImage] = useState(null)
  const { newUser } = route.params
  const { newProfissional } = route.params

  const selectedPhoto = async (mode) => {
    try {
      let result = {}

      if (mode === 'galeria') {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true,
        })
      }
      if (mode === 'camera') {
        await ImagePicker.requestCameraPermissionsAsync()
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true,
        })
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri)
      }
    } catch (error) {
      alert('Erro ao fazer upload da foto: ', error.message)
    }
  }

  const removeImage = async () => {
    try {
      saveImage(null)
    } catch ({ message }) {
      alert(message)
      setModalVisible(false)
    }
  }

  const saveImage = async (imageUri) => {
    try {
      if (imageUri) {
        const base64Image = await convertImageToBase64(imageUri)
        setImage(base64Image)
      } else {
        setImage(null)
      }
      setModalVisible(false)
    } catch (error) {
      console.log(`Erro ao salvar a imagem ${error}`)
    }
  }

  const convertImageToBase64 = async (imageUri) => {
    try {
      const response = await fetch(imageUri)
      const blob = await response.blob()
      const base64 = await convertBlobToBase64(blob)
      return base64
    } catch (error) {
      throw new Error('Erro ao converter imagem para base64: ' + error.message)
    }
  }

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result.split(',')[1])
      }
      reader.readAsDataURL(blob)
    })
  }

  function userData() {
    const previousScreenName =
      navigation.getState().routes[navigation.getState().index - 1].name

    switch (previousScreenName) {
      case 'Cadastro':
        // eslint-disable-next-line object-shorthand
        return { ...newUser, nomeUser, biografia, image: image }
      case 'Profissional':
        // eslint-disable-next-line object-shorthand
        return { ...newProfissional, nomeUser, biografia, image: image }
      default:
        return {}
    }
  }

  const CreateUser = () => {
    const user = userData()

    if (newUser) {
      user.tokenVerify = ''
      storage.set('user.token', '')
      axios
        .post(API_URL + '/RegisterUser', {
          nome: user.nome,
          nomeUser: user.nomeUser,
          email: user.email,
          tipo: user.type,
          biografia: user.biografia,
          dataNascimento: user.dataNascimento,
          telefone: user.telefone,
          endereco: user.endereco,
          diagnostico: user.diagnostico,
          userPassword: user.password,
          image: user.image,
          tokenVerify: user.tokenVerify,
          focuspoints: user.focuspoints,
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Erro ao fazer requisição:', error)
        })

      navigation.navigate('login')
      
    } else if (newProfissional) {
      user.tokenVerify = ''
      user.nomeUser = nomeUser
      user.biografia = biografia
      console.log(user.biografia)
      console.log(user.nomeUser)
      storage.set('user.token', '')
      axios
        .post(API_URL + '/RegisterProf', {
          nome: user.nome,
          nomeUser: user.nomeUser,
          email: user.email,
          tipo: user.type,
          biografia: user.biografia,
          telefone: user.telefone,
          rua: user.rua,
          bairro: user.bairro,
          cidade: user.cidade,
          cep: user.cep,
          estado: user.estado,
          numero: user.numero,
          especialidade: user.especialidade,
          password: user.password,
          crm: user.codigo,
          image: user.image,
          tokenVerify: user.tokenVerify,
          focuspoints: user.focuspoints,
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Erro ao fazer requisição:', error)
        })

      // navigation.navigate('login')
    }
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="flex-1"
      >
        <ReturnButton onPress={() => navigation.navigate('Cadastro')} />

        <Image
          alt="image"
          style={styles.tinyLogo}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/icon.png')}
        />
        {image ? (
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              alt="image"
              style={styles.profileImage}
              className="justify-end rounded-full"
              resizeMode="contain"
              source={{ uri: `data:image/jpeg;base64,${image}` }}
              onPress={() => setModalVisible(true)}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              alt="image"
              style={styles.profileImage}
              className="justify-end"
              resizeMode="contain"
              source={require('../../../assets/profilecreate.png')}
            />
          </Pressable>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Fotos</Text>
              <View className="flex-row p-10 justify-around">
                <TouchableOpacity
                  style={styles.button}
                  className="mx-5"
                  onPress={() => selectedPhoto('galeria')}
                >
                  <Text style={styles.textStyle}>Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => selectedPhoto('camera')}
                >
                  <Text style={styles.textStyle}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  className="mx-5"
                  onPress={() => removeImage()}
                >
                  <Text style={styles.textStyle}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View className="relative justify-center h-12 mb-3 pr-14 pl-14 mt-5 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setNomeUser}
            value={nomeUser}
            placeholder="Nome de usuário"
            placeholderTextColor={'white'}
            className=" bg-inherit w-full h-full border-b-2 text-white border-white p-2 text-lg pl-4"
          />
        </View>

        <View className="relative h-28 mb-3 pr-12 pl-12 w-full">
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={8}
            onChangeText={setBiografia}
            value={biografia}
            placeholder="Biografia"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-sm pl-4"
          />
        </View>

        <View className="text-center justify-center items-center w-full px-16 top-14 mt-20">
          <ButtonComponent title="Finalizar" onPress={() => CreateUser()} />
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
