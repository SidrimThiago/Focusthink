import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import MapView, { Marker, Callout } from 'react-native-maps';
import { API_URL } from '../../.env/config';

export default function Consults({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [consultorios, setConsultorios] = useState([]);
  const [selectedConsultorio, setSelectedConsultorio] = useState(null);

  useEffect(() => {
    fetchConsultorios();
  }, []);

  const fetchConsultorios = async () => {
    try {
      const response = await axios.get(`${API_URL}/ExplainConsultorios`);
      setConsultorios(response.data.data);
    } catch (error) {
      console.error('Error fetching consultorios:', error);
    }
  };

  const handleMarkerPress = (consultorio) => {
    setSelectedConsultorio(consultorio);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Button
          title="Show Consultories"
          onPress={() => setModalVisible(true)}
        />
        <Button
          title="Chatbot"
          onPress={() => navigation.navigate('Chatbot')}
        />
        <Button
          title="Questionário"
          onPress={() => navigation.navigate('Questionary')}
        />
        <Button
          title="Questionário com IA"
          onPress={() => navigation.navigate('IaQuestionary')}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <MapView style={styles.map}>
              {consultorios.map((consultorio, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: consultorio.Latitude,
                    longitude: consultorio.Longitude,
                  }}
                  onPress={() => handleMarkerPress(consultorio)}
                >
                  <Callout>
                    <View>
                      <Text>{consultorio.Nome}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
            {selectedConsultorio && (
              <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>
                  Detalhes do Consultório
                </Text>
                <Text>Nome: {selectedConsultorio.Nome}</Text>
                <Text>Estado: {selectedConsultorio.Estado}</Text>
                <Text>Cidade: {selectedConsultorio.Cidade}</Text>
                <Text>Bairro: {selectedConsultorio.Bairro}</Text>
                <Text>Rua: {selectedConsultorio.Rua}</Text>
                <Text>Número: {selectedConsultorio.Numero}</Text>
                <Text>Complemento: {selectedConsultorio.Complemento}</Text>
                <Text>CEP: {selectedConsultorio.Cep}</Text>
                <Button
                  title="Fechar"
                  onPress={() => setSelectedConsultorio(null)}
                />
              </View>
            )}
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
  modalContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
