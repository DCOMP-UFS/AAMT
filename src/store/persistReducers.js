import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'aamt',
      storage: AsyncStorage,
      whitelist: ['user', 'auth', 'activityRoutes'],
    },
    reducers,
  );

  return persistedReducer;
};
