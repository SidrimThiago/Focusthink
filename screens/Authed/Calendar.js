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
import CalendarPicker from 'react-native-calendar-picker'
import { MaterialIcons } from '@expo/vector-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { API_URL } from '../../.env/config'
import { MMKV } from 'react-native-mmkv'
import axios from 'axios'

const storage = new MMKV()

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState(null)
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  const minDate = new Date() // Data mínima como hoje
  const maxDate = new Date(2024, 11, 31) // Data máxima em 31 de dezembro de 2024

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const nomeUser = storage.getString('user.nameUser')
        const response = await axios.get(API_URL + '/GetTasks', {
          params: { nomeUser },
        })
        const fetchedTasks = response.data
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    fetchTasks()
  }, [])

  const categories = [
    { key: '0', value: 'Sem categoria' },
    { key: '1', value: 'Trabalhos' },
    { key: '2', value: 'Pessoal' },
    { key: '3', value: 'Lista de desejos' },
    { key: '4', value: 'Estudos' },
    { key: '5', value: 'Aniversários' },
  ]

  const closeModal = async () => {
    if (
      !selectedStartDate ||
      !selectedEndDate ||
      !taskName ||
      !taskDescription ||
      !startTime ||
      !endTime ||
      !selectedCategory
    ) {
      return (
        console.log(selectedCategory),
        console.log(selectedEndDate),
        console.log(taskName),
        console.log(taskDescription),
        console.log(startTime),
        console.log(endTime)
      )
    }

    const newTask = {
      id: Math.random().toString(),
      startDate: selectedStartDate.toString(),
      endDate: selectedEndDate.toString(),
      name: taskName,
      description: taskDescription,
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      category: selectedCategory,
      nomeUser: storage.getString('user.nameUser'),
    }

    try {
      console.log(newTask.nomeUser)
      const response = await axios.post(
        API_URL + '/CreateTasks',
        newTask,

        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (response.status === 200) {
        const data = response.data
        setTasks([...tasks, data])
      } else {
        console.error('Error creating task:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }

    setTasks([...tasks, newTask])
    setSelectedStartDate(null)
    setSelectedEndDate(null)
    setTaskName('')
    setTaskDescription('')
    setStartTime(new Date())
    setEndTime(new Date())
    setSelectedCategory(null)
    setModalVisible(false)
  }

  const handleVerifyClick = () => {
    setModalVisible(true)
  }

  const handleFinishTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, finished: true } : task,
    )
    setTasks(updatedTasks)
  }

  const handleTaskPress = (task) => {
    setSelectedTask(task)
    setIsTaskModalVisible(true)
  }

  const closeModal2 = () => {
    setIsTaskModalVisible(false)
  }

  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || startTime
    setShowStartTimePicker(false)
    setStartTime(currentDate)
  }

  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || endTime
    setShowEndTimePicker(false)
    setEndTime(currentDate)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={styles.calendarContainer}>
          <RNDateTimePicker
            mode="date"
            value={new Date()}
            is24Hour={true}
            display="calendar"
          />
        </View>
        <View style={styles.addButtonContainer}>
          <Button mode="contained" onPress={handleVerifyClick}>
            Adicionar Tarefa
          </Button>
        </View>
        <View style={styles.tasksList}>
          <Text style={styles.tasksListTitle}>Tarefas:</Text>
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.taskItem}
                onPress={() => handleTaskPress(item)}
                key={index}
              >
                <View style={{ flex: 1 }}>
                  <Text>{item.nameTask}</Text>
                  <Text>{item.endDate}</Text>
                </View>
                <TouchableOpacity
                  style={styles.checkButton}
                  onPress={() => handleFinishTask(item.id)}
                >
                  <MaterialIcons name="check" size={24} color="green" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Adicionar Tarefa</Text>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#FF5C00"
              todayTextStyle="#633DE8"
              selectedDayColor="#633DE8"
              selectedDayTextColor="#000"
              onDateChange={(date, type) => {
                if (type === 'END_DATE') {
                  setSelectedEndDate(date)
                } else {
                  setSelectedStartDate(date)
                  setSelectedEndDate(null)
                }
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Nome da Tarefa"
              value={taskName}
              onChangeText={setTaskName}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição da Tarefa"
              value={taskDescription}
              onChangeText={setTaskDescription}
            />
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.timePickerText}>
                Horário de Início: {startTime.toLocaleTimeString()}{' '}
                {/* coloque um <RNDateTimePicker mode="time" value={new Date()} is24Hour={true} /> */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.timePickerText}>
                Horário de Término: {endTime.toLocaleTimeString()}
                {/* coloque um <RNDateTimePicker mode="time" value={new Date()} is24Hour={true} /> */}
              </Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <RNDateTimePicker
                value={startTime}
                mode="time"
                display="spinner"
                onChange={onChangeStartTime}
                is24Hour={true}
              />
            )}
            {showEndTimePicker && (
              <RNDateTimePicker
                value={endTime}
                mode="time"
                display="spinner"
                onChange={onChangeEndTime}
                is24Hour={true}
              />
            )}
            <View style={styles.dropdownContainer}>
              <SelectList
                setSelected={setSelectedCategory}
                data={categories}
                search={false}
                defaultOption={{ key: '0', value: 'Sem categoria' }}
              />
            </View>
            <Button mode="contained" onPress={closeModal}>
              Salvar
            </Button>
            <Button mode="outlined" onPress={() => setModalVisible(false)}>
              Cancelar
            </Button>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isTaskModalVisible}
          onRequestClose={closeModal2}
        >
          <View style={styles.modalContent}>
            {selectedTask && (
              <>
                <Text style={styles.modalText}>{selectedTask.nameTask}</Text>
                <Text>{selectedTask.description}</Text>
                <Text>
                  Data de Início:{' '}
                  {new Date(selectedTask.startDate).toLocaleDateString()}
                </Text>
                <Text>
                  Data de Término:{' '}
                  {new Date(selectedTask.endDate).toLocaleDateString()}
                </Text>
                <Text>Horário de Início: {selectedTask.startTime}</Text>
                <Text>Horário de Término: {selectedTask.endTime}</Text>
                <Text>Categoria: {selectedTask.category}</Text>
              </>
            )}
            <Button mode="outlined" onPress={closeModal2}>
              Fechar
            </Button>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  calendarContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  addButtonContainer: {
    margin: 10,
  },
  tasksList: {
    flex: 3,
    paddingHorizontal: 10,
  },
  tasksListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  checkButton: {
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  timePickerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
})
