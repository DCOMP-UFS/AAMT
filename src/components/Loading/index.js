import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = ({ ...rest }) => {
  return <ActivityIndicator size="large" color="#0095DA" {...rest} />;
};

export default Loading;
