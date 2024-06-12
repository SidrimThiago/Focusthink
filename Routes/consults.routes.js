import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Consults from '../screens/Authed/Consults/Consults.js'
import ScreenChats from "../screens/Authed/Consults/chats.js";

const Stack = createNativeStackNavigator();

export default function ConsultsRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerTintColor: 'white', headerTitleStyle: { fontFamily: 'Quicksand-Bold' } }}>
            <Stack.Screen name='Consults' component={Consults} />
            <Stack.Screen name='Chats' component={ScreenChats}
                options={{ animation: 'slide_from_right', headerShown: true, headerTitle: 'Conversas', headerStyle: { backgroundColor: '#633DE8' }}}
            />
        </Stack.Navigator>
    )
}