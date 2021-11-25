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

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const SampleItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: #edf1f4;
  padding: 20px 0px;
  flex-grow: 1;
  flex: 1;
  align-items: center;
`;

export const SampleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.grayNotSelected};
  font-size: 16px;
  flex-wrap: wrap;
  width: 90%;
  margin-right: 7px;
`;

export const ExtraContainer = styled.View`
  flex-direction: column;
  margin: 15px 0px;
`;
