import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native'
import {
  incrementarPontuacao,
  getPontuacao,
  resetarPontuacao,
  incrementarTotal,
  resetarTotal,
} from '../../../components/Games/pontuacao.js'
import TopBarGames from '../../../components/Games/topBarGames.js'
import LottieView from 'lottie-react-native'

export default function HiddenColors() {
  const [fase, setFase] = useState(1)

  const [modalVisible, setModalVisible] = useState(false)
  const [isModalOptions, setModalOptions] = useState(false)

  const [topColors, setTopColors] = useState(['', '', ''])
  const [filledCount, setFilledCount] = useState(0)
  const [previousGuesses, setPreviousGuesses] = useState([])
  const [hiddenColors, setHiddenColors] = useState([
    '#FFB30B',
    '#18991A',
    '#462DE1',
  ]) // Example hidden colors

  const [correct, setCorrect] = useState(false)

  const [color1, setColor1] = useState('#FFB30B')
  const [color2, setColor2] = useState('#18991A')
  const [color3, setColor3] = useState('#462DE1')
  const [color4, setColor4] = useState('#D01D18')
  const [color5, setColor5] = useState('#DD35FC')
  const [color6, setColor6] = useState('#00E6FE')
  const [color7, setColor7] = useState('#9C3E31')
  const [color8, setColor8] = useState('#FF5800')

  const [shadowColor1, setShadowColor1] = useState('#BF8706')
  const [shadowColor2, setShadowColor2] = useState('#127211')
  const [shadowColor3, setShadowColor3] = useState('#3621A8')
  const [shadowColor4, setShadowColor4] = useState('#9C1613')
  const [shadowColor5, setShadowColor5] = useState('#A827BB')
  const [shadowColor6, setShadowColor6] = useState('#01ACBE')
  const [shadowColor7, setShadowColor7] = useState('#7D2A1F')
  const [shadowColor8, setShadowColor8] = useState('#BE4200')

  const [pressable1, setPressable1] = useState(false)
  const [pressable2, setPressable2] = useState(false)
  const [pressable3, setPressable3] = useState(false)
  const [pressable4, setPressable4] = useState(false)
  const [pressable5, setPressable5] = useState(false)
  const [pressable6, setPressable6] = useState(false)
  const [pressable7, setPressable7] = useState(false)
  const [pressable8, setPressable8] = useState(false)

  let widthPressable
  if (fase < 5) {
    widthPressable = 125
  } else {
    widthPressable = 90
  }

  useEffect(() => {
    resetarPontuacao()
    resetarTotal()
  }, [])

  useEffect(() => {
    setHiddenColors(generateRandomColors())
  }, [fase])

  useEffect(() => {
    if (filledCount === getMaxSelections()) {
      checkColors()
    }
  }, [filledCount])

  function generateRandomColors() {
    let colors = []
    if (fase === 1) {
      colors = ['#FFB30B', '#18991A', '#462DE1', '#D01D18']
    } else if (fase >= 2 && fase < 4) {
      colors = ['#FFB30B', '#18991A', '#462DE1', '#D01D18', '#DD35FC']
    } else if (fase === 4) {
      colors = [
        '#FFB30B',
        '#18991A',
        '#462DE1',
        '#D01D18',
        '#DD35FC',
        '#00E6FE',
      ]
    } else if (fase >= 5) {
      colors = [
        '#FFB30B',
        '#18991A',
        '#462DE1',
        '#D01D18',
        '#DD35FC',
        '#00E6FE',
        '#9C3E31',
        '#FF5800',
      ]
    }

    const selectedColors = []
    while (selectedColors.length < getMaxSelections()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      if (!selectedColors.includes(randomColor)) {
        selectedColors.push(randomColor)
      }
    }
    return selectedColors
  }

  function getMaxSelections() {
    if (fase === 1) return 3
    if (fase >= 2 && fase < 5) return 4
    if (fase >= 5) return 6
  }

  const handlePress = (color, index) => {
    if (filledCount < getMaxSelections()) {
      const newTopColors = [...topColors]
      newTopColors[filledCount] = color
      setTopColors(newTopColors)
      setFilledCount(filledCount + 1)

      switch (index) {
        case 1:
          setColor1('#9DB5BF')
          setShadowColor1('#73878E')
          setPressable1(true)
          break
        case 2:
          setColor2('#9DB5BF')
          setShadowColor2('#73878E')
          setPressable2(true)
          break
        case 3:
          setColor3('#9DB5BF')
          setShadowColor3('#73878E')
          setPressable3(true)
          break
        case 4:
          setColor4('#9DB5BF')
          setShadowColor4('#73878E')
          setPressable4(true)
          break
        case 5:
          setColor5('#9DB5BF')
          setShadowColor5('#73878E')
          setPressable5(true)
          break
        case 6:
          setColor6('#9DB5BF')
          setShadowColor6('#73878E')
          setPressable6(true)
          break
        case 7:
          setColor7('#9DB5BF')
          setShadowColor7('#73878E')
          setPressable7(true)
          break
        case 8:
          setColor8('#9DB5BF')
          setShadowColor8('#73878E')
          setPressable8(true)
          break
        default:
          break
      }
    }
  }

  const checkColors = () => {
    const indicators = topColors.map((color, index) => {
      if (color === hiddenColors[index]) {
        return '#36CB00' // Correct position
      } else if (hiddenColors.includes(color)) {
        return '#FFFFFF' // Exists but incorrect position
      } else {
        return '#000000' // Does not exist
      }
    })

    if (JSON.stringify(topColors) === JSON.stringify(hiddenColors)) {
      console.log('Parabéns!')
      setCorrect(true)
      setPreviousGuesses([
        ...previousGuesses,
        { colors: [...topColors], indicators },
      ])
      resetGame(true) // Reset game completely on correct guess
    } else {
      console.log('Sequência incorreta!')
      setPreviousGuesses([
        ...previousGuesses,
        { colors: [...topColors], indicators },
      ])
      resetGame(false) // Reset game partially on incorrect guess
    }
  }

  const resetGame = (isCorrect) => {
    setTopColors(['', '', ''])
    setFilledCount(0)
    setColor1('#FFB30B')
    setColor2('#18991A')
    setColor3('#462DE1')
    setColor4('#D01D18')
    setColor5('#DD35FC')
    setColor6('#00E6FE')
    setColor7('#9C3E31')
    setColor8('#FF5800')

    setShadowColor1('#BF8706')
    setShadowColor2('#127211')
    setShadowColor3('#3621A8')
    setShadowColor4('#9C1613')
    setShadowColor5('#A827BB')
    setShadowColor6('#01ACBE')
    setShadowColor7('#7D2A1F')
    setShadowColor8('#BE4200')

    setPressable1(false)
    setPressable2(false)
    setPressable3(false)
    setPressable4(false)
    setPressable5(false)
    setPressable6(false)
    setPressable7(false)
    setPressable8(false)

    setCorrect(false)

    if (isCorrect) {
      setCorrect(true)
      setTimeout(() => {
        setPreviousGuesses([]) // Clear previous guesses if correct
        setFase(fase + 1)
        incrementarPontuacao()
        setHiddenColors(generateRandomColors())
      }, 2100)
    }

    incrementarTotal()
    console.log(`Fase: ${fase}`)
    console.log(`Pontuação: ${getPontuacao()}`)
  }

  const renderBoxes = () => {
    let numBoxes
    if (fase === 1) {
      numBoxes = 3
    } else if (fase >= 2 && fase < 5) {
      numBoxes = 4
    } else if (fase >= 5) {
      numBoxes = 6
    }

    const shadowColors = topColors.map((color) => {
      switch (color) {
        case '#FFB30B':
          return '#BF8706'
        case '#18991A':
          return '#127211'
        case '#462DE1':
          return '#3621A8'
        case '#D01D18':
          return '#9C1613'
        case '#DD35FC':
          return '#A827BB'
        case '#00E6FE':
          return '#01ACBE'
        case '#9C3E31':
          return '#7D2A1F'
        case '#FF5800':
          return '#BE4200'
        default:
          return '#73878E'
      }
    })

    return Array.from({ length: numBoxes }, (_, index) => {
      const shadowColor = shadowColors[index] || '#73878E'

      return (
        <Pressable
          key={index}
          style={[
            styles.box,
            {
              backgroundColor: shadowColor,
              width: fase >= 5 ? 45 : 75,
              paddingBottom: shadowColor === '#73878E' ? 0 : 7,
              paddingTop: shadowColor === '#73878E' ? 7 : 0,
            },
          ]}
        >
          <View
            style={[
              styles.shadowBoxs,
              { backgroundColor: topColors[index] || '#9DB5BF' },
            ]}
          />
        </Pressable>
      )
    })
  }

  const renderPreviousGuesses = () => {
    return previousGuesses.map((guess, index) => {
      let numBoxes
      if (fase === 1) {
        numBoxes = 3
      } else if (fase >= 2 && fase < 5) {
        numBoxes = 4
      } else if (fase >= 5) {
        numBoxes = 6
      }

      let indicatorWidth
      if (fase === 1) {
        indicatorWidth = 15
      } else if (fase >= 2 && fase < 5) {
        indicatorWidth = 11
      } else if (fase >= 5) {
        indicatorWidth = 7
      }

      const shadowColors = guess.colors.map((color) => {
        switch (color) {
          case '#FFB30B':
            return '#BF8706'
          case '#18991A':
            return '#127211'
          case '#462DE1':
            return '#3621A8'
          case '#D01D18':
            return '#9C1613'
          case '#DD35FC':
            return '#A827BB'
          case '#00E6FE':
            return '#01ACBE'
          case '#9C3E31':
            return '#7D2A1F'
          case '#FF5800':
            return '#BE4200'
          default:
            return '#9DB5BF'
        }
      })

      return (
        <View key={index} style={styles.lines}>
          {Array.from({ length: numBoxes }, (_, idx) => (
            <View
              key={idx}
              style={[
                styles.box,
                {
                  backgroundColor: shadowColors[idx],
                  width: fase >= 5 ? 45 : 75,
                },
              ]}
            >
              <View
                style={[
                  styles.shadowBoxs,
                  { backgroundColor: guess.colors[idx] || '#9DB5BF' },
                ]}
              />
            </View>
          ))}
          <View style={[styles.indications, { backgroundColor: '#C3D5DF' }]}>
            {Array.from({ length: numBoxes }, (_, idx) => (
              <View
                key={idx}
                style={[
                  styles.indicators,
                  {
                    backgroundColor: guess.indicators[idx] || '#9DB5BF',
                    width: indicatorWidth,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBarGames
        duration={50}
        onTimerFinish={() => setModalVisible(true)}
        restart="HiddenColorsInfo"
      />
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          width: '100%',
          height: '60%',
          flexDirection: 'column-reverse',
        }}
      >
        <View style={styles.lines}>
          {renderBoxes()}
          <View style={[styles.indications, { backgroundColor: '#C3D5DF' }]} />
        </View>
        <View>{renderPreviousGuesses()}</View>
      </View>

      <View
        style={{
          width: '100%',
          height: '100%',
          borderTopWidth: 6,
          borderColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10%',
          marginTop: '6%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: fase >= 5 ? '120%' : '100%',
            alignSelf: 'center',
          }}
        >
          <Pressable
            onPress={() => handlePress('#FFB30B', 1)}
            disabled={pressable1}
            style={[
              styles.pressable,
              {
                backgroundColor: shadowColor1,
                width: widthPressable,
                paddingBottom: pressable1 ? 0 : 7,
                paddingTop: pressable1 ? 7 : 0,
              },
            ]}
          >
            <View style={[styles.shadow, { backgroundColor: color1 }]} />
          </Pressable>
          <Pressable
            onPress={() => handlePress('#18991A', 2)}
            disabled={pressable2}
            style={[
              styles.pressable,
              {
                backgroundColor: shadowColor2,
                width: widthPressable,
                paddingBottom: pressable2 ? 0 : 7,
                paddingTop: pressable2 ? 7 : 0,
              },
            ]}
          >
            <View style={[styles.shadow, { backgroundColor: color2 }]} />
          </Pressable>
          <Pressable
            onPress={() => handlePress('#462DE1', 3)}
            disabled={pressable3}
            style={[
              styles.pressable,
              {
                backgroundColor: shadowColor3,
                width: widthPressable,
                paddingBottom: pressable3 ? 0 : 7,
                paddingTop: pressable3 ? 7 : 0,
              },
            ]}
          >
            <View style={[styles.shadow, { backgroundColor: color3 }]} />
          </Pressable>
          <Pressable
            onPress={() => handlePress('#D01D18', 4)}
            disabled={pressable4}
            style={[
              styles.pressable,
              {
                backgroundColor: shadowColor4,
                width: widthPressable,
                paddingBottom: pressable4 ? 0 : 7,
                paddingTop: pressable4 ? 7 : 0,
              },
            ]}
          >
            <View style={[styles.shadow, { backgroundColor: color4 }]} />
          </Pressable>
          {fase >= 2 && (
            <Pressable
              onPress={() => handlePress('#DD35FC', 5)}
              disabled={pressable5}
              style={[
                styles.pressable,
                {
                  backgroundColor: shadowColor5,
                  width: widthPressable,
                  paddingBottom: pressable5 ? 0 : 7,
                  paddingTop: pressable5 ? 7 : 0,
                },
              ]}
            >
              <View style={[styles.shadow, { backgroundColor: color5 }]} />
            </Pressable>
          )}
          {fase >= 4 && (
            <Pressable
              onPress={() => handlePress('#00E6FE', 6)}
              disabled={pressable6}
              style={[
                styles.pressable,
                {
                  backgroundColor: shadowColor6,
                  width: widthPressable,
                  paddingBottom: pressable6 ? 0 : 7,
                  paddingTop: pressable6 ? 7 : 0,
                },
              ]}
            >
              <View style={[styles.shadow, { backgroundColor: color6 }]} />
            </Pressable>
          )}
          {fase >= 5 && (
            <>
              <Pressable
                onPress={() => handlePress('#9C3E31', 7)}
                disabled={pressable7}
                style={[
                  styles.pressable,
                  {
                    backgroundColor: shadowColor7,
                    width: widthPressable,
                    paddingBottom: pressable7 ? 0 : 7,
                    paddingTop: pressable7 ? 7 : 0,
                  },
                ]}
              >
                <View style={[styles.shadow, { backgroundColor: color7 }]} />
              </Pressable>
              <Pressable
                onPress={() => handlePress('#FF5800', 8)}
                disabled={pressable8}
                style={[
                  styles.pressable,
                  {
                    backgroundColor: shadowColor8,
                    width: widthPressable,
                    paddingBottom: pressable8 ? 0 : 7,
                    paddingTop: pressable8 ? 7 : 0,
                  },
                ]}
              >
                <View style={[styles.shadow, { backgroundColor: color8 }]} />
              </Pressable>
            </>
          )}
        </View>
      </View>

      {correct === true && (
        <View style={styles.lottieContainer}>
          <LottieView
            style={{ flex: 1, maxHeight: 200 }}
            source={require('../../../assets/StroopTest/correct.json')}
            autoPlay
            loop={false}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#57407C',
  },
  lines: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  box: {
    height: 40,
    margin: 5,
    borderRadius: 10,
    paddingBottom: 7,
  },
  shadowBoxs: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  indications: {
    width: 60,
    height: 40,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  indicators: {
    height: '90%',
    borderRadius: 100,
  },
  pressable: {
    height: 42,
    borderRadius: 10,
    margin: 10,
  },
  shadow: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  lottieContainer: {
    height: 700,
    aspectRatio: 1,
    position: 'absolute',
    top: 255,
    zIndex: 2,
  },
})
