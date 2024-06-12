import React, { useState } from 'react'
import { View, TextInput } from 'react-native'

export default function DateInputComponent() {
  const [inputDate, setDate] = useState('')

  const handleDateChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '')

    if (numericText.length > 2 && numericText.length <= 4) {
      const formattedDate = `${numericText.slice(0, 2)}/${numericText.slice(2)}`
      setDate(formattedDate)
    } else if (numericText.length > 4) {
      const formattedDate = `${numericText.slice(0, 2)}/${numericText.slice(2, 4)}/${numericText.slice(4)}`
      setDate(formattedDate)
    } else {
      setDate(numericText)
    }
  }

  return (
    <View className="relative justify-center h-14 mb-3 pr-8 pl-8 w-full">
      <TextInput
        className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-4"
        placeholder="DD/MM/YYYY"
        keyboardType="numeric"
        maxLength={10} // Limitar a quantidade de caracteres
        value={inputDate}
        onChangeText={handleDateChange}
      />
    </View>
  )
}
