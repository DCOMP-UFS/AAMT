import styled from 'styled-components/native';
import Platform from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  background-color: #ffffff;
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

export const Version = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.label};
  justify-content: flex-end;
  align-self: center;
  margin-top: 60px;
`;
