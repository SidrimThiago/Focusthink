import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native'

const Card = () => {
  const [selectedCardIndexes, setSelectedCardIndexes] = useState([])
  const [randomCards, setRandomCards] = useState([])
  const [score, setScore] = useState(0)
  const [fixedCards, setFixedCards] = useState([])

  const cards = [
    {
      id: 0,
      source: require('../../../assets/memory/death.png'),
    },
    {
      id: 1,
      source: require('../../../assets/memory/chariot.png'),
    },
    {
      id: 2,
      source: require('../../../assets/memory/high-priestess.png'),
    },
    {
      id: 3,
      source: require('../../../assets/memory/justice.png'),
    },
    {
      id: 4,
      source: require('../../../assets/memory/lover.png'),
    },
    {
      id: 5,
      source: require('../../../assets/memory/pendu.png'),
    },
    {
      id: 6,
      source: require('../../../assets/memory/tower.png'),
    },
    {
      id: 7,
      source: require('../../../assets/memory/strength.png'),
    },
    {
      id: 8,
      source: require('../../../assets/memory/judegment.png'),
    },
    {
      id: 9,
      source: require('../../../assets/memory/fool.png'),
    },
    {
      id: 10,
      source: require('../../../assets/memory/world.png'),
    },
    {
      id: 11,
      source: require('../../../assets/memory/wheel.png'),
    },
    {
      id: 12,
      source: require('../../../assets/memory/temperance.png'),
    },
    {
      id: 13,
      source: require('../../../assets/memory/moon.png'),
    },
    {
      id: 14,
      source: require('../../../assets/memory/sun.png'),
    },
    {
      id: 15,
      source: require('../../../assets/memory/devil.png'),
    },
    {
      id: 16,
      source: require('../../../assets/memory/hermit.png'),
    },
  ]

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffledArray = [...array]
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ]
      }
      return shuffledArray
    }

    const shuffledCards = shuffleArray(cards)
    const randomCards = shuffledCards.slice(0, 12)

    const selectedRandomCards = shuffleArray(randomCards).slice(0, 6)

    const duplicatedCards = [
      ...selectedRandomCards,
      ...selectedRandomCards.map((card) => ({
        ...card,
        name: card.id,
        id: card.id + 100,
      })),
    ]

    const finalCards = shuffleArray(duplicatedCards)

    setRandomCards(finalCards)
  }, [])

  const handleCardPress = (cardIndex) => {
    if (
      selectedCardIndexes.length < 2 &&
      !selectedCardIndexes.includes(cardIndex)
    ) {
      setSelectedCardIndexes([...selectedCardIndexes, cardIndex])
      if (selectedCardIndexes.length === 1) {
        const firstCardIndex = selectedCardIndexes[0]
        const firstCard = randomCards.find((card) => card.id === firstCardIndex)
        const secondCard = randomCards.find((card) => card.id === cardIndex)
        if (firstCard && secondCard && firstCard.id === secondCard.id - 100) {
          setScore(score + 10)
          // Fixa os cards que foram encontrados
          setFixedCards([...fixedCards, firstCardIndex, cardIndex])
          setTimeout(() => {
            setSelectedCardIndexes([])
          }, 500)
        } else {
          setTimeout(() => {
            setSelectedCardIndexes([])
          }, 500)
        }
      }
    }
  }

  const isCardSelected = (cardIndex) => {
    return selectedCardIndexes.includes(cardIndex)
  }

  const isCardFixed = (cardIndex) => {
    return fixedCards.includes(cardIndex)
  }

  const chunkArray = (arr, chunkSize) => {
    return Array.from(
      { length: Math.ceil(arr.length / chunkSize) },
      (_, index) => arr.slice(index * chunkSize, index * chunkSize + chunkSize),
    )
  }

  const chunkedCards = chunkArray(randomCards, 4)

  return (
    <View style={styles.container}>
      <Text className="text-base pb-4"></Text>
      {chunkedCards.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.rowContainer}>
          {row.map((card, colIndex) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => handleCardPress(card.id)}
              disabled={isCardSelected(card.id) || isCardFixed(card.id)}
            >
              <View
                style={[
                  styles.cardContainer,
                  isCardSelected(card.id) && styles.selectedCard,
                  isCardFixed(card.id) && styles.fixedCard,
                ]}
              >
                <Image
                  alt="card"
                  source={
                    isCardSelected(card.id) || isCardFixed(card.id)
                      ? card.source
                      : require('../../../assets/memory/CardBack.png')
                  }
                  style={styles.card}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 75,
    height: 150,
    margin: 2,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    margin: 5,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: 'orange',
  },
  fixedCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
})

export default Card
