import { StyleSheet, View, Text, Image, SafeAreaView, Pressable, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ReturnButtonG from './returnbuttong'

export default function GameOptions() {
  const navigation = useNavigation()

  const pushAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(pushAnimation, {
      toValue: 1,
      duration: 500, // ajuste a duração conforme necessário
      useNativeDriver: true,
    }).start()
  }, [pushAnimation])

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // Ajuste a duração conforme necessário
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <SafeAreaView style={styles.container} className="w-full flex-1">
      <View style={styles.backgroundColor} className="w-full h-full"></View>

      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: pushAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0], // ajuste a distância do push conforme necessário
                }),
              },
            ],
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.backgroundColor} className="w-full h-full"></View>
        <ReturnButtonG />
        <Image
          alt="image"
          style={styles.tinyLogo}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/VouApagar/gametesticon.png')}
        />

        <Text
          style={styles.quicksandMedium}
          className="text-white text-center text-xl mt-44 mb-7"
        >
          Qual tipo de jogo deseja testar?
        </Text>

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
          <Text className="text-white text-xl self-center">Quebra-Cabeça</Text>
        </View>
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
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    width: 70,
    height: 70,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
  },
  buttonColor: {
    backgroundColor: '#FF7A00',
  },
  circle: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderRadius: 200,
    margin: 10,
    marginBottom: 0,
    marginTop: 30,
  },
})
