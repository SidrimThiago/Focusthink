import { Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/Authed/Profile'
import Calendar from '../screens/Authed/Calendar'
import HomeRoutes from './home.routes'
import GamesTopBar from './game.toptab'
import ConsultsRoutes from './consults.routes'
import Maps from '../screens/Authed/Consults/maps'
import Consults from '../Api/chatbot'

const Tab = createBottomTabNavigator()

export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="HomeRoutes"
      backBehavior='initialRoute'
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          bottom: 10,
          zIndex: 2,
        },
        tabBarStyle: {
          height: 75,
          backgroundColor: '#222222',
          borderColor: '#222222',
        },
        tabBarActiveTintColor: '#FF5C00',
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="Jogos"
        component={GamesTopBar}
        options={{
          headerShown: true,
          headerTitleStyle: ({ color: 'white', fontFamily: 'Quicksand-Bold', textAlign: 'center' }),
          headerTitle: 'JOGOS',
          headerTitleAlign: 'center',
          headerStyle: ({ backgroundColor: '#633DE8', elevation: 2 }),
          tabBarIcon: ({ focused }) => (
            focused
              ? <Image style={{ width: '35%', height: '40%'}} resizeMode='contain' source={require('../assets/NavBarIcons/jogosoon.png')} />

              : <Image style={{ width: '35%', height: '40%' }} resizeMode='contain' source={require('../assets/NavBarIcons/jogosoff.png')} />
          ),
        }}

      />
      <Tab.Screen
        name="Calendário"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image style={{ width: '35%', height: '50%' }} resizeMode='contain' source={require('../assets/NavBarIcons/calendarioon.png')} />

            : <Image style={{ width: '35%', height: '50%' }} resizeMode='contain' source={require('../assets/NavBarIcons/calendariooff.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image style={{ width: '40%', height: '50%' }} resizeMode='contain' source={require('../assets/NavBarIcons/inicioon.png')} />

            : <Image style={{ width: '40%', height: '50%' }} resizeMode='contain' source={require('../assets/NavBarIcons/iniciooff.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="ConsultsRoutes"
        component={ConsultsRoutes}
        options={{
          title: 'Consultas',
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image style={{ width: '40%', height: '55%' }} resizeMode='contain' source={require('../assets/NavBarIcons/consultason.png')} />

            : <Image style={{ width: '40%', height: '55%' }} resizeMode='contain' source={require('../assets/NavBarIcons/consultasoff.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image style={{ width: '40%', height: '50%' }} resizeMode='contain' source={require('../assets/NavBarIcons/perfilon.png')} />

            : <Image style={{ width: '40%', height: '50%' }} resizeMode='contain' source={require('../assets/NavBarIcons/perfiloff.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}