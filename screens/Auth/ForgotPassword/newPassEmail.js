import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ButtonComponent from '../../../components/button'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import ReturnButton from '../../../components/returnbutton'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'

export default function NewPassEmail() {
  const navigation = useNavigation()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
  })

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {
      if (!isValidEmail(values.email)) {
        alert('Email inválido')
        return
      }
      navigation.navigate('ConfirmEmail', { email: values.email })
    },
  })

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => {
            if (!isValidEmail(values.email)) {
              alert('Email inválido')
              return
            }
            navigation.navigate('ConfirmEmail', { email: values.email })
          }}
        >
          {({ errors }) => (
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
                <Text style={styles.quicksand}>Email</Text>
              </Text>
              <View
                name="inputs"
                className="relative justify-center h-14 mb-3 pr-5 pl-5 w-full"
              >
                <TextInput
                  style={[
                    styles.input,
                    formik.errors.email && {
                      borderColor: 'red',
                      borderWidth: 3,
                    },
                  ]}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                  className="bg-white w-full h-full rounded-2xl border border-white mt-5 p-2 text-lg pl-4"
                />
                {formik.errors.email && (
                  <Text style={{ color: 'red', marginBottom: 10 }}>
                    {formik.errors.email}
                  </Text>
                )}
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
              {errors.email && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                  {errors.email}
                </Text>
              )}
            </View>
          )}
        </Formik>
        <View style={styles.buttonContainer}>
          <ButtonComponent title="Enviar" onPress={formik.handleSubmit} />
          <Text
            style={styles.quicksand}
            onPress={() => navigation.navigate('NewPassSMS')}
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
