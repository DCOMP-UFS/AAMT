/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createLocationRequest, clearCreate } from '../../store/Localidade/localidadeActions';
import { createLaboratoryRequest } from '../../store/Laboratorio/laboratorioActions';
import { getCategoryRequest } from '../../store/Categoria/categoriaActions';

// MODELS
import { Laboratorio } from '../../config/models';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

const ModalAdd = ( { municipio, show, handleClose, created, ...props } ) => {
  const [ cnpj, setCnpj ]                         = useState( null );
  const [ isValidCnpj, setIsValidCnpj ]           = useState( true );
  const [ nome, setNome ]                         = useState( "" );
  const [ categoria, setCategoria ]               = useState( { value: null, label: '' } );
  const [ isValidCategoria, setIsValidCategoria ] = useState( true );
  const [ endereco, setEndereco]                  = useState( null );
  const [ optionCategoria ]                       = useState( [ 
    { value: 'sede', label: 'Sede' },
    { value: 'privado', label: 'Privado' }
  ] );

  /**
   * Use effect para resetar os 'isValid' ao abrir o modal
   */
  useEffect( () => {
    setIsValidCnpj( true );
    setIsValidCategoria( true );
  }, [ show ]);

  /**
   * Este effect moditora o state laboratorio.created para verificar
   * se o laboratório foi criado na base, caso seja true
   * limpa o formulário e fecha o modal.
   */
  useEffect( () => {
    if( created ) {
      handleClose();
      props.clearCreate();
      clearInput();
    }
  }, [ created ] );

  /**
   * Limpa os campos do modal
   * @returns void
   */
  const clearInput = () => {
    setCnpj( null );
    setNome( "" );
    setCategoria( {} );
    setEndereco ("");
  }

  /**
   * Limpa os campos do Modal e fecha ele
   * @returns void
   */

  const cancel = () => {
    clearInput();
    handleClose();
  }

  /**
   * Valida e solicita a crição do laboratório
   * @param {Element} e elemento HTML que acionou a função
   * @returns void
   */
  const submit = ( e ) => {
    e.preventDefault();

    if( !_cnpj(cnpj) ){
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

    props.createLaboratoryRequest( new Laboratorio( {
      cnpj,
      nome,
      endereco,
      tipoLaboratorio: categoria.value,
      municipio_id: municipio.id
    } ) );

    handleClose();
  }

  /**
   * Função de validação do CNPJ
   * @param {val} cnpj  
   * @returns boolean
   */
  function _cnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
      return false;
    if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
      return false;
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
      pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
    pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
    return false;
    return true;
  }

  return(
    <Modal show={ show } onHide={ handleClose } title="Cadastrar Laboratório" size='lg'>
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
                <input id="nome" value={ nome } className="form-control" onChange={ e => setNome( e.target.value ) } required />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="nome">Endereco <code>*</code></label>
                <input id="endereco" value={ endereco } className="form-control" onChange={ e => setEndereco( e.target.value ) } required />
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
  created   : state.localidade.created,
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
    createLocationRequest,
    clearCreate,
    getCategoryRequest
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalAdd );