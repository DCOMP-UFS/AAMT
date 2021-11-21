import styled, { css } from 'styled-components/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';

const containerModifiers = {
  warning: css`
    background-color: ${({ theme }) => theme.colors.lightWarning};
  `,
};

const colorModifiers = {
  warning: css`
    color: ${({ theme }) => theme.colors.warning};
  `,
};

export const Container = styled(View).attrs({
  elevation: 1,
  shadowOffset: { width: 3, height: 3 },
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 12,
})`
  flex-direction: row;
  border-radius: 4px;
  width: 100%;
  height: 80px;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  ${props => props.type && containerModifiers[props.type]}
`;

export const Column = styled.View`
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  ${props => props.type && colorModifiers[props.type]}
  font-size: 18px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  ${props => props.type && colorModifiers[props.type]}
  font-size: 14px;
`;

export const Icon = styled(FontAwesome5).attrs(props => ({
  name: props.iconName,
  color: props.theme.colors[props.iconColor],
}))``;
