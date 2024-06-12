import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker'
import { API_URL } from '../../.env/config'
import { MMKV } from 'react-native-mmkv'
import { SelectList } from 'react-native-dropdown-select-list'
import { MaterialIcons } from '@expo/vector-icons'

const storage = new MMKV()

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // State para criação de nova tarefa
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    category: '',
  })

  // State para edição de tarefa
  const [editTask, setEditTask] = useState({
    oldTaskName: '',
    newTaskName: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    category: '',
  })

  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const nomeUser = storage.getString('user.nameUser')
        const response = await axios.get(`${API_URL}/GetTasks`, {
          params: { nomeUser },
        })
        setTasks(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const openModal = (task) => {
    setSelectedTask(task)
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedTask(null)
    setModalVisible(false)
  }

  const openCreateModal = () => {
    setCreateModalVisible(true)
  }

  const closeCreateModal = () => {
    setCreateModalVisible(false)
    setNewTask({
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      category: '',
    })
  }

  const openEditModal = (task) => {
    setEditTask({
      oldTaskName: task.nameTask,
      newTaskName: task.nameTask,
      description: task.description,
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      startTime: new Date(task.startTime),
      endTime: new Date(task.endTime),
      category: task.tipoTask,
    })
    setEditModalVisible(true)
  }

  const closeEditModal = () => {
    setEditModalVisible(false)
    setEditTask({
      oldTaskName: '',
      newTaskName: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      category: '',
    })
  }

  const categories = [
    { key: '0', value: 'Sem categoria' },
    { key: '1', value: 'Trabalhos' },
    { key: '2', value: 'Pessoal' },
    { key: '3', value: 'Lista de desejos' },
    { key: '4', value: 'Estudos' },
    { key: '5', value: 'Aniversários' },
  ]

  const handleCreateTask = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(`${API_URL}/CreateTasks`, {
        ...newTask,
        nomeUser,
      })
      if (response.data.status === 200) {
        setTasks((prevTasks) => [...prevTasks, newTask])
        closeCreateModal()
      } else {
        alert('Erro ao criar tarefa')
      }
    } catch (error) {
      alert('Erro ao criar tarefa')
    }
  }

  const handleEditTask = async () => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      console.log(editTask)
      const response = await axios.post(`${API_URL}/EditTask`, {
        ...editTask,
        nomeUser,
      })
      if (response.data.message === 'Task edited successfully') {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.nameTask === editTask.oldTaskName
              ? { ...editTask, nameTask: editTask.newTaskName }
              : task,
          ),
        )
        closeEditModal()
      } else {
        alert('Erro ao editar tarefa')
      }
    } catch (error) {
      alert('Erro ao editar tarefa')
    }
  }

  const handleDateChange = (event, selectedDate, type, isEdit = false) => {
    if (selectedDate) {
      if (isEdit) {
        setEditTask((prevTask) => ({
          ...prevTask,
          [type]: selectedDate,
        }))
      } else {
        setNewTask((prevTask) => ({
          ...prevTask,
          [type]: selectedDate,
        }))
      }
    }
    if (type === 'startDate') {
      setShowStartDatePicker(false)
    } else if (type === 'endDate') {
      setShowEndDatePicker(false)
    }
  }

  const handleTimeChange = (event, selectedTime, type, isEdit = false) => {
    if (selectedTime) {
      if (isEdit) {
        setEditTask((prevTask) => ({
          ...prevTask,
          [type]: selectedTime,
        }))
      } else {
        setNewTask((prevTask) => ({
          ...prevTask,
          [type]: selectedTime,
        }))
      }
    }
    if (type === 'startTime') {
      setShowStartTimePicker(false)
    } else if (type === 'endTime') {
      setShowEndTimePicker(false)
    }
  }

  const handleDeleteTask = async (taskName) => {
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(`${API_URL}/DeleteTask`, {
        taskName,
        nomeUser,
      })
      if (response.data.message === 'Task deleted successfully') {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.nameTask !== taskName),
        )
        closeModal()
      } else {
        alert('Erro ao deletar tarefa')
      }
    } catch (error) {
      alert('Erro ao deletar tarefa')
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#633DE8', '#1C233F']}
          style={styles.background}
        >
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#633DE8', '#1C233F']}
          style={styles.background}
        >
          <Text style={styles.errorText}>Error: {error}</Text>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => openModal(item)}
      className="mt-10"
    >
      <Text style={styles.taskTitle}>{item.nameTask}</Text>
      <Text style={styles.taskDates}>{`End: ${item.endDate}`}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.nameTask)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.nameTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {selectedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedTask.nameTask}</Text>
              <Text style={styles.modalDescription}>
                {selectedTask.description}
              </Text>
              <Text
                style={styles.modalDates}
              >{`Start: ${selectedTask.startDate}`}</Text>
              <Text
                style={styles.modalDates}
              >{`End: ${selectedTask.endDate}`}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para criar nova tarefa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={createModalVisible}
        onRequestClose={closeCreateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newTask.name}
              onChangeText={(text) => setNewTask({ ...newTask, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
            />
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.dateInput}>
                Start Date: {newTask.startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={newTask.startDate}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, 'startDate')
                }
              />
            )}
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.dateInput}>
                End Date: {newTask.endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={newTask.endDate}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, 'endDate')
                }
              />
            )}
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.dateInput}>
                Start Time: {newTask.startTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={newTask.startTime}
                mode="time"
                display="default"
                onChange={(event, time) =>
                  handleTimeChange(event, time, 'startTime')
                }
              />
            )}
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.dateInput}>
                End Time: {newTask.endTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={newTask.endTime}
                mode="time"
                display="default"
                onChange={(event, time) =>
                  handleTimeChange(event, time, 'endTime')
                }
              />
            )}
            <SelectList
              data={categories}
              setSelected={(value) => setSelectedCategory(value)}
              placeholder="Select Category"
              searchPlaceholder="Search..."
              boxStyles={styles.input}
              dropdownStyles={styles.dropdown}
              defaultOption={categories[0]}
            />
            <Button title="Create" onPress={handleCreateTask} />
            <TouchableOpacity onPress={closeCreateModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para editar tarefa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="New Name"
              value={editTask.newTaskName}
              onChangeText={(text) =>
                setEditTask({ ...editTask, newTaskName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={editTask.description}
              onChangeText={(text) =>
                setEditTask({ ...editTask, description: text })
              }
            />
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.dateInput}>
                Start Date: {editTask.startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={editTask.startDate}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, 'startDate', true)
                }
              />
            )}
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.dateInput}>
                End Date: {editTask.endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={editTask.endDate}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, 'endDate', true)
                }
              />
            )}
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.dateInput}>
                Start Time: {editTask.startTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={editTask.startTime}
                mode="time"
                display="default"
                onChange={(event, time) =>
                  handleTimeChange(event, time, 'startTime', true)
                }
              />
            )}
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.dateInput}>
                End Time: {editTask.endTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={editTask.endTime}
                mode="time"
                display="default"
                onChange={(event, time) =>
                  handleTimeChange(event, time, 'endTime', true)
                }
              />
            )}
            <SelectList
              data={categories}
              setSelected={(value) =>
                setEditTask({ ...editTask, category: value })
              }
              placeholder="Select Category"
              search={false}
              boxStyles={styles.input}
              dropdownStyles={styles.dropdown}
              defaultOption={categories.find(
                (cat) => cat.value === editTask.category,
              )}
            />
            <Button title="Save" onPress={handleEditTask} />
            <TouchableOpacity onPress={closeEditModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDates: {
    fontSize: 14,
    color: '#333',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#633DE8',
    borderRadius: 50,
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 16,
  },
  modalDates: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  dateInput: {
    height: 40,
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  dropdown: {
    width: '100%',
  },
})
