import { React, useState } from 'react'
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const storage = new MMKV()

export default function ChatBot() {
  const navigation = useNavigation()
  const UserDetails = storage.getString('user.nameUser')
  const focusbot = 'Focusbot'
  const apiKey = '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'
  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  const [data, setData] = useState([])
  const [userInput, setUserInput] = useState('')

  const HandlerSend = async () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
        top_p: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })

    const BotRespost = data
    setData([
      ...data,
      { type: `${UserDetails}`, text: userInput },
      { type: `${focusbot}`, text: BotRespost },
    ])
    setUserInput('')
  }
  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="justify-between flex-1 h-full"
      >
        <View className=" justify-start items-center flex-row pt-10">
          <Image
            className="rounded-full w-10 h-10 mx-5"
            alt="image"
            source={require('../assets/memory/death.png')}
          />

          <Text
            className=""
            style={{ fontSize: 16, fontFamily: 'Quicksand-Bold' }}
          >
            {UserDetails}
          </Text>
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
              onPress={HandlerSend}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})
