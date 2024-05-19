import { styled } from "nativewind";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions } from "react-native";
import slides from "./slides";

export default OnBoardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image, { resizeMode: 'contain' }]} />

            <View style={{ flex: 0.5 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} className="text-white text-center text-xl">{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 0.5,
        justifyContent: 'center',
        width: 140,
        height: 140
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: 'white',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 64,
        fontFamily: 'Quicksand-SemiBold'
    }
})