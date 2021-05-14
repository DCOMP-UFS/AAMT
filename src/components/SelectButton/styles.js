import styled from 'styled-components/native';

export const Container = styled.View`
  width: auto;
  height: 50px;
  border: 1px solid ${props => (props.selected ? '#0095DA' : '#F7F6FB')};
  background: ${props => (props.selected ? '#E5F3F9' : '#F7F6FB')};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin-right: 10px;
`;

export const ButtonText = styled.Text`
  font-family: 'Lato-Regular';
  color: ${props => (props.selected ? '#0095DA' : '#A0A1B6')};
  font-size: 16px;
`;
