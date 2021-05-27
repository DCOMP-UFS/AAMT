import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

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
import { useEffect } from 'react/cjs/react.development';

const BlocksList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState([]);
  const currentIndex = useSelector(state => state.routes.currentRouteIndex);
  const routes =
    currentIndex >= 0
      ? useSelector(state => state.routes.routes[currentIndex].rota)
      : null;

  useEffect(() => {
    if (routes) {
      setCurrentRoute(routes);
    } else {
      const { rota } = route.params;
      setCurrentRoute(rota);
    }
  }, []);

  return (
    <Container>
      <Card>
        {currentRoute.length > 0 ? (
          currentRoute.map(block => (
            <Collapse key={block.id} style={{ margin: 5 }}>
              <CollapseHeader>
                <Header>
                  <Title>{`Quarteirão ${block.numero}`}</Title>
                </Header>
              </CollapseHeader>
              <CollapseBody>
                <Box>
                  {block.lados.map(street => (
                    <TouchableOpacity key={street.id}>
                      <Street>
                        <StreetText>{street.rua.nome}</StreetText>
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

  // return (
  //   <Container>
  //     <Card>
  //       {routes ? (
  //         Object.keys(routes).map((block, i) => (
  //           <Collapse key={i} style={{ margin: 5 }}>
  //             <CollapseHeader>
  //               <Header>
  //                 <Title>{`Quarteirão ${routes[block].numero}`}</Title>
  //               </Header>
  //             </CollapseHeader>
  //             <CollapseBody>
  //               <Box>
  //                 {routes[block].lados.map((lado, j) => (
  //                   <TouchableWithoutFeedback
  //                     key={lado.id}
  //                     onPress={() =>
  //                       activityStarted
  //                         ? navigation.navigate('Lista de Imóveis', {
  //                             street: lado.rua.nome,
  //                             street_id: lado.id,
  //                             block_number: routes[block].numero,
  //                             blockIndex: i,
  //                             streetIndex: j,
  //                           })
  //                         : ''
  //                     }
  //                   >
  //                     <Street>
  //                       <StreetText>{lado.rua.nome}</StreetText>
  //                     </Street>
  //                   </TouchableWithoutFeedback>
  //                 ))}
  //               </Box>
  //             </CollapseBody>
  //           </Collapse>
  //         ))
  //       ) : (
  //         <Text>Não há rotas disponíveis</Text>
  //       )}
  //     </Card>
  //   </Container>
  // );
};

const mapStateToProps = state => ({
  // currentIndex: state.routes.currentRouteIndex,
  // routes: state.routes.routes[currentIndex].rota,
  // activityStarted: state.currentActivity.start_hour,
});

export default connect(mapStateToProps)(BlocksList);
