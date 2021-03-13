import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PropertyTitle = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
`;

export const AgentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #0095da;
  border-radius: 4px;
  padding: 5px;
  margin: 7px 0px;
`;

export const AgentNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AgentName = styled.Text`
  font-family: 'Lato-Bold';
  color: #fff;
  font-size: 16px;
  margin-left: 7px;
`;

export const AgentNumbers = styled.Text`
  font-family: 'Lato-Regular';
  color: #fff;
  font-size: 14px;
`;
