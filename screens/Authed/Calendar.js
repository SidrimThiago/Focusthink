import React, { useState } from 'react'
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
import TimePicker from '../../components/TimePicker'

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const minDate = new Date() // Data mínima como hoje
  const maxDate = new Date(2024, 11, 31) // Data máxima em 31 de dezembro de 2024

  const categories = [
    { key: '0', value: 'Sem categoria' },
    { key: '1', value: 'Trabalhos' },
    { key: '2', value: 'Pessoal' },
    { key: '3', value: 'Lista de desejos' },
    { key: '4', value: 'Estudos' },
    { key: '5', value: 'Aniversários' },
  ]

  const closeModal = () => {
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
      startTime,
      endTime,
      category: selectedCategory.value,
    }

    setTasks([...tasks, newTask])
    setSelectedStartDate(null)
    setSelectedEndDate(null)
    setTaskName('')
    setTaskDescription('')
    setStartTime('')
    setEndTime('')
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <View style={styles.calendarContainer}>
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
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.taskItem}
                onPress={() => handleTaskPress(item)}
              >
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
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
            keyExtractor={(item) => item.id}
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
            <TimePicker
              label="Horário de Início"
              value={startTime}
              onChange={setStartTime}
            />
            <TimePicker
              label="Horário de Término"
              value={endTime}
              onChange={setEndTime}
            />
            <View className="relative justify-center pr-8 pl-8 mb-3 w-full text-gray-500 text-lg">
              <SelectList
                setSelected={(val) => setSelectedCategory(val)}
                data={categories}
                value={selectedCategory ? selectedCategory.value : null}
                search={false}
                save="value"
                placeholder="Categoria"
                maxHeight={110}
                arrowicon={
                  <MaterialIcons
                    style={{ position: 'absolute', top: 10, right: 12 }}
                    name="keyboard-arrow-down"
                    size={35}
                    color="#707070"
                  />
                }
                boxStyles={{
                  backgroundColor: 'white',
                  height: 56,
                  alignItems: 'center',
                  borderRadius: 15,
                  borderColor: 'white',
                }}
                dropdownStyles={{ backgroundColor: 'white' }}
                inputStyles={{ fontSize: 18, marginLeft: -7 }}
                dropdownTextStyles={{ fontSize: 17 }}
              />
            </View>
            <Button mode="contained" onPress={closeModal}>
              Concluir
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
            <Text style={styles.modalText}>Detalhes da Tarefa</Text>
            <Text>Nome: {selectedTask?.name}</Text>
            <Text>Descrição: {selectedTask?.description}</Text>
            <Text>Horário de Início: {selectedTask?.startTime}</Text>
            <Text>Horário de Término: {selectedTask?.endTime}</Text>
            <Text>Categoria: {selectedTask?.category}</Text>
            <Button mode="contained" onPress={closeModal2}>
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
