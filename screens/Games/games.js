import React, { useEffect, useState } from 'react'
// eslint-disable-next-line prettier/prettier
import { StyleSheet, View, Text, Animated, Easing, SafeAreaView, Pressable, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export default function Games() {
  const navigation = useNavigation()
  const [pontuacoes, setPontuacoes] = useState([]);
  const [sequenciaDiaria, setSequenciaDiaria] = useState(0);

  const spinValue = new Animated.Value(0)

  useEffect(() => {
    const sequenciaSalva = JSON.parse(storage.getItem('sequenciaDiaria'));
    const ultimasPontuacoes = JSON.parse(storage.getString('ultimasPontuacoes') || '[]');
    setPontuacoes(ultimasPontuacoes);
    setSequenciaDiaria(sequenciaSalva);
    calcularSomaPontuacoes()
  }, []);

  // Calcula a soma das pontuações presentes na array
  const calcularSomaPontuacoes = () => {
    return pontuacoes.reduce((total, pontuacao) => total + pontuacao, 0);
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 17000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Animated.Image
          style={{
            transform: [{ rotate: spin }],
            width: '200%',
            position: 'absolute',
            bottom: -200,
          }}
          source={require('../../assets/GamesScreen/backgroundgames.png')}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.28)', 'rgba(0, 0, 0, 0.001)']}
          style={{ width: '100%', height: 10, position: 'absolute', zIndex: 2 }}
        />

        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#633DE8',
            flexDirection: 'row',
          }}
        >
          <Pressable style={styles.alternanciasButtons}>
            <Text style={styles.opcoesAlternancias}>MINIGAMES</Text>
          </Pressable>
          <Pressable
            style={styles.alternanciasButtons1}
            onPress={() => navigation.navigate('Ranking')}
          >
            <Text style={styles.opcoesAlternancias}>RANKING</Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ padding: 10, paddingTop: 0 }}
        >
          <View
            style={{
              width: '100%',
              height: 70,
              backgroundColor: 'white',
              borderRadius: 5,
              marginVertical: 5,
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}
          >
            <Image
              source={require('../../assets/GamesScreen/FP.png')}
              style={{ width: 45, height: 45, marginHorizontal: 10 }}
            />
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.missoes}>OBJETIVO DIÁRIO:</Text>
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: 'Quicksand-SemiBold',
                  color: '#FF792F',
                }}
              >
                {calcularSomaPontuacoes()}
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Quicksand-SemiBold',
                    color: '#FF9459',
                  }}
                >
                  /1000
                </Text>
              </Text>
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <Text style={styles.missoes}>SEQUÊNCIA:</Text>
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: 'Quicksand-SemiBold',
                  color: '#FF792F',
                }}
              >
                 {sequenciaDiaria}
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Quicksand-SemiBold',
                    color: '#FF9459',
                  }}
                >
                  {' '}
                  DIA
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.categorias}>
            <Text style={[styles.categorygame, { color: '#FF3E3E' }]}>
              Foco
            </Text>

            <ScrollView
              style={{ flex: 1 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable
                style={styles.pressable}
                onPress={() => navigation.navigate('StroopInfo')}
              >
                <Image
                  source={require('../../assets/GamesScreen/GamesIcons/Stroop.png')}
                  style={styles.iconGame}
                />
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Quicksand-Bold',
                  }}
                >
                  Palavras de Cores
                </Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
            </ScrollView>
          </View>

          <View style={styles.categorias}>
            <Text style={[styles.categorygame, { color: '#FFB156' }]}>
              Memória
            </Text>

            <ScrollView
              style={{ flex: 1 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
            </ScrollView>
          </View>

          <View style={styles.categorias}>
            <Text style={[styles.categorygame, { color: '#FF00D6' }]}>
              Raciocínio
            </Text>

            <ScrollView
              style={{ flex: 1 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
            </ScrollView>
          </View>

          <View style={styles.categorias}>
            <Text style={[styles.categorygame, { color: '#1CBFE2' }]}>
              Linguagem
            </Text>

            <ScrollView
              style={{ flex: 1 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
            </ScrollView>
          </View>

          <View style={styles.categorias}>
            <Text style={[styles.categorygame, { color: '#FFB156' }]}>
              Memória
            </Text>

            <ScrollView
              style={{ flex: 1 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <View style={styles.empty} />
                <Text style={styles.vazio}>Vazio</Text>
              </Pressable>
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
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
  alternanciasButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  alternanciasButtons1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
  },
  opcoesAlternancias: {
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
  missoes: {
    fontFamily: 'Quicksand-SemiBold',
    color: '#FF9459',
  },
  categorygame: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    marginLeft: 14,
    marginTop: 5,
  },
  categorias: {
    width: '100%',
    height: 185,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 13,
  },
  pressable: {
    width: 90,
    alignItems: 'center',
    marginHorizontal: 14,
    justifyContent: 'center',
  },
  empty: {
    width: 85,
    height: 85,
    backgroundColor: 'rgba(178, 178, 178, 0.7)',
    borderRadius: 45,
  },
  vazio: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    color: '#A3A3A3',
    marginVertical: 10,
  },
  iconGame: {
    width: 105,
    height: 105,
    borderRadius: 45,
    marginBottom: 50,
  },
})
