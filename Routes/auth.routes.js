import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Start from '../screens/Start/start'
import GamesTest from '../screens/Start/gametest'
import GameOptions from '../screens/Start/gameoptions'
import SplashScreen from '../screens/Start/splashscreen'
import login from '../screens/Auth/login'
import Splash from '../screens/splash'
import Home from '../screens/Authed/Home'
import Cadastro from '../screens/Auth/Register/Cadastro'
import NewPassEmail from '../screens/Auth/ForgotPassword/newPassEmail'
import NewPassSMS from '../screens/Auth/ForgotPassword/newPassSMS'
import ConfirmEmail from '../screens/Auth/ForgotPassword/confirmEmail'
import ConfirmSMS from '../screens/Auth/ForgotPassword/confirmSMS'
import NewPass from '../screens/Auth/ForgotPassword/newPass'
import ProfileCreate from '../screens/Auth/Register/profilecreate'
import ProfissionalCadastro from '../screens/Auth/Register/profissional'
import Profissionals from '../screens/Authed/profissionals'
import EspecifedChat from '../screens/Authed/especifedChat'
import Chats from '../screens/Authed/Chats'
import Games from '../screens/Games/games'
import NavBar from './NavBar.routes'
import Chatbot from '../Api/chatbot'
import Game2048 from '../screens/Games/2048/2048'
import Gamebody from '../screens/Games/MemoryGame/gamebody'
import Stroop from '../screens/Games/Stroop/Stroop'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="GamesTest" component={GamesTest} />
        <Stack.Screen name="GameOptions" component={GameOptions} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Profissionals" component={Profissionals} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="especifedChat" component={EspecifedChat} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Profissional" component={ProfissionalCadastro} />
        <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
        <Stack.Screen name="NewPassEmail" component={NewPassEmail} />
        <Stack.Screen name="NewPassSMS" component={NewPassSMS} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="ConfirmSMS" component={ConfirmSMS} />
        <Stack.Screen name="Stroop" component={Stroop} />
        <Stack.Screen name="NewPass" component={NewPass} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Games" component={Games} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="2048" component={Game2048} />
        <Stack.Screen name="MemoryGame" component={Gamebody} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
