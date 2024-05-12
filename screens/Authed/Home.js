/* eslint-disable prettier/prettier */
import { React, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
  ScrollView,
  Pressable,
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
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'

const storage = new MMKV()

export default function Home() {
  const navigation = useNavigation()

  const details = storage.getString('user.nameUser')

  const FlatlistButtons = () => {
    const data = [
      { title: 'TDAH' },
      { title: 'Organização' },
      { title: 'Estudos' },
      { title: 'Ferramentas' },
    ]

    const renderItem = ({ item }) => (
      <View className="pb-5">
        <Pressable
          onPress={() => console.log('Clicou em ' + item.title)}
          className="bg-transparent rounded-full p-3 mx-2 px-5"
          style={{ borderWidth: 1, borderColor: 'white' }}
        >
          <Text style={{ fontFamily: 'Quicksand-Bold' }}>{item.title}</Text>
        </Pressable>
      </View>
    )

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(item) => item.title}
        showsHorizontalScrollIndicator={false}
        className="mx-5"
      />
    )
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="justify-start flex-1"
      >
        <View className="w-full h-screen p-3">
          <View className="w-full h-40 top-5 flex flex-row justify-between">
            <View>
              <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 24 }}>
                Seja bem vindo !
              </Text>
              <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 42 }}>
                {details}
              </Text>
            </View>
            <View className=" rounded-full w-10 h-10 items-center justify-center"
            onPress={()=> navigation.navigate("Chats")}>
              <Ionicons name="chatbubble-outline" size={32} color="black" />
            </View>
          </View>

          <View className="w-full rounded-full">
            <ScrollView showsVerticalScrollIndicator={false} >
              <View >

                <View className="flex-1">
                  <FlatlistButtons />
                </View>

                <View className="bg-orange-500 w-full rounded-lg ">
                  <View className="justify-between flex-row">
                    <View className="justify-center p-5">
                      <Text
                        style={{ fontFamily: 'Quicksand-Bold', fontSize: 24 }}
                      >
                        Especialistas
                      </Text>
                      <Text
                        style={{ fontFamily: 'Quicksand-Bold', fontSize: 24 }}
                      >
                        Disponíveis
                      </Text>
                      <View className="w-36 h-14 pt-5">
                        <Pressable className="bg-white rounded-full items-center justify-center h-9" 
                        onPress={()=> navigation.navigate("Profissionals")}>
                          <Text>Ver</Text>
                        </Pressable>
                      </View>
                    </View>
                    <View>
                      <Image
                        alt="specialist"
                        source={require('../../assets/Specialis.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>

            </ScrollView>

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
