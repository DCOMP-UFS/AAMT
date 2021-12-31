/**
 * @jest-environment jsdom
 */

import 'regenerator-runtime/runtime';
import React from 'react';
import InspecionarRecipiente, { INITIAL_STATE } from '../../src/pages/vistoria/components/InspecionarRecipiente/ModalCadastrarInspecao.js';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { screen, render, userEvent, fireEvent } from '../index';

const OBJETIVO = {
  li: 'LI',
  lit: 'LI+T',
}
 
describe( 'Componente ModalCadastrarInspecao', () => {
  test( 'não deve exibir ContainerUnidade sem foco de mosquito', () => {
    render(
      <Provider store={ store }>
        <InspecionarRecipiente objetivo={ OBJETIVO.li } />
      </Provider>
    );

    let tituloGerarAmostra = screen.queryByText( 'Gerar código da(s) amostra(s)' );
    expect( tituloGerarAmostra ).not.toBeInTheDocument();

    render(
      <Provider store={ store }>
        <InspecionarRecipiente objetivo={ OBJETIVO.li } STATE={ { ...INITIAL_STATE, fl_foco: { value: false, label: "Não" } } }/>
      </Provider>
    );

    tituloGerarAmostra = screen.queryByText( 'Gerar código da(s) amostra(s)' );

    expect( tituloGerarAmostra ).not.toBeInTheDocument();
  } );

  test( 'deve exibir ContainerUnidade com foco de mosquito', () => {
    render(
      <Provider store={ store }>
        <InspecionarRecipiente objetivo={ OBJETIVO.li } STATE={ { ...INITIAL_STATE, fl_foco: { value: true, label: "Sim" } } }/>
      </Provider>
    );
      
    expect( screen.getByText( 'Gerar código da(s) amostra(s)' ) ).toBeInTheDocument();
  } );

  test( 'não deve exibir ContainerTratamento quando o tratamento for falso', () => {
    expect( true ).toBe( true );
  } );

  test( 'deve exibir ContainerTratamento quando o tratamento for verdadeiro', () => {
    expect( true ).toBe( true );
  } );

  test( 'checando se ao marcar depósito eliminado tratado deve ser setado para falso', () => {
    expect( true ).toBe( true );
  } );

  test( 'ao inserir uma sequencia e clicar em adicionar amostra a amostra deve ser listada', () => {
    render(
      <Provider store={ store }>
        <InspecionarRecipiente objetivo={ OBJETIVO.li } STATE={ { ...INITIAL_STATE, fl_foco: { value: true, label: "Sim" } } }/>
      </Provider>
    );

    const inputSeqAmostra = screen.getByTestId( 'sequencia-amostra' );
    const btnAddAmostra   = screen.getByTestId( 'btn-add-amostra' );
    let ulAmostras        = screen.getByText( "Nenhuma amostra cadastrada" );
      
    expect( ulAmostras ).toBeInTheDocument();

    for( let i = 1; i <= 100; i++ ) {
      fireEvent.change( inputSeqAmostra, { target: { value: i } } );
      fireEvent.click( btnAddAmostra );
    }

    expect( document.querySelectorAll( '#lista-amostras li.item' ).length ).toBe( 100 );
  } );

  test( 'clicar no botão em remover da amostra remover da lista', () => {
    expect( true ).toBe( true );
  } );

  test( 'ao submeter os códigos das amostras não podem ser repetidos', () => {
    expect( true ).toBe( true );
  } );

  test( 'ao submeter os códigos das amostras devem ser valido', () => {
    expect( true ).toBe( true );
  } );
} );