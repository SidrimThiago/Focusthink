import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import ButtonComponent from '../../../components/button'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import ReturnButton from '../../../components/returnbutton'
import { TextInputMask } from 'react-native-masked-text'

export default function NewPassSMS() {
  const [SMS, setSMS] = useState('')
  const [SMSValid, setSMSValid] = useState(true)

  const navigation = useNavigation()

  const send = () => {
    if (SMS === '') {
      setSMSValid(true)
    } else {
      navigation.navigate('ConfirmSMS', { SMS })
    }
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-full flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        className="w-full h-screen flex-1 "
        style={styles.background}
      >
        <ReturnButton onPress={() => navigation.navigate('login')} />

        <Image
          alt="image"
          style={styles.tinyLogo}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/icon.png')}
        />

        <View className="w-full pb-52">
          <Text
            style={styles.quicksand}
            className="mb-10 text-white text-2xl text-center"
          >
            <Text className="font-bold">Verificação</Text>
          </Text>
          <Text
            style={styles.semiQuicksand}
            className="mb-1 text-white text-sm text-center"
          >
            Enviaremos um token de verificação para seu{' '}
            <Text style={styles.quicksand}>número</Text>
          </Text>

          <View
            name="inputs"
            className="relative justify-center h-14 mb-3 pr-5 pl-5 w-full"
          >
            <TextInputMask
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: 'true',
                dddMask: '(99) ',
              }}
              style={[styles.input, SMSValid ? {} : { borderColor: 'red' }]}
              onChangeText={(text) => {
                setSMS(text)
                setSMSValid(true)
              }}
              value={SMS}
              placeholder="Número de telefone"
              className="bg-white w-full h-full rounded-2xl border border-white p-2 mt-5 text-lg pl-4"
            />
            <MaterialIcons
              name="email"
              size={24}
              color="#707070"
              style={{
                position: 'absolute',
                right: 40,
                top: 26,
                zIndex: 2,
                width: 24,
                height: 24,
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent title="Enviar" onPress={send} disabled={!SMSValid} />
          <Text
            style={styles.quicksand}
            onPress={() => navigation.navigate('NewPassEmail')}
            className="underline text-white mt-3 text-center pb-3"
          >
            Tente de outra maneira
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
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
