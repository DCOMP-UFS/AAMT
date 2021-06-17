import styled from 'styled-components';

export const Container = styled.ScrollView`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 14px 0px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 14px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const RecipientContainer = styled.ScrollView`
  flex-direction: column;
`;

export const RecipientItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: #edf1f4;
  padding: 20px 14px;
`;

export const RecipientText = styled.Text`
  font-family: 'Lato-Regular';
  color: #a6a8ad;
  font-size: 16px;
`;

export const RecipientOptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const NoRecipientContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

export const NoRecipientText = styled.Text`
  align-self: center;
  font-family: 'Lato-Regular';
  color: #c6cdd3;
  font-size: 16px;
  margin-top: 10px;
`;
