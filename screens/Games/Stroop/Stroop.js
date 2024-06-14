import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { incrementarPontuacao, getPontuacao, resetarPontuacao, incrementarTotal, resetarTotal } from '../../../components/Games/pontuacao.js'
import LottieView from 'lottie-react-native'
import TopBarGames from '../../../components/Games/topBarGames.js'
import { MMKV } from 'react-native-mmkv'
import { API_URL } from '../../../.env/config.js'
import axios from 'axios'

const storage = new MMKV()

export default function Stroop() {
  const navigation = useNavigation()

  const [faseAtual, setFaseAtual] = useState(1) // Controla a fase atual do teste
  const [corReferencial, setCorReferencial] = useState(null) // Cor referencial para a palavra
  const [opcoesCores, setOpcoesCores] = useState([]) // Opções de cores para as alternativas
  const [indiceRespostaCorreta, setIndiceRespostaCorreta] = useState(null) // Índice da alternativa correta
  const [respostaCorreta, setRespostaCorreta] = useState(null)
  const [pontuacoes, setPontuacoes] = useState([]);
  const [sequenciaDiaria, setSequenciaDiaria] = useState(0); 

  const [modalVisible, setModalVisible] = useState(false)
  const [isModalOptions, setModalOptions] = useState(false)


  // Função para finalizar o jogo e armazenar pontuações
  const finalizarJogo = async () => {
    const pontuacaoAtual = getPontuacao(); // Obtém a pontuação atual
    const ultimasPontuacoes = JSON.parse(storage.getString('ultimasPontuacoes') || '[]');
  
    ultimasPontuacoes.push(pontuacaoAtual); // Adiciona a pontuação atual à array
  
    if (ultimasPontuacoes.length > 100) {
      ultimasPontuacoes.shift(); // Remove a pontuação mais antiga se houver mais de 100
    }
  
    storage.set('ultimasPontuacoes', JSON.stringify(ultimasPontuacoes)); // Armazena a array atualizada
  
    const melhorPontuacao = Math.max(...ultimasPontuacoes); // Calcula a melhor pontuação
    storage.set('melhorPontuacao', melhorPontuacao); // Armazena a melhor pontuação
  
    setModalVisible(true);

  }

  const atualizarFocusPoints = async () => {
    const pont = getPontuacao();
    const pontuacaoAtual = pont * 5
    try {
      const nomeUser = storage.getString('user.nameUser')
      const response = await axios.post(API_URL + '/updateFocusPoints', {focusPoints: pontuacaoAtual, nomeUser: nomeUser})
  
      if (response.status === 200) {
        console.log('Focus points atualizados com sucesso no backend.');
        
      } else {
        console.error('Erro ao atualizar focus points no backend.');
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação para atualizar focus points:', error);
    }
  }


  useEffect(() => {
    const ultimasPontuacoes = JSON.parse(storage.getString('ultimasPontuacoes') || '[]');
    setPontuacoes(ultimasPontuacoes);
  }, []);
  
  const handleTimerFinish = () => {
    atualizarFocusPoints()
    finalizarJogo()
    setModalVisible(true)
  }

  useEffect(() => {
    gerarFase() // Inicializa a primeira fase
  }, [])

  // Arrays com as cores em hexadecimal e seus respectivos nomes
  const coresHex = [
    '#FFFFFF',
    '#48E55A',
    '#DE1F1F',
    '#00D1E6',
    '#F3DE10',
    '#FE65F7',
    '#9D2EEC',
    '#FF8400',
    '#ABB4BD',
    '#2B3344',
  ]
  const nomesCores = [
    'BRANCO',
    'VERDE',
    'VERMELHO',
    'AZUL',
    'AMARELO',
    'ROSA',
    'ROXO',
    'LARANJA',
    'CINZA',
    'PRETO',
  ]

  const gerarFase = () => {
    // Escolhe aleatoriamente uma cor e sua respectiva palavra
    const indiceAleatorio = Math.floor(Math.random() * coresHex.length)
    const corEscolhida = coresHex[indiceAleatorio]

    // Escolhe aleatoriamente um nome de cor diferente da cor escolhida
    let indiceNomeCorEscolhida
    do {
      indiceNomeCorEscolhida = Math.floor(Math.random() * nomesCores.length)
    } while (nomesCores[indiceNomeCorEscolhida] === nomesCores[indiceAleatorio])

    const nomeCorEscolhida = nomesCores[indiceNomeCorEscolhida]

    // Define a cor referencial e suas opções
    setCorReferencial({ cor: corEscolhida, nome: nomeCorEscolhida })
    const opcoes = gerarOpcoesCores(indiceAleatorio)
    setOpcoesCores(opcoes)
    setIndiceRespostaCorreta(
      opcoes.findIndex((opcao) => opcao === corEscolhida),
    )
  }

  const gerarOpcoesCores = (indiceCorreta) => {
    if (faseAtual < 2) {
      // Função para gerar opções de cores para as alternativas
      const opcoes = []
      while (opcoes.length < 5) {
        const indiceAleatorio = Math.floor(Math.random() * coresHex.length)
        if (
          indiceAleatorio !== indiceCorreta &&
          !opcoes.includes(nomesCores[indiceAleatorio])
        ) {
          opcoes.push(nomesCores[indiceAleatorio])
        }
      }

      opcoes.splice(
        Math.floor(Math.random() * opcoes.length),
        0,
        coresHex[indiceCorreta],
      ) // Insere a cor correta em uma posição aleatória

      return opcoes
    } else {
      const opcoes = []
      while (opcoes.length < 7) {
        const indiceAleatorio = Math.floor(Math.random() * coresHex.length)
        if (
          indiceAleatorio !== indiceCorreta &&
          !opcoes.includes(coresHex[indiceAleatorio])
        ) {
          // Garante que a cor da caixa seja diferente das cores já escolhidas
          opcoes.push(coresHex[indiceAleatorio])
        }
      }

      // Insere a cor correta em uma posição aleatória
      opcoes.splice(
        Math.floor(Math.random() * opcoes.length),
        0,
        coresHex[indiceCorreta],
      )

      return opcoes
    }
  }

  const nomeMascarado = (cor) => {
    const indice = coresHex.indexOf(cor)
    if (indice !== -1) {
      return nomesCores[indice]
    }
    return cor
  }

  // Função para verificar se a resposta está correta
  const verificarResposta = (indice) => {
    if (faseAtual === 1) {
      resetarPontuacao()
      resetarTotal()
    }

    incrementarTotal();

    if (indice === indiceRespostaCorreta) {
      incrementarPontuacao() // Incrementa a pontuação
      console.log(`Pontuação: ${getPontuacao()}`)
      setRespostaCorreta(true)
    } else {
      console.log('Resposta incorreta')
      setRespostaCorreta(false)
    }
    setTimeout(() => {
      proximaFase() // Avança para a próxima fase
    }, 2100)
  } 

  // Função para ir para a próxima fase
  const proximaFase = () => {
    setFaseAtual(faseAtual + 1)
    gerarFase()
    setRespostaCorreta(null)
  }

  if (!corReferencial) {
    return null // Se a cor referencial não estiver definida, não renderiza nada
  }

  const obterTamanhoFonte = (cor) => {
    const tamanhoFontePorCor = {
      BRANCO: 36,
      VERDE: 41,
      VERMELHO: 29,
      AZUL: 45,
      AMARELO: 31,
      ROSA: 40,
      ROXO: 42,
      LARANJA: 33,
      CINZA: 41,
      PRETO: 40,
    }
    return tamanhoFontePorCor[cor] || 30 // Retorna 30 se o tamanho da fonte não estiver definido para a cor
  }

  const obterCorSombra = (corBotao) => {
    const corSombraBotao = {
      '#FFFFFF': '#8CAECE',
      '#48E55A': '#29A433',
      '#DE1F1F': '#860100',
      '#00D1E6': '#00979D',
      '#F3DE10': '#B88B22',
      '#FE65F7': '#B300B4',
      '#9D2EEC': '#4D1089',
      '#FF8400': '#BB4B01',
      '#ABB4BD': '#647682',
      '#2B3344': '#03080E',
    }
    return corSombraBotao[corBotao]
  }


  return (
    <SafeAreaView style={styles.container}>
      <TopBarGames
        duration={25}
        onTimerFinish={handleTimerFinish}
        restart='StroopInfo'
      />

      <View
        style={[
          styles.referencial,
          {
            backgroundColor:
              corReferencial.cor === '#2B3344' ? '#FFFFFF' : '#2B3344',
          },
        ]}
      >
        <Text style={[styles.texto, { color: corReferencial.cor }]}>
          {corReferencial.nome}
        </Text>
      </View>

      {faseAtual <= 2 ? (
        <View style={styles.opcoes}>
        {opcoesCores.map((cor, indice) => (
          <TouchableOpacity
            key={indice}
            style={styles.botaoSombra}
            onPress={() => verificarResposta(indice)}
          >
            <View style={styles.botao}>
              <Text
                style={[
                  styles.textoBotao,
                  { fontSize: obterTamanhoFonte(cor) },
                ]}
              >
                {nomeMascarado(cor)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      ) : (
        <View style={fase2.opcoes}>
          {opcoesCores.map((cor, indice) => {
            const corBotao = opcoesCores[(indice + 3) % opcoesCores.length] // Usando uma fórmula simples para obter índices diferentes
            const corSombra = obterCorSombra(corBotao) // Obtendo a cor de sombra com base na cor de fundo da caixa
            const corTexto = ['#2B3344', '#DE1F1F', '#9D2EEC'].includes(
              corBotao,
            )
              ? '#FFFFFF'
              : '#2B3344' // Verifica se a cor de fundo é preto, vermelho ou roxo

            return (
              <TouchableOpacity
                key={indice}
                style={[fase2.botaoSombra, { backgroundColor: corSombra }]}
                onPress={() => verificarResposta(indice)}
              >
                <View style={[fase2.botao, { backgroundColor: corBotao }]}>
                  <Text
                    style={[
                      fase2.textoBotao,
                      {
                        fontSize: obterTamanhoFonte(nomeMascarado(cor)),
                        color: corTexto,
                      },
                    ]}
                  >
                    {nomeMascarado(cor)}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      )}

      {respostaCorreta === true && (
        <View style={styles.lottieContainer}>
          <LottieView
            style={{ flex: 1, maxHeight: 200 }}
            source={require('../../../assets/StroopTest/correct.json')}
            autoPlay
            loop={false}
          />
        </View>
      )}

      {respostaCorreta === false && (
        <>
          <View style={styles.lottieContainer}>
            <LottieView
              style={{ flex: 1, maxHeight: 200 }}
              source={require('../../../assets/StroopTest/incorrect.json')}
              autoPlay
              loop={false}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#57407C',
  },
  referencial: {
    width: 340,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#2B3344',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 260,
  },
  texto: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  opcoes: {
    width: 360,
    height: 300,
    flexWrap: 'wrap',
    marginTop: 300,
  },
  botao: {
    width: 160,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    zIndex: 2,
    position: 'relative',
    top: -3,
    left: -2,
  },
  botaoSombra: {
    width: 162,
    height: 72,
    backgroundColor: '#8CAECE',
    marginVertical: 10,
    borderRadius: 7,
    marginHorizontal: 10,
    zIndex: 2,
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#2B3344',
  },
  lottieContainer: {
    height: 700,
    aspectRatio: 1,
    position: 'absolute',
    top: 205,
    zIndex: 2,
  },
})

const fase2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#57407C',
  },
  referencial: {
    width: 340,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#2B3344',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 260,
  },
  texto: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  opcoes: {
    width: 360,
    height: 450,
    flexWrap: 'wrap',
    marginTop: 300,
  },
  botao: {
    width: 160,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    zIndex: 2,
    position: 'relative',
    top: -3,
    left: -2,
  },
  botaoSombra: {
    width: 162,
    height: 72,
    marginVertical: 10,
    borderRadius: 7,
    marginHorizontal: 10,
    zIndex: 2,
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#2B3344',
  },
  lottieContainer: {
    height: 700,
    aspectRatio: 1,
    position: 'absolute',
    top: 205,
    zIndex: 2,
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
})