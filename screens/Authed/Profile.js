/* eslint-disable prettier/prettier */
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Splash from '../splash'

const storage = new MMKV()

export default function Profile() {
  const [details, setDetails] = useState(null)
  const navigation = useNavigation()

  const ExcluirConta = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(
        'https://8f1f-138-204-129-220.ngrok-free.app/ExcluirConta', { nomeUser }
      )
      const { status, data } = response.data
      if (status === 'sucesso'){
        storage.set('user.token', '')
        storage.set('user.nameUser', '')
        const keys = storage.getAllKeys()
        storage.clearAll(keys)
        navigation.navigate(Splash)
      }
    }
    catch(error){
      console.error('Erro durante a requisição:', error)
    }
  }

  const loadDetails = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(
        'https://ddc2-2804-d4b-b716-8600-bc05-bb02-5682-2ec4.ngrok-free.app/UserDetails',
        { nomeUser },
      )
      const { status, data } = response.data
      
      if (status === 'ok') {
        setDetails(data)
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error)
    }
  }

  useEffect(() => {
    loadDetails()
  }, [])

  const logout = async () => {
    const keys = storage.getAllKeys()
    storage.clearAll(keys)
    navigation.navigate('login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        {details && (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Nome de usuário:</Text>
            <Text style={styles.value}>{details.nome}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{details.email}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{details.telefone}</Text>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{details.endereco}</Text>
            <Text style={styles.label}>Biografia:</Text>
            <Text style={styles.value}>{details.biografia}</Text>
            <Text style={styles.label}>Diagnóstico:</Text>
            <Text style={styles.value}>{details.diagnostico}</Text>
            <Text style={styles.label}>Focuspoints:</Text>
            <Text style={styles.value}>{details.focuspoints}</Text>
          </View>
        )}
        <View>
          <Button title='Sair da conta' onPress={logout} />
          <Button title='Apagar minha conta' onpress={ExcluirConta} />
        </View>
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
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
})
