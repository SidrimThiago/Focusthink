import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Start from '../screens/Start/start'
import GamesTest from '../screens/Start/gametest'
import GameOptions from '../screens/Start/gameoptions'
import SplashScreen from '../screens/Start/splashscreen'
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
import Chats from '../screens/Authed/Consults/Chat/Chats'
import EspecifedChat from '../screens/Authed/Consults/Chat/EspecifedChat'
import CallPage from '../screens/Authed/callPage'
import IaQuestionary from '../screens/Authed/IaQuestionary'
import Questionary from '../screens/Authed/Home/questionary'

import GamesCountdown from '../screens/Games/countdown'
import Results from '../screens/Games/results'
import Stroop from '../screens/Games/Stroop/Stroop'
import StroopInfo from '../screens/Games/Stroop/infostroop'
import MustSort from '../screens/Games/MustSort/mustsort'
import MustSortInfo from '../screens/Games/MustSort/infomustsort'
import HiddenColors from '../screens/Games/HiddenColors/hiddencolors'
import HiddenColorsInfo from '../screens/Games/HiddenColors/infohiddencolors'

import Console from '../screens/Authed/Home/console'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="GamesTest"
          component={GamesTest}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="GameOptions"
          component={GameOptions}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="login"
          component={login}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="Profissional"
          component={ProfissionalCadastro}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="ProfileCreate"
          component={ProfileCreate}
          options={{ animation: 'ios' }}
        />
        <Stack.Screen name="NewPassEmail" component={NewPassEmail} />
        <Stack.Screen name="Console" component={Console} />
        <Stack.Screen name="NewPassSMS" component={NewPassSMS} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="ConfirmSMS" component={ConfirmSMS} />
        <Stack.Screen name="NewPass" component={NewPass} />

        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="especifedChat"
          component={EspecifedChat}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTitle: '',
            headerStyle: { backgroundColor: '#633DE8' },
          }}
        />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTitle: 'Conversas',
            headerStyle: { backgroundColor: '#633DE8', color: '#fff' },
          }}
        />
        <Stack.Screen name="IaQuestionary" component={IaQuestionary} />
        <Stack.Screen name="Questionary" component={Questionary} />
        <Stack.Screen name="CallPage" component={CallPage} />

        <Stack.Screen
          name="Profissionals"
          component={Profissionals}
          options={{
            animation: 'slide_from_left',
            headerShown: true,
            headerTitle: 'Profissionais',
            headerStyle: { backgroundColor: '#633DE8' },
          }}
        />

        <Stack.Screen
          name="Countdown"
          component={GamesCountdown}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{ animation: 'fade_from_bottom' }}
        />
        <Stack.Screen name="2048" component={Game2048} />
        <Stack.Screen name="MemoryGame" component={Gamebody} />
        <Stack.Screen
          name="Stroop"
          component={Stroop}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="StroopInfo"
          component={StroopInfo}
          options={{ animation: 'fade_from_bottom', gestureEnabled: false }}
        />
        <Stack.Screen
          name="MustSort"
          component={MustSort}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="MustSortInfo"
          component={MustSortInfo}
          options={{ animation: 'fade_from_bottom' }}
        />
        <Stack.Screen
          name="HiddenColors"
          component={HiddenColors}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="HiddenColorsInfo"
          component={HiddenColorsInfo}
          options={{ animation: 'fade_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
