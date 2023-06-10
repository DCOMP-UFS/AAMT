/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import ButtonSaveModal from '../../components/ButtonSaveModal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createRegionalHealthRequest, clearCreatedRegional } from '../../store/RegionalSaude/regionalSaudeActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup } from '../../styles/global';

// VALIDATIONS FUNCTIONS
import {isBlank} from '../../config/function';

function ModalAdd( { estado_id, created, show, handleClose, ...props } ) {
  const [ nome, setNome ]                                       = useState( "" );
  const [ isValidNome, setIsValidNome ]                         = useState( true );
  const [ endereco, setEndereco ]                               = useState( "" );
  const [ isValidEndereco, setIsValidEndereco ]                 = useState( true );
  const [ flLoading, setFlLoading ]                             = useState( false );


/**
 * Limpa todos inputs e outros estados
 */
function limparTudo(){
  setNome("")
  setEndereco("")
  setIsValidNome(true)
  setIsValidEndereco(true)
  setFlLoading(false)
}

/**
   * Acionado sempre que o modal é for aberto
   * Limpa todos os dados digitado anteriormente
   * atraves da função limparTudo()
   */
useEffect(() => {
  if( show ) {
    limparTudo()
  }
  //não fecha o modal, mas faz com que o show=false
  //quando o usuario aperta o botão para abrir o modal novamente
  //faz com que show=true e então a função limparTudo() é executada
  handleClose()
}, [ show ]);

  useEffect( () => {
    props.clearCreatedRegional( );
  }, [] );

  useEffect( () => {
    if( created ) {
      $('#modal-nova-regional').modal( 'hide' );
    }
    props.clearCreatedRegional();
    setFlLoading(false)
  }, [ created ] );

  /**
   * Limpa os valores dos inputs no modal
   */
  const clearInput = () => {
    setNome("")
    setEndereco("")
  }
  
  /**
   * Realiza a validação do formulário
   */
  const validaFormulario = () => {
    var valida_adicionar_regional = true;

    if(isBlank(nome)){
      valida_adicionar_regional = false;
      setIsValidNome(false)
    }
    else
      setIsValidNome(true)
    
    if(isBlank(endereco)){
      valida_adicionar_regional = false;
      setIsValidEndereco(false)
    }
    else
      setIsValidEndereco(true)
    
    return valida_adicionar_regional;
  }

  /**
   * Solicita ao action que adicione uma nova regional
   * @param {element} e elemento que acionou a função
   */
  const handleSubmit = e => {
    e.preventDefault();

    var valida_adicionar_regional = validaFormulario();

    if (valida_adicionar_regional) {
      setFlLoading(true)
      props.createRegionalHealthRequest( nome, endereco, estado_id );
    }
  }

  return (
    <Modal id="modal-nova-regional" title="Cadastrar Regional" size="lg">
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <p className="text-description">
            Atenção os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="Nome">
                  Nome <code>*</code>
                </label>
                <input
                  id="nome"
                  value={ nome }
                  type="text"
                  className="form-control"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                {
                  !isValidNome ?
                    <span class="form-label-invalid">Nome inválido</span> :
                    ''
                }
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <label htmlFor="endereco">Endereço<code>*</code></label>
                  <input
                    id        ="endereco"
                    value     ={ endereco }
                    type      ="text"
                    className ="form-control"
                    onChange  ={ e => setEndereco( e.target.value ) }
                    required
                  />
                   {
                    !isValidEndereco ?
                      <span class="form-label-invalid">Endereço inválido</span> :
                      ''
                  }
                </FormGroup>
              </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" disabled={ flLoading } onClick={clearInput}>
                Limpar
              </Button>
            </div>
            <div>
            <Button 
                type="button" 
                className="secondary" 
                data-dismiss="modal" 
                disabled={ flLoading }>
                  Cancelar
              </Button>
              <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

//coordGeral: state.appConfig.usuario,
const mapStateToProps = state => ( {
  estado_id   : state.appConfig.usuario.regionalSaude.estado.id,
  created     : state.regionalSaude.created,
 } );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    createRegionalHealthRequest,
    showNotifyToast,
    clearCreatedRegional,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalAdd );
