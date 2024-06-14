import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import ReturnFalse from "../../components/returnfalse";

export default function GamesCountdown() {
    const navigation = useNavigation();
    const route = useRoute();
    const { jogo } = route.params; // Access the passed parameter

    ReturnFalse();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate(jogo);
            console.log(jogo)
        }, 3500);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigation, jogo]);

    return (
        <View style={{ aspectRatio: 1, height: '100%', width: '100%', justifyContent: 'center', }}>
            <LottieView
                source={require('../../assets/GamesScreen/countdown.json')}
                style={{ flex: 1, maxWidth: '52%' }}
                autoPlay
            />
        </View>
    )
}