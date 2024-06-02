import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Start from '../screens/Auth/Start/start'
import GamesTest from '../screens/Auth/Start/gametest'
import GameOptions from '../screens/Auth/Start/gameoptions'
import SplashScreen from '../screens/Auth/Start/splashscreen'
import login from '../screens/Auth/login'
import Splash from '../screens/splash'
import Cadastro from '../screens/Auth/Register/Cadastro'
import NewPassEmail from '../screens/Auth/ForgotPassword/newPassEmail'
import NewPassSMS from '../screens/Auth/ForgotPassword/newPassSMS'
import ConfirmEmail from '../screens/Auth/ForgotPassword/confirmEmail'
import ConfirmSMS from '../screens/Auth/ForgotPassword/confirmSMS'
import NewPass from '../screens/Auth/ForgotPassword/newPass'
import ProfileCreate from '../screens/Auth/Register/profilecreate'
import ProfissionalCadastro from '../screens/Auth/Register/profissional'

import NavBar from './navbar.bottomtab'
import Chatbot from '../Api/chatbot'
import Game2048 from '../screens/Games/2048/2048'
import Gamebody from '../screens/Games/MemoryGame/gamebody'
import Profissionals from '../screens/Authed/Profissionals'
import EspecifedChat from '../screens/Authed/especifedChat'
import Chat from '../screens/Authed/Consults/Chat/chat'

import GamesCountdown from '../screens/Games/countdown'
import Stroop from '../screens/Games/Stroop/Stroop'
import StroopInfo from '../screens/Games/Stroop/infostroop'
import MustSort from '../screens/Games/MustSort/mustsort'

import Teste from '../screens/testes'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}  
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="GamesTest" component={GamesTest} />
        <Stack.Screen name="GameOptions" component={GameOptions} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Profissional" component={ProfissionalCadastro} />
        <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
        <Stack.Screen name="NewPassEmail" component={NewPassEmail} />
        <Stack.Screen name="NewPassSMS" component={NewPassSMS} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="ConfirmSMS" component={ConfirmSMS} />
        <Stack.Screen name="NewPass" component={NewPass} />

        <Stack.Screen name="NavBar" component={NavBar} options={{ animation: 'fade'}} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="especifedChat" component={EspecifedChat} />
        <Stack.Screen name="Chat" component={Chat} />
        
        <Stack.Screen name="Profissionals" component={Profissionals} />

        <Stack.Screen name="Countdown" component={GamesCountdown} />
        <Stack.Screen name="2048" component={Game2048} />
        <Stack.Screen name="MemoryGame" component={Gamebody} />
        <Stack.Screen name="Stroop" component={Stroop} options={{ animation: 'fade'}} />
        <Stack.Screen name="StroopInfo" component={StroopInfo} options={{ animation: 'fade_from_bottom'  }}/>
        <Stack.Screen name="MustSort" component={MustSort} />
        
        <Stack.Screen name="Teste" component={Teste} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
