/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { React, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ButtonComponent from '../../../components/button'
import { CheckBox } from '@rneui/themed'
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import ReturnButton from '../../../components/returnbutton'
import DateInputComponent from '../../../components/datepicker'
import InsetShadow from 'react-native-inset-shadow'
import { TextInputMask } from 'react-native-masked-text'

export default function ProfissionalCadastro() {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('Profissional')
  const [genero, setGenero] = useState('')
  const [endereco, setEndereco] = useState('')
  const [especialidade, setEspecialidade] = useState('')
  const [codigo, setcodigo] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [tokenVerify, setTokenVerify] = useState('')
  const [focuspoints, setFocuspoint] = useState(0)
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visiblePassword, setVisiblePassword] = useState(true)
  const [termoscondicoes, setTermosCondicoes] = useState(false)
  const [notificacao, setNotificacao] = useState(false)

  const toggleCheckbox = () => setTermosCondicoes(!termoscondicoes)
  const toggleCheckbox2 = () => setNotificacao(!notificacao)

  const handleVerifyClick2 = () => {
    if (password === confirmPassword) {
      const newProfissional = {
        tipo,
        nome,
        genero,
        endereco,
        email,
        telefone,
        password,
        codigo,
        focuspoints,
        tokenVerify,
        especialidade,
      }
      
      console.log('Usuário :', newProfissional)
      navigation.navigate('ProfileCreate', { newProfissional })
    } else {
      Alert.alert('Erro', 'Senha inválida')
    }
  }

  const navigation = useNavigation()

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleVerifyClick = () => {
    setModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="flex-1"
      >
        <ReturnButton onPress={() => navigation.navigate('login')} />

        <Image
          alt="image"
          style={styles.tinyLogo}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/icon.png')}
        />

        <Text
          style={styles.quicksand}
          className="font-quick-bold text-white text-3xl mt-16"
        >
          Informações
        </Text>

        <View className="flex-row-reverse mb-5">
          <TouchableOpacity className="bg-white w-40 h-16 border-4 border-orange-500 rounded-xl ml-3">
            <InsetShadow>
              <Text
                className="text-lg shadow-lg self-center mt-3"
                style={styles.quicksandMedium}
              >
                Profissional
              </Text>
            </InsetShadow>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastro')}
            className="bg-gray-500 w-40 h-16 rounded-xl mr-3"
          >
            <Text
              className="text-lg shadow-lg self-center mt-4"
              style={styles.quicksandMedium}
            >
              Paciente
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white text-base ml-9 self-start">Nome</Text>
        <View className="relative justify-center h-14 mb-3 pr-8 pl-8 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome completo"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
          />
          <FontAwesome5
            style={{
              position: 'absolute',
              right: 50,
              zIndex: 2,
              width: 24,
              height: 24,
            }}
            name="user"
            size={24}
            color="#707070"
          />
        </View>

        <Text className="text-white text-base ml-9 self-start">
          Data de nascimento
        </Text>
        <DateInputComponent />

        <Text className="text-white text-base ml-9 self-start">Gênero</Text>
        <View className="relative justify-center h-14 mb-3 pr-8 pl-8 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setGenero}
            value={genero}
            placeholder="Gênero"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
          />
          <FontAwesome5
            style={{
              position: 'absolute',
              right: 50,
              zIndex: 2,
              width: 24,
              height: 32,
            }}
            name="genderless"
            size={34}
            color="#707070"
          />
        </View>

        <Text className="text-white text-base ml-9 self-start">
          Endereço para consulta
        </Text>
        <View className="relative justify-center h-14 mb-3 pr-8 pl-8 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setEndereco}
            value={endereco}
            placeholder="Endereço"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
          />
          <FontAwesome5
            style={{
              position: 'absolute',
              right: 50,
              zIndex: 2,
              width: 24,
              height: 24,
            }}
            name="map-marker-alt"
            size={24}
            color="#707070"
          />
        </View>

        <Text className="text-white text-base ml-9 self-start">
          Especialidade
        </Text>
        <View className="relative justify-center h-14 mb-3 pr-8 pl-8 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setEspecialidade}
            value={especialidade}
            placeholder="Especialidade"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
          />
        </View>

        <Text className="text-white text-base ml-9 self-start">
          Código de CRP/CRM
        </Text>
        <View className="relative justify-center h-14 mb-3 pr-8 pl-8 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setcodigo}
            value={codigo}
            placeholder="Código"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
          />
        </View>
        <View className="text-center justify-center items-center w-full px-10 bottom-1 mt-7">
          <ButtonComponent title="Continuar" onPress={handleVerifyClick} />

          <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
            <SafeAreaView style={styles.modalContainer}>
              <LinearGradient
                colors={['#633DE8', '#1C233F']}
                style={styles.modalContainer}
                className="w-screen h-screen"
              >
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={closeModal}
                  >
                    <Image
                      alt="image"
                      resizeMode="contain"
                      source={require('../../../assets/returncadastrobutton.png')}
                    />
                  </TouchableOpacity>
                </View>

                <Image
                  alt="image"
                  style={styles.tinyLogo}
                  className="justify-end"
                  resizeMode="contain"
                  source={require('../../../assets/icon.png')}
                />

                <Text
                  style={styles.quicksand}
                  className="font-quick-bold text-white text-3xl mt-32"
                >
                  Crie sua conta
                </Text>

                <Text className="text-white text-base ml-9 self-start">
                  E-mail
                </Text>
                <View className="relative justify-center h-14 mb-2 pr-5 pl-5 w-full">
                  <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    placeholder="Email"
                    className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
                  />
                  <MaterialIcons
                    style={{
                      position: 'absolute',
                      right: 40,
                      zIndex: 2,
                      width: 24,
                      height: 24,
                    }}
                    name="email"
                    size={24}
                    color="#707070"
                  />
                </View>

                <Text className="text-white text-base ml-9 self-start">
                  Telefone
                </Text>
                <View className="relative justify-center h-14 mb-2 pr-5 pl-5 w-full">
                  <TextInputMask
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: 'true',
                      dddMask: '(99) ',
                    }}
                    style={styles.input}
                    onChangeText={setTelefone}
                    keyboardType="numeric"
                    value={telefone}
                    placeholder="Telefone"
                    className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
                  />
                  <Feather
                    style={{
                      position: 'absolute',
                      right: 38,
                      zIndex: 2,
                      width: 26,
                      height: 26,
                    }}
                    name="phone"
                    size={26}
                    color="#707070"
                  />
                </View>

                <Text className="text-white text-base ml-9 self-start">
                  Criar senha
                </Text>
                <View className="relative justify-center h-14 mb-2 px-5 w-full">
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
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
                        right: 50,
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

                <Text className="text-white text-base ml-9 self-start">
                  Confirme sua senha
                </Text>
                <View className="relative justify-center h-14 mb-2 px-5 w-full">
                  <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    placeholder="Confirmar senha"
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
                        right: 50,
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

                <Text className="mb-2 text-white text-xs mt-4">
                  Para conhecer nossos
                  <Text className="font-bold">
                    {' '}
                    Termos de Uso e Política de {'\n'}Privacidade
                  </Text>
                  , você conhecerá nossas políticas e termos.
                </Text>

                <View className="flex-row">
                  <CheckBox
                    checked={termoscondicoes}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="gray"
                    containerStyle={{ backgroundColor: '', padding: 0 }}
                  />
                  <Text className="text-white text-xs self-center mr-14">
                    Eu li e concordo com os Termos e Condições
                  </Text>
                </View>

                <View className="flex-row mb-5">
                  <CheckBox
                    checked={notificacao}
                    onPress={toggleCheckbox2}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="gray"
                    containerStyle={{ backgroundColor: '', padding: 0 }}
                  />
                  <Text className="text-white text-xs self-center mr-5">
                    Por favor, envie-me notícias e ofertas da Focusthink
                  </Text>
                </View>

                <View className="w-full h-1 px-8">
                  <View className="bg-white w-full h-1/4"></View>
                </View>

                <View className="text-center justify-center items-center w-full px-10 bottom-1 mt-10">
                  <ButtonComponent
                    title="Continuar"
                    onPress={handleVerifyClick2}
                  />
                </View>
              </LinearGradient>
            </SafeAreaView>
          </Modal>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
    marginBottom: 30,
  },
  quicksandMedium: {
    fontFamily: 'Quicksand-SemiBold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 15,
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
    justifyContent: 'flex-start',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText1: {
    marginBottom: 10,
    fontSize: 35,
    fontFamily: 'Quicksand-Bold',
  },
  modal: {
    height: '100%',
  },
  button: {
    width: 20,
    height: 20,
    top: 72,
    left: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
  },
  touchableButton: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeButton: {
    justifyContent: 'center',
  },
})
