import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PlannedRoutes from '../pages/Agent/PlannedRoutes';
import BlocksList from '../pages/Agent/BlocksList';
import PropertiesList from '../pages/Agent/Inspections/PropertiesList';
import PropertieDetails from '../pages/Agent/Inspections/PropertieDetails';
import PropertieEdit from '../pages/Agent/Inspections/PropertieEdit';
import Profile from '../pages/Profile';

// Formulários de vistorias

import StatusInspectionForm from '../pages/Agent/Inspections/InspectionForm/StatusInspectionForm';
import RecipientList from '../pages/Agent/Inspections/InspectionForm/RecipientList';
import RecipientForm from '../pages/Agent/Inspections/InspectionForm/RecipientForm';

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
      <Stack.Screen name="Lista de imóveis" component={PropertiesList} />
      <Stack.Screen name="Detalhes do imóvel" component={PropertieDetails} />
      <Stack.Screen name="Editar imóvel" component={PropertieEdit} />

      {/* Formulário de vistoria */}

      <Stack.Screen
        name="Situação da vistoria"
        component={StatusInspectionForm}
      />
      <Stack.Screen name="Depósitos inspecionados" component={RecipientList} />
      <Stack.Screen name="Inspecionar depósito" component={RecipientForm} />
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
