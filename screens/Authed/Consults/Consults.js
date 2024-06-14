import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Modal,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import MapView, { Marker, Callout } from 'react-native-maps';
import { API_URL } from '../../../.env/config';
import SearchEspecialist from './searchespecialist';
import { Ionicons } from '@expo/vector-icons';
import Maps from './maps';
import { color } from '@rneui/base';

export default function Consults({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [consultorios, setConsultorios] = useState([]);
  const [selectedConsultorio, setSelectedConsultorio] = useState(null);


  /*
  <View style={{position: 'absolute', marginTop: StatusBar.currentHeight + 100, zIndex: 2}}>
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
        </View>
  */

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <StatusBar barStyle={'dark-content'}/>
        <View style={{ position: 'absolute', width: '100%', height: '100%'}}>
          <Maps />
        </View>
        
        <View />

        <View style={{ position: 'absolute', width: '100%', zIndex: 2, top: 20, right: 10 }}>
          <TouchableOpacity style={{ width: 95, height: 95, backgroundColor: '#633DE8', borderRadius: 100, alignSelf: 'flex-end', marginTop: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('Chats')} activeOpacity={0.6}>
            <Ionicons name="chatbubble" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <SearchEspecialist />

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
    justifyContent: 'space-between',
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