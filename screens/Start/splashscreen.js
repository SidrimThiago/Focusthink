import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import ButtonComponent from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { Formik } from 'formik'

export default function SplashScreen() {
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
    <SafeAreaView
      style={styles.container}
      className="w-full h-full flex-1 justify-between"
    >
      <Animated.View
        style={{
          ...styles.container,
          opacity: fadeAnim,
        }}
      >
        <Pressable
          style={styles.container}
          className="w-full h-full absolute"
          onPress={() => navigation.navigate('login')}
        >
          <View style={styles.backgrouncColor} className="w-full h-full"></View>
          <LinearGradient
            colors={['#633DE8', '#1C233F']}
            className="flex-1 justify-between mb-10"
            style={styles.background}
          >
            <Image
              alt="image"
              style={styles.tinyLogo}
              className="justify-end"
              resizeMode="contain"
              source={require('../../assets/adaptative-icon.png')}
            />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  background: {
    flex: 1,
    width: 245,
    maxHeight: 235,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 300,
  },
  backgrouncColor: {
    backgroundColor: '#7231DB',
    position: 'absolute',
    opacity: 0.2,
  },
  tinyLogo: {
    width: 100,
  },
})
