import React from 'react';
import { ListaHorizontal, Item, Icon } from './styles';

/**
 * Lista horizontal padrão do sistema
 * 
 * @param {*} children conteúdo dentro da lista
 * @param {*} props demais parametros
 * @returns 
 */
export const Lista = ( { children, ...props } ) => {
  return ( 
    <ListaHorizontal { ...props }>
      { children }
    </ListaHorizontal>
  );
}

/**
 * Itens da lista horizontal
 * 
 * @param {*} children conteúdo dentro da lista
 * @param {*} props demais parametros
 * @returns
 */
export const ListaItem = ( { children, ...props } ) => (
  <Item { ...props }>{ children }</Item>
);

export const ListaIcon = ( { children, ...props } ) => (
  <Icon { ...props }>{ children }</Icon>
);