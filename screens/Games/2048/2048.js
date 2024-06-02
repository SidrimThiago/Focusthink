import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Button,
  Pressable,
} from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

export const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const hasValue = (board, value) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === value) return true
    }
  }
  return false
}

export const isFull = (board) => {
  return !hasValue(board, 0)
}

const getRandomPosition = () => {
  const rowPosition = Math.floor(Math.random() * 4)
  const colPosition = Math.floor(Math.random() * 4)
  return [rowPosition, colPosition]
}

export const generateRandom = (board) => {
  if (isFull(board)) {
    return board
  }

  let [row, col] = getRandomPosition()
  while (board[row][col] !== 0) {
    ;[row, col] = getRandomPosition()
  }

  const newBoard = [...board]
  newBoard[row][col] = 2
  return newBoard
}

const compress = (board) => {
  const newBoard = getEmptyBoard()
  for (let i = 0; i < board.length; i++) {
    let colIndex = 0
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        newBoard[i][colIndex] = board[i][j]
        colIndex++
      }
    }
  }
  return newBoard
}

const merge = (board) => {
  const newBoard = [...board]
  for (let i = 0; i < newBoard.length; i++) {
    for (let j = newBoard[i].length - 1; j >= 1; j--) {
      if (newBoard[i][j] !== 0 && newBoard[i][j] === newBoard[i][j - 1]) {
        newBoard[i][j] *= 2
        newBoard[i][j - 1] = 0
      }
    }
  }
  return newBoard
}

export const moveLeft = (board) => {
  const newBoard1 = compress(board)
  const newBoard2 = merge(newBoard1)
  return compress(newBoard2)
}

const reverse = (board) => {
  const reverseBoard = getEmptyBoard()

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      reverseBoard[i][j] = board[i][board[i].length - 1 - j]
    }
  }

  return reverseBoard
}

export const moveRight = (board) => {
  const reversedBoard = reverse(board)
  const newBoard = moveLeft(reversedBoard)
  return reverse(newBoard)
}

const rotateLeft = (board) => {
  const rotateBoard = getEmptyBoard()

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rotateBoard[i][j] = board[j][board[i].length - 1 - i]
    }
  }

  return rotateBoard
}

const rotateRight = (board) => {
  const rotateBoard = getEmptyBoard()
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rotateBoard[i][j] = board[board[i].length - 1 - j][i]
    }
  }
  return rotateBoard
}

export const moveUp = (board) => {
  const rotateBoard = rotateLeft(board)
  const newBoard = moveLeft(rotateBoard)
  return rotateRight(newBoard)
}

export const moveDown = (board) => {
  const rotateBoard = rotateRight(board)
  const newBoard = moveLeft(rotateBoard)
  return rotateLeft(newBoard)
}

export const checkWin = (board) => {
  return hasValue(board, 2048)
}

export const isOver = (board) => {
  if (hasDiff(board, moveLeft(board))) {
    return false
  }
  if (hasDiff(board, moveRight(board))) {
    return false
  }
  if (hasDiff(board, moveUp(board))) {
    return false
  }
  if (hasDiff(board, moveDown(board))) {
    return false
  }
  return true
}

const hasDiff = (board, updatedBoard) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== updatedBoard[i][j]) {
        return true
      }
    }
  }
  return false
}

const Game2048 = () => {
  const [animationOver, setAnimationOver] = useState(false)

  const navigation = useNavigation()

  const [board, setBoard] = useState(getEmptyBoard())

  useEffect(() => {
    const newBoard = generateRandom(getEmptyBoard())
    setBoard(newBoard)
  }, [])

  const handleMove = (direction) => {
    let newBoard
    switch (direction) {
      case 'left':
        newBoard = moveLeft(board)
        break
      case 'right':
        newBoard = moveRight(board)
        break
      case 'up':
        newBoard = moveUp(board)
        break
      case 'down':
        newBoard = moveDown(board)
        break
      default:
        newBoard = moveLeft(board)
    }

    if (hasDiff(board, newBoard)) {
      const updatedBoard = generateRandom(newBoard)
      setBoard(updatedBoard)

      if (isOver(updatedBoard)) {
        setAnimationOver(true)

        setTimeout(() => {
          setModalLose(true)
        }, 5000)
      } else if (checkWin(updatedBoard)) {
        setModalWin(true)
      }
    }
  }
  const [isModalOptions, setModalOptions] = useState(false)

  const optionsOpen = () => {
    setModalOptions(true)
  }

  const [isModalWin, setModalWin] = useState(false)

  const [isModalLose, setModalLose] = useState(false)

  const restartGame = () => {
    setModalOptions(false)
    setModalLose(false)
    setModalWin(false)
    setAnimationOver(false)

    const newBoard = generateRandom(getEmptyBoard())
    setBoard(newBoard)
  }

  const handlePanGesture = (event) => {
    const { translationX, translationY } = event.nativeEvent
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        handleMove('right')
      } else {
        handleMove('left')
      }
    } else {
      if (translationY > 0) {
        handleMove('down')
      } else {
        handleMove('up')
      }
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, backgroundColor: '#57407C' }}>
        <Pressable
          onPress={optionsOpen}
          style={{
            position: 'absolute',
            top: 50,
            right: 5,
            width: 45,
            height: 45,
            zIndex: 1,
          }}
        >
          <FontAwesome name="bars" size={45} color="black" />
        </Pressable>
        <PanGestureHandler onGestureEvent={handlePanGesture}>
          <View style={styles.container}>
            {!animationOver ? (
              <Image
                alt="Background"
                source={require('../../../assets/2048/background.png')}
                style={styles.background}
              />
            ) : (
              <View style={styles.containerLose}>
                <Image
                  alt="GameOver"
                  source={require('../../../assets/2048/game-over.gif')}
                  style={[styles.backgroundLose, { zIndex: 2 }]}
                />
                <Image
                  alt="Background"
                  source={require('../../../assets/2048/background.png')}
                  style={[styles.background, { zIndex: 1 }]}
                />
              </View>
            )}

            <Text
              className="flex-start"
              style={{ marginBottom: 20, fontWeight: 'bold' }}
            >
              {' '}
              2048{' '}
            </Text>
            <View style={styles.boardContainer}>
              {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, colIndex) => {
                    let imageSource

                    if (cell === 2) {
                      imageSource = require('../../../assets/2048/2.gif')
                    } else if (cell === 4) {
                      imageSource = require('../../../assets/2048/4.gif')
                    } else if (cell === 8) {
                      imageSource = require('../../../assets/2048/8.gif')
                    } else if (cell === 16) {
                      imageSource = require('../../../assets/2048/16.gif')
                    } else if (cell === 32) {
                      imageSource = require('../../../assets/2048/32.gif')
                    } else if (cell === 64) {
                      imageSource = require('../../../assets/2048/64.gif')
                    } else if (cell === 128) {
                      imageSource = require('../../../assets/2048/128.gif')
                    } else if (cell === 256) {
                      imageSource = require('../../../assets/2048/256.gif')
                    } else if (cell === 512) {
                      imageSource = require('../../../assets/2048/512.gif')
                    } else if (cell === 1024) {
                      imageSource = require('../../../assets/2048/1024.gif')
                    } else if (cell === 2048) {
                      imageSource = require('../../../assets/2048/2048.gif')
                    }

                    return (
                      <View
                        className="overflow-hidden rounded-full"
                        key={colIndex}
                        style={styles.cell}
                      >
                        <Image
                          alt="Cell"
                          resizeMode="contain"
                          className="w-full"
                          source={imageSource}
                        />
                      </View>
                    )
                  })}
                </View>
              ))}
            </View>

            <Modal
              isVisible={isModalOptions}
              className="self-center"
              animationIn={'fadeIn'}
              animationInTiming={1000}
              animationOut={'fadeOut'}
              animationOutTiming={200}
              backdropOpacity={0.3}
            >
              <View style={styles.menu}>
                <Pressable onPress={restartGame} style={styles.options}>
                  <FontAwesome name="undo" size={65} color="black" />
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate('GameOptions')}
                  style={[styles.options, { paddingBottom: 4 }]}
                >
                  <FontAwesome5 name="home" size={65} color="black" />
                </Pressable>

                <Pressable
                  onPress={() => setModalOptions(false)}
                  style={[styles.options, { paddingLeft: 10 }]}
                >
                  <FontAwesome5 name="play" size={60} color="black" />
                </Pressable>
              </View>
            </Modal>

            <Modal
              isVisible={isModalLose}
              className="self-center"
              animationIn={'fadeIn'}
              animationInTiming={1000}
              animationOut={'fadeOut'}
              animationOutTiming={200}
              backdropOpacity={0.3}
            >
              <View style={styles.restart}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-SemiBold',
                    fontSize: 40,
                    color: 'gray',
                    marginBottom: 150,
                  }}
                >
                  Game Over!
                </Text>
                <Pressable
                  onPress={restartGame}
                  style={{
                    borderRadius: 10,
                    width: 100,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontFamily: 'Quicksand-SemiBold' }}>
                    Reiniciar
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('GameOptions')}
                  style={{
                    borderRadius: 10,
                    width: 100,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Quicksand-SemiBold',
                      textAlign: 'center',
                    }}
                  >
                    Tentar {'\n'} outro jogo
                  </Text>
                </Pressable>
              </View>
            </Modal>

            <Modal
              isVisible={isModalWin}
              className="self-center"
              animationIn={'fadeIn'}
              animationInTiming={1000}
              animationOut={'fadeOut'}
              animationOutTiming={200}
              backdropOpacity={0.3}
            >
              <View style={styles.restart}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-SemiBold',
                    fontSize: 50,
                    color: 'white',
                    marginBottom: 120,
                  }}
                >
                  Parabéns!
                </Text>
                <Pressable
                  onPress={restartGame}
                  style={{
                    borderRadius: 10,
                    width: 100,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontFamily: 'Quicksand-SemiBold' }}>
                    Reiniciar
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('GameOptions')}
                  style={{
                    borderRadius: 10,
                    width: 100,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Quicksand-SemiBold',
                      textAlign: 'center',
                    }}
                  >
                    Tentar {'\n'} outro jogo
                  </Text>
                </Pressable>
              </View>
            </Modal>
          </View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLose: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  boardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 35,
  },
  background: {
    width: 400,
    height: 400,
    position: 'absolute',
    resizeMode: 'cover',
  },
  backgroundLose: {
    width: 400,
    height: 200,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 70,
    height: 70,
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 385,
    height: 140,
    marginBottom: 50,
    paddingHorizontal: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(126, 100, 190, 0.8)',
    zIndex: 3,
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 130,
    backgroundColor: 'rgb(235 225 235)',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  restart: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 300,
    height: 300,
    marginBottom: 50,
  },
})

export default Game2048
