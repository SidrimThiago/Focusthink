import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

const ProfileSelect = ({ title1, title2, onPress }) => {
  return (
    <View style={styles.buttonPrincipal} className="justify-center pl-10 pr-10">
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        className="w-1/2"
      >
        <Text className="text-white text-base" style={styles.quicksand}>
          {title1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        className="w-1/2"
      >
        <Text className="text-white text-base" style={styles.quicksand}>
          {title2}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    color: '#000',
    fontFamily: 'Quicksand-Bold',
  },
  buttonPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 4,
    marginHorizontal: 5,
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#FF5C00',
    alignItems: 'center',
  },
})

export default ProfileSelect
