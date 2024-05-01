import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import ButtonComponent from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import OnBoarding from '../../components/Flatlist/onBoarding'

export default function GamesTest() {
  const navigation = useNavigation()

  useEffect(() => {
    const handleHardwareBackPress = () => {
      // Impede o usuário de retornar à tela anterior
      return true
    }

    return () => {
      const a = '1'
    }
  }, [navigation])

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Ajuste a duração conforme necessário
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <SafeAreaView style={styles.container} className="w-full h-full flex-1 ">
      <View style={styles.backgroundColor} className="w-full h-full"></View>
      <Animated.View
        style={{
          ...styles.container,
          opacity: fadeAnim,
        }}
      >
        <View style={styles.backgroundColor} className="w-full h-full"></View>
        <View></View>

        <OnBoarding />

        <Text style={styles.quicksandRegular} className="text-white mt-5">
          Deseja realizar um jogo teste?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('GameOptions')}
          style={styles.buttonColor}
          className="w-80 h-16 justify-center rounded-3xl my-3"
        >
          <Text
            className="text-slate-800 self-center text-base"
            style={styles.quicksand}
          >
            Sim, realizar jogo teste
          </Text>
        </TouchableOpacity>
        <Text
          className="text-white self-center text-base mt-2 "
          style={styles.quicksand}
          onPress={() => navigation.navigate('SplashScreen')}
        >
          Não, talvez mais tarde
        </Text>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
  },
  quicksandSemiBold: {
    fontFamily: 'Quicksand-SemiBold',
  },
  quicksandMedium: {
    fontFamily: 'Quicksand-Medium',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%',
  },
  background: {
    flex: 1,
    width: 245,
    maxHeight: 235,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 300,
  },
  backgroundColor: {
    backgroundColor: 'rgba(114, 49, 219, 0.2)',
    position: 'absolute',
  },
  tinyLogo: {
    width: 140,
    height: 140,
  },
  buttonColor: {
    backgroundColor: '#FF7A00',
  },
  swiperContainer: {
    maxHeight: 570,
  },
})
