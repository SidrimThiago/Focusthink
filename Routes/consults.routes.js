import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Consults from '../screens/Authed/Consults/Consults.js'
import ScreenChats from '../screens/Authed/Consults/chats.js'
import Details from '../screens/Authed/Consults/details.js'

const Stack = createNativeStackNavigator()

export default function ConsultsRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'Quicksand-Bold' },
      }}
    >
      <Stack.Screen name="Consults" component={Consults} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
