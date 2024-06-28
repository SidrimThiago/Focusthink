/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ProgressBarAndroid, Platform, ProgressViewIOS, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Warning from '../../../assets/Home/warningalert.svg';

export default function Questionary() {
  const navigation = useNavigation();
  const Asks = {
    SetorA: [
      'Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?',
      'Com que frequência você tem dificuldade para fazer um trabalho que exige organização?',
      'Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?',
      'Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado (a) por muito tempo?',
      'Com que frequência você se sente ativo (a) demais e necessitando fazer coisas, como se estivesse "com um motor ligado"?',
    ],
    SetorB: [
      'Com que frequência você comete erros bobos por falta de atenção quando tem de trabalhar num projeto chato ou difícil?',
      'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?',
      'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?',
      'Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?',
      'Com que frequência você se distrai com atividades ou barulho a sua volta?',
      'Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado (a)?',
      'Com que frequência você se sente inquieto (a) ou agitado (a)?',
      'Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?',
      'Com que frequência você se pega falando demais em situações sociais?',
      'Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?',
      'Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?',
      'Com que frequência você interrompe os outros quando eles estão ocupados?',
    ],
    SetorC: [
      'Esses problemas que você vem tendo, são recorrentes desde que idade?',
      'Essas dificuldades que você tem, aparecem em que áreas? Em exemplo trabalho, faculdade ou social',
      'Você sente dificuldades na vida diária por causa desses sintomas?',
      'Você é diagnosticado com algo que não é TDAH? Em exemplo Ansiedade ou psicose',
    ],
  };

  const [currentSetor, setCurrentSetor] = useState('SetorA');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({ SetorA: [], SetorB: [], SetorC: ['', '', '', ''] });
  const [relatorio, setRelatorio] = useState({ SetorA: [], SetorB: [], SetorC: [] });
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);
  const [probabilidadeTDAH, setProbabilidadeTDAH] = useState('');
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowDisclaimerModal(true);
    }, 500);
  }, []);

  useEffect(() => {
    const calcularPontuacaoTotal = () => {
      let pontuacao = 0;

      Object.values(responses).forEach((setorRespostas) => {
        setorRespostas.forEach((resposta) => {
          switch (resposta) {
            case 'Nunca':
              pontuacao += 0;
              break;
            case 'Quase Nunca':
              pontuacao += 1;
              break;
            case 'Às vezes':
              pontuacao += 2;
              break;
            case 'Quase Sempre':
              pontuacao += 3;
              break;
            case 'Sempre':
              pontuacao += 4;
              break;
            default:
              break;
          }
        });
      });

      return pontuacao;
    };

    const determinarProbabilidadeTDAH = (pontuacao) => {
      if (pontuacao >= 0 && pontuacao <= 15) {
        return 'Baixa probabilidade';
      } else if (pontuacao >= 16 && pontuacao <= 30) {
        return 'Moderada probabilidade';
      } else {
        return 'Alta probabilidade';
      }
    };

    const pontuacao = calcularPontuacaoTotal();
    const probabilidade = determinarProbabilidadeTDAH(pontuacao);

    setPontuacaoTotal(pontuacao);
    setProbabilidadeTDAH(probabilidade);
  }, [responses]);

  const handleSelectOption = (response) => {
    setResponses((prevResponses) => {
      const newResponses = { ...prevResponses };
      newResponses[currentSetor][currentQuestionIndex] = response;
      return newResponses;
    });

    const questionsLength = Asks[currentSetor].length;
    if (currentQuestionIndex < questionsLength - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentSetor === 'SetorC') {
        setRelatorio((prevRelatorio) => ({
          ...prevRelatorio,
          [currentSetor]: responses[currentSetor],
        }));
      } else {
        setRelatorio((prevRelatorio) => ({
          ...prevRelatorio,
          [currentSetor]: responses[currentSetor],
        }));
      }

      const setors = Object.keys(Asks);
      const currentSetorIndex = setors.indexOf(currentSetor);
      if (currentSetorIndex < setors.length - 1) {
        setCurrentSetor(setors[currentSetorIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        setShowResultModal(true);
        console.log('Questionario completo', relatorio);
      }
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      const setors = Object.keys(Asks);
      const currentSetorIndex = setors.indexOf(currentSetor);
      if (currentSetorIndex > 0) {
        const previousSetor = setors[currentSetorIndex - 1];
        setCurrentSetor(previousSetor);
        setCurrentQuestionIndex(Asks[previousSetor].length - 1);
      }
    }
  };

  const handleTextInputChange = (text) => {
    setResponses((prevResponses) => {
      const newResponses = { ...prevResponses };
      newResponses[currentSetor][currentQuestionIndex] = text;
      return newResponses;
    });
  };

  const renderProgressBar = () => {
    const progress = (currentQuestionIndex) / Asks[currentSetor].length;
    return Platform.OS === 'android' ? (
      <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} color="#FF8F3E" />
    ) : (
      <ProgressViewIOS progress={progress} progressTintColor="#FF6C00" />
    );
  };

  const renderCurrentQuestion = () => {
    const question = Asks[currentSetor][currentQuestionIndex];
    return (
      <>
        <View style={{ top: -4}}>{renderProgressBar()}</View>
        <Text style={{ color: '#FF8F3E', fontFamily: 'Quicksand-Bold', fontSize: 14, textAlign: 'left', marginBottom: 5, marginTop: 10, marginLeft: 20 }}>Pergunta {currentQuestionIndex + 1} de {Asks[currentSetor].length}</Text>
        <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 16, color: 'white', marginBottom: 20, textAlign: 'left', marginHorizontal: 20 }}>{question}</Text>
        {currentSetor === 'SetorC' ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ backgroundColor: 'white', borderColor: '#ccc', borderWidth: 1, borderRadius: 4, padding: 10, fontSize: 16, textAlignVertical: 'top', height: 100 }}
              multiline
              numberOfLines={4}
              placeholder="Digite sua resposta aqui..."
              value={responses[currentSetor][currentQuestionIndex]}
              onChangeText={handleTextInputChange}
              onSubmitEditing={() => handleSelectOption(responses[currentSetor][currentQuestionIndex])}
              />
              <TouchableOpacity 
                style={{ marginTop: 10, backgroundColor: '#FF6C00', padding: 15, borderRadius: 10, alignItems: 'center' }}
                onPress={() => handleSelectOption(responses[currentSetor][currentQuestionIndex])}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>Próxima</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ width: '100%', marginTop: 10, paddingHorizontal: 20 }}>
              {['Nunca', 'Quase Nunca', 'Às vezes', 'Quase Sempre', 'Sempre'].map((option, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    { padding: 15, borderRadius: 10, marginVertical: 5, borderWidth: 2.5, borderColor: '#2C167A' },
                    responses[currentSetor][currentQuestionIndex] === option ? { backgroundColor: '#FF9A51' } : null,
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 10, borderRadius: 10 }} onPress={handleGoBack}>
            <AntDesign name="arrowleft" size={38} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontFamily: 'Quicksand-Bold', fontSize: 20 }}>Formulário SNAP-IV</Text>
        </View>
  
        <View style={{ backgroundColor: '#5C3BCD' }}>
          {renderCurrentQuestion()}
  
          <Modal
            animationIn={'fadeIn'}
            animationInTiming={700}
            animationOut={'fadeOut'}
            isVisible={showDisclaimerModal}
            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 20 }}
            backdropOpacity={0.5}
            onRequestClose={() => setShowDisclaimerModal(false)}
          >
            <View style={{ backgroundColor: '#5C3BCD', borderRadius: 20, alignItems: 'center', padding: 20 }}>
              <Warning />
              <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 17, textAlign: 'justify', marginBottom: 25, color: 'white' }}>
                Nenhum teste substitui uma avaliação psiquiátrica.
                O resultado deste teste não serve como diagnóstico conclusivo nem tem validade jurídica ou como atestado médico, para nenhuma finalidade!
                Não inicie nenhum tratamento baseado no resultado de qualquer teste da internet, sem uma consulta médica antes!
              </Text>
              <TouchableOpacity 
                style={{ backgroundColor: '#FF7121', borderRadius: 50, padding: 18, paddingHorizontal: 80, marginVertical: 10 }}
                onPress={() => setShowDisclaimerModal(false)}
              >
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 20, color: 'white' }}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={showResultModal}
            onRequestClose={() => setShowResultModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Relatório e Pontuação</Text>
                <Text style={styles.reportText}>Probabilidade de TDAH: {probabilidadeTDAH}</Text>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    setShowResultModal(false);
                    navigation.navigate('Home');
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#5C3BCD',
      paddingTop: StatusBar.currentHeight,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      backgroundColor: '#5C3BCD',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'flex-start',
      marginBottom: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    reportText: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 5,
    },
  });
  
