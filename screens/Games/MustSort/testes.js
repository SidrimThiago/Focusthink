import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Dimensions, Pressable, StyleSheet, Text, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { incrementarPontuacao, getPontuacao, resetarPontuacao } from '../../../components/Games/pontuacao.js';
import { FontAwesome } from '@expo/vector-icons';
import ArrowLeft from '../../../assets/GamesScreen/MustSort/ArrowLeft.svg';
import ArrowRight from '../../../assets/GamesScreen/MustSort/ArrowRight';
import Opposite from '../../../assets/GamesScreen/MustSort/Opposite';
import Tap from '../../../assets/GamesScreen/MustSort/Tap';

export default function Teste() {

    const [circleSize, setCircleSize] = useState(0);
    const [circleColors, setCircleColors] = useState(Array(8));
    const [circleBorderColors, setCircleBorderColors] = useState(Array(8));
    const [svgTypes, setSvgTypes] = useState(Array(8));

    const [play, setPlay] = useState(false)

    const [correct1, setCorrect1] = useState(null);
    const [correct2, setCorrect2] = useState(null);
    const [correct3, setCorrect3] = useState(null);

    const [incorrect1, setIncorrect1] = useState(null);
    const [incorrect2, setIncorrect2] = useState(null);
    const [incorrect3, setIncorrect3] = useState(null);

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const circleWidth = screenWidth * 0.518;
        setCircleSize(circleWidth);
        resetarPontuacao();

        // Inicialização dos arrays com valores aleatórios
        const initialCircleData = Array.from({ length: 8 }, () => {
            const randomColorObject = generateRandomColor();
            return {
                color: randomColorObject.color,
                borderColor: randomColorObject.color === '#5C38D3' ? '#34188E' : randomColorObject.borderColor,
                svgType: svgTypesArray[Math.floor(Math.random() * svgTypesArray.length)]
            };
        });

        const initialCircleColors = initialCircleData.map(data => data.color);
        const initialCircleBorderColors = initialCircleData.map(data => data.borderColor);
        const initialSvgTypes = initialCircleData.map(data => data.svgType);

        setCircleColors(initialCircleColors);
        setCircleBorderColors(initialCircleBorderColors);
        setSvgTypes(initialSvgTypes);
    }, []);



    const colors = ['#5C38D3', '#EE5303'];
    const borderColors = { '#5C38D3': '#34188E', '#EE5303': '#A32D00' };
    const svgTypesArray = ['', 'ArrowLeft', 'ArrowRight', 'Opposite', 'Tap'];


    const generateRandomColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const borderColor = borderColors[randomColor];
        const svgType = svgTypesArray[Math.floor(Math.random() * svgTypesArray.length)];

        return { color: randomColor, borderColor, svgType };
    };

    const generateRandomColors = () => {
        const newCircleColor = generateRandomColor();
        setCircleColors(prevColors => [...prevColors.slice(1), newCircleColor.color]);
        setCircleBorderColors(prevBorderColors => [...prevBorderColors.slice(1), newCircleColor.borderColor]);
        setSvgTypes(prevSvgTypes => [...prevSvgTypes.slice(1), newCircleColor.svgType]);
    };

    const handlePress = (color) => {
        const svgType = svgTypes[0];

        if (svgType === 'ArrowLeft' && color === '#5C38D3') {
            incrementarPontuacao();
            console.log(getPontuacao());
            correct();
        } else if (svgType === 'ArrowRight' && color === '#EE5303') {
            incrementarPontuacao();
            console.log(getPontuacao());
            correct();
        } else if (svgType === 'Opposite') {
            const oppositeColor = circleColors[0] === '#5C38D3' ? '#EE5303' : '#5C38D3';
            if (color === oppositeColor) {
                incrementarPontuacao();
                console.log(getPontuacao());
                correct();
            } else {
                incorrect();
            }
        } else if (svgType === '' && color === circleColors[0]) {
            incrementarPontuacao();
            console.log(getPontuacao());
            correct();
        } else {
            incorrect();
        }

        generateRandomColors();
    };

    const handleCirclePress = (index) => {
        const svgType = svgTypes[index];
        if (svgType === 'Tap') {
            incrementarPontuacao();
            console.log(getPontuacao());
            correct();
        } else {
            incorrect();
        }
        generateRandomColors();

    };

    const correct = () => {
        if (correct1 === null) {
            setCorrect1(true);
            setCorrect3(null);
        } else if (correct2 === null) {
            setCorrect2(true);
            setCorrect1(null);
        } else if (correct3 === null) {
            setCorrect3(true);
            setCorrect2(null);
        }
    }

    const incorrect = () => {
        if (incorrect1 === null) {
            setIncorrect1(true);
            setIncorrect3(null);
        } else if (incorrect2 === null) {
            setIncorrect2(true);
            setIncorrect1(null);
        } else if (incorrect3 === null) {
            setIncorrect3(true);
            setIncorrect2(null);
        }
    }


    const renderSvg = (svgType) => {
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

    const priorities = [
        useSharedValue(1),
        useSharedValue(0.734),
        useSharedValue(0.624),
        useSharedValue(0.525),
        useSharedValue(0.448),
        useSharedValue(0.38),
        useSharedValue(0.325),
        useSharedValue(0.277),
    ];

    return (
        <SafeAreaView style={styles.container}>

            <Pressable style={[styles.pressable, { alignSelf: 'flex-start' }]} onPress={() => handlePress('#5C38D3')} />
            <Pressable style={[styles.pressable, { alignSelf: 'flex-end' }]} onPress={() => handlePress('#EE5303')} />

            <View style={styles.buttonsContainer}>
                <View style={[styles.square, { backgroundColor: '#5C38D3', borderRightWidth: 10, borderTopEndRadius: 100, borderColor: '#34188E' }]} />

                <View style={{ marginTop: StatusBar.currentHeight, zIndex: 2, flexDirection: 'column-reverse', marginBottom: '75%' }}>
                    {Array.from({ length: 8 }).map((_, index) => {
                        const style = useAnimatedStyle(() => {
                            const getPosition = () => {
                                // Lógica para obter a posição com base no índice invertido
                                switch (priorities[index].value) {
                                    case 1:
                                        return 0;
                                    case 0.734:
                                        return -115;
                                    case 0.624:
                                        return -265;
                                    case 0.525:
                                        return -425;
                                    case 0.448:
                                        return -595;
                                    case 0.38:
                                        return -770;
                                    case 0.325:
                                        return -957;
                                    case 0.277:
                                        return -1150;
                                    default:
                                        return 0;
                                }
                            };

                            return {
                                height: circleSize,
                                width: circleSize,
                                backgroundColor: circleColors[index],
                                bottom: withTiming(getPosition(), { duration: 500 }),
                                borderRadius: circleSize / 2,
                                zIndex: index,
                                transform: [{ scale: withTiming(priorities[index].value, { duration: 250, easing: Easing.linear }) }],
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 10,
                                borderColor: circleBorderColors[index],

                            };
                        });

                        return (
                            <>
                                {index === 0 && (
                                    <Pressable key={index} onPress={() => handleCirclePress(index)} style={{ alignSelf: 'center', zIndex: 9 - index }}>
                                        <Animated.View style={style}>
                                            {renderSvg(svgTypes[index])}
                                        </Animated.View>
                                    </Pressable>
                                )}
                                {index === 1 && (
                                    <Pressable key={index} onPress={() => handleCirclePress(index)} style={{ alignSelf: 'center', zIndex: 9 - index }}>
                                        <Animated.View style={style}>
                                            {renderSvg(svgTypes[index])}
                                            <View style={{ height: circleSize, width: circleSize, position: 'absolute', borderRadius: circleSize / 2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                                        </Animated.View>
                                    </Pressable>
                                )}
                                {index === 2 && (
                                    <Pressable key={index} onPress={() => handleCirclePress(index)} style={{ alignSelf: 'center', zIndex: 9 - index }}>
                                        <Animated.View style={style}>
                                            {renderSvg(svgTypes[index])}
                                            <View style={{ height: circleSize, width: circleSize, position: 'absolute', borderRadius: circleSize / 2, backgroundColor: 'rgba(0, 0, 0, 0.15)' }} />
                                        </Animated.View>
                                    </Pressable>
                                )}
                                {index >= 3 && (
                                    <Pressable key={index} onPress={() => handleCirclePress(index)} style={{ alignSelf: 'center', zIndex: 9 - index }}>
                                        <Animated.View style={style}>
                                            {renderSvg(svgTypes[index])}
                                            <View style={{ height: circleSize, width: circleSize, position: 'absolute', borderRadius: circleSize / 2, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                                        </Animated.View>
                                    </Pressable>
                                )}
                            </>
                        );
                    })}

                </View>

                <View style={[styles.square, { backgroundColor: '#EE5303', borderLeftWidth: 10, borderTopStartRadius: 100, borderColor: '#A32D00' }]} />
            </View>

            {correct1 === null && correct2 === null && correct3 === null && incorrect1 === null && incorrect2 === null && incorrect3 === null && (
                <View style={{ position: 'absolute', alignSelf: 'center', bottom: 0, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <View style={{ alignItems: 'center' }}>
                        <FontAwesome name="angle-double-left" size={100} color="rgba(255, 255, 255, 0.36)" />
                        <Text style={styles.initial}>Tap</Text>
                    </View>
                    <View>
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                        <View style={styles.points} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <FontAwesome name="angle-double-right" size={100} color="rgba(255, 255, 255, 0.36)" />
                        <Text style={styles.initial}>Tap</Text>
                    </View>
                </View>
            )}


            {correct1 === true && (
                <Correct1 />
            )}

            {correct2 === true && (
                <Correct2 />
            )}

            {correct3 === true && (
                <Correct3 />
            )}

            {incorrect1 === true && (
                <Incorrect1 />
            )}

            {incorrect2 === true && (
                <Incorrect2 />
            )}

            {incorrect3 === true && (
                <Incorrect3 />
            )}


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#57407C',
    },
    initial: {
        color: 'rgba(255, 255, 255, 0.36)',
        fontFamily: 'Quicksand-Bold',
        fontSize: 20
    },
    points: {
        width: 12,
        height: 12,
        borderRadius: 12,
        marginVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.36)'
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
    },
    lottieContainer: {
        height: 200,
        aspectRatio: 1,
        position: 'absolute',
        zIndex: 5,
        bottom: 0
    },
});
