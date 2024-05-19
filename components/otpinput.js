/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default function OtpComponent() {
  const [pins, setPins] = useState({
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
    pin5: '',
  })
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [pin3, setPin3] = useState('')
  const [pin4, setPin4] = useState('')
  const [pin5, setPin5] = useState('')

  const pin1Ref = useRef(null)
  const pin2Ref = useRef(null)
  const pin3Ref = useRef(null)
  const pin4Ref = useRef(null)
  const pin5Ref = useRef(null)

  useEffect(() => {
    pin1Ref.current.focus()
  }, [])
  const handlePinChange = (pin, setPin, nextRef, prevRef) => {
    setPin(pin)
    if (pin === '' && prevRef) {
      prevRef.current.focus()
    } else if (nextRef) {
      nextRef.current.focus()
    }
  }

  return (
    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
      <TextInput
        ref={pin1Ref}
        value={pin1}
        onChangeText={(pin) => handlePinChange(pin, setPin1, pin2Ref, null)}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.input, { marginRight: 10 }]}
      />

      <TextInput
        ref={pin2Ref}
        value={pin2}
        onChangeText={(pin) => handlePinChange(pin, setPin2, pin3Ref, pin1Ref)}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.input, { marginRight: 10 }]}
      />

      <TextInput
        ref={pin3Ref}
        value={pin3}
        onChangeText={(pin) => handlePinChange(pin, setPin3, pin4Ref, pin2Ref)}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.input, { marginRight: 10 }]}
      />

      <TextInput
        ref={pin4Ref}
        value={pin4}
        onChangeText={(pin) => handlePinChange(pin, setPin4, pin5Ref, pin3Ref)}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.input, { marginRight: 10 }]}
      />

      <TextInput
        ref={pin5Ref}
        value={pin5}
        onChangeText={(pin) => handlePinChange(pin, setPin5, null, pin4Ref)}
        maxLength={1}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(75,69,69,0.6)',
    opacity: 1,
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 20,
    borderRadius: 7.5,
    height: 60,
    width: '16%',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
})
