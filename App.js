import { StyleSheet} from 'react-native';
import Register from './Screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './Screens/Landing';
import Profile from './Screens/Profile';
import Home from './Screens/Home';
import Test from './Screens/Test';
import Login from './Screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login or sign up">
        <Stack.Screen name="welcome" component={Landing} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="Profile" component={Profile}
        />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Home" component={Test} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
