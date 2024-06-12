import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function IaQuestionary() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
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
      justifyContent: 'center',
      alignItems: 'center',
    },
});