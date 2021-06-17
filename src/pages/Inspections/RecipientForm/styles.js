import styled from 'styled-components/native';

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
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Small = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const RecipientButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const Input = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid #dddddd;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #999999;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Lato-Bold';
  color: #3a3c4e;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const SampleItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: #edf1f4;
  padding: 20px 0px;
`;

export const SampleText = styled.Text`
  font-family: 'Lato-Regular';
  color: #a6a8ad;
  font-size: 16px;
`;

export const ExtraContainer = styled.View`
  flex-direction: column;
  margin: 15px 0px;
`;
