import React from 'react'
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn'
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
    <View className="h-screen w-full justify-center items-center flex-1">
      <ZegoUIKitPrebuiltCall
        appID={AppId}
        appSign={AppSign}
        userID={nomeUser}
        userName={nomeUser}
        callID={id}
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            props.navigation.navigate('especifedChat')
          },
          onHangUp: () => {
            props.navigation.navigate('especifedChat')
          },
        }}
      />
    </View>
  )
}
