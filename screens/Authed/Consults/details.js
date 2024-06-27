import React from 'react'
import { StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { AntDesign } from '@expo/vector-icons'

export default function Details() {
  const route = useRoute()
  const navigation = useNavigation()
  const { professional } = route.params

  // Verificar se os dados do consultório existem
  const location = professional?.consultorio
  if (!location || !location.Latitude || !location.Longitude) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Erro ao carregar os detalhes do profissional
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight}]}>
      <ScrollView >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={38} color="white" style={{ position: 'absolute', top: 55, left: 15 }} />

          </TouchableOpacity>
          <Image
            alt="image"
            source={{ uri: professional.image }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{professional.nome}</Text>
          <Text style={styles.subText}>{professional.nomeUser}</Text>
          <Text style={styles.subText}>{professional.especialidade}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mensagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Agenda</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.Latitude,
              longitude: location.Longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.Latitude,
                longitude: location.Longitude,
              }}
              title={location.Nome}
              pinColor="#FF5C00"
              description={`${location.Rua}, ${location.Numero}`}
            />
          </MapView>
          <View style={styles.addressContainer}>
            <Text style={styles.consultorio}>{location.Nome}</Text>
            <Text style={styles.address}>
              {`${location.Rua}, ${location.Numero}, ${location.Bairro}, ${location.Cidade}, ${location.Estado}, CEP: ${location.Cep}`}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Informações</Text>
          <Text style={styles.infoText}>{professional.biografia}</Text>
          <Text style={styles.infoText}>CRP: {professional.crm}</Text>
          <Text style={styles.infoText}>
            Especialidade: {professional.especialidade}
          </Text>
          <Text style={styles.infoText}>Email: {professional.email}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E278D',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
  subText: {
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
    color: '#D5D5D5',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6148B6',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Quicksand-SemiBold',
  },
  mapContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 200,
  },
  addressContainer: {
    backgroundColor: '#6148B6',
    padding: 10,
    borderRadius: 10,
    marginTop: -10,
  },
  consultorio: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },
  address: {
    fontSize: 14,
    color: '#D5D5D5',
    fontFamily: 'Quicksand-SemiBold',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
})
