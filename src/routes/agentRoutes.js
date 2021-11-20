import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PlannedRoutes from '../pages/Agent/PlannedRoutes';
import BlocksList from '../pages/Agent/BlocksList';
import PropertiesList from '../pages/Agent/Inspections/PropertiesList';
import Profile from '../pages/Profile';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DailyWorkStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
        },
        headerTintColor: '#585666',
      }}
    >
      <Stack.Screen
        name="Rotas de trabalho"
        component={PlannedRoutes}
        options={{
          headerLeft: () => (
            <FontAwesome5
              name="bars"
              size={20}
              color="#585666"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="Rota" component={BlocksList} />
      <Stack.Screen name="Lista de Imóveis" component={PropertiesList} />
    </Stack.Navigator>
  );
};

const AgentDrawer = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Planejamento do dia"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
        },
        headerTintColor: '#3A3C4E',
        headerLeft: () => (
          <FontAwesome5
            name="bars"
            size={20}
            color="#585666"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      }}
    >
      <Drawer.Screen name="Planejamento do dia" component={DailyWorkStack} />
      <Drawer.Screen
        name="Perfil"
        component={Profile}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

export default AgentDrawer;
