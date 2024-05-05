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
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import ButtonComponent from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { Formik } from 'formik'
import auth from '@react-native-firebase/auth'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
const storage = new MMKV()

export default function Start() {
  const [password, onChangePassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [visiblePassword, setVisiblePassword] = useState(true)
  const navigation = useNavigation()

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        // não sei oq fazer
      }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Email obrigatório'
        } else if (!isValidEmail(values.email)) {
          errors.email = 'Email inválido'
        }
        if (!values.password) {
          errors.password = 'Senha obrigatória'
        } else if (values.password.length < 6) {
          errors.password = 'A senha deve conter pelo menos 6 caracteres'
        }
        return errors
      }}
    >
      {({ handleChange, handleBlur, values, errors }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={styles.container}
            className="w-full h-full flex-1 justify-between"
          >
            <LinearGradient
              colors={['#633DE8', '#1C233F']}
              className="w-full h-screen flex-1 justify-between"
              style={styles.background}
            >
              <Image
                alt="image"
                style={styles.tinyLogo}
                className="w-full mt-20"
                resizeMode="contain"
                source={require('../../assets/first.png')}
              />

              <View
                name="inputs"
                className="w-full mb-4"
                style={{ alignItems: 'center' }}
              >
                <Text className="mb-4 text-white text-2xl">
                  Resolva seus <Text className="font-bold">problemas</Text>
                </Text>

                <View className="relative justify-center h-14 mb-3 px-8 w-full">
                  <TextInput
                    keyboardType="email-address"
                    style={[
                      styles.input,
                      errors.email && { borderColor: 'red', borderWidth: 3 },
                    ]}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Email"
                    className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
                  />
                  <MaterialIcons
                    style={{
                      position: 'absolute',
                      right: 50,
                      zIndex: 2,
                      width: 24,
                      height: 24,
                    }}
                    name="email"
                    size={24}
                    color="#707070"
                  />
                </View>
                {errors.email && (
                  <Text
                    style={{
                      color: 'red',
                      marginBottom: 10,
                      textAlign: 'right',
                    }}
                  >
                    {errors.email}
                  </Text>
                )}
                <View className="relative justify-center h-14 mb-1 px-5 w-full pr-8 pl-8">
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('password')(text)
                      onChangePassword(text)
                    }}
                    value={values.password}
                    placeholder="Senha"
                    secureTextEntry={visiblePassword}
                    className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
                  />
                  {visiblePassword ? (
                    <Entypo
                      onPress={() => setVisiblePassword(false)}
                      style={{
                        position: 'absolute',
                        right: 50,
                        zIndex: 2,
                        width: 24,
                        height: 24,
                      }}
                      name="eye"
                      size={24}
                      color="#707070"
                    />
                  ) : (
                    <Entypo
                      onPress={() => setVisiblePassword(true)}
                      style={{
                        position: 'absolute',
                        right: 40,
                        zIndex: 2,
                        width: 24,
                        height: 24,
                      }}
                      name="eye-with-line"
                      size={24}
                      color="#707070"
                    />
                  )}
                </View>

                <View className="w-80">
                  <Pressable
                    onPress={() => navigation.navigate('NewPassEmail')}
                  >
                    <Text
                      style={styles.quicksand}
                      className="w-full text-right text-sm underline  text-white mb-1 ml-3"
                    >
                      Esqueci minha senha
                    </Text>
                  </Pressable>
                </View>

                <Text className=" mb-5 text-white">ou</Text>
                <View
                  className="w-full px-5 pr-8 pl-8"
                  style={{ marginBottom: '10' }}
                >
                  <TouchableOpacity className=" border-white w-full border rounded-full flex-row items-center justify-center p-3 mb-3 py-5">
                    <Image
                      alt="image"
                      className="px-1 mr-4 absolute left-5"
                      source={require('../../assets/GoogleIcon.png')}
                    />
                    <Text className="text-white ml-3 text-base">
                      Continuar com o Google
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="border-white border w-full rounded-full items-center justify-center flex-row mb-3 py-5">
                    <Image
                      alt="image"
                      className="px-1 mr-5 absolute left-5"
                      source={require('../../assets/facebookIcon.png')}
                    ></Image>
                    <Text className="text-white ml-4 text-base">
                      Continuar com o Facebook
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="text-center justify-center items-center w-full px-8 mt-8">
                  <ButtonComponent
                    title="Entrar"
                    onPress={() => {
                      const handleLogin = async () => {
                        const userData = {
                          email: values.email,
                          password: values.password,
                        }

                        await console.log(values.email, values.password)

                        axios
                          .post(
                            'https://3dce-138-204-129-254.ngrok-free.app/AuthLogin',
                            userData,
                          )
                          .then((res) => {
                            console.log(res.data)
                            const { status, data } = res.data
                            if (status === 'ok') {
                              const user = {
                                userName: data.userName,
                                token: data.token,
                              }
                              storage.set('user.nameUser', user.userName)
                              storage.set('user.token', user.token)
                              navigation.navigate('NavBar')
                            }
                          })
                          .catch((error) => {
                            console.error('Erro durante a requisição:', error)
                          })
                      }

                      handleLogin()
                    }}
                  />

                  <Text
                    style={styles.quicksand}
                    onPress={() => navigation.navigate('Cadastro')}
                    className="underline text-white mt-3 text-base"
                  >
                    Cadastrar-se
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    textAlignVertical: 'center',
  },
  tinyLogo: {
    width: 175,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 15,
  },
})
