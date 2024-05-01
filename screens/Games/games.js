import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import CalendarPicker from 'react-native-calendar-picker'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View>
          <Pressable onPress={() => navigation.navigate('MemoryGame')}>
            <View>
              <View style={styles.circle}></View>
              <Text className="text-white text-xl self-center">Memória</Text>
            </View>
          </Pressable>

          <View>
            <View style={styles.circle}></View>
            <Text className="text-white text-xl self-center">Cálculo</Text>
          </View>

          <Pressable onPress={() => navigation.navigate('2048')}>
            <View style={styles.circle}></View>
            <Text className="text-white text-xl self-center">Concentração</Text>
          </Pressable>

          <View>
            <View style={styles.circle}></View>
            <Text className="text-white text-xl self-center">
              Quebra-Cabeça
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    paddingHorizontal: 18,
    color: '#fff',
    backgroundColor: '#4CAF50',
  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    paddingHorizontal: 18,
    color: '#fff',
  },
})
