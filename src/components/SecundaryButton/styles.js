import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Wrapper = styled.View`
  border: 1.2px solid ${({ theme }) => theme.colors.blue};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const Container = styled(RectButton)`
  height: 50px;
  width: 100%;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 16px;
`;
