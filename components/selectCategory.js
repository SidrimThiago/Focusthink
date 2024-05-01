import { React, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { key: '0', value: 'Sem categoria' },
    { key: '1', value: 'Trabalhos' },
    { key: '2', value: 'Pessoal' },
    { key: '3', value: 'Lista de desejos' },
    { key: '4', value: 'Estudos' },
    { key: '5', value: 'Aniversários' },
  ]

  return (
    <View className="relative justify-center pr-8 pl-8 mb-3 w-full text-gray-500 text-lg">
      <SelectList
        setSelected={(val) => setSelectedCategory(val)}
        data={categories}
        value={selectedCategory}
        save="value"
        search={false}
        placeholder="Categoria"
        maxHeight={110}
        arrowicon={
          <MaterialIcons
            style={{ position: 'absolute', top: 10, right: 12 }}
            name="keyboard-arrow-down"
            size={35}
            color="#707070"
          />
        }
        boxStyles={{
          backgroundColor: 'white',
          height: 56,
          alignItems: 'center',
          borderRadius: 15,
          borderColor: 'white',
        }}
        dropdownStyles={{ backgroundColor: 'white' }}
        inputStyles={{ fontSize: 18, marginLeft: -7 }}
        dropdownTextStyles={{ fontSize: 17 }}
      />
    </View>
  )
}
