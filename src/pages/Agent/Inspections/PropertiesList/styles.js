import styled from 'styled-components';

import Button from '../../../../components/Button';
import SecondaryButton from '../../../../components/SecondaryButton';

export const Container = styled.ScrollView`
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
  margin-bottom: 15px;
`;

export const PropertyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  margin-left: 7px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
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

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const DetailsColumn = styled.View`
  flex-direction: column;
`;

export const MoreDetails = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 16px;
  align-self: center;
`;

export const StatusContainer = styled.View`
  width: auto;
  padding: 4px 10px;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const StatusText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #fff;
  font-size: 14px;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: center;
`;

export const AddContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AddText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 16px;
  margin-left: 5px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  margin-top: 10px;
`;

export const SeeInspectionButton = styled(SecondaryButton).attrs({})`
  width: 48%;
`;

export const StartInspectionButton = styled(Button).attrs({})`
  width: 48%;
`;
