import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Dimensions, Pressable, StyleSheet, Text, StatusBar } from 'react-native';
import Modal from 'react-native-modal'
import Animated, { useAnimatedStyle, withTiming, Easing, useSharedValue } from 'react-native-reanimated';
import { incrementarPontuacao, getPontuacao, resetarPontuacao } from '../../../components/Games/pontuacao.js';
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import TopBarGames from '../../../components/Games/topBarGames.js';
import ArrowLeft from '../../../assets/GamesScreen/MustSort/ArrowLeft.svg';
import ArrowRight from '../../../assets/GamesScreen/MustSort/ArrowRight';
import Opposite from '../../../assets/GamesScreen/MustSort/Opposite';
import Tap from '../../../assets/GamesScreen/MustSort/Tap';

export default function MustSort() {
    const [modalVisible, setModalVisible] = useState(false)
    const [isModalOptions, setModalOptions] = useState(false)

    const [modalGuide, setModalGuide] = useState(false);

    const [tap, setTap] = useState(true);

    const [circleSize, setCircleSize] = useState(0);
    const [circleColors, setCircleColors] = useState(Array(9).fill(''));
    const [circleBorderColors, setCircleBorderColors] = useState(Array(9).fill(''));
    const [svgTypes, setSvgTypes] = useState(Array(9).fill(''));

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    const topSquareTranslateX = useSharedValue(0);
    const bottomSquareTranslateX = useSharedValue(0);

    const [correctness, setCorrectness] = useState(null);

    const colors = ['#5C38D3', '#EE5303'];
    const borderColors = { '#5C38D3': '#34188E', '#EE5303': '#A32D00' };
    const svgTypesArray = ['', 'ArrowLeft', 'ArrowRight', 'Opposite', 'Tap'];

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const circleWidth = screenWidth * 0.518;
        setCircleSize(circleWidth);
        resetarPontuacao();

        generateInitialCircleData();
    }, []);

    const generateInitialCircleData = () => {

        const initialCircleData = Array.from({ length: 9 }, (_, index) => {
            if (index === 0) {
                // Se for o primeiro índice, deixe vazio
                return {
                    color: '',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    svgType: ''
                };
            } else {
                // Caso contrário, preencha com valores aleatórios
                const randomColorObject = generateRandomColor();
                return {
                    color: randomColorObject.color,
                    borderColor: randomColorObject.borderColor,
                    svgType: svgTypesArray[Math.floor(Math.random() * svgTypesArray.length)]
                };
            }
        });

        const initialCircleColors = initialCircleData.map(data => data.color);
        const initialCircleBorderColors = initialCircleData.map(data => data.borderColor);
        const initialSvgTypes = initialCircleData.map(data => data.svgType);

        setCircleColors(initialCircleColors);
        setCircleBorderColors(initialCircleBorderColors);
        setSvgTypes(initialSvgTypes);
    };

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

    const handlePress = (color, direction) => {
        const svgType = svgTypes[1];

        setTap(false);

        positionX.value = 0;
        positionY.value = 0;

        duration = 650;

        if (svgType === 'ArrowLeft' && color === '#5C38D3') {
            positionX.value = withTiming(direction * 500, { duration: duration, easing: Easing.linear });
            setCorrectness(true);;
            incrementScore();
            handleTopSquarePress()
        } else if (svgType === 'ArrowRight' && color === '#EE5303') {
            positionX.value = withTiming(direction * 500, { duration: duration, easing: Easing.linear });
            setCorrectness(true);;
            incrementScore();
            handleBottomSquarePress();
        } else if (svgType === 'Opposite') {
            const oppositeColor = circleColors[1] === '#5C38D3' ? '#EE5303' : '#5C38D3';
            if (color === oppositeColor) {
                positionX.value = withTiming(direction * 500, { duration: duration, easing: Easing.linear });
                setCorrectness(true);
                incrementScore();
                if (color === '#5C38D3') {
                    handleTopSquarePress();
                } else if (color === '#EE5303') {
                    handleBottomSquarePress();
                }
            } else {
                positionY.value = withTiming(1 * 700, { duration: 500, easing: Easing.linear });
                setCorrectness(false);
            }
        } else if (svgType === '' && color === circleColors[1]) {
            positionX.value = withTiming(direction * 500, { duration: duration, easing: Easing.linear });
            setCorrectness(true);;
            incrementScore();
            if (color === '#5C38D3') {
                handleTopSquarePress();
            } else if (color === '#EE5303') {
                handleBottomSquarePress();
            }
        } else {
            positionY.value = withTiming(1 * 700, { duration: 500, easing: Easing.linear });
            setCorrectness(false);
        }

        console.log(getPontuacao())
        generateRandomColors();
    };

    const handleCirclePress = () => {
        setTap(false);

        const svgType = svgTypes[1];
        if (svgType === 'Tap') {
            incrementScore();
            setCorrectness(true);
        } else {
            setCorrectness(false);
        }

        console.log(getPontuacao());
        generateRandomColors();
    };

    const handleTopSquarePress = () => {
        topSquareTranslateX.value = withTiming(-10, { duration: 200 }, () => {
            topSquareTranslateX.value = withTiming(0, { duration: 200 });
        });
    };

    const handleBottomSquarePress = () => {
        bottomSquareTranslateX.value = withTiming(10, { duration: 200 }, () => {
            bottomSquareTranslateX.value = withTiming(0, { duration: 200 });
        });
    };

    const topSquareAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: topSquareTranslateX.value }],
        };
    });

    const bottomSquareAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: bottomSquareTranslateX.value }],
        };
    });

    const incrementScore = () => {
        incrementarPontuacao();
    };

    const CorrectTap = () => {
        return (
            <View style={styles.lottieContainer}>
                <LottieView
                    style={{ flex: 1, maxHeight: 200 }}
                    source={require('../../../assets/GamesScreen/correct.json')}
                    autoPlay
                    loop={false}
                    duration={1400}
                />
            </View>
        )
    }

    const IncorrectTap = () => {
        return (
            <View style={styles.lottieContainer}>
                <LottieView
                    style={{ flex: 1, maxHeight: 200 }}
                    source={require('../../../assets/GamesScreen/incorrect.json')}
                    autoPlay
                    loop={false}
                    duration={1400}
                />
            </View>
        )
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
            <TopBarGames
                duration={500}
                onTimerFinish={() => setModalVisible(true)}
                restart="Stroop"
            />

            <Pressable onPress={() => [setModalGuide(true), setCorrectness(null)]} style={{ zIndex: 5, width: 80, height: 80, borderRadius: 100, backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'absolute', right: 0, marginTop: StatusBar.currentHeight + 80, marginRight: 10, justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 60, fontFamily: 'Quicksand-Bold', color: '#2B3443', alignSelf: 'center', position: 'absolute', bottom: -1, marginLeft: 1 }}>?</Text>
            </Pressable>

            <Modal
                isVisible={modalGuide}
                animationIn={'bounceInLeft'}
                animationInTiming={1600}
                animationOut={'bounceOutRight'}
                animationOutTiming={1600}
                backdropOpacity={0.4}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                style={{ width: '100%', alignSelf: 'center' }}
            >
                <View style={{ width: '100%', backgroundColor: '#57407C', padding: 15, borderRadius: 60, alignItems: 'center', paddingVertical: 25 }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                        <View style={{ width: 45, height: 45, borderRadius: 45, backgroundColor: 'rgba(255, 255, 255, 0.5)', justifyContent: 'flex-start', marginHorizontal: 15 }}>
                            <Text style={{ fontSize: 33, fontFamily: 'Quicksand-Bold', color: '#2B3443', alignSelf: 'center', position: 'absolute', bottom: -1, marginLeft: 1 }}>?</Text>
                        </View>
                        <Text style={{ fontSize: 26, fontFamily: 'Quicksand-SemiBold', color: 'white', alignSelf: 'flex-start', marginTop: 7 }}>Instruções</Text>
                    </View>
                    <View style={{ height: 1.7, width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.5)', marginTop: 15 }} />

                    <Text style={{ fontSize: 22, fontFamily: 'Quicksand-Medium', color: 'rgb(200, 200, 200)', maxWidth: '95%', textAlign: 'center', marginVertical: 15 }}> Siga as instruções de acordo com o símbolo que aparecer:</Text>

                    <View style={styles.lines}>
                        <View style={styles.symbols}></View>
                        <Text style={styles.textGuide}>Toque o lado da mesma cor</Text>
                    </View>
                    <View style={styles.lines}>
                        <View style={styles.symbols}><ArrowLeft width={35} height={50} /></View>
                        <Text style={styles.textGuide}>Toque o lado esquerdo</Text>
                    </View>
                    <View style={styles.lines}>
                        <View style={styles.symbols}><ArrowRight width={35} height={50} /></View>
                        <Text style={styles.textGuide}>Toque o lado direito</Text>
                    </View>
                    <View style={styles.lines}>
                        <View style={styles.symbols}><Tap width={35} height={50} /></View>
                        <Text style={styles.textGuide}>Toque aqui</Text>
                    </View>

                    <Pressable onPress={() => setModalGuide(false)} style={{ width: '70%', height: 65, backgroundColor: '#A32D00', borderRadius: 35, marginTop: 10, marginTop: 25 }}>
                        <View style={{ height: 60, backgroundColor: '#EE5303', borderRadius: 50, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Quicksand-Bold', color: 'white', textAlign: 'center' }}>Continuar</Text>
                        </View>
                    </Pressable>
                </View>
            </Modal>

            <View style={styles.buttonsContainer} >
                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <Pressable style={[styles.pressable, { alignSelf: 'flex-end' }]} onPress={() => handlePress('#EE5303', 1)} />
                    <Pressable style={[styles.pressable, { alignSelf: 'flex-start' }]} onPress={() => handlePress('#5C38D3', -1)} />
                </View>


                <Animated.View style={[styles.square, { backgroundColor: '#5C38D3', borderRightWidth: 10, borderTopEndRadius: 100, borderColor: '#34188E' }, topSquareAnimatedStyle]} >
                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => handlePress('#5C38D3', -1)} />
                </Animated.View>

                <View style={{ flexDirection: 'column-reverse', marginBottom: '60%', zIndex: 2 }}>
                    {Array.from({ length: 9 }).map((_, index) => {
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
                                    case 0.276:
                                        return -1500;
                                    default:
                                        return 0;
                                }
                            };

                            return {
                                height: circleSize,
                                width: circleSize,
                                backgroundColor: circleColors[index],
                                bottom: withTiming(getPosition(), { duration: 500, easing: Easing.linear }),
                                borderRadius: circleSize / 2,
                                transform: [
                                    { translateY: index === 0 ? positionY.value : 0 },
                                    { translateX: index === 0 ? positionX.value : 0 },
                                    { scale: withTiming(priorities[index].value, { duration: 1000, easing: Easing.linear }) },
                                ],
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 10,
                                borderColor: circleBorderColors[index],
                            };
                        });

                        return (
                            <>
                                <Pressable key={index} onPress={() => handleCirclePress(index)} style={{ alignSelf: 'center', zIndex: -index, position: index === 0 ? 'absolute' : 'relative' }}>
                                    <Animated.View style={style}>
                                        {renderSvg(svgTypes[index])}
                                        {index === 1 && (
                                            <View style={{ height: circleSize, width: circleSize, position: 'absolute', borderRadius: circleSize / 2, backgroundColor: 'rgba(0, 0, 0, 0.15)' }} />
                                        )}
                                        {index === 2 && (
                                            <View style={{ height: circleSize, width: circleSize, position: 'absolute', borderRadius: circleSize / 2, backgroundColor: 'rgba(0, 0, 0, 0.25)' }} />
                                        )}
                                        {index >= 3 && (
                                            <View style={{ height: circleSize, width: circleSize, position: 'absolute', borderRadius: circleSize / 2, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                                        )}
                                    </Animated.View>
                                </Pressable>
                            </>
                        );
                    })}

                </View>

                <Animated.View style={[styles.square, { backgroundColor: '#EE5303', borderLeftWidth: 10, borderTopStartRadius: 100, borderColor: '#A32D00' }, bottomSquareAnimatedStyle]} >
                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => handlePress('#EE5303', 1)} />
                </Animated.View>

            </View>

            {tap === true && (
                <View style={styles.tapIndicators}>
                    <View style={styles.tapIndicator}>
                        <FontAwesome name="angle-double-left" size={100} color="rgba(255, 255, 255, 0.36)" />
                        <Text style={styles.initial}>Tap</Text>
                    </View>
                    <View>
                        {[...Array(8)].map((_, index) => (
                            <View key={index} style={styles.points} />
                        ))}
                    </View>
                    <View style={styles.tapIndicator}>
                        <FontAwesome name="angle-double-right" size={100} color="rgba(255, 255, 255, 0.36)" />
                        <Text style={styles.initial}>Tap</Text>
                    </View>
                </View>
            )}

            {correctness === true && (<CorrectTap />)}
            {correctness === false && (<IncorrectTap />)}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#57407C',
    },
    lines: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginVertical: 7,
        borderRadius: 50
    },
    symbols: {
        backgroundColor: '#EE5303',
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
    },
    textGuide: {
        fontSize: 19,
        fontFamily: 'Quicksand-SemiBold',
        color: 'white',
        marginLeft: 10
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
        height: '100%',
        zIndex: 2
    },
    square: {
        width: '9.5%',
        height: '62.3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 10,
        zIndex: 3
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    pressable: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        zIndex: 2
    },
    tapIndicators: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    tapIndicator: {
        alignItems: 'center'
    },
    lottieContainer: {
        height: 200,
        aspectRatio: 1,
        position: 'absolute',
        zIndex: 5,
        bottom: 0
    },
});
