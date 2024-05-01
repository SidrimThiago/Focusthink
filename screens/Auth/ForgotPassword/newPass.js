import { LinearGradient } from 'expo-linear-gradient'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  Alert,
  TextInput,
} from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import ButtonComponent from '../../../components/button'
import { useState } from 'react'
import LottieView from 'lottie-react-native'
import { Entypo } from '@expo/vector-icons'
import ReturnButton from '../../../components/returnbutton'

export default function NewPass() {
  const navigation = useNavigation()

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(true)

  const handleVerifyClick = () => {
    if (password === newPassword) {
      setModalVisible(true)
    } else {
      Alert.alert('Erro', 'As senhas não coincidem.')
    }
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-full flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        className="w-full h-screen flex-1 "
        style={styles.background}
      >
        <View className="w-full mt-10 pt-8 pl-7">
          <ReturnButton onPress={() => navigation.navigate('ConfirmEmail')} />

          <Image
            alt="image"
            style={styles.tinyLogo}
            className="justify-end"
            resizeMode="contain"
            source={require('../../../assets/icon.png')}
          />
        </View>

        <View
          name="body"
          className="w-full h-full mb-10 items-center justify-around"
        >
          <View
            name="inputs"
            className="relative justify-center h-14 mb-3 pr-5 pl-5 w-full"
            style={{ alignItems: 'center' }}
          >
            <Text
              style={styles.quicksand}
              className="mb-4 text-white text-2xl text-center"
            >
              <Text className="font-bold">Alterar senha</Text>
            </Text>
            <Text
              style={styles.semiQuicksand}
              className="mb-1 text-white text-base"
            >
              Crie e confirme uma nova senha
            </Text>
            <Text
              style={styles.semiQuicksand}
              className="mb-4 text-white text-base text-center"
            >
              para sua conta
            </Text>

            <View className="relative justify-center h-14 mb-5 px-5 w-full">
              <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Nova senha"
                secureTextEntry={visiblePassword}
                className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
              />

              {visiblePassword ? (
                <Entypo
                  onPress={() => setVisiblePassword(false)}
                  style={{
                    position: 'absolute',
                    right: 40,
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

            <View className="relative justify-center h-14 mb-5 px-5 w-full">
              <TextInput
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
                placeholder="Confirme a nova senha"
                secureTextEntry={visiblePassword}
                className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
              />

              {visiblePassword ? (
                <Entypo
                  onPress={() => setVisiblePassword(false)}
                  style={{
                    position: 'absolute',
                    right: 40,
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
          </View>

          <View
            className="text-center items-center w-full px-8 justify-between pb-10"
            name="bottoms"
          >
            <ButtonComponent title="Finalizar" onPress={handleVerifyClick} />
          </View>
        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
          <View style={styles.modalContent}>
            <LottieView
              style={styles.animation}
              source={require('../../../assets/okay.json')}
              resizeMode="contain"
              autoPlay
              speed={0.5}
              className="pt-10"
            ></LottieView>
            <Text style={styles.modalText1} className="mt-28">
              Sucesso!
            </Text>
            <Text style={styles.modalText}>Sua senha foi alterada</Text>
            <Text className="mb-5" style={styles.modalText}>
              com sucesso
            </Text>
            <ButtonComponent
              title="Retornar"
              onPress={() => navigation.navigate('login')}
            />
          </View>
        </Modal>
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
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 15,
    right: 22,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
  },
  modalText1: {
    marginBottom: 10,
    fontSize: 35,
    fontFamily: 'Quicksand-Bold',
  },
  animation: {
    justifyContent: 'center',
    marginBottom: 90,
  },
})
