import { styled } from "nativewind";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions } from "react-native";
import slides from "./slides";

export default OnBoardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            {item.id != 1 ? (
                <Image source={item.image} style={[styles.image, { resizeMode: 'contain', width: 230, height: 230, marginTop: 30, marginBottom: 25 }]} />
            ) : (
                <Image source={item.image} style={[styles.image, { resizeMode: 'contain' }]} />
            )}

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
        height: 140,
    },
    title: {
        fontSize: 34,
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',   
        paddingHorizontal: 50 
    },
    description: {
        color: '#CFCFCF',
        textAlign: 'center',
        paddingHorizontal: 30,
        fontFamily: 'Quicksand-Medium',
        fontSize: 16
    }
})