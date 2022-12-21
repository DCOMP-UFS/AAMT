/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import MaskedInput from '../../../../components/MaskedInput'
import ButtonSaveModal from '../../../../components/ButtonSaveModal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS 
import { clearStreetExist, updateStreetRequest, clearUpdate, getStreetByCityRequest } from '../../../../store/Rua/ruaActions';

// STYLES
import { ContainerArrow } from '../../../../styles/util';
import { Button, FormGroup } from '../../../../styles/global';

// VALIDATIONS FUNCTIONS
import { isBlank, isCepValid } from '../../../../config/function';

import { showNotifyToast } from "../../../../store/AppConfig/appConfigActions";

// STYLES

const ModalEditarRua = ({id, show, handleClose, rua, ...props }) => {

  const [ cep, setCep ]                                                 = useState( "" );
  const [ nomeNovoLogradouro, setNomeNovoLogradouro ]                   = useState( "" );
  const [ isValidNomeNovoLogradouro, setIsValidNomeNovoLogradouro ]     = useState( true );
  const [ isValidCep, setIsValidCep ]                                   = useState( true );
  const [ flLoading, setFlLoading ]                                     = useState( false );


  /**
   *  Limpa os campos toda vez que o modal for aberto
   */
  useEffect(() => {
    if( show ) {
      setCep(rua.cep)
      setNomeNovoLogradouro(rua.nome)
      setIsValidNomeNovoLogradouro(true)
      setIsValidCep(true)
    }
  }, [ show ]);

  /**
   * Esta função verifica se os cep e o nome são validos
   * Caso seja verdadeiro, é feito uma requisição para atualiza-la
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();

    const nomeInvalido = isBlank(nomeNovoLogradouro)
    const cepInvalido = !isCepValid(cep)

    nomeInvalido  ? setIsValidNomeNovoLogradouro(false) : setIsValidNomeNovoLogradouro(true)
    cepInvalido   ? setIsValidCep(false)   : setIsValidCep(true)

    if(!nomeInvalido && !cepInvalido){
      const cepSemMascara = cep.replace(/[^0-9]/g, '')
      setFlLoading(true)
      props.updateStreetRequest(rua.id, nomeNovoLogradouro, cepSemMascara)
    }
    
  }

  useEffect(() => {
    
    if(props.updated == true){
      props.getStreetByCityRequest(props.municipio.id)
      setFlLoading(false)
      handleClose()
      props.clearStreetExist();
      props.clearUpdate()
    }
    //Não pode aceitar null, por isso estou usando ==false
    else if(props.updated == false){
      setFlLoading(false)
      props.clearStreetExist();
      props.clearUpdate()
    }
    
  }, [ props.updated ])

  function limparTudo(){
    setCep( "" );
    setNomeNovoLogradouro( "" );
    setIsValidCep(true)
    setIsValidNomeNovoLogradouro(true)
  }

  return(
    <Modal id= {id} show={ show } onHide={ handleClose } backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Editar Logradouro
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <p className="text-description">
            <b>OBS1:</b> Os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col sm="12" md="6">
              <FormGroup className="mb-0">
                <label htmlFor="l_cep">CEP<code>*</code></label>
                <MaskedInput
                  id        = "l_cep"
                  type      = "cep"
                  value     = { cep }
                  className = "form-control" 
                  onChange  ={ e => setCep( e.target.value ) }
                  required = { true }
                />
                {
                    !isValidCep ?
                      <span class="form-label-invalid">CEP inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
            <Col sm="12" md="6" >
              <FormGroup className="mb-0">
                <label htmlFor="l_outra">Nome<code>*</code></label>
                <input
                  id="l_outra"
                  value={ nomeNovoLogradouro }
                  className="form-control"
                  onChange={ e => setNomeNovoLogradouro( e.target.value ) }
                  required={ true }
                />
                {
                    !isValidNomeNovoLogradouro ?
                      <span class="form-label-invalid">Nome inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
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
  ruas        : state.rua.ruas,
  updated     : state.rua.updated,
  municipio   : state.appConfig.usuario.municipio
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getStreetByCityRequest,
      updateStreetRequest,
      clearStreetExist,
      clearUpdate,
      showNotifyToast,  
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalEditarRua );
