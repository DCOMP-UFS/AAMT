import styled from 'styled-components/native';

export const ItemContainer = styled.View`
  background-color: #fff;
  padding: 15px;
  flex-direction: row;
  border-radius: 4px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const IconTextContainer = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  border-radius: 100px;
  padding: 7px;
  background-color: ${props => props.color};
`;

export const TextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
`;

export const ItemName = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 18px;
  margin-bottom: 3px;
`;

export const ItemDetail = styled.Text`
  font-family: 'Lato-Regular';
  color: #8f9bb3;
  font-size: 14px;
`;
