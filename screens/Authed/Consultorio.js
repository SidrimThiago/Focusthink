import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  Platform,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import GeoLocation from '@react-native-community/geolocation'
import { API_URL } from '../../.env/config'

const storage = new MMKV()
const { width, height } = Dimensions.get('screen')

export default function Consultorio() {
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

  const handleAddressChange = (text) => {
    setAddress(text)
  }

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleDetailChange = (field, value) => {
    setConsultorioDetails({ ...consultorioDetails, [field]: value })
  }

  const getCoordinates = async (addressDetails) => {
    const { Rua, Numero, Cidade, Estado, Cep } = addressDetails
    const address = `${Rua}, ${Numero}, ${Cidade}, ${Estado}, ${Cep}`
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBB0NnuLix6tj8RsN_5OPxBcGVEP3UnfMk`,
      )
      const result = response.data.results[0].geometry.location
      return result
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error)
      return null
    }
  }

  async function handleSaveConsult() {
    console.log(consultorioDetails)
    setLoading(true)
    const coordinates = await getCoordinates(consultorioDetails)
    if (!coordinates) {
      alert('Não foi possível obter as coordenadas para o endereço fornecido.')
      setLoading(false)
      return
    }

    setRegion({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    const nomeUser = storage.getString('user.nameUser')
    const dataToSend = {
      ...consultorioDetails,
      Latitude: coordinates.lat,
      Longitude: coordinates.lng,
    }

    try {
      const response = await axios.post(API_URL + '/EditConsultorio', {
        consultorioDetails: dataToSend,
        nomeUser,
      })
      const data = response.data
      if (data && data.data && data.data.Nome) {
        setConsultorioDetails(data.data)
        setIsEditMode(false)
      } else {
        setIsEditMode(true)
      }
    } catch (error) {
      console.error('Erro ao salvar os dados', error)
    } finally {
      setLoading(false)
      setIsEditMode(false)
    }
  }

  const fetchDados = async () => {
    try {
      const response = await axios.post(API_URL + '/ExplainConsultorio', {
        nomeUser,
      })
      const data = response.data
      if (data && data.data && data.data.Nome) {
        setConsultorioDetails(data.data)
        setIsEditMode(false)
      } else {
        setIsEditMode(true)
      }
    } catch (error) {
      console.error('Erro ao puxar os dados do consultório:', error)
    } finally {
      setLoading(false)
    }
  }

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
    fetchDados()
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

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            style={styles.textInput}
            placeholder="Digite um endereço..."
            onChangeText={handleAddressChange}
            value={address}
            onSubmitEditing={handleSearchLocation}
          />

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

          <View style={styles.bottomContainer}>
            <Text style={styles.sectionTitle}>Meu Consultório</Text>
            {isEditMode ? (
              <>
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Nome}
                  onChangeText={(text) => handleDetailChange('Nome', text)}
                  placeholder="Nome do Consultório"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Estado}
                  onChangeText={(text) => handleDetailChange('Estado', text)}
                  placeholder="Estado"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Cidade}
                  onChangeText={(text) => handleDetailChange('Cidade', text)}
                  placeholder="Cidade"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Bairro}
                  onChangeText={(text) => handleDetailChange('Bairro', text)}
                  placeholder="Bairro"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Cep}
                  onChangeText={(text) => handleDetailChange('Cep', text)}
                  placeholder="Cep"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Numero}
                  onChangeText={(text) => handleDetailChange('Numero', text)}
                  placeholder="Número"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Rua}
                  onChangeText={(text) => handleDetailChange('Rua', text)}
                  placeholder="Rua"
                />
                <TextInput
                  style={styles.input}
                  value={consultorioDetails.Complemento}
                  onChangeText={(text) =>
                    handleDetailChange('Complemento', text)
                  }
                  placeholder="Complemento"
                />
                <Button title="Salvar" onPress={() => handleSaveConsult()} />
              </>
            ) : (
              <>
                <Text>Nome: {consultorioDetails.Nome || 'Não informado'}</Text>
                <Text>
                  Estado: {consultorioDetails.Estado || 'Não informado'}
                </Text>
                <Text>
                  Bairro: {consultorioDetails.Bairro || 'Não informado'}
                </Text>
                <Text>
                  Cidade: {consultorioDetails.Cidade || 'Não informado'}
                </Text>
                <Text>Cep: {consultorioDetails.Cep || 'Não informado'}</Text>
                <Text>
                  Número: {consultorioDetails.Numero || 'Não informado'}
                </Text>
                <Text>Rua: {consultorioDetails.Rua || 'Não informado'}</Text>
                <Text>
                  Complemento:{' '}
                  {consultorioDetails.Complemento || 'Não informado'}
                </Text>
                <TouchableOpacity onPress={handleEditToggle}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
