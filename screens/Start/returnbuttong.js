import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ReturnButtonG = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => navigation.navigate('GamesTest')}
      >
        <Image
          alt="image"
          resizeMode="contain"
          source={require('../../assets/returncadastrobutton.png')}
          style={{ opacity: 0.5 }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    top: 72,
    left: 30,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
})

export default ReturnButtonG
