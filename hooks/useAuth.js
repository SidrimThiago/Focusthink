/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { MMKV } from 'react-native-mmkv'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const storage = new MMKV()

const useAuth = () => {
  const [authed, setAuthed] = useState(false)
  const [details, setDetails] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    const checkAuth = async () => {
      const token = storage.getString('user.token')
      const userContext = storage.getString('user.nameUser')

      const response = await axios.post(
        'https://8fbd-2804-d4b-b716-8600-bc05-bb02-5682-2ec4.ngrok-free.app/UserDetails',
        userContext,
      )
      
      const { status, data } = response.data
      if(status === 'ok' && token){
        setDetails(data)
        setAuthed(true)
      }
       else {
        setAuthed(false)
        Alert.alert(
          'Credenciais inválidas',
          'Faça login para acessar esta página.',
        )
        navigation.navigate('login')
      }
    }

    checkAuth()
  }, [])

  return authed
}

export default useAuth
