import styled from 'styled-components/native';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';

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
  padding: 5px 0px;
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

export const ActivitySummaryButton = styled(Button).attrs({})`
  margin-top: 10px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const LoadingComponent = styled(Loading).attrs({})``;

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
