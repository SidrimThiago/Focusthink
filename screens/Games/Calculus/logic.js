import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native'

const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const Calculus = () => {
  const [level, setLevel] = useState(1)
  const [expression, setExpression] = useState('')
  const [options, setOptions] = useState([])
  const [operation, setOperation] = useState('')
  const [points, setPoints] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    if (timeLeft === 0) {
      clearInterval(timerInterval)
    }

    return () => clearInterval(timerInterval)
  }, [timeLeft])

  const generateLevel = () => {
    let newExpression, correctAnswer, optionValues

    const startTimer = () => {
      setTimeLeft(10)
    }

    startTimer()
    switch (level) {
      case 1:
        newExpression = '2 * 2 = ?'
        correctAnswer = 4
        optionValues = [4, 5, 12, 2]
        setOperation('Operações envolvendo multiplicação')
        break
      case 2:
        newExpression = '√9 = ?'
        correctAnswer = 3
        optionValues = [3, 4, 5, 6]
        setOperation('Operações envolvendo radiciação')
        break
      case 3:
        newExpression = '7² = ?'
        correctAnswer = 49
        optionValues = [47, 49, 50, 52]
        setOperation('Números grandes ao quadrado')
        break
      case 4:
        newExpression = '3 + 5 * 2 = ?'
        correctAnswer = 13
        optionValues = [11, 12, 13, 14]
        setOperation('Ordem das operações')
        break
      case 5:
        newExpression = '12 / 3 = ?'
        correctAnswer = 4
        optionValues = [3, 4, 5, 6]
        setOperation('Operações envolvendo divisão')
        break
      case 6:
        newExpression = '4² = ?'
        correctAnswer = 16
        optionValues = [14, 15, 16, 17]
        setOperation('Números grandes ao quadrado')
        break
      case 7:
        newExpression = '√16 = ?'
        correctAnswer = 4
        optionValues = [3, 4, 5, 6]
        setOperation('Operações envolvendo radiciação')
        break
      case 8:
        newExpression = '8 - 3 = ?'
        correctAnswer = 5
        optionValues = [4, 5, 6, 7]
        setOperation('Operações envolvendo subtração')
        break
      case 9:
        newExpression = '9 * 9 = ?'
        correctAnswer = 81
        optionValues = [79, 80, 81, 82]
        setOperation('Números grandes ao quadrado')
        break
      case 10:
        newExpression = '√25 = ?'
        correctAnswer = 5
        optionValues = [3, 4, 5, 6]
        setOperation('Operações envolvendo radiciação')
        break
      case 11:
        newExpression = '3 + 7 * 2 - 2 = ?'
        correctAnswer = 15
        optionValues = [15, 16, 17, 18]
        setOperation('Ordem das operações')
        break
      case 12:
        newExpression = '50% -> 28 = ?'
        correctAnswer = 14
        optionValues = [14, 12, 34, 15]
        setOperation('Operações envolvendo porcentagem')
        break
      case 13:
        newExpression = '400 / 50 = ?'
        correctAnswer = 8
        optionValues = [8, 10, 18, 28]
        setOperation('Operações envolvendo divisão')
        break
      case 14:
        newExpression = '√81 = ?'
        correctAnswer = 9
        optionValues = [7, 8, 9, 10]
        setOperation('Operações envolvendo radiciação')
        break
      case 15:
        newExpression = '6³ = ?'
        correctAnswer = 216
        optionValues = [196, 314, 216, 224]
        setOperation('Números grandes ao quadrado')
        break
      case 16:
        newExpression = '95² = ?'
        correctAnswer = 9025
        optionValues = [7819, 9081, 10025, 9025]
        setOperation('Números grandes ao quadrado')
        break
      default:
        newExpression = 'Nível não implementado'
        correctAnswer = null
        optionValues = []
        setOperation('')
        break
    }

    setExpression(newExpression)
    setOptions(shuffleArray(optionValues))
  }

  const handleOptionSelect = (value) => {
    if (value === getCorrectAnswer()) {
      setPoints(points + 5)
      if (level === 15) {
        setShowModal(true)
      } else {
        setLevel(level + 1)
        generateLevel()
      }
    }
  }

  const getCorrectAnswer = () => {
    switch (expression) {
      case '2 * 2 = ?':
        return 4
      case '√9 = ?':
        return 3
      case '7² = ?':
        return 49
      case '3 + 5 * 2 = ?':
        return 13
      case '12 / 3 = ?':
        return 4
      case '4² = ?':
        return 16
      case '√16 = ?':
        return 4
      case '8 - 3 = ?':
        return 5
      case '9 * 9 = ?':
        return 81
      case '√25 = ?':
        return 5
      case '3 + 7 * 2 - 2 = ?':
        return 15
      case '50% -> 28 = ?':
        return 14
      case '400 / 50 = ?':
        return 8
      case '√81 = ?':
        return 9
      case '6³ = ?':
        return 216
      case '95² = ?':
        return 9025
      // Adicione mais casos conforme necessário
      default:
        return null
    }
  }

  const restartGame = () => {
    setLevel(1)
    setPoints(0)
    setShowModal(false)
    generateLevel()
  }

  useEffect(() => {
    generateLevel()
  }, [level])

  return (
    <View style={styles.container}>
      <Text>Tempo restante: {timeLeft}</Text>
      <Text>Nível: {level}</Text>
      <Text>Pontos: {points}</Text>
      <View className="border-stone-50 border w-full items-center justify-center h-64">
        <Text style={styles.expression}>{expression}</Text>
      </View>
      <View>
        <Text>{operation}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionSelect(value)}
          >
            <Text style={styles.optionText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Parabéns! Você completou o jogo!
            </Text>
            <Button title="Reiniciar" onPress={restartGame} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expression: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: '35%',
    margin: 1,
    padding: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})

export default Calculus