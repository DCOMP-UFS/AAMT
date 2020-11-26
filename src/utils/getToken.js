import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getToken() {
  return await AsyncStorage.getItem('@Auth:token');
}
