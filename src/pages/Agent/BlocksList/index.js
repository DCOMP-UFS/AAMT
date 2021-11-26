import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  changeBlockIndex,
  changeStreetIndex,
} from '../../../store/modules/inspectionForm/actions';

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
import { useEffect } from 'react/cjs/react.development';

const BlocksList = ({ currentIndex, routes, ...props }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isStarted, rota } = route.params;

  const [currentRoute, setCurrentRoute] = useState([]);

  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentRoute(routes[currentIndex].rota);
    } else {
      setCurrentRoute(rota);
    }
  }, []);

  return (
    <Container>
      <Card>
        {currentRoute.length > 0 ? (
          currentRoute.map((block, blockIndex) => (
            <Collapse key={block.id} style={{ margin: 5 }}>
              <CollapseHeader>
                <Header>
                  <Title>{`Quarteirão ${block.numero}`}</Title>
                </Header>
              </CollapseHeader>
              <CollapseBody>
                <Box>
                  {block.lados.map((street, streetIndex) => (
                    <TouchableOpacity
                      key={street.id}
                      onPress={() => {
                        if (isStarted) {
                          props.changeBlockIndex(blockIndex);
                          props.changeStreetIndex(streetIndex);
                          navigation.navigate('Lista de imóveis', {
                            street: street.rua.nome,
                          });
                        }
                      }}
                    >
                      <Street>
                        <StreetText>{street.rua.nome}</StreetText>
                        <StreetText>{`${street.imoveis.length} ${
                          street.imoveis.length === 1 ? 'imóvel' : 'imóveis'
                        }`}</StreetText>
                      </Street>
                    </TouchableOpacity>
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
  currentIndex: state.routes.currentRouteIndex,
  routes: state.routes.routes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeBlockIndex, changeStreetIndex }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BlocksList);
