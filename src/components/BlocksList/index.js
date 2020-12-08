/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {useNavigation} from '@react-navigation/native';

import {connect} from 'react-redux';

import {Container, Header, Card, Title, Small, Box, Street, StreetText} from './styles';

// function generateBlockList (routes) {
//   let output = [];
//   let qtdImoveis = 0;
//   let tmp;
//   let quarteirao;

//   if (routes === undefined) {
//     return [];
//   }

//   Object.keys(routes).forEach((i) => {
//       let ruas = [];
//       quarteirao = routes[i].numero;
//       routes[i].lados.forEach((lado) => {
//           ruas.push(lado.rua.nome);
//           qtdImoveis = qtdImoveis + lado.imoveis.length;
//       });
//       tmp = {'blocks' : quarteirao, 'housesQuantity' : qtdImoveis, 'streets' : ruas};
//       output.push(tmp);
//       qtdImoveis = 0;
//       tmp = undefined;
//       quarteirao = undefined;
//   });

//   return output;
// }

function generateBlockList (routes) {
  let output = [];
  let qtdImoveis = 0;
  let tmp;
  let quarteirao;

  if (routes === undefined) {
    return [];
  }

  Object.keys(routes).forEach((i) => {
      let ruas = [];
      quarteirao = routes[i].numero;
      routes[i].lados.forEach((lado) => {
          ruas.push({'streetName' : lado.rua.nome, 'properties' : lado.imoveis});
          qtdImoveis = qtdImoveis + lado.imoveis.length;
      });
      tmp = {'blocks' : quarteirao, 'housesQuantity' : qtdImoveis, 'streets' : ruas};
      output.push(tmp);
      qtdImoveis = 0;
      tmp = undefined;
      quarteirao = undefined;
  });

  return output;
}

const BlocksList = ({routes, activityStarted}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Card>
    {
      routes ?
      (generateBlockList(routes).map((block, i) => (
        <Collapse key={i} style={{margin: 5}}>
          <CollapseHeader>
            <Header>
              <Title>{`Quarteirão ${block.blocks}`}</Title>
              <Small>{`${block.housesQuantity} imóveis`}</Small>
            </Header>
          </CollapseHeader>
          <CollapseBody>
            <Box>
              {block.streets.map((street, j) => (
                <TouchableWithoutFeedback key={j} onPress={() => activityStarted ? navigation.navigate('Lista de Imóveis', {properties: street.properties, street: street['streetName']}) : ""}>
                <Street>
                  <StreetText>{street['streetName']}</StreetText>
                </Street>
                </TouchableWithoutFeedback>
            ))}
            </Box>
            </CollapseBody>
        </Collapse>
      ))) : (<Text>Não há rotas disponíveis</Text>)
    }
    </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  routes: state.activityRoutes.routes,
  activityStarted: state.activityRoutes.start_hour,
});

export default connect(
  mapStateToProps
)(BlocksList);

