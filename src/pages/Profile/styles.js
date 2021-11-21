import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
  background-color: #f7f7f7;
  flex: 1;
  flex-direction: column;
  padding: 10px;
`;

export const ProfileContainer = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 14px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Small = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.label};
  font-size: 16px;
  text-align: left;
  margin-bottom: 5px;
`;

export const Item = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textInput};
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left;
`;

export const LogoutButton = styled(Button).attrs({
  type: 'error',
})`
  align-self: stretch;
  margin-top: 15px;
`;
