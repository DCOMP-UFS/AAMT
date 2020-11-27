import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 14px;
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

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;
