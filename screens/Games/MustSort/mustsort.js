import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import TopBarGames from '../../../components/Games/topBarGames';
import { incrementarPontuacao, getPontuacao, resetarPontuacao } from '../../../components/Games/pontuacao.js'
import ArrowLeft from '../../../assets/GamesScreen/MustSort/ArrowLeft.svg'
import ArrowRight from '../../../assets/GamesScreen/MustSort/ArrowRight.svg'
import Opposite from '../../../assets/GamesScreen/MustSort/Opposite.svg'
import Tap from '../../../assets/GamesScreen/MustSort/Tap.svg'

export default function MustSort() {

    const [modalVisible, setModalVisible] = useState(false)
    const [isModalOptions, setModalOptions] = useState(false)

    const [circleColor, setCircleColor] = useState('');
    const [circleBorderColor, setCircleBorderColor] = useState('');
    const [circleSize, setCircleSize] = useState(0);
    const [svgType, setSvgType] = useState('');

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const circleWidth = screenWidth * 0.518; // 51.8% da largura da tela
        setCircleSize(circleWidth);
        generateRandomColor();
        resetarPontuacao();
    }, []);

    const generateRandomColor = () => {
        const colors = ['#5C38D3', '#EE5303'];
        const borderColors = {
            '#5C38D3': '#34188E',
            '#EE5303': '#A32D00'
        };
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomBorderColor = borderColors[randomColor];

        setCircleColor(randomColor);
        setCircleBorderColor(randomBorderColor);
 
        const svgTypes = ['', 'ArrowLeft', 'ArrowRight', 'Opposite', 'Tap'];
        const randomSvg = svgTypes[Math.floor(Math.random() * svgTypes.length)];
        setSvgType(randomSvg);
    };

    const handlePress = (color) => {
        if (svgType === 'ArrowLeft' && color === '#5C38D3') {
            incrementarPontuacao();
            console.log(getPontuacao());
        } else if (svgType === 'ArrowRight' && color === '#EE5303') {
            incrementarPontuacao();
            console.log(getPontuacao());
        } else if (svgType === 'Opposite') {
            if ((color === '#5C38D3' && circleColor === '#EE5303') || (color === '#EE5303' && circleColor === '#5C38D3')) {
                incrementarPontuacao();
                console.log(getPontuacao());
            }
        } else if (svgType === 'Tap') {
            // handled separately in circle pressable
        } else if (color === circleColor) {
            incrementarPontuacao();
            console.log(getPontuacao());
        }
        generateRandomColor();
    };

    const handleCirclePress = () => {
        if (svgType === 'Tap') {
            incrementarPontuacao();
            console.log(getPontuacao());
            generateRandomColor();
        } else {
            generateRandomColor();
        }
    };

    const renderSvg = () => {
        switch (svgType) {
            case 'ArrowLeft':
                return <ArrowLeft width={'80%'} />;
            case 'ArrowRight':
                return <ArrowRight width={'80%'} />;
            case 'Opposite':
                return <Opposite width={'80%'} />;
            case 'Tap':
                return <Tap width={'80%'} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopBarGames
                duration={500}
                onTimerFinish={() => setModalVisible(true)}
                restart="MustSort"
            />

            <Pressable style={[styles.pressable, { alignSelf: 'flex-start' }]} onPress={() => handlePress('#5C38D3')} />

            <Pressable style={[styles.pressable, { alignSelf: 'flex-end' }]} onPress={() => handlePress('#EE5303')} />

            <View style={styles.buttonsContainer}>
                <View style={[styles.square, { backgroundColor: '#5C38D3', borderRightWidth: 10, borderTopEndRadius: 100, borderColor: '#34188E' }]} />

                <Pressable onPress={handleCirclePress} style={[styles.circle, { backgroundColor: circleColor, width: circleSize, height: circleSize, borderColor: circleBorderColor, borderRadius: circleSize / 2 }]} >
                    {renderSvg()}
                </Pressable>

                <View style={[styles.square, { backgroundColor: '#EE5303', borderLeftWidth: 10, borderTopStartRadius: 100, borderColor: '#A32D00' }]} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#57407C',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%'
    },
    square: {
        width: '9.5%',
        height: '62.3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 10,
        zIndex: 2
    },
    pressable: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        zIndex: 1,
    }
});

