import { useNavigation, useRoute } from '@react-navigation/native'
import ResendTimer from '../../../components/ResendTimer'
import React from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import OtpComponent from '../../../components/otpinput'
import ButtonComponent from '../../../components/button'
import ReturnButton from '../../../components/returnbutton'

export default function ConfirmSMS() {
  const route = useRoute()
  const { SMS } = route.params || {}

  const navigation = useNavigation()

  const handleResendClick = () => {
    // Lógica para reenviar o token
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-full flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        className="w-full h-screen flex-1 "
        style={styles.background}
      >
        <ReturnButton onPress={() => navigation.navigate('NewPassSMS')} />

        <Image
          alt="image"
          style={styles.tinyLogo}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/icon.png')}
        />

        <View>
          <View class="text">
            <Text className="font-quick-bold mb-4 text-white text-2xl text-center">
              Verificação
            </Text>
            <Text className="mb-1 text-white text-base font-quick-regular text-center">
              Por favor, informe o token de verificação
            </Text>
            <Text className="mb-4 text-white text-base text-center font-quick-bold ">
              <Text className="font-quick-regular">para </Text>
              <Text classname="font-quick-bold">{SMS}</Text>
            </Text>

            <View class="OTPinput" className="text-center items-center">
              <OtpComponent />
            </View>
          </View>

          <View className="text-center items-center justify-center flex-col mt-4">
            <Text className="text-sm text-white font-quick-bold">
              Não recebeu o token ?
            </Text>
            <Text
              className="text-sm text-white text-center"
              style={styles.regularQuicksand}
            >
              Reenviar em
            </Text>
            <ResendTimer onResendClick={handleResendClick} />
          </View>
        </View>

        <View className="text-center items-center w-full px-8" class="bottoms">
          <ButtonComponent
            title="Verificar"
            onPress={() => navigation.navigate('NewPass')}
          />
          <Text
            style={styles.quicksand}
            onPress={() => navigation.navigate('NewPassEmail')}
            className="underline text-white mt-3"
          >
            Usar o email em vez disso
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
  },
  semiQuicksand: {
    fontFamily: 'Quicksand-Medium',
  },
  regularQuicksand: {
    fontFamily: 'Quicksand-Regular',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
  },
  textInputStyle: {
    borderRadius: 10,
    borderWidth: 1,
    color: 'white',
    backgroundColor: '#4B4545',
  },
  input: {
    backgroundColor: '#f5f5f5',
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 20,
    height: 55,
    width: '15%',
    borderWidth: 0.5,
    borderColor: 'gray',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
})
