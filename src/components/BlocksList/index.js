/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {connect} from 'react-redux';

import {Container, Card, Title, Small, Street} from './styles';

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
          ruas.push(lado.rua.nome);
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

const BlocksList = ({routes}) => {
  return (
    <Container>
      <Card>
    {
      routes ?
      (generateBlockList(routes).map(block => (
        <Collapse key={block.blocks} style={{margin: 5}}>
          <CollapseHeader>
            <View style={{flexDirection:'row', justifyContent: 'space-between', padding:15, backgroundColor:'#0095DA', borderRadius: 4}}>
              <Title>{`Quarteirão ${block.blocks}`}</Title>
              <Small>{`${block.housesQuantity} imóveis`}</Small>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={{padding: 8, backgroundColor: '#f7f7f7' }}>
            {block.streets.map(street => (
              <Street key={street}>{`- ${street}`}</Street>
            ))}
            </View>
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
});

export default connect(
  mapStateToProps
)(BlocksList);

