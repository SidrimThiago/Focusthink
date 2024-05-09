import { StatusBar } from 'expo-status-bar'
import Routes from './Routes/auth.routes'
import 'react-native-gesture-handler'

export default function App() {
  return (
    <>
      <StatusBar translucent style="light" />
      <Routes />
    </>
  )
}
