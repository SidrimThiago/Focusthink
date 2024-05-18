/* eslint-disable prettier/prettier */
import { React, useState } from 'react'
import { StyleSheet, StatusBar, View, Text, Image, SafeAreaView, ScrollView, Pressable, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'
import { SocialIcon } from '@rneui/base'

const storage = new MMKV()

export default function Home() {
  const navigation = useNavigation()

  const details = storage.getString('user.nameUser')

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
      >
        <ImageBackground
          source={require('../../assets/Home/homeimage.png')}
          style={{ width: '100%', height: '80%', position: 'absolute' }}
        />
  
        <View style={{ marginTop: StatusBar.currentHeight, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <View>
            <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 24, color: '#ECECEC', textShadowOffset: {width: 3, height: 3}, textShadowRadius: 1}}> Seja bem vindo ! </Text>
            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 42, color: 'white', textShadowOffset: {width: 5, height: 5}, textShadowRadius: 5 }}> {details}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate("Chats")}>
            <Ionicons name="chatbubble-outline" size={32} color="black" />
          </Pressable>
        </View>

        <View style={{ borderTopRightRadius: 45, borderTopStartRadius: 45, overflow: 'hidden', height: '100%', paddingBottom: '40%' }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ borderRadius: 50 }}
            contentContainerStyle={{ paddingTop: '45%' }}
            overScrollMode='never' 
          stickyHeaderIndices={[0]}
          >
          <View style={{ borderTopStartRadius: 45, borderTopEndRadius: 45, overflow: 'hidden' }}>
            <ScrollView style={{ backgroundColor: '#633DE8', paddingVertical: 10 }} contentContainerStyle={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={[styles.topBar, { backgroundColor: '#FF7425', borderColor: '#B95E2B', marginLeft: 10 }]}
              >
                <Text style={[styles.topBarText, { color: 'white' }]}>TDAH</Text>
              </Pressable>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={styles.topBar}
              >
                <Text style={styles.topBarText}>Organização</Text>
              </Pressable>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={styles.topBar}
              >
                <Text style={styles.topBarText}>Estudos </Text>
              </Pressable>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={[styles.topBar, { marginRight: 10 }]}
              >
                <Text style={styles.topBarText}>Ferramentas</Text>
              </Pressable>
            </ScrollView>
          </View>

          <View style={{ width: '100%', height: '82%', position: 'absolute', top: '15%', backgroundColor: '#633DE8' }} />

          <LinearGradient colors={['#633DE8', '#283C8C']} style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#FF7D34', justifyContent: 'space-evenly', borderRadius: 10, marginVertical: 5 }}>
              <View style={{ justifyContent: 'space-evenly', alignItems: 'center', width: '50%' }}>
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 24, color: 'white' }}> Especialistas {'\n'} disponíveis</Text>
                <Pressable style={{ width: '75%', height: 40, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}
                  onPress={() => navigation.navigate("Profissionals")}>
                  <Text style={{ fontFamily: 'Quicksand-Bold' }}>Ver</Text>
                </Pressable>
              </View>
              <Image
                alt="specialist"
                source={require('../../assets/Home/especialist.png')}
                resizeMode='contain'
                style={{ height: 195, width: '50%' }}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>

    </LinearGradient>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  topBar: {
    width: 138,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#A3A3A3',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  topBarText: {
    fontFamily: 'Quicksand-Bold',
    color: 'black',
    fontSize: 16
  }

})
