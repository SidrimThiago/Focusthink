import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Games from '../screens/Games/games';
import Ranking from '../screens/Games/ranking';

const Tab = createMaterialTopTabNavigator();

export default function GamesTopBar() {
    return (
        <Tab.Navigator
        overScrollMode='never'
        screenOptions={{ 
            tabBarStyle: { backgroundColor: '#633DE8' },
            tabBarLabelStyle: { fontFamily: 'Quicksand-Bold', color: 'white' },
            tabBarIndicatorStyle: { backgroundColor: 'white', height: 3 },
            swipeEnabled: false,
        }}
        >
            <Tab.Screen name="MINIJOGOS" component={Games} />
            <Tab.Screen name="RANKING" component={Ranking} />
        </Tab.Navigator>
    );
}