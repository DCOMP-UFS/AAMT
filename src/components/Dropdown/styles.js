import styled from 'styled-components';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 16px;
`;

export const PickerBox = styled.View`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.input};
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  border-radius: 4px;
  border: 1px solid
    ${props =>
      props.isErrored
        ? props.theme.colors.error
        : props.theme.colors.borderInput};
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 8px;
`;

export const Required = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.error};
`;
