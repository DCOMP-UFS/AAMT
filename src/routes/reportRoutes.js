import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Reports from '../pages/Reports';
import DailyWorkList from '../pages/Reports/DailyWorkList';
import AgentDailyReport from '../pages/Reports/AgentDailyReport';
import ChooseActivity from '../pages/Reports/ChooseActivity';
import ChooseWeek from '../pages/Reports/ChooseWeek';
import WeeklyReport from '../pages/Reports/WeeklyReport';
import ActivityGeneralReport from '../pages/Reports/ActivityGeneralReport';

const Stack = createNativeStackNavigator();

const reportRoutes = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Lista de Relatórios"
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
        name="Lista de Relatórios"
        component={Reports}
        options={{
          title: 'Relatórios',
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

export default reportRoutes;
