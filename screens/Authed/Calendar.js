/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker'
import { API_URL } from '../../.env/config'
import { MMKV } from 'react-native-mmkv'
import { SelectList } from 'react-native-dropdown-select-list'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

const storage = new MMKV()

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [menuModalVisible, setMenuModalVisible] = useState(false)
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

  const handleTimeChange = (event, selectedTime, type, isEdit = false) => {
    const currentDate = selectedTime || new Date();
    if (isEdit) {
      setEditTask((prevTask) => ({
        ...prevTask,
        [type]: currentDate,
      }));
    } else {
      setNewTask((prevTask) => ({
        ...prevTask,
        [type]: currentDate,
      }));
    }
    if (type === 'startTime') {
      setShowStartTimePicker(false);
    } else if (type === 'endTime') {
      setShowEndTimePicker(false);
    }
  };

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

  const openMenuModal = (task) => {
    setSelectedTask(task)
    setMenuModalVisible(true)
  }

  const closeMenuModal = () => {
    setSelectedTask(null)
    setMenuModalVisible(false)
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
        closeMenuModal()
      } else {
        alert('Erro ao deletar tarefa')
      }
    } catch (error) {
      alert('Erro ao deletar tarefa')
    }
  }

  const getColorForTask = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    const diffInDays = (end - now) / (1000 * 60 * 60 * 24)

    if (diffInDays <= 7) {
      return '#FF6347' // Vermelho
    } else if (diffInDays <= 14) {
      return '#FFD700' // Amarelo
    } else if (diffInDays <= 21) {
      return '#32CD32' // Verde
    } else {
      return '#1C233F' // Cor padrão
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit' }
    return new Date(timeString).toLocaleTimeString(undefined, options)
  }

  const renderItem = ({ item, index }) => (
    <View style={[styles.itemContainer, index === 0 && styles.firstItem]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusIndicator, { backgroundColor: getColorForTask(item.endDate) }]} />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle} className="font-quick-bold">{item.nameTask}</Text>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTime} className="font-quick-bold">{`Time: ${formatTime(item.endTime)}`}</Text>
            <Text style={styles.itemDate} className="font-quick-bold">{`Date: ${formatDate(item.endDate)}`}</Text>
          </View>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={() => openMenuModal(item)}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
              >{`Start: ${formatDate(selectedTask.startDate)}`}</Text>
              <Text
                style={styles.modalDates}
              >{`End: ${formatDate(selectedTask.endDate)}`}</Text>
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
                Start Date: {formatDate(newTask.startDate)}
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
                End Date: {formatDate(newTask.endDate)}
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
                Start Time: {formatTime(newTask.startTime)}
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
                End Time: {formatTime(newTask.endTime)}
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
            <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
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
                Start Date: {formatDate(editTask.startDate)}
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
                End Date: {formatDate(editTask.endDate)}
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
                Start Time: {formatTime(editTask.startTime)}
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
                End Time: {formatTime(editTask.endTime)}
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
            <TouchableOpacity style={styles.saveButton} onPress={handleEditTask}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeEditModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de menu para edição e exclusão */}
      {selectedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={menuModalVisible}
          onRequestClose={closeMenuModal}
        >
          <View style={styles.menuModalContainer}>
            <View style={styles.menuModalContent}>
              <TouchableOpacity onPress={() => { closeMenuModal(); openEditModal(selectedTask); }}>
                <View style={styles.menuItem}>
                  <Ionicons name="create-outline" size={24} color                  ="#FF7425" />
                  <Text style={styles.menuItemText}>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(selectedTask.nameTask)}>
                <View style={styles.menuItem}>
                  <Ionicons name="trash-outline" size={24} color="#FF7425" />
                  <Text style={styles.menuItemText}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#633DE8',
    borderRadius: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#1C233F',
    marginBottom: 15,
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#1C233F',
  },
  modalDates: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    color: '#FF7425',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#DADADA',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    color: '#1C233F',
  },
  dateInput: {
    height: 40,
    justifyContent: 'center',
    borderColor: '#DADADA',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    color: '#1C233F',
  },
  dropdown: {
    width: '100%',
  },
  createButton: {
    backgroundColor: '#633DE8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#633DE8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    width: '80%',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: '10%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  firstItem: {
    marginTop: 50,
  },
  itemContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  itemDate: {
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 14,
    color: '#B0B0B0',
    paddingRight: 50,
  },
  itemTime: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  itemActions: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1C233F',
  },
});
