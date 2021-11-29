import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, Linking, Platform } from 'react-native';

import defaultTheme from './styles/default';

import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

LogBox.ignoreLogs(['Reanimated 2']);

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const index = () => {
  const [isReady, setIsReady] = React.useState(false);
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
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
          // initialState={initialState}
          // onStateChange={state =>
          //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
          // }
          >
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default index;
