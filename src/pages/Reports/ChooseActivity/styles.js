import styled from 'styled-components/native';

import Button from '../../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Card = styled.View`
  flex-direction: column;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  margin-bottom: 10px;
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
  color: ${({ theme }) => theme.colors.textInput};
  margin-bottom: 15px;
`;

export const AccordionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  background-color: #0095da;
  border-radius: 4px;
`;

export const AccordionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #fff;
  font-size: 16px;
`;

export const Box = styled.View`
  background-color: #f7f7f7;
  padding: 10px;
`;

export const AccordionItemText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Smaller = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textInput};
  font-size: 16px;
  margin-bottom: 10px;
`;

export const SelectActivityButton = styled(Button).attrs({})`
  margin-top: 10px;
`;
