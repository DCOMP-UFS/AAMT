import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function getNetInfo() {
  const [isInternetReachable, isInternetReachable_set] = useState(undefined);

  useEffect(() => {
    const update = state => {
      if (
        isInternetReachable === undefined &&
        state.isInternetReachable === null
      ) {
        return;
      }
      if (state.isInternetReachable !== isInternetReachable) {
        isInternetReachable_set(() => state.isInternetReachable);
      }
    };
    NetInfo.fetch().then(update);
    return NetInfo.addEventListener(update);
  }, [isInternetReachable]);

  return isInternetReachable;
}
