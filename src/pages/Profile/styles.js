import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
  background-color: #f7f7f7;
  flex: 1;
  flex-direction: column;
  padding: 50px 35px;
`;

export const ProfileContainer = styled.View`
  flex-direction: column;
`;

export const Small = styled.Text`
  font-family: 'Lato-Regular';
  color: #a6a8ad;
  font-size: 14px;
  text-align: left;
  margin-bottom: 5px;
`;

export const Item = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
`;

export const LogoutButton = styled(Button).attrs({
  type: 'error',
})`
  align-self: stretch;
  margin-top: 15px;
`;
