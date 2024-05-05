import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/Start/splashscreen'
import login from '../screens/Auth/login'
import Splash from '../screens/splash'
import Chats from '../screens/Authed/Chats'
import Profissionals from '../screens/Authed/profissionals'
import EspecifedChat from '../screens/Authed/especifedChat'
import Home from '../screens/Authed/Home'
import Games from '../screens/Games/games'
import NavBar from './NavBar.routes'
import Chatbot from '../Api/chatbot'
import Game2048 from '../screens/Games/2048/2048'
import Gamebody from '../screens/Games/MemoryGame/gamebody'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profissionals" component={Profissionals} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="Games" component={Games} />
        <Stack.Screen name="2048" component={Game2048} />
        <Stack.Screen name="MemoryGame" component={Gamebody} />
        <Stack.Screen name="especifedChat" component={EspecifedChat} />
        <Stack.Screen name="login" component={login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
