import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { LogBox } from 'react-native';

import defaultTheme from './styles/default';

import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

LogBox.ignoreLogs(['Reanimated 2']);

const index = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default index;
