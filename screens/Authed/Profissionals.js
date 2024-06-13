import { React, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { API_URL } from '../../.env/config';

const storage = new MMKV();

export default function Profissionals({ navigation }) {
  const [professionalsData, setProfessionalsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isFoll, setIsFoll] = useState(false);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(API_URL + '/ExplainProfissionals');
        const data = response.data;
        setProfessionalsData(data.data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchProfessionals();
  }, []);

  const handleProfessionalPress = (professional) => {
    setSelectedProfessional(professional);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProfessional(null);
  };

  const sendMessage = async (professional) => {
    if (!selectedProfessional) return;

    try {
      const userName = storage.getString('user.nameUser');
      const response = await axios.post(`${API_URL}/startChat`, {
        userName,
        professionalName: professional.nome,
      });
      setModalVisible(false);
      navigation.navigate('especifedChat', { chat: response.data });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const follow = async (professional) => {
    try {
      const nome = professional.nome;
      const nomeUser = storage.getString('user.nameUser');
      const response = await axios.post(API_URL + '/FollowProfessional', {
        nome,
        nomeUser,
      });
      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        setIsFoll(data.isFollowing);
        console.log(data.message);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error in follow this person because:', error);
    }
  };

  const renderProfessionalItem = ({ item }) => (
    <View style={styles.professionalContainer}>
      <TouchableOpacity
        style={styles.professionalInfo}
        onPress={() => handleProfessionalPress(item)}
      >
        <Text style={styles.professionalName}>{item.nome}</Text>
        <Text style={styles.professionalSpecialty}>{item.especialidade}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => follow(item)}
      >
        <Text style={styles.followButtonText}>
          {isFoll ? 'Seguindo' : 'Seguir'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View className="w-full">
          <Text style={styles.title}>Lista de Profissionais</Text>
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
          className="w-full h-0"
        >
          <View style={styles.modalContainer} className="w-full h-full">
            <View style={styles.modalContent}>
              {selectedProfessional && (
                <View>
                  <Text style={styles.professionalName}>
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
  );
}

const styles = StyleSheet.create({
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
  professionalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  professionalInfo: {
    flexDirection: 'column',
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  professionalSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  followButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  professionalDetail: {
    fontSize: 14,
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
