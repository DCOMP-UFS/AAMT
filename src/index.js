import 'react-native-gesture-handler';

import React from 'react';
import { Linking, Platform, ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/default';

import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import App from './App';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const index = () => {
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            initialState={initialState}
            onStateChange={state =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
          >
            <App />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default index;
