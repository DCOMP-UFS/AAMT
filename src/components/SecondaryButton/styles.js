import styled, { css } from 'styled-components/native';

const containerModifiers = {
  normal: css`
    border: 1px solid ${({ theme }) => theme.colors.blue};
  `,
  disabled: css`
    background-color: ${({ theme }) => theme.colors.disabledContainer};
  `,
};

export const Container = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  ${props => containerModifiers[props.isDisabled ? 'disabled' : 'normal']}
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${props =>
    props.isDisabled
      ? props.theme.colors.disabledText
      : props.theme.colors.blue};
  font-size: 16px;
`;
