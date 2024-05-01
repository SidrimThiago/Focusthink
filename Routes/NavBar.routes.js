import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Feather,
  FontAwesome5,
  Ionicons,
  Octicons,
  FontAwesome6,
  AntDesign,
} from '@expo/vector-icons'
import Home from '../screens/Authed/Home'
import Profile from '../screens/Authed/Profile'
import Games from '../screens/Games/games'
import Calendar from '../screens/Authed/Calendar'
import Consults from '../screens/Authed/Consults'
import * as Animatable from 'react-native-animatable'

const Tab = createBottomTabNavigator()

export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          bottom: 10,
          zIndex: 2,
        },
        tabBarStyle: {
          height: 75,
          position: 'absolute',
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          backgroundColor: '#222222',
          borderColor: '#222222',
        },
      }}
    >
      <Tab.Screen
        name="Games"
        component={Games}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              iconName="game-controller"
              iconSize={30}
              iconColor="#633DE8"
              focused={focused}
              iconLibrary="Ionicons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              iconName="calendar"
              iconSize={30}
              iconColor="#633DE8"
              focused={focused}
              iconLibrary="Octicons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              iconName="home"
              iconSize={30}
              iconColor="#633DE8"
              focused={focused}
              iconLibrary="Ionicons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Consults"
        component={Consults}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              iconName="star"
              iconSize={30}
              iconColor="#633DE8"
              focused={focused}
              iconLibrary="FontAwesome6"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              iconName="person-outline"
              iconSize={30}
              iconColor="#633DE8"
              focused={focused}
              iconLibrary="Ionicons"
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const TabBarItem = ({ iconName, iconSize, focused, iconLibrary, label }) => {
  const IconComponent =
    iconLibrary === 'Ionicons'
      ? Ionicons
      : iconLibrary === 'FontAwesome5'
        ? FontAwesome5
        : Feather
  const iconColor = focused ? '#FF5C00' : '#633DE8'

  return (
    <Animatable.View iterationCount="infinite" style={styles.container}>
      {focused && <Animatable.View style={styles.circle} />}
      <IconComponent name={iconName} size={iconSize} color={iconColor} />
      {/* Se desejar, você pode adicionar o rótulo aqui */}
      {/* {label && <Text style={{ color: iconColor }}>{label}</Text>} */}
    </Animatable.View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#5E5E5E',
    opacity: 0.5,
    width: 65,
    height: 65,
    borderRadius: 50,
    top: -10,
  },
})
