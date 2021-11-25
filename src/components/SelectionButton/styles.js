import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled, { css } from 'styled-components/native';

const borderModifiers = {
  normal: css`
    border: 1px solid ${({ theme }) => theme.colors.borderInput};
  `,
  selected: css`
    border: 1px solid ${({ theme }) => theme.colors.blue};
  `,
  // disabled: css`
  //   border: 1px solid ${({ theme }) => theme.colors.error};
  // `,
};

const textModifiers = {
  normal: css`
    color: ${({ theme }) => theme.colors.grayNotSelected};
  `,
  selected: css`
    color: ${({ theme }) => theme.colors.blue};
  `,
  // disabled: css`
  //   color: ${({ theme }) => theme.colors.error};
  // `,
};

const containerModifiers = {
  normal: css`
    background-color: ${({ theme }) => theme.colors.input};
  `,
  selected: css`
    background-color: ${({ theme }) => theme.colors.blueSelected};
  `,
  // disabled: css`
  //   color: ${({ theme }) => theme.colors.error};
  // `,
};

export const Container = styled.View`
  width: 100%;
  padding: 15px 10px;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  border-radius: 4px;
  ${props => props.status && borderModifiers[props.status]}
  ${props => props.status && containerModifiers[props.status]}
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  ${props => props.status && textModifiers[props.status]}
  margin-left: 10px;
`;

export const SelectedIcon = styled(FontAwesome5).attrs(props => ({
  size: 22,
  color: props.theme.colors.iconSelection[props.status],
}))``;
