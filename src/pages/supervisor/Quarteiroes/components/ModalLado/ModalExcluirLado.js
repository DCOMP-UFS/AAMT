/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';

// Models
// import { Lado } from '../../../../../config/models';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { excluirLadoRequest } from '../../../../../store/Quarteirao/quarteiraoActions';

// STYLES
import { ContainerArrow } from '../../../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../../../styles/global';

/**
 * Modal de excluir um lado
 * 
 * @param {array} lados lados
 * @param {int} ladoIndex index do lado a ser excluido
 * @param {boolean} show abrir ou fechar modal
 * @param {function} handleClose função para fechar modal
 * @param {object} props demais propriedades para funcionamento do componente
 * @returns 
 */
const ModalExcluirLado = ( { lados, ladoIndex, show, handleClose, ...props } ) => {
  /**
   * Esta variável armazena o lado ao qual os imóveis de lados[ladoIndex] devem ser
   * associados após a exclusão.
   */
  const [ excluirLadoId, setExcluirLadoId ] = useState( -1 );
  const [ lado, setLado ]                   = useState( {} );
  const [ optionLado, setOptionLado ]       = useState( [] );
  const [ numero, setNumero ]               = useState( -1 );
  const [ classValido, setClassValido ]     = useState( '' );

  useEffect(() => {
    const options = lados.filter( ( l, index ) => index != ladoIndex ).map( l => ( { value: l.id, label: l.numero } ) );

    setOptionLado( options );
  }, [ ladoIndex ]);

  useEffect(() => {
    if( lados.length > 0 && ladoIndex != -1 ) {
      if( lados[ ladoIndex ] ) {
        setNumero( lados[ ladoIndex ].numero );
        setExcluirLadoId( lados[ ladoIndex ].id );
      }
    }
  }, [ lados, ladoIndex ]);

  /**
   * Valida o formulário e, caso seja válido, solicita exclusão do lado
   * a api
   * 
   * @param {object} e Elemento que acionou essa função
   */
  const handleSubmit = e => {
    e.preventDefault();

    if( lado.value ) {
      props.excluirLadoRequest( excluirLadoId, lado.value );
      setLado( {} );
      handleClose();
    } else {
      setClassValido( 'invalid' );
    }
  }

  return(
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>
          Excluir Lado
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <Row>
            <Col>
              <FormGroup className="mb-0">
                <label htmlFor="l_rua">Selecione um lado para atribuir os imóveis do lado { numero }<code>*</code></label>
                <Select
                  id="l_rua"
                  className={ classValido }
                  value={ lado }
                  styles={ selectDefault }
                  options={ optionLado }
                  onChange={ e => setLado( e ) }
                />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <ContainerArrow className="justify-content-end">
            <div>
              <Button type="button" className="secondary" onClick={ handleClose }>Cancelar</Button>
              <Button type="submit">Salvar</Button>
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
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    excluirLadoRequest
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalExcluirLado );