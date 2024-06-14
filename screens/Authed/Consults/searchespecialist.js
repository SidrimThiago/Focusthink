import React, { useRef, useEffect } from "react";
import { View, FlatList, Text, TextInput, Image, Animated, TouchableHighlight, Pressable } from "react-native";
import { Octicons, AntDesign } from '@expo/vector-icons';

export default function SearchEspecialist() {

    const scrollY = useRef(new Animated.Value(0)).current;
    const ITEM_HEIGHT = 450;

    const flatListRef = useRef(null); // Referência para o FlatList

    const snapToItem = (index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ animated: true, index });
        }
    };

    const DATA = [
        { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item' },
        { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Second Item' },
        { id: '58694a0f-3da1-471f-bd96-14571e29d72', title: 'Third Item' },
        { id: 'bd7acbea-c1b1-46c2-aed5-3a53abb28b2', title: 'First Item' },
        { id: '3ac68afc-c605-48d3-a4f8-fd91aa97f60', title: 'Second Item' },
        { id: '58694a0f-3da1-471f-bd96-45571e29d71', title: 'Third Item' },
        { id: 'bd7acbea-c1b1-46c2-aed53ad53abb28ba', title: 'First Item' },
        { id: '3ac68afc-c605-48d3-a4f-fbd91aa9763', title: 'Second Item' },
        { id: '58694a0f-3da1-471f-bd6-145571e9d72', title: 'Third Item' },
        { id: 'bd7acbea-c1b1-46c2-ad5-3ad53ab28b2', title: 'First Item' },
        { id: '3ac68afc-c605-48d3-4f8-fbd9aa97f60', title: 'Second Item' },
        { id: '58694a0f-3da1-471fbd96-14571e29d71', title: 'Third Item' },
        { id: 'bd7acbea-b1-46c2-aed5-3ad53abb28ba', title: 'First Item' },
        { id: '3ac68afc-c65-48d3-a4f8-fbd91aa97f63', title: 'Second Item' },
        { id: '58694a0f-3da471f-bd96-14571e29d72', title: 'Third Item' },
        { id: 'bd7acbea-c1b1-6c2-aed5-3a53abb28b2', title: 'First Item' },
        { id: '3ac68afc-c605-4d3-a4f8-fd91aa97f60', title: 'Second Item' },
        { id: '58694a0f-3da1-47f-bd96-4571e29d71', title: 'Third Item' },
        { id: 'bd7acbea-c1b1-46c-aed53d53abb28ba', title: 'First Item' },
        { id: '3ac68afc-c605-48d3a4f-bd91aa9763', title: 'Second Item' },
        { id: '58694a0f-3da1-471f-bd6145571e9d72', title: 'Third Item' },
        { id: 'bd7acbea-c1b1-46c2-ad-3ad53ab28b2', title: 'First Item' },
        { id: '3ac68afc-c605-48d3-48-fbd9aa97f60', title: 'Second Item' },
        { id: '58694a0f-3da1-471fb96-14571e29d71', title: 'Third Item' },
    ];

    const Item = React.memo(() => (
        <TouchableHighlight onPress={() => console.log('Apertado')} activeOpacity={0.8} underlayColor='#6148B6'>
            <View style={{ backgroundColor: '#633DE8', alignItems: 'center', flexDirection: 'row', padding: 15, paddingLeft: 15 }}>
                <Image source={require('../../../assets/image 102.png')} style={{ width: 90, height: 90, borderRadius: 10 }} />
                <View style={{ marginLeft: 8, justifyContent: 'space-between' }} >
                    <Text style={{ fontSize: 18, fontFamily: 'Quicksand-Bold', color: 'white' }}>Dr. Adrian Segara</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'Quicksand-SemiBold', color: '#D5D5D5', marginBottom: 5 }}>1.2 km</Text>
                    <View style={{ backgroundColor: '#FF7324', padding: 3, flexDirection: 'row', borderRadius: 5, alignItems: 'center', justifyContent: 'center', maxWidth: 65 }}>
                        <AntDesign name="star" size={18} color="white" />
                        <Text style={{ marginLeft: 5, color: 'white', fontFamily: 'Quicksand-SemiBold', fontSize: 15 }}>5.0</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    ));

    return (
        <View style={{ borderTopEndRadius: 50, borderTopStartRadius: 50, overflow: 'hidden', height: '30%', alignSelf: 'flex-end', zIndex: 1, }}>
            <FlatList
                ref={flatListRef} // Referência para o FlatList

                contentContainerStyle={{ paddingTop: 0 }}
                initialNumToRender={10}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={16}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}

                pagingEnabled
                decelerationRate={0.9}
                snapToInterval={ITEM_HEIGHT}
                snapToAlignment="start"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                ListHeaderComponent={
                    <View style={{ backgroundColor: '#633DE8', padding: 10, borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
                        <Pressable style={{ width: '100%' }} onPress={() => snapToItem(0)}>
                            <View style={{ width: '14%', height: 4, backgroundColor: 'rgba(238, 238, 238, 0.6)', marginBottom: 10, marginTop: 5, borderRadius: 5, alignSelf: 'center' }} />
                        </Pressable>
                        <View style={{ backgroundColor: '#4A2FA9', flexDirection: 'row', padding: 15, alignItems: 'center', borderRadius: 20 }}>
                            <Octicons name="search" size={30} color="#B6B6B6" />
                            <TextInput
                                editable={false}
                                placeholder='Buscar especialista'
                                placeholderTextColor='#B6B6B6'
                                style={{ fontSize: 30, fontFamily: 'Quicksand-SemiBold', marginLeft: 10, width: '100%', color: 'white', paddingRight: 28 }}
                            />
                        </View>
                    </View>
                }

                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Item />}
            />
        </View>
    )
}
