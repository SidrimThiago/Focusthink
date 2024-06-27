import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native'

const TimePicker = ({ label, value, onChange }) => {
  const [isModalVisible, setModalVisible] = useState(false)

  const handleConfirm = () => {
    setModalVisible(false)
  }

  // Função para formatar o horário inserido na máscara (hh:mm)
  const formatTime = (time) => {
    const formattedTime = time.replace(/[^0-9]/g, '') // Remove todos os caracteres não numéricos
    if (formattedTime.length <= 2) {
      return formattedTime
    }
    return `${formattedTime.slice(0, 2)}:${formattedTime.slice(2, 4)}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.input}>{value || 'Selecionar horário'}</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.timeInput}
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5} // Limite de 5 caracteres (formato HH:MM)
              value={value}
              onChangeText={(text) => onChange(formatTime(text))}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  timeInput: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#633DE8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default TimePicker
