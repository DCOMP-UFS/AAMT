import styled from 'styled-components';

export const Container = styled.View`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const Card = styled.ScrollView`
  flex-direction: column;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  background-color: #0095da;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-family: 'Lato-Bold';
  color: #fff;
  font-size: 18px;
`;

export const Small = styled.Text`
  font-family: 'Lato-Regular';
  color: #fff;
  font-size: 14px;
`;

export const Street = styled.View`
  margin-top: 5px;
  padding: 10px;
  flex-direction: row;
`;

export const Box = styled.View`
  background-color: #f7f7f7;
`;

export const StreetText = styled.Text`
  font-family: 'Lato-Regular';
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 5px;
`;
