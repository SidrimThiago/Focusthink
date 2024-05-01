import { React, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CalendarPicker from 'react-native-calendar-picker'
import { Button } from 'react-native-paper'
import SelectCategory from '../../components/selectCategory'
import { TextInputMask } from 'react-native-masked-text'

export default function Calendar() {
  const navigation = useNavigation()

  const [timeList, setTimeList] = useState([])
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [isModalVisible, setModalVisible] = useState(false)
  const [isModalTimeVisible, setModalTimeVisible] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [date, setDate] = useState('')
  const [tasks, setTasks] = useState([])

  const closeModal = () => {
    if (!selectedDate || !taskName || !taskDescription) {
      console.log(taskDescription, taskName, selectedDate)
      return
    }

    const newTask = {
      Id: Math.random().toString(),
      Date: date,
      Name: taskName,
      Description: taskDescription,
    }

    setTasks([...tasks, newTask])
    setSelectedDate(null)
    setTaskName('')
    setTaskDescription('')
    setModalVisible(false)
  }

  const closeTimeModal = () => {
    setModalTimeVisible(false)
  }

  const openTimeModal = () => {
    isModalTimeVisible(true)
  }

  const handleVerifyClick = () => {
    setModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="justify-start flex-1"
      >
        <View className="">
          <CalendarPicker
            className="bg-blue-700 p-20 w-56"
            style={{ borderRadius: 15 }}
            onDateChange={setSelectedDate}
            minDate={Date.now()}
            todayBackgroundColor="#FF5C00"
            todayTextStyle="#633DE8"
            selectedDayColor="transparent"
            selectedDayTextColor="#000"
          />
        </View>
        <View>
          <Button onPress={handleVerifyClick}>Adicionar</Button>
        </View>

        <View style={styles.tasksList}>
          <Text>Tarefas:</Text>
          {tasks.map((task) => (
            <View key={task.Id} style={styles.taskItem}>
              <Text style={styles.taskText}>
                {task.Date} - {task.Name}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Modal Content */}
      <Modal
        animationType="slideInUp"
        animationInTiming={2000}
        transparent={false}
        visible={isModalVisible}
      >
        <SafeAreaView style={styles.modalContent} className="w-full h-screen">
          <LinearGradient
            colors={['#633DE8', '#1C233F']}
            style={styles.background}
            className="justify-start flex-1"
          >
            <Text style={styles.modalText}>Escolha uma data</Text>
            <View className="">
              <CalendarPicker
                className="bg-blue-700 p-20 w-56"
                style={{ borderRadius: 15 }}
                onDateChange={setSelectedDate}
                minDate={Date.now()}
                todayBackgroundColor="#FF5C00"
                todayTextStyle="#633DE8"
                selectedDayColor="#633DE8"
                selectedDayTextColor="#000"
              />
            </View>
            {selectedDate && ( // Render only if selectedDate has a value
              <TextInputMask
                type="datetime"
                options={{
                  dateFormat: 'DD/MM/YYYY',
                }}
                onChangeText={(date) => setSelectedDate(date)}
                style={styles.input}
                keyboardType="numeric"
                placeholder="data"
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Nome da task"
              value={taskName}
              onChangeText={setTaskName}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição da task"
              value={taskDescription}
              onChangeText={setTaskDescription}
            />
            <SelectCategory />

            <Button onPress={closeModal}>Concluir</Button>
          </LinearGradient>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slideInUp"
        animationInTiming={2000}
        transparent={false}
        visible={openTimeModal}
      >
        <Text>horário</Text>
        <Button>Fechar</Button>
      </Modal>
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
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    paddingHorizontal: 18,
    color: '#fff',
    backgroundColor: '#4CAF50',
  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    paddingHorizontal: 18,
    color: '#fff',
  },
  input: {
    width: '85%',
    backgroundColor: '#fff',
    paddingBottom: 25,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tasksList: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
  },
})
