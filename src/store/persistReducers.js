import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'aamt',
      storage: AsyncStorage,
      whitelist: ['user', 'auth', 'activityRoutes', 'inspections'],
    },
    reducers
  );

  return persistedReducer;
};