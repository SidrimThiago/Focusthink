import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Card from './Card';

const Colors = {
    LIGHT_BLUE: '#afd0ff',
    LIGHT_GOLD: '#e8d38f',
    LIGHT_RED: '#ff7e85',
    DARK_BLUE: '#4a64a8',
    DARK_GOLD: '#85692a',
    DARK_RED: '#992e1e',
};

const CardContainer = ({
    color,
    id,
    priority,
}) => {

    const style = useAnimatedStyle(() => {
        const getPosition = () => {
            switch (priority.value) {
                case 1:
                    return 50;
                case 0.9:
                    return 75;
                case 0.8:
                    return 100;
                case 0.7:
                    return 125;
                case 0.6:
                    return 150;
                case 0.5:
                    return 175;
                case 0.4:
                    return 200;
                case 0.3:
                    return 225;
                case 0.2:
                    return 250;
                case 0.1:
                    return 275;
                default:
                    return 0;
            }
        };

        return {
            position: 'absolute',
            height: 200,
            width: 325,
            backgroundColor: color,
            bottom: withTiming(getPosition(), { duration: 500 }),
            borderRadius: 8,
            zIndex: priority.value * 100,
            transform: [
                {
                    scale: withTiming(priority.value, {
                        duration: 250,
                        easing: Easing.linear,
                    }),
                },
            ],
        };
    });

    return (
        <Card id={id} style={style} />
    );
};

export default function Teste() {
    const firstPriority = useSharedValue(1);
    const secondPriority = useSharedValue(0.9);
    const thirdPriority = useSharedValue(0.8);
    const fourth = useSharedValue(0.7);
    const fifth = useSharedValue(0.6);
    const sixth = useSharedValue(0.5);
    const seventh = useSharedValue(0.4);
    const eigtth = useSharedValue(0.3);
    const nineth = useSharedValue(0.2);
    const tenth = useSharedValue(0.1);

    return (
        <View style={styles.container}>
            <CardContainer
                id={9}
                color={Colors.LIGHT_GOLD}
                priority={tenth}
            />
            <CardContainer
                id={8}
                color={Colors.LIGHT_GOLD}
                priority={nineth}
            />
            <CardContainer
                id={7}
                color={Colors.LIGHT_GOLD}
                priority={eigtth}
            />
            <CardContainer
                id={6}
                color={Colors.LIGHT_GOLD}
                priority={seventh}
            />
            <CardContainer
                id={5}
                color={Colors.LIGHT_GOLD}
                priority={sixth}
            />
            <CardContainer
                id={4}
                color={Colors.LIGHT_GOLD}
                priority={fifth}
            />
            <CardContainer
                id={3}
                color={Colors.LIGHT_GOLD}
                priority={fourth}
            />
            <CardContainer
                id={2}
                color={Colors.LIGHT_GOLD}
                priority={thirdPriority}
            />
            <CardContainer
                id={1}
                color={Colors.LIGHT_RED}
                priority={secondPriority}
            />
            <CardContainer
                id={0}
                color={Colors.LIGHT_BLUE}
                priority={firstPriority}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
});
