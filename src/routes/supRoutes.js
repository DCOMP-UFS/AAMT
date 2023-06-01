import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//Quarteirões e imoveis
import BlocksList from '../pages/Agent/BlocksList';
import LocalList from '../pages/Agent/LocalList';
import PropertiesList from '../pages/Agent/Inspections/PropertiesList';
import PropertieDetails from '../pages/Agent/Inspections/PropertieDetails';
import PropertieEdit from '../pages/Agent/Inspections/PropertieEdit';

// Formulários de vistorias
import StatusInspectionForm from '../pages/Agent/Inspections/InspectionForm/StatusInspectionForm';
import RecipientList from '../pages/Agent/Inspections/InspectionForm/RecipientList';
import RecipientForm from '../pages/Agent/Inspections/InspectionForm/RecipientForm';

import Profile from '../pages/Profile';
import PlannedRoutes from '../pages/Agent/PlannedRoutes';
import ReportStack from './reportRoutes';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const SupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Relatórios"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
        },
        headerTintColor: '#3A3C4E',
      }}
    >
      {/* Rotas */}

      <Stack.Screen
        name="Rotas de trabalho"
        component={SupDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Rota - Quarteirões" component={BlocksList} options={{ headerShown: true }}/>
      <Stack.Screen name="Rota - Localidades" component={LocalList} options={{ headerShown: true }}/>

      {/* Imóveis */}

      <Stack.Screen name="Lista de imóveis" component={PropertiesList} options={{ headerShown: true }}/>
      <Stack.Screen name="Detalhes do imóvel" component={PropertieDetails} options={{ headerShown: true }}/>
      <Stack.Screen name="Editar imóvel" component={PropertieEdit} options={{ headerShown: true }}/>

      {/* Formulário de vistoria */}

      <Stack.Screen
        name="Situação da vistoria"
        component={StatusInspectionForm}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Depósitos inspecionados" component={RecipientList} options={{ headerShown: true }}/>
      <Stack.Screen name="Inspecionar depósito" component={RecipientForm} options={{ headerShown: true }}/>

    </Stack.Navigator>
  );
};

const SupDrawer = () => {
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
      <Drawer.Screen 
        name="Rotas planejadas" 
        component={PlannedRoutes}
        options={{ headerShown: true }}
      />
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

export default SupStack;
