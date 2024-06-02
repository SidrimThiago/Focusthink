import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';


export default function Card({ id, style }) {

    const Colors = {
        LIGHT_BLUE: '#afd0ff',
        LIGHT_GOLD: '#e8d38f',
        LIGHT_RED: '#ff7e85',
        DARK_BLUE: '#4a64a8',
        DARK_GOLD: '#85692a',
        DARK_RED: '#992e1e',
    };
    
    const getColor = () => {
        switch (id) {
            case 0:
                return Colors.DARK_BLUE;
            case 1:
                return Colors.DARK_RED;
            case 2:
                return Colors.DARK_GOLD;
        }
    };

    return (
        <Animated.View style={style}>
            <View style={cardStyle.spacer} />
            <View style={cardStyle.container}>
                <View style={[cardStyle.circle, { backgroundColor: getColor() }]} />
                <View>
                    <View style={[cardStyle.topLine, { backgroundColor: getColor() }]} />
                    <View style={[cardStyle.bottomLine, { backgroundColor: getColor() }]} />
                </View>
            </View>
        </Animated.View>
    );
};

const cardStyle = StyleSheet.create({
    spacer: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
    },
    circle: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 20,
        marginLeft: 15,
    },
    topLine: {
        height: 20,
        width: 120,
        borderRadius: 40,
        marginBottom: 20,
        marginLeft: 15,
    },
    bottomLine: {
        height: 20,
        width: 60,
        borderRadius: 40,
        marginBottom: 20,
        marginLeft: 15,
    },
});
