import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchEspecialist from './searchespecialist';
import { Ionicons } from '@expo/vector-icons';

export default function Consults() {
  const navigation = useNavigation();

  return (

    <SafeAreaView style={styles.container}>
      <View style={{ position: 'absolute', width: '100%', zIndex: 2 }}>
        <TouchableOpacity style={{ width: 95, height: 95, backgroundColor: '#633DE8', borderRadius: 100, alignSelf: 'flex-end', marginTop: 50, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => navigation.navigate('Chats')} activeOpacity={0.6}>
          <Ionicons name="chatbubble" size={50} color="white" />
        </TouchableOpacity>
      </View>

      <SearchEspecialist />

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
})
