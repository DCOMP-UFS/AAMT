import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Profile from '../pages/Profile';

import ReportStack from './reportRoutes';

const Drawer = createDrawerNavigator();

const SupDrawer = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Lista de Relatórios"
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
      <Drawer.Screen
        name="Relatórios"
        component={ReportStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Profile}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

export default SupDrawer;
