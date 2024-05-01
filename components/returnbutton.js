import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ReturnButton({ onPress }) {
  const navigation = useNavigation()

  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={onPress}
      >
        <Image
          alt="image"
          resizeMode="contain"
          source={require('../assets/returncadastrobutton.png')}
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
})



