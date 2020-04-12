import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function Agente({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
