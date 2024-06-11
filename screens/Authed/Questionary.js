import React from "react";
import { StyleSheet } from "react-native";
import { MMKV } from "react-native-mmkv";

import QuestInfo from "../../components/questionaryInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const storage = new MMKV();

export default function Questionary() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
                <QuestInfo />
            </LinearGradient>
        </SafeAreaView>
    );
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
