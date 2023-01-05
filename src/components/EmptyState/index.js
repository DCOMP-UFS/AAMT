import React from 'react';
import { Image } from 'react-native';

import { 
    EmptyContainer, 
    EmptyTitle,
    EmptyDescription,
    RetryButton
} from './styles';

import emptyState from '../../assets/empty-state.png';
import noInternet from '../../assets/no-internet.png';

const EmptyState = ({ connState, emptyDescription, retryButtonText, retryButtonFunction, ...rest }) => {
  return (
    <EmptyContainer>
        {connState === true && (
          <>
            <Image
              source={emptyState}
              style={{
                resizeMode: 'contain',
                width: 270,
                height: 160,
                marginBottom: 20,
                tintColor: '#999999',
              }}
            />
            <EmptyTitle>Ohh... que pena!</EmptyTitle>
            <EmptyDescription>
                {emptyDescription}
            </EmptyDescription>
            <RetryButton
                style={{marginTop:10}}
                onPress={retryButtonFunction}
              >
                {retryButtonText}
            </RetryButton>
          </>
        )}
        {connState === false && (
          <>
            <Image
              source={noInternet}
              style={{
                resizeMode: 'contain',
                width: 270,
                height: 160,
                marginBottom: 20,
                tintColor: '#999999',
              }}
            />
            <EmptyTitle>Ohh... não tem internet!</EmptyTitle>
            <EmptyDescription>
              Precisamos que conecte-se com a internet para conseguirmos
              as informações desejadas por você.
            </EmptyDescription>
          </>
        )}
      </EmptyContainer>
  );
};

export default EmptyState;
