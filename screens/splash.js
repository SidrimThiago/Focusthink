/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { MMKV } from 'react-native-mmkv'
import * as Font from 'expo-font'
import axios from 'axios'
const storage = new MMKV()

export default function Splash() {
  const navigation = useNavigation()

  const load = async () => {
    await Font.loadAsync({
      'Quicksand-Bold': require('../assets/Quicksand-Bold.ttf'),
      'Quicksand-Light': require('../assets/Quicksand-Light.ttf'),
      'Quicksand-Medium': require('../assets/Quicksand-Medium.ttf'),
      'Quicksand-Regular': require('../assets/Quicksand-Regular.ttf'),
      'Quicksand-SemiBold': require('../assets/Quicksand-SemiBold.ttf'),
    })

    const userData = {
      usertoken: storage.getString('user.token'),
      nomeUser: storage.getString('user.nameUser')
    }

    console.log(userData.usertoken)
    console.log(userData.nomeUser)

    axios
      .post('https://3dce-138-204-129-254.ngrok-free.app/ValidateUser', userData)
      
      .then((res) => {
        console.log(res.data)
        const { status } = res.data
        if (status === 'verified') {
         navigation.navigate('NavBar')
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Start' }],
            }),
          )
        }
      })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
