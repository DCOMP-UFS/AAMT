import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

// Relatórios

import Reports from '../pages/Reports';
import DailyWorkList from '../pages/Reports/DailyWorkList';
import AgentDailyReport from '../pages/Reports/AgentDailyReport';
import ChooseActivity from '../pages/Reports/ChooseActivity';
import ChooseWeek from '../pages/Reports/ChooseWeek';
import WeeklyReport from '../pages/Reports/WeeklyReport';
import ActivityGeneralReport from '../pages/Reports/ActivityGeneralReport';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DailyWorkStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Rotas de trabalho"
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
      {/* Rotas */}

      <Stack.Screen
        name="Rotas de trabalho"
        component={AgentDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Rota" component={BlocksList} />

      {/* Imóveis */}

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

      {/* Relatórios */}

      <Stack.Screen name="Trabalhos diários" component={DailyWorkList} />
      <Stack.Screen name="Boletim Diário" component={AgentDailyReport} />
      <Stack.Screen name="Selecione a atividade" component={ChooseActivity} />
      <Stack.Screen name="Boletim Semanal" component={WeeklyReport} />
      <Stack.Screen name="Escolha a semana" component={ChooseWeek} />
      <Stack.Screen
        name="Boletim geral da atividade"
        component={ActivityGeneralReport}
      />
    </Stack.Navigator>
  );
};

const AgentDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
        },
        headerTintColor: '#3A3C4E',
      }}
    >
      <Drawer.Screen name="Rotas planejadas" component={PlannedRoutes} />
      <Drawer.Screen name="Relatórios" component={Reports} />
      <Drawer.Screen name="Perfil" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DailyWorkStack;
