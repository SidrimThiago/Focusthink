/* eslint-disable prettier/prettier */
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const storage = new MMKV()

export default function Profile() {
  const [details, setDetails] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigation = useNavigation();

  const loadDetails = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser');
      const response = await axios.post(
        'https://edc4-2804-d4b-b716-8600-bc05-bb02-5682-2ec4.ngrok-free.app/UserDetails',
        { nomeUser },
      );
      const { status, data } = response.data;
      
      if (status === 'ok') {
        setDetails(data);
        setUserType(data.tipo);
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const renderProfileDetails = () => {
    if (details) {
      if (userType === 'Paciente') {
        return (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Nome de usuário:</Text>
            <Text style={styles.value}>{details.userName}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{details.email}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{details.telefone}</Text>
            {/* Renderizar mais campos específicos para pacientes se necessário */}
          </View>
        );
      } else if (userType === 'Profissional') {
        return (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Nome de usuário:</Text>
            <Text style={styles.value}>{details.nomeUser}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{details.email}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{details.telefone}</Text>
            {/* Renderizar mais campos específicos para profissionais se necessário */}
          </View>
        );
      }
    }
    return null;
  };

  const logout = async () => {
    const keys = storage.getAllKeys();
    storage.clearAll(keys);
    navigation.navigate('login');
  };

  const ExcluirConta = async () => {
    try {
      // dps eu faço
    } catch (error) {
      console.error('Erro durante a requisição:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        {renderProfileDetails()}
        <View>
          <Button title='Sair da conta' onPress={logout} />
          <Button title='Apagar minha conta' onPress={ExcluirConta} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
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
