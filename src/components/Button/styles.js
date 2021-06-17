import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const containerModifiers = {
  normal: css`
    background-color: ${({ theme }) => theme.colors.blue};
  `,
  confirm: css`
    background-color: ${({ theme }) => theme.colors.confirm};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.error};
  `,
};

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  ${props => props.type && containerModifiers[props.type]}
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #ffffff;
  font-size: 16px;
`;
