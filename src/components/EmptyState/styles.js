import styled from 'styled-components/native';

import Button from '../Button';

export const RetryButton = styled(Button).attrs({})`
  width: 48%;
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
