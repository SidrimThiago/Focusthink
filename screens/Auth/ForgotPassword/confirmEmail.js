import { useNavigation, useRoute } from '@react-navigation/native'
import ResendTimer from '../../../components/ResendTimer'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import OtpComponent from '../../../components/otpinput'
import ButtonComponent from '../../../components/button'
import ReturnButton from '../../../components/returnbutton'

export default function ConfirmEmail() {
  const route = useRoute()
  const { email } = route.params || {}

  const navigation = useNavigation()

  const handleResendClick = () => {
    // Lógica para reenviar o token
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        className="w-full h-screen flex-1 "
        style={styles.background}
      >
        <View className="w-full h-screen flex-1" onPress={Keyboard.dismiss()}>
          <ReturnButton onPress={() => navigation.navigate('NewPassEmail')} />
          <Image
            alt="image"
            style={styles.tinyLogo}
            className="justify-end"
            resizeMode="contain"
            source={require('../../../assets/icon.png')}
          />

          <View className="mb-36 mt-24">
            <View class="text" className="items-center">
              <Text className="font-quick-bold mb-4 text-white text-2xl text-center">
                Verificação
              </Text>
              <Text className="mb-1 text-white text-base font-quick-bold">
                Por favor, informe o token de verificação
              </Text>
              <Text className="mb-4 text-white text-base text-center font-quick-regular">
                para <Text className="font-quick-bold">{email}</Text>
              </Text>

              <View class="OTPinput" className="text-center items-center">
                <OtpComponent keyboardType="numeric" />
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

          <View
            className="text-center items-center w-full mt-52 px-8"
            class="bottoms"
          >
            <ButtonComponent
              title="Verificar"
              onPress={() => navigation.navigate('NewPass')}
            />
            <Text
              style={styles.quicksand}
              onPress={() => navigation.navigate('NewPassSMS')}
              className="underline text-white mt-3"
            >
              Usar o número em vez disso
            </Text>
          </View>
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
    justifyContent: 'space-evenly',
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
