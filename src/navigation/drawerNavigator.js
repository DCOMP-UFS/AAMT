import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Activities from '../pages/Activities';
import Inspections from '../pages/Inspections';
import Profile from '../pages/Profile';

const Drawer = createDrawerNavigator();

const drawerNavigator: React.FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Página Inicial" component={Home} />
    <Drawer.Screen name="Minhas atividades" component={Activities} />
    <Drawer.Screen name="Vistorias" component={Inspections} />
    <Drawer.Screen name="Perfil" component={Profile} />
  </Drawer.Navigator>
);

export default drawerNavigator;
