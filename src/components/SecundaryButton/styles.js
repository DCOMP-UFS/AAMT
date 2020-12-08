import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Lato-Regular';
  color: #0095da;
  font-size: 16px;
`;

export const BorderContainer = styled.View`
  border: 1px solid #0095da;
  border-radius: 4px;
  margin-top: 10px;
`;
