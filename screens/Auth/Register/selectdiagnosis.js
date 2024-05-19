import { React, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function ButtonSelectDiagnosis() {
  const [selected, setSelected] = useState('')

  const data = [
    // { key: '1', value: 'Mobiles', disabled: true },
    { key: '1', value: 'Tipo desatento' },
    { key: '2', value: 'Tipo hiperativo/impulsivo' },
    { key: '3', value: 'Tipo combinado' },
    { key: '4', value: 'Não sou diagnósticado' },
  ]

  return (
    <View className="relative justify-center pr-8 pl-8 mb-3 w-full text-gray-500 text-lg">
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        value={selected}
        save="value"
        search={false}
        placeholder="Diagnóstico"
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
