// Timer.js
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button, Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, FontAwesome5, Fontisto } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { MMKV } from 'react-native-mmkv'

const TopBarGames = ({ restart, duration, onTimerFinish }) => {
  const navigation = useNavigation()

  const [seconds, setSeconds] = useState(duration)
  const [modalVisible, setModalVisible] = useState(false)
  const [isModalOptions, setModalOptions] = useState(false)

  const storage = new MMKV()

  const optionsOpen = () => {
    setModalOptions(true)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1)
      } else {
        clearInterval(timer)
        setModalVisible(true)
        onTimerFinish()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds, duration, onTimerFinish])

  // Função para formatar segundos em minutos e segundos
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`
  }

  return (
      <View style={{ position: 'absolute', top: 0, marginTop: StatusBar.currentHeight, flexDirection: 'row', width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 2 }}>
        <Pressable
          onPress={optionsOpen}
          style={{ width: 45, height: 45, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
          <Fontisto name="pause" size={30} color="black" />
        </Pressable>

        <Text style={styles.timerText}>{formatarTempo(seconds)}</Text>

        <Modal
          isVisible={isModalOptions}
          className="self-center absolute h-full"
          animationIn={'fadeInDown'}
          animationInTiming={400}
          animationOut={'fadeOutUp'}
          animationOutTiming={400}
          backdropOpacity={0.5}
        >
          <View style={styles.menu}>
            <Pressable
              onPress={() => navigation.navigate('Countdown', { jogo: restart })}
              style={styles.options}
            >
              <FontAwesome name="undo" size={65} color="black" />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('NavBar', { screen: 'Jogos' })}
              style={[styles.options, { paddingBottom: 4 }]}
            >
              <FontAwesome5 name="home" size={65} color="black" />
            </Pressable>

            <Pressable
              onPress={() => setModalOptions(false)}
              style={[styles.options, { paddingLeft: 10 }]}
            >
              <FontAwesome5 name="play" size={60} color="black" />
            </Pressable>
          </View>
        </Modal>

      <Modal
        isVisible={modalVisible}
        animationIn={'fadeInDown'}
        animationInTiming={400}
        animationOut={'fadeOutUp'}
        animationOutTiming={400}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tempo esgotado!</Text>
            <Button
              title="Fechar"
              onPress={() => {
                setModalVisible(false)
                onTimerFinish()
                navigation.navigate('StroopInfo')
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 385,
    height: 140,
    marginBottom: 50,
    paddingHorizontal: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(126, 100, 190, 0.8)',
    zIndex: 3,
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 130,
    backgroundColor: 'rgb(235 225 235)',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  timerText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: '#FD8409',
    alignSelf: 'center',
    position: 'absolute',
    right: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
})

export default TopBarGames
