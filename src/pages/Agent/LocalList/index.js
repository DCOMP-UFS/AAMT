import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  changeBlockIndex,
  changeStreetIndex,
} from '../../../store/modules/inspectionForm/actions';

import {
  Container,
  Card,
  Box,
  AccordionItemText
} from './styles';

const LocalList = ({ currentIndex, routes, ...props }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isRouteStarted, rota } = route.params;
  
  function defineLocals(){
    let blockList = null
    if(!isRouteStarted)
      blockList = rota
    else
      blockList = routes[currentIndex].rota
    
    let localList = []
    blockList.forEach(block => {
      const blockLocal = { 
        id: block.localidade.id, 
        nome: block.localidade.nome 
      }

      if(localList.length == 0)
        localList.push(blockLocal)
      else{
        const localRepetido = localList.find( local => local.id == blockLocal.id)
        if(localRepetido == undefined)
          localList.push(blockLocal)
      }
    });

    localList.sort( (a,b) => a.nome - b.nome )
    return localList
  }

  const locals = defineLocals();

  return (
    <Container>
      <Card>
        {locals.length > 0 ? (
          locals.map((local, localIndex) => (
            <Box key={localIndex}>
              <TouchableOpacity
                key={local.id}
                onPress={() => {
                  navigation.navigate("Rota - Quarteirões",{
                   local_id: local.id,
                   isRouteStarted, 
                   rota,
                  })
                }}
              >
                <AccordionItemText>
                  {local.nome}
                </AccordionItemText>
              </TouchableOpacity>
          </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocalList);
