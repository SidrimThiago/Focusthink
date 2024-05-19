import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Pressable
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'

export default function StroopInfo() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#992525', '#FF3E3E']}
                style={styles.background}
            >
                <ScrollView style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate('NavBar')}>
                        <AntDesign name="arrowleft" size={38} color="white" style={{ position: 'absolute', top: 55, left: 15 }} />
                    </Pressable>
                    <Image
                        source={require('../../../assets/GamesScreen/IconInfo.png')}
                        style={{ maxWidth: '80%', maxHeight: '30.42%', position: 'absolute', right: -21, top: 0 }}
                    />
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <View style={{ marginTop: 170, alignSelf: 'flex-start' }}>
                            <Text style={{ fontSize: 36, color: 'white', fontFamily: 'Quicksand-Bold', marginBottom: 5 }}>Palavras {'\n'}de Cores</Text>
                            <Text style={{ fontSize: 18, color: '#E3E3E3', fontFamily: 'Quicksand-Medium', marginBottom: 20 }}>Treino de atenção seletiva de cores</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Stroop')} style={{ height: 45, width: 175, backgroundColor: '#FF6F20', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                    <Text style={{ fontSize: 29, color: 'white', fontFamily: 'Quicksand-Bold', bottom: 4 }}>Jogar</Text>
                                </TouchableOpacity>
                                <View style={{ width: 100, height: 32, backgroundColor: '#FF3E3E', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 40 }}>
                                    <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Quicksand-Medium', marginTop: 3 }}>Foco</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 35 }}>
                            <View style={{ width: 150, height: 80, borderWidth: 1.5, borderColor: '#B8B8B8', justifyContent: 'flex-end', alignItems: 'center', borderRadius: 16, marginRight: 10 }}>
                                <Text style={{ fontSize: 38, color: 'white', fontFamily: 'Quicksand-SemiBold' }}>0</Text>
                                <Text style={{ fontSize: 14, color: '#D8D8D8', fontFamily: 'Quicksand-Medium', bottom: 5 }}>Ultima pontuação</Text>
                            </View>
                            <View style={{ width: 150, height: 80, borderWidth: 1.5, borderColor: '#B8B8B8', justifyContent: 'flex-end', alignItems: 'center', borderRadius: 16, marginLeft: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../../../assets/GamesScreen/trophy.png')}
                                        style={{ width: 28, height: 28, top: 20 }}
                                    />
                                    <Text style={{ fontSize: 38, color: 'white', fontFamily: 'Quicksand-SemiBold', marginLeft: 5 }}>300</Text>
                                </View>
                                <Text style={{ fontSize: 14, color: '#D8D8D8', fontFamily: 'Quicksand-Medium', bottom: 5 }}>Melhor pontuação</Text>
                            </View>
                        </View>

                        <Text style={{ fontSize: 17, color: 'white', fontFamily: 'Quicksand-Regular', marginTop: 25 }}>O Teste de Cores e Palavras permite detetar problemas neurológicos e cerebrais, avaliando os efeitos de interferência entre
                            os dois hemisférios cerebrais. O Teste poderá ser utilizado em diversas situações clínicas (p.e., lesões cerebrais, demência,
                            psicopatologia, etc.) independentemente do nível cultural do sujeito. As tarefas requeridas pelo Teste implicam a identificação de cores e de palavras.
                        </Text>

                        <View style={{ width: '90%', height: 400, backgroundColor: 'white', marginTop: 40, borderRadius: 20, padding: 15 }}>
                            <Text style={{ fontSize: 28, fontFamily: 'Quicksand-Bold' }}>
                                Como Jogar?
                            </Text>
                            <Text style={{ fontSize: 17, fontFamily: 'Quicksand-SemiBold', marginTop: 5 }}>
                                Você deve selecionar a cor em que a palavra está escrita.
                            </Text>
                            <LottieView
                                style={{ flex: 1, maxHeight: 600,}}
                                source={require('../../../assets/GamesScreen/tutorial.json')}
                                autoPlay
                                loop={true}
                            />
                        </View>

                    </View>
                </ScrollView>

            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    quicksandBold: {
        fontFamily: 'Quicksand-Bold',
    },
    quicksandRegular: {
        fontFamily: 'Quicksand-Regular',
    },
    quicksandSemiBold: {
        fontFamily: 'Quicksand-SemiBold',
    },
    quicksandMedium: {
        fontFamily: 'Quicksand-Medium'
    }
})