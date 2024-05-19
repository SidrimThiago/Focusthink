import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, View, Pressable, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Card from './cards'

export default function Gamebody() {
  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <View style={{ flex: 1, backgroundColor: '#57407C', width: '100%' }}  >
      <Pressable  style={{ position: 'absolute', top: 50, right: 5, width: 45, height: 45, zIndex: 1 }}>
                    <FontAwesome name="bars" size={45} color="black" />
                </Pressable>
        <Card />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'purple'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})