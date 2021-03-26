import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/Profile';
import SupervisorHomePage from '../pages/HomePage/SupervisorHomePage';
import ReportHomePage from '../pages/Reports/ReportHomePage';
import ChooseActivity from '../pages/Reports/Supervisor/ChooseActivity';
import ActivitiesList from '../pages/Reports/Supervisor/ActivitiesList';
import AcitivitySummary from '../pages/Activities/AcitivitySummary';
import ChooseDay from '../pages/Reports/Supervisor/ChooseDay';
import ActivityDiaryTeam from '../pages/Reports/Supervisor/ActivityDiaryTeam';
import ChooseWeek from '../pages/Reports/Supervisor/ChooseWeek';
import WeeklyReport from '../pages/Reports/Supervisor/WeeklyReport';

const SupDrawer = createDrawerNavigator();
const SupStack = createStackNavigator();

const reportsRoutes = () => {
  return (
    <SupStack.Navigator
      initialRouteName="Relatórios"
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
        headerShown: true,
      }}
    >
      <SupStack.Screen name="Relatórios" component={ReportHomePage} />
      <SupStack.Screen
        name="Atividades"
        options={{ title: 'Selecione a atividade' }}
        component={ChooseActivity}
      />
      <SupStack.Screen
        name="Lista de atividades"
        options={{ title: 'Selecione o trabalho diário' }}
        component={ActivitiesList}
      />
      <SupStack.Screen
        name="Resumo da atividade"
        options={{ title: 'Relatório diário do agente' }}
        component={AcitivitySummary}
      />
      <SupStack.Screen
        name="Relatório diário da equipe"
        options={{ title: 'Relatório diário da equipe' }}
        component={ActivityDiaryTeam}
      />
      <SupStack.Screen
        name="Escolher a data"
        options={{ title: 'Digite a data' }}
        component={ChooseDay}
      />
      <SupStack.Screen
        name="Escolher a semana"
        options={{ title: 'Digite a semana' }}
        component={ChooseWeek}
      />
      <SupStack.Screen
        name="Relatorio semanal"
        options={{ title: 'Relatório semanal' }}
        component={WeeklyReport}
      />
    </SupStack.Navigator>
  );
};

const routes = () => {
  return (
    <SupDrawer.Navigator
      initialRouteName="Relatórios"
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
      <SupDrawer.Screen
        name="Página Inicial"
        component={SupervisorHomePage}
        options={{ headerShown: true }}
      />
      <SupDrawer.Screen
        name="Reports"
        options={{ title: 'Relatórios' }}
        component={reportsRoutes}
      />
      <SupDrawer.Screen
        name="Perfil"
        component={Profile}
        options={{ headerShown: true }}
      />
    </SupDrawer.Navigator>
  );
};

export default routes;
