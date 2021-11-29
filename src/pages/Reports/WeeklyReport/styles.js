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
  margin-bottom: 10px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const PropertyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 7px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const DetailsColumn = styled.View`
  flex-direction: column;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Small = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #a6a8ad;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 40%;
  padding: 0px 30px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textInput};
  text-align: center;
  margin-bottom: 15px;
`;

export const EmptyDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textInput};
  text-align: center;
`;
