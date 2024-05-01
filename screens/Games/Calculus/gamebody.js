import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calculus from './logic'

export default function Gamebody() {
  return (
    <SafeAreaView
      style={styles.container}
      className="w-full h-screen flex-1 justify-between"
    >
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        className="w-full h-ful flex-1 justify-between"
        style={styles.background}
      >
        <Calculus />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})