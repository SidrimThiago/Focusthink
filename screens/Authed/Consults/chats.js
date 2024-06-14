import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableHighlight, Image } from "react-native";

export default function ScreenChats() {

    const DATA = [
        { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item' },
        
    ];

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                initialNumToRender={10}
                scrollEventThrottle={16}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}

                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableHighlight onPress={() => console.log('Apertado')} activeOpacity={0.8} underlayColor='#6148B6'>
                        <View style={{ alignItems: 'center', justifyContent: 'space-between',flexDirection: 'row', padding: 15, paddingLeft: 15, borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' } }>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../assets/image 102.png')} style={{ width: 65, height: 65, borderRadius: 90 }} />
                                <View style={{ marginLeft: 8, justifyContent: 'space-between' }} >
                                    <Text style={{ fontSize: 16, fontFamily: 'Quicksand-Bold', color: 'white' }}>Dr. Adrian Segara</Text>
                                    <Text style={{ fontSize: 13, fontFamily: 'Quicksand-SemiBold', color: '#D5D5D5', marginBottom: 5 }}>Okay !</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 14, fontFamily: 'Quicksand-Bold', color: '#AFB7E1' }}>22:21</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Quicksand-Bold', color: '#AFB7E1' }}></Text>
                            </View>

                        </View>
                    </TouchableHighlight>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3E278D'
    }
})