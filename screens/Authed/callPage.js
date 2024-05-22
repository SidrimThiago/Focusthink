import React from 'react'
import { View } from 'react-native'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export default function CallPage(props) {
  const nomeUser = storage.getString('user.nameUser')
  const id = props.route.params.id
  const AppId = '849954854'
  const AppSign =
    '14ae7264aff17eac1c71d0920f2c8ffa472ba25a9d1e09001853353d0ef5b98d'

  return (
    <View className="h-screen w-full justify-center items-center flex-1"></View>
  )
}
