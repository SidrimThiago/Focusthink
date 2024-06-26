import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import SearchEspecialist from './searchespecialist'
import MapView, { Marker } from 'react-native-maps'

export default function Consults() {
  const navigation = useNavigation()
  const [region, setRegion] = useState(null)
  const [professionals, setProfessionals] = useState([])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={(region) => setRegion(region)}
          >
            {professionals.map((professional, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: professional.consultorio.Latitude,
                  longitude: professional.consultorio.Longitude,
                }}
                title={professional.nome}
                description={professional.consultorio.Nome}
                pinColor="#FF7324"
              />
            ))}
          </MapView>
        </View>

        <View />

        <View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 2,
            top: 20,
            right: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 95,
              height: 95,
              backgroundColor: '#633DE8',
              borderRadius: 100,
              alignSelf: 'flex-end',
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Chats')}
            activeOpacity={0.6}
          >
            <Ionicons name="chatbubble" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <SearchEspecialist setProfessionalsData={setProfessionals} />
      </LinearGradient>
    </SafeAreaView>
  )
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
})
