import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Authed/Home/Home'

const Stack = createNativeStackNavigator()

export default function HomeRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
