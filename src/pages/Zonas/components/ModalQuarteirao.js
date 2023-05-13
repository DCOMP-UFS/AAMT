/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import SelectWrap from '../../../components/SelectWrap';
import ButtonSaveModal from '../../../components/ButtonSaveModal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getRuaPorCepRequest, streetExistRequest, clearStreetExist } from '../../../store/Rua/ruaActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

/**
 * Modal de adição de quarteirao à uma zona
 * @param {String} acao cadastrar ou editar
 * @param {Boolean} show abrir ou fechar modal
 * @param {Function} handleClose função para fechar modal
 * @param {Function} addQuarteirao função para adicionar quarteirao
 * @param {Object} props demais propriedades para funcionamento do componente
 * @returns 
 */
const ModalQuarteirao = ( { acao, show, handleClose, quarteiroes, localidades, addQuarteirao, ...props } ) => {
  const [ localidade, setLocalidade ]               = useState( {} );
  const [ quarteirao, setQuarteirao ]               = useState( {} );
  const [ optionLocalidade, setOptionLocalidade ]   = useState( [] );
  const [ optionQuarteirao, setOptionQuarteirao ]   = useState( [] );
  const [ flLoading, setFlLoading ]                 = useState( false );

   /**
   *  Limpa os campos toda vez que o modal for aberto
   */
  useEffect(() => {
    if( show ) {
      limparTudo()
    }

  }, [ show ]);

  /**
   * Preenchendo as opções das localidades
   */
  useEffect(() => {
    const options = localidades.map( loc => ( { value: loc.id, label: loc.nome } ) );
    setOptionLocalidade( options );
  }, [ localidades ]);


  useEffect(() => {
    const quarteiroesLocalidade = quarteiroes.filter( q => q.localidade.id == localidade.value)

    const options = quarteiroesLocalidade.map( q => ( { value: q.id, label: q.numero, localidade: q.localidade.nome } ) );

    setQuarteirao( {} )
    setOptionQuarteirao( options );
  }, [ localidade ]);


  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();
    const quart = {id: quarteirao.value, numero: quarteirao.label, localidade: quarteirao.localidade} 
    addQuarteirao( quart );
    
  }

  function limparTudo(){
    setQuarteirao( {} );
    setLocalidade( {} );
  }

  return(
    <Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          { acao == 'add' ? 'Adicionar' : 'Editar' } Quarteirão
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <p className="text-description">
            <b>OBS1:</b> Os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col md="12">
              <FormGroup>
                <label htmlFor="l_loc">Bairro/Localidade  <code>*</code></label>
                  <SelectWrap
                    id="l_loc"
                    value={ localidade }
                    styles={ selectDefault }
                    options={ optionLocalidade }
                    onChange={ e => setLocalidade( e ) }
                    required
                  />
              </FormGroup>
              <FormGroup>
                <label htmlFor="l_q">Nº do quarteirão  <code>*</code></label>
                <SelectWrap
                  id="l_q"
                  value={ quarteirao }
                  styles={ selectDefault }
                  options={ optionQuarteirao }
                  onChange={ e => setQuarteirao( e ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <div style={{height:200}}></div>
        </Modal.Body>
        <Modal.Footer>
          <ContainerArrow className="justify-content-end">
            <div>
            <Button 
                type="button" 
                className="secondary" 
                data-dismiss="modal" 
                onClick={ handleClose }
                disabled={ flLoading }>
                  Cancelar
              </Button>
              <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
            </div>
          </ContainerArrow>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

/**
 * Mapeia o estado global da aplicação a propriedade do componente
 * @param {Object} state estado global
 * @returns 
 */
const mapStateToProps = state => ( {
  municipio_id: state.appConfig.usuario.municipio.id,
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    getRuaPorCepRequest,
    streetExistRequest,
    clearStreetExist,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalQuarteirao );
