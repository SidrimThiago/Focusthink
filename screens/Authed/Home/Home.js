/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, StatusBar, View, Text, Image, SafeAreaView, ScrollView, Pressable, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MMKV } from 'react-native-mmkv'
import YoutubePlayer from 'react-native-youtube-iframe'

import Icon1 from '../../../assets/Home/jogododia.svg'
import Icon2 from '../../../assets/Home/controllerjogos.svg'
import Form from '../../../assets/Home/form.svg'

const storage = new MMKV()

const BANNER_H = 450;
const TOPNAVI_H = 250;

export default function Home(props) {
  const navigation = useNavigation()
  const nameUser = storage.getString('user.nameUser')
  const scrollA = useRef(new Animated.Value(0)).current
  const safeArea = useSafeAreaInsets()

  const { title, scrollB } = props
  const isFloating = scrollB
  const [isTransparent, setTransparent] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState('Principal')

  useEffect(() => {
    if (!scrollA) {
      return
    }
    const listenerId = scrollA.addListener(a => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top
      isTransparent !== a.value < topNaviOffset &&
        setTransparent(!isTransparent)
    })
    return () => scrollA.removeListener(listenerId)
  })

  const renderContent = () => {
    switch (selectedTopic) {
      case 'Principal':
        return (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={styles.box}>
                <Image alt="image" source={require('../../../assets/Home/JogoDoDia.png')} resizeMode='cover' style={styles.imageBox} />
                <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
                  <Icon1 />
                </View>
  
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 14, color: 'white', position: 'absolute', textAlign: 'right', left: 10, top: 7 }}>Jogo do dia:</Text>
  
                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 20, color: 'white', position: 'absolute', textAlign: 'right', right: 12, top: 22, }}>Palavras{'\n'}de Cores</Text>
  
                <Pressable style={{ width: '40%', height: 40, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, right: 15 }}
                  onPress={() => navigation.navigate('StroopInfo')}>
                  <Text style={{ fontFamily: 'Quicksand-Bold' }}>Jogar</Text>
                </Pressable>
              </View>
  
              <View style={styles.box}>
                <Image alt="image" source={require('../../../assets/Home/TodosOsJogos.png')} resizeMode='cover' style={styles.imageBox} />
                <View style={{ position: 'absolute', bottom: 0, left: 0, maxWidth: 88.5, overflow: 'hidden' }}>
                  <Icon2 />
                </View>
  
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 20, color: 'white', position: 'absolute', textAlign: 'right', right: 8, margin: 10 }}>Todos os{'\n'}jogos</Text>
  
                <Pressable style={{ width: '35%', height: 40, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, right: 15 }}
                  onPress={() => navigation.navigate('Jogos')}>
                  <Text style={{ fontFamily: 'Quicksand-Bold' }}>Ir</Text>
                </Pressable>
              </View>
            </View>
  
            <View style={{ flexDirection: 'row', backgroundColor: '#FF7D34', justifyContent: 'space-evenly', borderRadius: 10, marginVertical: 5 }}>
              <View style={{ justifyContent: 'space-evenly', alignItems: 'center', width: '50%' }}>
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 24, color: 'white' }}> Especialistas {'\n'} disponíveis</Text>
                <Pressable style={{ width: '75%', height: 40, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => navigation.navigate('Profissionals')}>
                  <Text style={{ fontFamily: 'Quicksand-Bold' }}>Ver</Text>
                </Pressable>
              </View>
              <Image
                alt="image"
                source={require('../../../assets/Home/especialist.png')}
                resizeMode='contain'
                style={{ height: 195, width: '50%' }}
              />
            </View>
  
            <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly', borderRadius: 10, marginVertical: 5, height: 155, overflow: 'hidden', alignItems: 'center' }}>
              <Image alt="image" source={require('../../../assets/Home/fundoforms.png')} resizeMode='cover' style={{ height: '100%', width: '100%', position: 'absolute', left: 0 }} />
              <Form width={'40%'} />
              <View style={{ width: '60%', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 20, color: '#272626', textAlign: 'center' }}>Formulário SNAP-IV</Text>
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 12, color: '#3C3C3C', textAlign: 'center', marginVertical: 5 }}>Teste a probabilidade de{'\n'}você ter TDAH.</Text>
                <Pressable style={{ width: '75%', height: 40, backgroundColor: '#FF7D34', borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}
                  onPress={() => navigation.navigate('Questionary')}>
                  <Text style={{ fontFamily: 'Quicksand-Bold', color: 'white' }}>Realizar</Text>
                </Pressable>
              </View>
            </View>
  
            <View style={{ height: 100, width: '100%', borderRadius: 10 }} />
          </View>
        )
      case 'TDAH':
        return (
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Por que é tão séria essa patologia?</Text>
              <Text style={styles.infoText}>O TDAH (Transtorno de Déficit de Atenção e Hiperatividade) é uma condição séria que pode afetar todas as áreas da vida de uma pessoa. Pode interferir na capacidade de aprender, trabalhar e manter relacionamentos saudáveis. É essencial entender a gravidade do TDAH para que possa ser tratado de maneira adequada e eficaz.</Text>
              <Text style={styles.infoQuote}>- Dr. José Almeida, 2004</Text>
            </View>
            <YoutubePlayer height={200} videoId="gqMv8zbnf2k" />
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Como aplicativos podem auxiliar seu dia a dia</Text>
              <Text style={styles.infoText}>Aplicativos de gerenciamento de tarefas, lembretes e cronômetros podem ser ferramentas valiosas para ajudar indivíduos com TDAH a se manterem organizados e focados. Esses aplicativos oferecem estrutura e apoio, facilitando a gestão do tempo e das responsabilidades diárias.</Text>
              <Text style={styles.infoQuote}>- Dr. Ana Silva, 2010</Text>
            </View>
            <YoutubePlayer height={200} videoId="gptcc6qWJgc" />
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Dicas para lidar com o TDAH</Text>
              <Text style={styles.infoText}>Lidar com o TDAH pode ser desafiador, mas existem várias estratégias que podem ajudar. Estabelecer rotinas diárias, usar listas de verificação e dividir tarefas grandes em pequenas etapas são algumas das maneiras de melhorar a gestão dos sintomas.</Text>
              <Text style={styles.infoQuote}>- Dr. Ricardo Mendes, 2015</Text>
            </View>
            <YoutubePlayer height={200} videoId="knu4hQmvqpU" />
          </View>
        )
      case 'Organização':
        return (
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Importância da Organização</Text>
              <Text style={styles.infoText}>A organização é fundamental para aumentar a produtividade e reduzir o estresse. Manter um ambiente de trabalho organizado pode ajudar a melhorar a concentração e a eficiência, permitindo que as tarefas sejam concluídas de maneira mais rápida e com menos esforço.</Text>
              <Text style={styles.infoQuote}>- Dr. Laura Costa, 2007</Text>
            </View>
            <YoutubePlayer height={200} videoId="zMWc0De2k-A" />
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Ferramentas para ajudar na Organização</Text>
              <Text style={styles.infoText}>Existem várias ferramentas disponíveis que podem ajudar na organização, desde aplicativos de gerenciamento de tarefas até planners e bullet journals. Escolher a ferramenta certa pode fazer uma grande diferença na capacidade de se manter organizado.</Text>
              <Text style={styles.infoQuote}>- Dr. Marcelo Pinto, 2011</Text>
            </View>
            <YoutubePlayer height={200} videoId="RS5MT7dOUDM" />
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Dicas para se manter organizado</Text>
              <Text style={styles.infoText}>Para se manter organizado, é importante criar uma rotina e segui-la. Use listas de tarefas, defina prioridades e reserve um tempo para organizar seu espaço de trabalho regularmente. Essas práticas podem ajudar a manter a ordem e melhorar a eficiência.</Text>
              <Text style={styles.infoQuote}>- Dr. Fernanda Santos, 2013</Text>
            </View>
            <YoutubePlayer height={200} videoId="TDnWI7j5bG0" />
        </View>
      )
    case 'Estudos':
      return (
        <View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Técnicas de Estudo Eficazes</Text>
            <Text style={styles.infoText}>Técnicas de estudo eficazes incluem métodos como a leitura ativa, anotações estratégicas e a prática da recuperação. Essas técnicas ajudam a melhorar a compreensão e a retenção do conteúdo, tornando o processo de aprendizado mais eficiente.</Text>
            <Text style={styles.infoQuote}>- Prof. Carlos Oliveira, 2008</Text>
          </View>
          <YoutubePlayer height={200} videoId="NQqvlM2lGOU" />
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Organização dos Estudos</Text>
            <Text style={styles.infoText}>Manter um cronograma de estudos e um ambiente de aprendizado organizado são essenciais para maximizar o tempo e os resultados. Planeje suas sessões de estudo, defina metas claras e elimine distrações para se concentrar melhor no material.</Text>
            <Text style={styles.infoQuote}>- Prof. Maria Antunes, 2012</Text>
          </View>
          <YoutubePlayer height={200} videoId="PvjjCs7fWuA" />
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Como manter a motivação</Text>
            <Text style={styles.infoText}>Manter a motivação nos estudos pode ser desafiador, mas é fundamental para o sucesso acadêmico. Estabeleça metas realistas, celebre pequenas conquistas e encontre formas de tornar o estudo mais interessante e envolvente.</Text>
            <Text style={styles.infoQuote}>- Prof. Beatriz Souza, 2014</Text>
          </View>
          <YoutubePlayer height={200} videoId="NetGMY10OIU" />
        </View>
      )
    case 'Ferramentas':
      return (
        <View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Melhores Ferramentas para Produtividade</Text>
            <Text style={styles.infoText}>Ferramentas como aplicativos de lista de tarefas, gerenciadores de projetos e cronômetros podem aumentar significativamente a produtividade. Elas ajudam a organizar tarefas, acompanhar o progresso e gerenciar o tempo de forma eficiente.</Text>
            <Text style={styles.infoQuote}>- Dr. Gustavo Lima, 2016</Text>
          </View>
          <YoutubePlayer height={200} videoId="M8xWFTNcmoQ" />
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Aplicativos Úteis para TDAH</Text>
            <Text style={styles.infoText}>Existem vários aplicativos projetados para ajudar indivíduos com TDAH a se organizarem melhor e a manterem o foco. Esses aplicativos oferecem funcionalidades como lembretes, listas de tarefas e cronômetros para ajudar a gerenciar o tempo e as tarefas diárias.</Text>
            <Text style={styles.infoQuote}>- Dr. Pedro Fernandes, 2018</Text>
          </View>
          <YoutubePlayer height={200} videoId="gHXDnm6dnJc" />
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Dicas de Tecnologia para Organização</Text>
            <Text style={styles.infoText}>A tecnologia pode ser uma grande aliada na organização pessoal. Utilize aplicativos de notas, gerenciadores de tarefas e ferramentas de colaboração para manter tudo em ordem e facilitar o acesso às informações importantes.</Text>
            <Text style={styles.infoQuote}>- Dr. Carolina Ribeiro, 2020</Text>
          </View>
          <YoutubePlayer height={200} videoId="icCFIoDxlVM" />
        </View>
      )
    default:
      return null
  }
}

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: StatusBar.currentHeight, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, zIndex: 1 }}>
        <View style={styles.container(safeArea, isFloating, isTransparent)}>
          <Animated.Text style={[styles.title(isTransparent, scrollA), { fontFamily: 'Quicksand-Medium', fontSize: 24 }]}> Seja bem vindo ! </Animated.Text>
          <Animated.Text style={[styles.title(isTransparent, scrollA), { fontFamily: 'Quicksand-Bold', fontSize: 42 }]}> {nameUser}</Animated.Text>
        </View>
      </View>

      <Animated.Image
        style={[styles.banner(scrollA), { alignSelf: 'center' }]}
        source={require('../../../assets/Home/homeimage.png')}
      />

      <View style={{ borderTopRightRadius: 45, borderTopStartRadius: 45, overflow: 'hidden', height: '100%', flex: 2 }}>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: '45%' }}
          stickyHeaderIndices={[0]}
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
        >

          <View style={{ borderTopStartRadius: 45, borderTopEndRadius: 45, overflow: 'hidden', zIndex: 1 }}>
            <ScrollView style={{ backgroundColor: '#633DE8', paddingVertical: 10 }} contentContainerStyle={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() => setSelectedTopic('Principal')}
                style={[styles.topBar, { backgroundColor: selectedTopic === 'Principal' ? '#FF7425' : 'white', borderColor: '#B95E2B', marginLeft: 10 }]}
              >
                <Text style={[styles.topBarText, { color: selectedTopic === 'Principal' ? 'white' : 'black' }]}>Principal</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedTopic('TDAH')}
                style={[styles.topBar, { backgroundColor: selectedTopic === 'TDAH' ? '#FF7425' : 'white', borderColor: '#B95E2B' }]}
              >
                <Text style={[styles.topBarText, { color: selectedTopic === 'TDAH' ? 'white' : 'black' }] }>TDAH</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedTopic('Organização')}
                style={[styles.topBar, { backgroundColor: selectedTopic === 'Organização' ? '#FF7425' : 'white', borderColor: '#B95E2B' }]}
              >
                <Text style={[styles.topBarText, { color: selectedTopic === 'Organização' ? 'white' : 'black' }]}>Organização</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedTopic('Estudos')}
                style={[styles.topBar, { backgroundColor: selectedTopic === 'Estudos' ? '#FF7425' : 'white', borderColor: '#B95E2B' }]}
              >
                <Text style={[styles.topBarText, { color: selectedTopic === 'Estudos' ? 'white' : 'black' }]}>Estudos</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedTopic('Ferramentas')}
                style={[styles.topBar, { backgroundColor: selectedTopic === 'Ferramentas' ? '#FF7425' : 'white', borderColor: '#B95E2B', marginRight: 10 }]}
              >
                <Text style={[styles.topBarText, { color: selectedTopic === 'Ferramentas' ? 'white' : 'black' }]}>Ferramentas</Text>
              </Pressable>
            </ScrollView>
          </View>

          <LinearGradient colors={['#633DE8', '#283C8C']} style={{ padding: 10 }}>
            {renderContent()}
          </LinearGradient>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '120%',
    position: 'absolute',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [0, BANNER_H / 3, BANNER_H / 3],
          outputRange: [0, -BANNER_H / 8, -BANNER_H / 8],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [0, BANNER_H / 2, BANNER_H / 2],
          outputRange: [1, 0.85, 0.85],
        }),
      },
    ],
  }),
  container: (safeArea, isFloating, isTransparent) => ({
    marginBottom: isFloating ? TOPNAVI_H - safeArea.top : 0,
    height: -TOPNAVI_H + safeArea.top,
    justifyContent: 'center',
    shadowOffset: { y: 0 },
    shadowOpacity: isTransparent ? 0 : 0.5,
    zIndex: 100,
  }),
  title: (isTransparent, scrollA) => ({
    color: '#FFF',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    opacity: scrollA.interpolate({
      inputRange: [0, BANNER_H - TOPNAVI_H],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  }),
  topBar: {
    width: 138,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#A3A3A3',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topBarText: {
    fontFamily: 'Quicksand-Bold',
    color: 'black',
    fontSize: 16,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '49%',
    height: 135,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBox: {
    width: '100%',
    height: '100%',
  },
  contentText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  infoTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  infoText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  infoQuote: {
    fontFamily: 'Quicksand-Italic',
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
  },
})


