import styled from 'styled-components/native';
import { View } from 'react-native';

import Button from '../../../components/Button';
import SecondaryButton from '../../../components/SecondaryButton';
import Loading from '../../../components/Loading';

export const Container = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  padding: 10px 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Card = styled(View).attrs({
  elevation: 1,
  shadowOffset: { width: 3, height: 3 },
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 12,
})`
  flex-direction: column;
  border-radius: 4px;
  padding: 14px 14px 14px 14px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const RouteHeader = styled.View`
  flex-direction: row;
  align-items: center;
  background: #eff3ff;
  padding: 7px 14px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const RouteContent = styled.View`
  padding: 14px 14px 14px 14px;
`;

export const RouteCard = styled(View).attrs({
  elevation: 1,
  shadowOffset: { width: 3, height: 3 },
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 12,
})`
  flex-direction: column;
  border-radius: 4px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const HalfPair = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
  width: 48%;
`;

export const FullPair = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
`;

export const RowPair = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MenuTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #c4c4c4;
  font-size: 17px;
  margin: 4px 0px 14px 0px;
`;

export const RouteTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  margin-bottom: 20px;
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
  color: ${({ theme }) => theme.colors.textInput};
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  margin-top: 10px;
`;

export const RouteButton = styled(SecondaryButton).attrs({})`
  width: 48%;
`;

export const StartRouteButton = styled(Button).attrs({})`
  width: 48%;
`;

export const EndRouteButton = styled(Button).attrs({})`
  width: 48%;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.label};
  align-self: center;
`;

export const OutsideBar = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.lightBlue};
  border-radius: 50px;
  height: 15px;
`;

export const InsideBar = styled.View`
  width: ${props => `${props.percentage}%`};
  background: ${({ theme }) => theme.colors.blue};
  height: 100%;
  border-radius: 50px;
`;

export const BarContainer = styled.View`
  flex-direction: column;
  margin-top: 5px;
`;

export const DescriptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 7px;
`;

export const PercentageTextContainer = styled.View`
  flex-direction: row;
`;

export const PercentageText = styled.Text`
  font-family: ${props =>
    props.bold ? props.theme.fonts.bold : props.theme.fonts.regular};
  font-size: 16px;
  color: ${props =>
    props.primary ? props.theme.colors.blue : props.theme.colors.textInput};
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
