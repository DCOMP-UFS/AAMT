import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: ${props => props.color};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${props => props.textColor};
  font-size: 18px;
`;
