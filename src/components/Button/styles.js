import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const containerModifiers = {
  normal: css`
    background-color: ${({ theme }) => theme.colors.blue};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.error};
  `,
};

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  ${props => props.type && containerModifiers[props.type]}
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #ffffff;
  font-size: 18px;
`;
