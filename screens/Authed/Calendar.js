import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import TimePicker from '../../components/TimePicker'
import { API_URL } from '../../.env/config'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'

const storage = new MMKV()

export default function Calendar() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
      ></LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  addButtonContainer: {
    marginBottom: 20,
  },
  tasksList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  tasksListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
})
