import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 14px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const PropertyTitle = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 7px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const DetailsColumn = styled.View`
  flex-direction: column;
`;

export const Label = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Small = styled.Text`
  font-family: 'Lato-Normal';
  color: #a6a8ad;
  font-size: 16px;
  margin-bottom: 10px;
`;
