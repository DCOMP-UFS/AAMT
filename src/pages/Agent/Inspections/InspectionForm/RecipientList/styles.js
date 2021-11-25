import styled from 'styled-components/native';
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import SecondaryButton from '../../../../../components/SecondaryButton';

export const Container = styled.ScrollView`
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 10px 10px;
  flex: 1;
  flex-direction: column;
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
  margin: 0px 20px;
`;

export const AddInspectionButton = styled(SecondaryButton).attrs({})`
  width: 70%;
  margin-top: 25px;
`;

export const FinishInspectionButton = styled(Button).attrs({
  type: 'error',
})`
  width: 70%;
  margin-top: 25px;
`;

export const RecipientContainer = styled.View`
  flex-direction: column;
  border-radius: 4px;
`;

export const RecipientHeader = styled.View`
  background: ${({ theme }) => theme.colors.blue};
  flex-direction: row;
  padding: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  align-items: center;
`;

export const TypeContainer = styled.View`
  background: ${({ theme }) => theme.colors.white};
  padding: 5px;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 4px;
`;

export const TypeText = styled.Text`
  color: ${({ theme }) => theme.colors.blue};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
`;

export const HeaderText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
  margin-left: 15px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  background: ${({ theme }) => theme.colors.white};
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px; ;
`;

export const AddInspection = styled(SecondaryButton).attrs({})`
  width: 48%;
`;

export const FinishInspection = styled(Button).attrs({
  type: 'error',
})`
  width: 48%;
`;

export const TitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
`;

export const HeaderModal = styled.View`
  display: flex;
  flex-direction: row-reverse;
`;

export const DetailsModal = styled.View`
  flex-direction: column;
`;

export const SubContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const RowContainer = styled.View`
  flex-direction: column;
`;

export const ColumnContainer = styled.View`
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const SmallModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 5px;
`;

export const DescriptionModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textInput};
`;

export const SubtitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 15px;
`;

export const SampleDescriptionModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textInput};
  margin-bottom: 10px;
`;

export const RepeatButton = styled(Button)`
  width: 100%;
`;

export const RepeatInput = styled(Input)`
  width: 100%;
`;
