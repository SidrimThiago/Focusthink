import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Text,
  TextInput,
  Image,
  Animated,
  TouchableHighlight,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { Octicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { API_URL } from '../../../.env/config'
import { MMKV } from 'react-native-mmkv'
import Geolocation from '@react-native-community/geolocation'

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'

const storage = new MMKV()

export default function SearchEspecialist({ setProfessionalsData }) {
  const navigation = useNavigation()
  const [professionalsData, setLocalProfessionalsData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const nomeUser = storage.getString('user.nameUser')
  const [region, setRegion] = useState(null)
  const [searchText, setSearchText] = useState('')

  const fetchDados = async () => {
    try {
      const response = await axios.get(API_URL + '/ShowConsultories')
      const data = response.data
      if (data && data.data && data.data.Nome) {
        setRegion({
          latitude: data.data.Latitude,
          longitude: data.data.Longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      }
    } catch (error) {
      console.error('Erro ao puxar os dados do consultório:', error)
    }
  }

  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      },
      (error) => {
        console.log('Erro de localização:', error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        await fetchDados()
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then((granted) => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getMyLocation()
            } else {
              console.log('Permissão de localização negada') 
            }
          })
        } else {
          getMyLocation()
        }

        const response = await axios.get(API_URL + '/ExplainProfissionals')
        const data = response.data

        // Convert image URLs to base64
        const updatedProfessionals = data.data.map((professional) => {
          return {
            ...professional,
            image: professional.image
              ? `data:image/jpeg;base64,${professional.image}`
              : null,
          }
        })

        if (region) {
        } else {
          setLocalProfessionalsData(updatedProfessionals)
          setProfessionalsData(updatedProfessionals)
          setFilteredData(updatedProfessionals)
        }
      } catch (error) {
        console.error('Error fetching professionals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionals()
  }, [region])

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(professionalsData)
    } else {
      setFilteredData(
        professionalsData.filter((item) =>
          item.nome.toLowerCase().includes(searchText.toLowerCase()),
        ),
      )
    }
  }, [searchText, professionalsData])

  const scrollY = useRef(new Animated.Value(0)).current
  const ITEM_HEIGHT = 450

  const flatListRef = useRef(null)

  const snapToItem = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index })
    }
  }

  const showProfDetails = (professional) => {
    console.log(professional)
    navigation.navigate('Details', { professional })
  }

  const Item = ({ professional }) => (
    <TouchableHighlight
      onPress={() => showProfDetails(professional)}
      activeOpacity={0.8}
      underlayColor="#6148B6"
    >
      <View
        style={{
          backgroundColor: '#633DE8',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 15,
          paddingLeft: 15,
        }}
      >
        <Image
          alt="image"
          source={{ uri: professional.image }}
          style={{ width: 90, height: 90, borderRadius: 10 }}
        />
        <View style={{ marginLeft: 8, justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Quicksand-Bold',
              color: 'white',
            }}
          >
            {professional.nome}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Quicksand-SemiBold',
              color: '#D5D5D5',
              marginBottom: 5,
            }}
          >
            {professional.distance || '1.3 km'}
          </Text>
          <View
            style={{
              backgroundColor: '#FF7324',
              padding: 3,
              flexDirection: 'row',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 65,
            }}
          >
            <AntDesign name="star" size={18} color="white" />
            <Text
              style={{
                marginLeft: 5,
                color: 'white',
                fontFamily: 'Quicksand-SemiBold',
                fontSize: 15,
              }}
            >
              5.0
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )

  return (
    <View
      style={{
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        overflow: 'hidden',
        height: '30%',
        alignSelf: 'flex-end',
        zIndex: 1,
      }}
    >
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ paddingTop: 0 }}
        initialNumToRender={10}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        pagingEnabled
        decelerationRate={0.9}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: '#633DE8',
              padding: 10,
              borderTopEndRadius: 50,
              borderTopStartRadius: 50,
            }}
          >
            <Pressable style={{ width: '100%' }} onPress={() => snapToItem(0)}>
              <View
                style={{
                  width: '14%',
                  height: 4,
                  backgroundColor: 'rgba(238, 238, 238, 0.6)',
                  marginBottom: 10,
                  marginTop: 5,
                  borderRadius: 5,
                  alignSelf: 'center',
                }}
              />
            </Pressable>
            <View
              style={{
                backgroundColor: '#4A2FA9',
                flexDirection: 'row',
                padding: 15,
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Octicons name="search" size={30} color="#B6B6B6" />
              <TextInput
                editable={true}
                placeholder="Buscar especialista"
                placeholderTextColor="#B6B6B6"
                style={{
                  fontSize: 30,
                  fontFamily: 'Quicksand-SemiBold',
                  marginLeft: 10,
                  width: '100%',
                  color: 'white',
                  paddingRight: 28,
                }}
              />
            </View>
          </View>
        }
        data={filteredData}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <Item professional={item} />}
      />
    </View>
  )
}
