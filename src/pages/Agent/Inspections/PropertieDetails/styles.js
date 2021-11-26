import styled from 'styled-components';

import Button from '../../../../components/Button';

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

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PropertyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  margin-left: 7px;
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

export const EditButton = styled(Button).attrs({})`
  margin-top: 5px;
`;
