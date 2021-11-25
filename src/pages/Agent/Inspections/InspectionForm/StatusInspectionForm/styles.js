import styled from 'styled-components/native';
import Button from '../../../../../components/Button';

import TextInput from '../../../../../components/TextInput';

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

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
`;

export const Small = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
`;

export const SectionContainer = styled.View`
  flex-direction: column;
  margin-bottom: 10px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 100px;
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderInput};
`;

export const TInput = styled(TextInput)``;

export const ErrorMessage = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;

export const SubmitButton = styled(Button).attrs({})`
  margin-top: 10px;
`;
