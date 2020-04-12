import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';

function WildCard({ title, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text>WildCard { title }</Text>
    </View>
  )
}

import Agente from '../pages/Agente';
const Settings = ({ navigation }) => <WildCard title="Settings" navigation={ navigation } />;

const Tab = createBottomTabNavigator();

export default function AgenteRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ Agente } />
      <Tab.Screen name="Settings" component={ Settings } />
    </Tab.Navigator>
  );
}