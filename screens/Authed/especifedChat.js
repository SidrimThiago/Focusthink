import { React, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ChatFrom() {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [userInput, setUserInput] = useState('')

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="justify-between flex-1 h-full"
      >
        <View className="w-full h-20 rounded-lg justify-between flex-row mb-10">
          <Image
            className="rounded-full w-16 h-16"
            alt="image"
            source={require('../assets/memory/death.png')}
          />
          <Text>Oxe</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="p-10 flex-col">
              <Text className="font-bold">{item.type}</Text>
              <Text className="">{item.text}</Text>
            </View>
          )}
        />
        <View className="flex flex-row bottom-0 pb-2 absolute w-full">
          <View
            className="relative justify-center h-14 mb-1 mr-2 ml-2"
            style={{ width: '81%' }}
          >
            <TextInput
              placeholder="Diga algo"
              style={{ backgroundColor: 'white' }}
              className="bg-white w-full h-full rounded-2xl border border-white p-2 text-lg pl-2"
              onChangeText={(text) => setUserInput(text)}
              value={userInput}
            />
          </View>
          <View>
            <TouchableOpacity
              className="bg-white w-14 h-14 rounded-full items-center justify-center"
              // onPress={HandlerSend}
            >
              <Ionicons name="send" size={20} color="#999"></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
    marginBottom: 30,
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
  },
  quicksandMedium: {
    fontFamily: 'Quicksand-SemiBold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
  },
  profileImage: {
    width: 190,
    height: 190,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
