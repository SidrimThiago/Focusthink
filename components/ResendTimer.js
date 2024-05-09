import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

const ResendTimer = ({ onResendClick }) => {
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [isResendClickable, setResendClickable] = useState(false)

  const startTimer = () => {
    setTimeRemaining(60)
    setResendClickable(false)

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer)
          setResendClickable(true)
        }
        return prevTime - 1
      })
    }, 1000)
  }

  useEffect(() => {
    startTimer()
  }, [])

  useEffect(() => {
    if (timeRemaining === 0) {
      setResendClickable(true)
    }
  }, [timeRemaining])

  useEffect(() => {
    if (isResendClickable) {
      onResendClick()
    }
  }, [isResendClickable, onResendClick])

  return (
    <Text
      disabled={!isResendClickable}
      onPress={() => {
        if (isResendClickable) {
          startTimer()
        }
      }}
      style={
        isResendClickable
          ? {
              color: '#00bcd4',
              textDecorationLine: 'underline',
              fontFamily: 'Quicksand-Bold',
              alignItems: 'center',
            }
          : { color: 'gray', alignItems: 'center' }
      }
    >
      {isResendClickable ? 'Clique aqui' : `${timeRemaining}s`}
    </Text>
  )
}

export default ResendTimer
