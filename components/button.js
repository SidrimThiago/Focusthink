import { React } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

export default function ButtonComponent({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="w-full">
      <LinearGradient className="rounded-full p-3 justify-center items-center w-full py-4" colors={['#FF5C00', '#C05113']}>
        <Text className="text-white text-base shadow-lg shadow-indigo-500/50" style={styles.quicksand}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: "Quicksand-Bold"
  },
});