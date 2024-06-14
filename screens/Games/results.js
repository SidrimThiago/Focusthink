import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { getPontuacao, getTotal } from '../../components/Games/pontuacao.js'
import { useNavigation, useRoute } from "@react-navigation/native";
import Check from '../../assets/GamesScreen/pontuacao.svg'
import LottieView from "lottie-react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Results() {

    const route = useRoute();
    const { reiniciar } = route.params; // Access the passed parameter

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView
                    style={{ flex: 1}}
                    source={require('../../assets/GamesScreen/won.json')}
                    autoPlay
                    loop={true}
                />
            </View>
            <View />
            <View style={{ backgroundColor: '#5B1EC4', width: '100%', height: '60%', borderTopEndRadius: 50, borderTopStartRadius: 50, alignItems: 'center', justifyContent: 'space-evenly', zIndex: 2, borderWidth: 5, borderColor: '#492980' }}>
                <View style={{ marginBottom: 40 }}>
                    <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 80, color: '#FF792F', alignSelf: 'center' }}>{getPontuacao() * 10}</Text>
                    <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 25, color: '#FFBF9B', position: 'absolute', top: 115, alignSelf: 'center' }}>Sua pontuação</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.box}>
                        <Text style={{ fontSize: 35, fontFamily: 'Quicksand-SemiBold', color: 'white' }}>{getPontuacao()}<Text style={{ fontSize: 16, fontFamily: 'Quicksand-SemiBold', color: '#BBBBBB' }}>/{getTotal()}</Text></Text>
                        <Text style={styles.desc}>Número de{'\n'}acertos</Text>
                        <View style={styles.check}>
                            <Check />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <Text style={{ fontSize: 35, fontFamily: 'Quicksand-SemiBold', color: 'white' }}>{parseInt(getPontuacao() / getTotal() * 100)}%</Text>
                        <Text style={styles.desc}>Porcentagem{'\n'}de acertos</Text>
                        <View style={styles.check}>
                            <Check />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginVertical: 50 }}>
                    <Pressable style={[styles.pressable, { backgroundColor: '#758992' }]} onPress={() => navigation.navigate('Jogos')}>
                        <View style={[styles.interno, { backgroundColor: '#D8E1E6' }]}>
                            <AntDesign name="appstore1" size={40} color="#778993" />
                            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 24, color: '#2E556B', marginRight: 5 }}>Jogos</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles.pressable, { backgroundColor: '#9B552F' }]} onPress={() => navigation.navigate(reiniciar)}>
                        <View style={[styles.interno, { backgroundColor: '#FF792F' }]}>
                            <MaterialCommunityIcons name="reload" size={45} color="#FFDFCE" />
                            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 16, color: 'white', textAlign: 'center', marginRight: 5 }}>Voltar ao{'\n'}jogo</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C695FF',
        justifyContent: 'space-between'
    },
    lottieContainer: {
        width: '100%',
        aspectRatio: 1,
        zIndex: 2,
        position: 'absolute'
    },
    box: {
        borderWidth: 2.5,
        borderColor: '#5EC208',
        width: 140,
        borderRadius: 15,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    desc: {
        fontSize: 14,
        color: '#E9E9E9',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center'
    },
    check: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -15
    },
    pressable: {
        width: 175,
        height: 70,
        borderRadius: 20,
    },
    interno: {
        width: 175,
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})