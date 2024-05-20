import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Authed/Home/Home";
import TesteScroll from '../screens/Authed/TesteScroll/testescroll'

const Stack = createNativeStackNavigator();

export default function HomeRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='TesteScroll' component={TesteScroll} />
        </Stack.Navigator>
    )
}