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
import SelectInput from '@material-ui/core/Select/SelectInput';

function ModalUpdate( { laboratorio, municipio, updated, show, handleClose, cnpjId, ...props } ) {
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
  const [ ativo, setAtivo ]                       = useState( { value: null, label: '' });
  const [ optionAtivo ]                           = useState( [
    {value: true , label: 'Sim'},
    {value: false, label: "Não"},
  ]);

  /**
   * Este effect monitora o valor da variável laboratorio e seta os states de acordo
   * com ela.
   */

  useEffect( () => {
    setIsValidCnpj(true);
    setIsValidCategoria(true);
    setCnpj( laboratorio.cnpj );
    setNome( laboratorio.nome );
    setCategoria( 
      laboratorio.tipoLaboratorio === 'sede' ? 
        ( { value: 'sede', label: 'Sede' } ) : 
        ( {value: 'privado', label: 'Privado' } ) 
    );
    setEndereco( laboratorio.endereco );
    setAtivo( laboratorio.ativo ? {value: true , label: "Sim"} : {value: false, label: "Não" });
  }, [ show, laboratorio ] );

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
    setEndereco( "" );
    setAtivo( "" );
  }


  /**
   * Fecha o modal
   * @returns void
   */

   const cancel = () => {
    clearInput();
    handleClose();
  }

  /**
   * Valida e solicita a edição do laboratório
   * @param {Element} e elemento HTML que acionou a função
   * @returns void
   */
  const submit = ( e ) => {
    e.preventDefault();

    if( !categoria.value ) {
      setIsValidCategoria( false );
      return;
    } else {
      setIsValidCategoria( true );
    }

    props.updateLaboratoryRequest( new Laboratorio( {
      cnpjId,
      cnpj,
      nome,
      endereco,
      tipoLaboratorio: categoria.value,
      ativo: ativo.value,
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
            <Col sm='6' >
              <FormGroup>
                <label htmlFor="nome">Nome <code>*</code></label>
                <input id="nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
              </FormGroup>
            </Col>
            <Col>
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
            <Col>
              <FormGroup>
                <label htmlFor="ativo">Ativo <code>*</code></label>
                <Select
                  id        ="ativo"
                  value     ={ ativo }
                  styles    ={ selectDefault }
                  options   ={ optionAtivo }
                  onChange  ={ e => setAtivo( e ) }
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
                <label htmlFor="nome">Endereco <code>*</code></label>
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
              <Button type="button" className="secondary" onClick = { cancel } data-dismiss="modal">Cancelar</Button>
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
