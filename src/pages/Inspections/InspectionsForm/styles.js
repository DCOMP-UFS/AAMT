import styled from 'styled-components/native';

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

export const Title = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Small = styled.Text`
  font-family: 'Lato-Regular';
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  font-size: 16px;
  font-family: 'Lato-Regular';
  color: ${({ theme }) => theme.colors.textInput};
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 100px;
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderInput};
  margin-bottom: 10px;
`;
