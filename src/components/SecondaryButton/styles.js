import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.blue};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 16px;
`;
