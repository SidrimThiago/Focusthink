import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { VictoryPie } from 'victory-native'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import { API_URL } from '../../.env/config'
import { LinearGradient } from 'expo-linear-gradient'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'

const storage = new MMKV()

export default function Desempenho() {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  const nomeUser = storage.getString('user.nameUser')

  const loadDetails = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(`${API_URL}/UserDetails`, { nomeUser })
      const { status, data } = response.data

      if (status === 'ok') {
        setDetails(data)
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDetails()
  }, [])

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#6B38A7', '#590DB0']}
          style={styles.background}
        >
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      </SafeAreaView>
    )
  }

  const sampleData = [
    { x: '.', y: details.focusPoints * 0.2 },
    { x: '.', y: details.focusPoints * 0.01 },
    { x: '.', y: details.focusPoints * 0.4 },
    { x: '.', y: details.focusPoints * 0.01 },
    { x: '.', y: details.focusPoints * 0.3 },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#6B38A7', '#590DB0']} style={styles.background}>
        {details ? (
          <>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                width: '93%',
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderWidth: 3,
                    borderColor: 'black',
                    borderRadius: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Quicksand-Regular',
                      fontSize: 24,
                      marginBottom: 5,
                    }}
                  >
                    {details.focusPoints}
                    <Text
                      style={{ fontFamily: 'Quicksand-Regular', fontSize: 10 }}
                    >
                      FP
                    </Text>
                  </Text>
                </View>
                <View style={{ marginRight: 10 }}>
                  <Text
                    style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 20 }}
                  >
                    Desempenho Geral
                  </Text>
                  <Text
                    style={{ fontFamily: 'Quicksand-Regular', fontSize: 15 }}
                  >
                    Essa é a sua pontuação total{'\n'}de FocusPoints
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '95%',
                  height: 1,
                  backgroundColor: '#A3A3A3',
                  alignSelf: 'center',
                  marginVertical: 10,
                  marginTop: 15,
                }}
              />
              <View style={{ alignSelf: 'flex-end' }}>
                <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 12 }}>
                  O que são FocusPoins?
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 200,
                transform: [{ scale: 0.7 }],
              }}
            >
              <View style={{ transform: [{ scale: 1.2 }] }}>
                <VictoryPie
                  padAngle={3}
                  innerRadius={100}
                  colorScale={[
                    '#70FF00',
                    '#633CFF',
                    '#FF00D6',
                    '#FF9C28',
                    '#F61919',
                  ]}
                  data={sampleData}
                />
              </View>
            </View>

            <View style={{ width: '93%' }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}
                >
                  <View
                    style={[styles.habilits, { backgroundColor: '#633BFF' }]}
                  >
                    <Text style={[styles.habilitsLabel, { color: 'white' }]}>
                      Linguagem
                    </Text>
                    <View style={styles.bar} />
                    <Text style={styles.habilitsValue}>20</Text>
                  </View>
                  <View
                    style={[styles.habilits, { backgroundColor: '#FF9C28' }]}
                  >
                    <Text style={styles.habilitsLabel}>Memória</Text>
                    <View style={styles.bar} />
                    <Text style={styles.habilitsValue}>20</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}
                >
                  <View
                    style={[styles.habilits, { backgroundColor: '#FF00D6' }]}
                  >
                    <Text style={styles.habilitsLabel}>Racíocinio</Text>
                    <View style={styles.bar} />
                    <Text style={styles.habilitsValue}>
                      {parseInt((details.focusPoints - 40) * 0.42)}
                    </Text>
                  </View>
                  <View
                    style={[styles.habilits, { backgroundColor: '#F61919' }]}
                  >
                    <Text style={styles.habilitsLabel}>Foco</Text>
                    <View style={styles.bar} />
                    <Text style={styles.habilitsValue}>
                      {parseInt((details.focusPoints - 40) * 0.24)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  width: '63%',
                  alignSelf: 'center',
                  paddingTop: 0,
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  top: -1,
                }}
              >
                <View
                  style={[
                    styles.habilits,
                    { backgroundColor: '#70FF00', width: '100%' },
                  ]}
                >
                  <Text style={styles.habilitsLabel}>Coordenação</Text>
                  <View style={styles.bar} />
                  <Text style={styles.habilitsValue}>
                    {parseInt((details.focusPoints - 40) * 0.34)}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 35,
  },
  habilits: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  habilitsLabel: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: '#1A1A1A',
    width: '63%',
  },
  habilitsValue: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  bar: {
    borderWidth: 1,
    borderColor: 'white',
    height: 35,
    marginRight: 10,
  },
})
