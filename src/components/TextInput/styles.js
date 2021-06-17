import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 16px;
  align-self: stretch;
`;

export const TextContainer = styled.View`
  width: 100%;
  height: 180px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderInput};
  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.blue};
    `};
  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.error};
    `}
`;

export const TInput = styled.TextInput`
  flex: 1;
  height: 180px;
  padding: 20px;
  color: ${({ theme }) => theme.colors.textInput};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  ${props =>
    props.isFocused &&
    css`
      color: ${props.theme.colors.blue};
    `}
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.label};
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.Text`
  font-family: 'Lato-Regular';
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 8px;
`;
