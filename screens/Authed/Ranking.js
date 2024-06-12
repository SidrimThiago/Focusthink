/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../.env/config'

const storage = new MMKV()

export default function Ranking({ navigation }) {
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(API_URL + '/Ranking')
        const data = response.data
        console.log(data)

        // Convert image URLs to base64
        const updatedRanking = data.data.pacientesDetails.map((paciente) => {
          if (paciente.image) {
            return {
              ...paciente,
              image: `data:image/jpeg;base64,${paciente.image}`
            }
          }
          return paciente
        })

        setRanking(updatedRanking)
      } catch (error) {
        console.error('Error in fetching ranking', error)
      }
    }
    fetchRanking()
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image ? (
        <Image alt="image" source={{ uri: item.image }} style={styles.itemImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPoints}>{item.focusPoints}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Text style={styles.title}>Ranking</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>Foto</Text>
          <Text style={styles.headerText}>Nome</Text>
          <Text style={styles.headerText}>Pontuação</Text>
        </View>
        <FlatList
          data={ranking}
          keyExtractor={(item) => item.name} // Pode usar um campo único, como ID, se houver
          renderItem={renderItem}
        />
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPoints: {
    fontSize: 16,
    color: '#888',
  },
})
