import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import Home from '../pages/Home';
import Activities from '../pages/Activities';
import Inspections from '../pages/Inspections';
import PropertiesList from '../pages/Inspections/PropertiesList';
import Profile from '../pages/Profile';
import Blocks from '../pages/Blocks';
import InspectionsForm from '../pages/Inspections/InspectionsForm';
import RecipientList from '../pages/Inspections/RecipientList';
import RecipientForm from '../pages/Inspections/RecipientForm';

import Icon from 'react-native-vector-icons/MaterialIcons';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStacker = () => {
  const navigation = useNavigation();

  return (
    <AppStack.Navigator
      initialRouteName="Página Inicial"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Lato-Bold',
        },
        headerTintColor: '#3A3C4E',
        headerStyle: {
          elevation: 0,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        },
      }}
    >
      <AppStack.Screen
        name="Página Inicial"
        component={Home}
        options={{
          headerLeft: () => (
            <Icon
              size={24}
              name="menu"
              color="#3a3c4e"
              style={{ paddingLeft: 13 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <AppStack.Screen name="Lista de Quarteirões" component={Blocks} />
      <AppStack.Screen name="Lista de Imóveis" component={PropertiesList} />
      <AppStack.Screen name="Vistoria" component={InspectionsForm} />
      <AppStack.Screen name="Depósitos" component={RecipientList} />
      <AppStack.Screen name="Cadastrar Recipiente" component={RecipientForm} />
    </AppStack.Navigator>
  );
};

const AppDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Root"
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Lato-Bold',
      },
      headerTintColor: '#3A3C4E',
      headerStyle: {
        elevation: 0,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
      },
    }}
  >
    <Drawer.Screen name="Página Inicial" component={AppStacker} />
    <Drawer.Screen
      name="Minhas atividades"
      component={Activities}
      options={{ headerShown: true }}
    />
    <Drawer.Screen
      name="Vistorias"
      component={Inspections}
      options={{ headerShown: true }}
    />
    <Drawer.Screen
      name="Perfil"
      component={Profile}
      options={{ headerShown: true }}
    />
  </Drawer.Navigator>
);

const AppRoutes: React.FC = () => AppDrawer();

export default AppRoutes;
