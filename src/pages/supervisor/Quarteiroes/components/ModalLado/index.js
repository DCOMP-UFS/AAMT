/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';

// Models
import { Lado } from '../../../../../config/models';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getRuaPorCepRequest } from '../../../../../store/Rua/ruaActions';

// STYLES
import { ContainerArrow } from '../../../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../../../styles/global';

/**
 * Modal de adição/edição de um lado
 * 
 * @param {Model} lado modelo de dados
 * @param {String} acao cadastrar ou editar
 * @param {Boolean} show abrir ou fechar modal
 * @param {Function} handleClose função para fechar modal
 * @param {Function} addLado função para adicionar lado
 * @param {Object} props demais propriedades para funcionamento do componente
 * @returns 
 */
const ModalLado = ( { lado, acao, show, handleClose, ruas, addLado, ...props } ) => {
  const [ rua, setRua ]             = useState( {} );
  const [ optionRua, setOptionRua ] = useState( [] );
  const [ cep, setCep ]             = useState( "" );
  const [ outra, setOutra ]         = useState( "" );

  /**
   * Preenchendo as opções do select de rua
   */
  useEffect(() => {
    const options = ruas.map( r => ( { value: r.id, label: r.nome, cep: r.cep } ) );
    options.push( { value: null, label: 'Outra', cep: '' } );

    setOptionRua( options );
  }, [ ruas ]);

  /**
   * O estado props.rua é preenchido sempre que a consulta de rua pelo cep
   * retorna um valor válido.
   * Este effect monitora este estado para preencher o campo outra.
   */
  useEffect(() => {
    if( rua.value === null )
      setOutra( props.rua.nome );
  }, [ props.rua ] );

  /**
   * Este effect monitora o estado local do componente rua.
   * Toda vez que a rua é setada para um valor diferente de outra esta função
   * limpa os dados dos campos cep e outra.
   */
  useEffect(() => {
    if( rua.value ) {
      setOutra( "" );
      setCep( "" );
    }
  }, [ rua ])

  /**
   * Atualizando o campo rua pelo CEP atual
   */
  const getRuaPorCep = () => {
    if( cep.length == 8 ) 
      props.getRuaPorCepRequest( cep );
  }

  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();

    const lado = new Lado( {
      rua_id        : rua.value,
      logradouro    : rua.value ? rua.label : outra,
      cep           : rua.cep ? rua.cep : cep,
      outro         : outra
    } );

    addLado( lado );

    // Limpando variáveis
    setRua( {} );
    setCep( "" );
    setOutra( "" );
  }

  return(
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>
          { acao == 'cadastrar' ? 'Cadastrar' : 'Editar' } Lado
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <Row>
            <Col md="12">
              <FormGroup>
                <label htmlFor="l_rua">Rua <code>*</code></label>
                <Select
                  id="l_rua"
                  value={ rua }
                  styles={ selectDefault }
                  options={ optionRua }
                  onChange={ e => setRua( e ) }
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup className="mb-0">
                <label htmlFor="l_cep">CEP</label>
                <input
                  id        ="l_cep"
                  value     ={ cep }
                  className ="form-control"
                  onChange  ={ e => setCep( e.target.value ) }
                  onBlur    ={ getRuaPorCep }
                  disabled  ={ rua.value === null ? false : true }
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup className="mb-0">
                <label htmlFor="l_outra">Outra</label>
                <input
                  id="l_outra"
                  value={ outra }
                  className="form-control"
                  onChange={ e => setOutra( e.target.value ) }
                  disabled={ rua.value === null ? false : true }
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
  rua: state.nw_rua.rua
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    getRuaPorCepRequest
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalLado );
