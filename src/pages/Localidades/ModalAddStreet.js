/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import ButtonSaveModal from '../../components/ButtonSaveModal';
import MaskedInput from '../../components/MaskedInput'

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createStreetRequest, clearCreate } from '../../store/Rua/ruaActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup } from '../../styles/global';

// VALIDATIONS FUNCTIONS
import { isBlank, onlyLetters} from '../../config/function';

function ModalAddStreet({ created, show, handleClose, ...props }) {
  const [ logradouro, setLogradouro ]                    = useState("");
  const [ isValidLogradouro, setIsValidLogradouro]       = useState( true );
  const [ cep, setCep ]                                  = useState("");
  const [ isValidCep, setIsValidCep]                     = useState( true );
  const [ flLoading, setFlLoading ]                      = useState( false );

  //UseEffect responsavel por limpar os dados do modal
  //toda vez que ele for aberto
  useEffect(() => {
    if( show ) {
      limparTudo()
    }
    //muda o valor do show para false
    //não faz com que o modal feche, mas garante que 
    //que este UseEffect seja acionado quando o modal
    //for aberto novamente, ja que quando isso acontece
    //o show que até então era falso se torna verdadeiro
    handleClose()
  }, [ show ]);

  useEffect(() => {
    if( created ) {
      $('#modal-novo-rua').modal('hide');
    }
    setFlLoading(false)
    props.clearCreate()
  }, [ created ]);

  function handleSubmit( e ) {
    e.preventDefault();
    const cepInvalid = (cep.length > 0 && cep.length < 8)
    const logInvalid = isBlank(logradouro)

    cepInvalid ? setIsValidCep(false) : setIsValidCep(true)
    logInvalid ? setIsValidLogradouro(false): setIsValidLogradouro(true)

    if(!cepInvalid && !logInvalid){
      setFlLoading(true)
      props.createStreetRequest( logradouro, cep, props['data-localidade-id'] );
    }
  }

  const limparTudo = () => {
    setIsValidCep(true)
    setIsValidLogradouro(true)
    setFlLoading(false)
    setCep("")
    setLogradouro("");
  }

  return(
    <Modal id="modal-novo-rua" title="Cadastrar Rua">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <p className="text-description">
            Atenção os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="logradouro">Logradouro <code>*</code></label>
                <input
                  id="logradouro"
                  value={ logradouro }
                  className="form-control"
                  onChange={ e =>( onlyLetters(e.target.value) ? setLogradouro(e.target.value) : '' ) }
                  required
                />
                {
                    !isValidLogradouro ?
                      <span class="form-label-invalid">Logradouro inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="cep">CEP <code>*</code></label>
                <MaskedInput
                  id="cep"
                  className="form-control"
                  type="cep"
                  value={ cep }
                  onChange={ e => setCep(e.target.value) }
                  required
                />
                {
                    !isValidCep ?
                      <span class="form-label-invalid">CEP inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow className="justify-content-end">
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

const mapStateToProps = state => ({
  created: state.rua.created
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createStreetRequest, clearCreate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddStreet);
