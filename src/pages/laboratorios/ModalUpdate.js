/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createLaboratoryRequest, updateLaboratoryRequest, setUpdated } from '../../store/Laboratorio/laboratorioActions';
import { getCategoryRequest } from '../../store/Categoria/categoriaActions';

// MODELS
import { Laboratorio } from '../../config/models';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

function ModalUpdate( { laboratorio, municipio, updated, show, handleClose, ...props } ) {
  const [ cnpj, setCnpj ]                         = useState( null );
  const [ isValidCnpj, setIsValidCnpj ]           = useState( true );
  const [ nome, setNome ]                         = useState( "" );
  const [ categoria, setCategoria ]               = useState( { value: null, label: '' } );
  const [ isValidCategoria, setIsValidCategoria ] = useState( true );
  const [ endereco, setEndereco]                  = useState( "" );
  const [ optionCategoria ]                       = useState( [
    { value: 'sede', label: 'Sede' },
    { value: 'privado', label: 'Privado' }
  ] );

  /**
   * Este effect monitora o valor da variável laboratorio e seta os states de acordo
   * com ela.
   */
  useEffect( () => {
    setCnpj( laboratorio.cnpj );
    setNome( laboratorio.nome );
    setCategoria(
      laboratorio.tipoLaboratorio === 'sede' ?
        ( { value: 'sede', label: 'Sede' } ) :
        ( {value: 'privado', label: 'Privado' } )
    );
    setEndereco( laboratorio.endereco );
  }, [ laboratorio ] );

  /**
   * Este effect moditora a variável updated para verificar se a requisição
   * feita a API para atualização de laboratório foi finalizada com sucesso.
   */
  useEffect( () => {
    if( updated ) {
      handleClose();
      clearInput();
      props.setUpdated( false );
    }
  }, [ updated ] );

  /**
   * Limpa os campos do modal
   * @returns void
   */
  const clearInput = () => {
    setCnpj( null );
    setNome( "" );
    setCategoria( {} );
  }

  /**
   * Valida e solicita a edição do laboratório
   * @param {Element} e elemento HTML que acionou a função
   * @returns void
   */
  const submit = ( e ) => {
    e.preventDefault();

    if( cnpj.length !== 14 ) {
      setIsValidCnpj( false );
      return;
    } else {
      setIsValidCnpj( true );
    }

    if( !categoria.value ) {
      setIsValidCategoria( false );
      return;
    } else {
      setIsValidCategoria( true );
    }

    props.updateLaboratoryRequest( new Laboratorio( {
      cnpj,
      nome,
      endereco,
      tipoLaboratorio: categoria.value,
      municipio_id: municipio.id
    } ) );
  }

  return(
    <Modal show={ show } onHide={ handleClose } title="Editar Laboratório" size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          Município { municipio.nome }
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ submit }>
        <Modal.Body>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="cnpj">CNPJ<code>*</code></label>
                <input
                  id        ="cnpj"
                  value     ={ cnpj ? cnpj : "" }
                  className ={ `form-control ${ !isValidCnpj ? 'invalid' : '' }` }
                  onChange  ={ e => setCnpj( e.target.value ) }
                  maxlength ="14"
                  required
                  disabled
                />
                {
                  !isValidCnpj ?
                    <span class="form-label-invalid">CNPJ inválido</span> :
                    ''
                }
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="categoria">Tipo<code>*</code></label>
                <Select
                  id        ="categoria"
                  value     ={ categoria }
                  styles    ={ selectDefault }
                  options   ={ optionCategoria }
                  onChange  ={ e => setCategoria( e ) }
                  className ={ !isValidCategoria ? 'invalid' : '' }
                  required
                />
                {
                  !isValidCategoria ?
                    <span class="form-label-invalid">Campo obrigatório</span> :
                    ''
                }
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="nome">Nome <code>*</code></label>
                <input id="nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="nome">Endereço <code>*</code></label>
                <input id="endereco" value={endereco} className="form-control" onChange={ e => setEndereco(e.target.value) } required />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={ clearInput }>Limpar</Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

/**
 * Mapeia os estados do reduce para o props do componente
 * @param {Object} state estado global do reduce
 * @returns {Object}
 */
const mapStateToProps = state => ( {
  updated   : state.localidade.updated,
  municipio : state.appConfig.usuario.municipio,
  categorias: state.categoria.categorias
} );

/**
 * Mapeia as actions para o props do componente
 * @param {*} dispatch
 * @returns
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    createLaboratoryRequest,
    getCategoryRequest,
    updateLaboratoryRequest,
    setUpdated
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalUpdate );
