/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import AgentHomePage from '../pages/HomePage/AgentHomePage';
import ActivitiesList from '../pages/Activities/ActivitiesList';
import Inspections from '../pages/Inspections';
import PropertiesList from '../pages/Inspections/PropertiesList';
import Profile from '../pages/Profile';
import Blocks from '../pages/Blocks';
import InspectionsForm from '../pages/Inspections/InspectionsForm';
import RecipientList from '../pages/Inspections/RecipientList';
import RecipientForm from '../pages/Inspections/RecipientForm';
import PropertyDetails from '../pages/Inspections/PropertyDetails';
import UpdateProperty from '../pages/Inspections/UpdateProperty';
import AcitivitySummary from '../pages/Activities/AcitivitySummary';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiStepForm from '../components/MultiStepForm';

const AppStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStacker = () => {
  const navigation = useNavigation();

  return (
    <AppStack.Navigator
      initialRouteName="Rotas Planejadas"
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
        name="Rotas Planejadas"
        component={AgentHomePage}
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
      <AppStack.Screen name="Rota" component={Blocks} />
      <AppStack.Screen name="Lista de Imóveis" component={PropertiesList} />
      <AppStack.Screen name="Vistoria" component={InspectionsForm} />
      <AppStack.Screen name="Depósitos" component={RecipientList} />
      <AppStack.Screen name="Cadastrar Depósito" component={RecipientForm} />
      <AppStack.Screen name="Detalhes do Imóvel" component={PropertyDetails} />
      <AppStack.Screen name="Atualizar imóvel" component={UpdateProperty} />
      <AppStack.Screen name="MultiStepForm" component={MultiStepForm} />
    </AppStack.Navigator>
  );
};

const ActivityStacker = () => {
  const navigation = useNavigation();

  return (
    <ActivityStack.Navigator
      initialRouteName="Boletins de campo"
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
      <ActivityStack.Screen
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
          headerShown: true,
        }}
        name="Boletins de campo"
        component={ActivitiesList}
      />
      <ActivityStack.Screen
        options={{ headerShown: true }}
        name="Resumo da atividade"
        component={AcitivitySummary}
      />
    </ActivityStack.Navigator>
  );
};

const AppRoutes = () => {
  const AppDrawer = () => {
    return (
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
        <Drawer.Screen name="Rotas Planejadas" component={AppStacker} />
        <Drawer.Screen name="Boletins de campo" component={ActivityStacker} />
        <Drawer.Screen
          name="Perfil"
          component={Profile}
          options={{ headerShown: true }}
        />
      </Drawer.Navigator>
    );
  };

  return <AppDrawer />;
};

export default AppRoutes;
