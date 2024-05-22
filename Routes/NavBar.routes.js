import { Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/Authed/Profile'
import Games from '../screens/Games/games'
import Calendar from '../screens/Authed/Calendar'
import Consults from '../screens/Authed/Consults'
import HomeRoutes from './home.routes'

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
      }}
    >
      <Tab.Screen
        name="Jogos"
        component={Games}
        options={{
          headerShown: true,
          headerTitleStyle: ({ color: 'white', fontFamily: 'Quicksand-Bold', textAlign: 'center' }),
          headerTitle: 'JOGOS',
          headerTitleAlign: 'center',
          headerStyle: ({ backgroundColor: '#633DE8', elevation: 2 }),
          tabBarIcon: ({ focused }) => (
            focused
              ? <Image source={require('./NavBarIcons/calendariooff.svg')} />

              : <Image source={require('./NavBarIcons/calendariooff.svg')} />
          ),

        }}

      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image source={require('./NavBarIcons/calendariooff.svg')} />

            : <Image source={require('./NavBarIcons/calendariooff.svg')} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image source={require('./NavBarIcons/calendariooff.svg')} />

            : <Image source={require('./NavBarIcons/calendariooff.svg')} />
          ),
        }}
      />
      <Tab.Screen
        name="Consults"
        component={Consults}
        options={{
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image source={require('./NavBarIcons/calendariooff.svg')} />

            : <Image source={require('./NavBarIcons/calendariooff.svg')} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            focused
            ? <Image source={require('./NavBarIcons/calendariooff.svg')} />

            : <Image source={require('./NavBarIcons/calendariooff.svg')} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}