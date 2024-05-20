import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StatusBar, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BANNER_H = 450;
const TOPNAVI_H = 250;

const TesteScroll = (props) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const safeArea = useSafeAreaInsets();

  const { title, scrollB } = props;
  const isFloating = scrollB;
  const [isTransparent, setTransparent] = useState(true);

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener(a => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      isTransparent !== a.value < topNaviOffset &&
        setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <View>
      <View style={{ marginTop: StatusBar.currentHeight, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, zIndex: 1 }}>
        <View style={styles.container(safeArea, isFloating, isTransparent)}>
          <Animated.Text style={[styles.title(isTransparent, scrollA), { fontFamily: 'Quicksand-Medium', fontSize: 24 }]}> Seja bem vindo ! </Animated.Text>
          <Animated.Text style={ [styles.title(isTransparent, scrollA), { fontFamily: 'Quicksand-Bold', fontSize: 42 }] }> Adryel</Animated.Text>
        </View>
        <Ionicons name="chatbubble-outline" size={32} color="black" />
      </View>

      <Animated.Image
        style={styles.banner(scrollA)}
        source={require('../../../assets/Home/homeimage.png')}
      />

      <View style={{ borderTopRightRadius: 45, borderTopStartRadius: 45, overflow: 'hidden', height: '100%', paddingBottom: '40%' }}>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: '45%' }}
          stickyHeaderIndices={[0]}
        >

          <View style={{ borderTopStartRadius: 45, borderTopEndRadius: 45, overflow: 'hidden', zIndex: 1 }}>
            <ScrollView style={{ backgroundColor: '#633DE8', paddingVertical: 10 }} contentContainerStyle={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={[styles.topBar, { backgroundColor: '#FF7425', borderColor: '#B95E2B', marginLeft: 10 }]}
              >
                <Text style={[styles.topBarText, { color: 'white' }]}>TDAH</Text>
              </Pressable>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={styles.topBar}
              >
                <Text style={styles.topBarText}>Organização</Text>
              </Pressable>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={styles.topBar}
              >
                <Text style={styles.topBarText}>Estudos </Text>
              </Pressable>
              <Pressable
                onPress={() => console.log('Clicado')}
                style={[styles.topBar, { marginRight: 10 }]}
              >
                <Text style={styles.topBarText}>Ferramentas</Text>
              </Pressable>
            </ScrollView>
          </View>

          <View style={{ width: '100%', height: '82%', position: 'absolute', top: '15%', backgroundColor: '#633DE8' }} />

          <LinearGradient colors={['#633DE8', '#283C8C']} style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#FF7D34', justifyContent: 'space-evenly', borderRadius: 10, marginVertical: 5 }}>
              <View style={{ justifyContent: 'space-evenly', alignItems: 'center', width: '50%' }}>
                <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 24, color: 'white' }}> Especialistas {'\n'} disponíveis</Text>
                <Pressable style={{ width: '75%', height: 40, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}
                  onPress={() => navigation.navigate("Profissionals")}>
                  <Text style={{ fontFamily: 'Quicksand-Bold' }}>Ver</Text>
                </Pressable>
              </View>
              <Image
                alt="specialist"
                source={require('../../../assets/Home/especialist.png')}
                resizeMode='contain'
                style={{ height: 195, width: '50%' }}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
              <View style={{ height: 195, width: '49%', backgroundColor: 'white', borderRadius: 10 }}></View>
            </View>
          </LinearGradient>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const styles = {
  bannerContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '100%',
    position: 'absolute',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [0, BANNER_H, BANNER_H],
          outputRange: [0, -BANNER_H / 8, -BANNER_H / 8],
        }),
      },

    ],
  }),
  container: (safeArea, isFloating, isTransparent) => ({
    marginBottom: isFloating ? TOPNAVI_H - safeArea.top : 0,
    height: -TOPNAVI_H + safeArea.top,
    justifyContent: 'center',
    shadowOffset: { y: 0 },
    shadowOpacity: isTransparent ? 0 : 0.5,
    zIndex: 100,
  }),
  title: (isTransparent, scrollA) => ({
    color: '#FFF',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: isTransparent ? 1 : 0,
    opacity: scrollA.interpolate({
      inputRange: [0, BANNER_H - TOPNAVI_H],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    
  }),
  topBar: {
    width: 138,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#A3A3A3',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  topBarText: {
    fontFamily: 'Quicksand-Bold',
    color: 'black',
    fontSize: 16
  },
};

export default TesteScroll;