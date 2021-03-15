import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

import {
  Container,
  Header,
  Card,
  Title,
  Small,
  Box,
  Street,
  StreetText,
} from './styles';

const BlocksList = ({ routes, activityStarted }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Card>
        {routes ? (
          Object.keys(routes).map((block, i) => (
            <Collapse key={i} style={{ margin: 5 }}>
              <CollapseHeader>
                <Header>
                  <Title>{`Quarteirão ${routes[block].numero}`}</Title>
                  {/* <Small>{`${block.housesQuantity} imóveis`}</Small> */}
                </Header>
              </CollapseHeader>
              <CollapseBody>
                <Box>
                  {routes[block].lados.map((lado, j) => (
                    <TouchableWithoutFeedback
                      key={lado.id}
                      onPress={() =>
                        activityStarted
                          ? navigation.navigate('Lista de Imóveis', {
                              street: lado.rua.nome,
                              street_id: lado.id,
                              block_number: routes[block].numero,
                              blockIndex: i,
                              streetIndex: j,
                            })
                          : ''
                      }
                    >
                      <Street>
                        <StreetText>{lado.rua.nome}</StreetText>
                      </Street>
                    </TouchableWithoutFeedback>
                  ))}
                </Box>
              </CollapseBody>
            </Collapse>
          ))
        ) : (
          <Text>Não há rotas disponíveis</Text>
        )}
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  routes: state.currentActivity.routes,
  activityStarted: state.currentActivity.start_hour,
});

export default connect(mapStateToProps)(BlocksList);
