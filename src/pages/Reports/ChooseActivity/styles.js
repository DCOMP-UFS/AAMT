import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Title = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 7px;
`;

export const Small = styled.Text`
  font-family: 'Lato-Bold';
  font-size: 16px;
  color: #3a3c4e;
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-family: 'Lato-Regular';
  font-size: 16px;
  color: #a6a8ad;
  margin-bottom: 15px;
`;

export const AccordionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  background-color: #0095da;
  border-radius: 4px;
`;

export const AccordionTitle = styled.Text`
  font-family: 'Lato-Bold';
  color: #fff;
  font-size: 16px;
`;

export const Box = styled.View`
  background-color: #f7f7f7;
  padding: 10px;
`;

export const AccordionItemText = styled.Text`
  font-family: 'Lato-Regular';
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Smaller = styled.Text`
  font-family: 'Lato-Normal';
  color: #a6a8ad;
  font-size: 16px;
  margin-bottom: 10px;
`;
