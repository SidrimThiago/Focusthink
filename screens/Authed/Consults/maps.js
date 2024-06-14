import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, StyleSheet, SafeAreaView, ActivityIndicator, Text, TouchableOpacity, PermissionsAndroid, Dimensions, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import GeoLocation from '@react-native-community/geolocation'
import { API_URL } from '../../../.env/config'

const storage = new MMKV()
const { width, height } = Dimensions.get('screen')

export default function Maps() {
  const [address, setAddress] = useState('')
  const nomeUser = storage.getString('user.nameUser')
  const [region, setRegion] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [consultorioDetails, setConsultorioDetails] = useState({
    Nome: '',
    Bairro: '',
    Rua: '',
    Numero: '',
    Complemento: '',
    Cep: '',
    Estado: '',
    Cidade: '',
  })


  const handleSearchLocation = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBB0NnuLix6tj8RsN_5OPxBcGVEP3UnfMk`,
      )
      const result = response.data.results[0].geometry.location
      setRegion({
        latitude: result.lat,
        longitude: result.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(getMyLocation)
    } else {
      getMyLocation()
    }
  }, [nomeUser])

  const getMyLocation = () => {
    GeoLocation.getCurrentPosition(
      (info) => {
        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      },
      (error) => {
        console.log('Location error:', error)
      },
      { enableHighAccuracy: true, timeout: 2000 },
    )
  }

  /*
  <TextInput
            style={styles.textInput}
            placeholder="Digite um endereço..."
          
            onChangeText={handleAddressChange}
            value={address}
            onSubmitEditing={handleSearchLocation}
          />

                  <TextInput
            style={styles.textInput}
            placeholder="Digite um endereço..."
            onChangeText={handleAddressChange}
            value={address}
            onSubmitEditing={handleSearchLocation}
          />
  */

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>

          <MapView
            style={styles.map}
            initialRegion={region}
            onPress={handleSearchLocation}
            showsUserLocation={true}
            zoomEnabled={true}
            loadingEnabled={true}
          >
            {region && <Marker coordinate={region} />}
          </MapView>

          
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    position: 'absolute',
    top: 25,
    width: '90%',
    height: 40,
    borderWidth: 1,
    paddingRight: 20,
    zIndex: 1000,
    alignSelf: 'start',
    backgroundColor: 'white',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    margin: 10,
    borderWidth: 1,
    padding: 8,
  },
  editButton: {
    marginTop: 10,
    color: 'blue',
  },
})
