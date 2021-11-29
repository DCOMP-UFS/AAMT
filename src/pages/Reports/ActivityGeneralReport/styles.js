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
  color: ${({ theme }) => theme.colors.black};
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
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Small = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textInput};
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

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardPair = styled.View`
  width: 49%;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
  padding: 7px;
  background: #fff;
  align-items: center;
`;

export const InfoContainer = styled.View`
  flex-direction: column;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.label};
  font-size: 18px;
  margin-bottom: 3px;
`;

export const MiniText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textInput};
  font-size: 14px;
`;

export const NumberText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.label};
  font-size: 18px;
`;
