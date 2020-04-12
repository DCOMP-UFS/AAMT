import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './pages/Login';
import AgenteRoutes from './routes/agente.routes';

export default function Routes() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#198ae3' },
        headerTintColor: '#fff'
      }} 
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={ Login } options={{ headerShown: false }} />
      <Stack.Screen name="Agente" component={ AgenteRoutes } />
    </Stack.Navigator>
  );
}