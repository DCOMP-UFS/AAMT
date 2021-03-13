import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: center;
  padding: 0 25px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const WelcomeTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 40px;
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 10px;
`;

export const WelcomeDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 50px;
`;
