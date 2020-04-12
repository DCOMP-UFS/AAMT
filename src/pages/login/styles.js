import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Color } from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

// .background(
//   LinearGradient(gradient: Gradient(colors: [.purple, .blue]), startPoint: .top, endPoint: .bottom)
// .edgesIgnoringSafeArea(.all))

export const ViewAppName = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const AppName = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

export const Body = styled.View`
  padding-top: 50px;
  align-items: center;
  width: 100%;
`;

export const Brand = styled.View`
  width: 150px;
  height: 150px;
`;

export const styles = StyleSheet.create({
  gradientBrand: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#fff',
  },

  textVersion: {
    color: '#fff',
    paddingBottom: 10
  },

  submitButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Color.success,
    height: 45,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },

  textSubmit: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#FFF',
    textAlign: 'center'
  }
});