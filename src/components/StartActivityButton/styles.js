import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.ScrollView`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 8px;
  padding: 14px 14px 14px 14px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const Pair = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
`;

export const MenuTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #c4c4c4;
  font-size: 17px;
  margin: 4px 0px 14px 0px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  margin-left: 7px;
`;

export const Small = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.label};
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const RouteButton = styled(Button).attrs({})`
  width: 48%;
`;
