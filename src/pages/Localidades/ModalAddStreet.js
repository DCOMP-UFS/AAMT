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
import { isBlank, onlyLetters, onlyNumbers } from '../../config/function';

function ModalAddStreet({ created, ...props }) {
  const [ logradouro, setLogradouro ]                    = useState("");
  const [ isValidLogradouro, setIsValidLogradouro]       = useState( true );
  const [ cep, setCep ]                                  = useState("");
  const [ isValidCep, setIsValidCep]                     = useState( true );
  const [ flLoading, setFlLoading ]                      = useState( false );

  useEffect(() => {
    if( created ) {
      $('#modal-novo-rua').modal('hide');
      setLogradouro("");
      setCep("");
    }
    setFlLoading(false)
    props.clearCreate()
  }, [ created ]);

  function handleSubmit( e ) {
    e.preventDefault();
    const cepInvalid = (cep.length > 0 && cep.length < 8)
    const logInvalid = isBlank(logradouro)
    if(cepInvalid)
      setIsValidCep(false)
    if(logInvalid)
      setIsValidLogradouro(false)
    if(!cepInvalid && !logInvalid){
      setIsValidCep(true)
      setIsValidLogradouro(true)
      setFlLoading(true)
      props.createStreetRequest( logradouro, cep, props['data-localidade-id'] );
    }
  }

  return(
    <Modal id="modal-novo-rua" title="Editar Rua">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
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
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="logradouro">Logradouro <code>*</code></label>
                <input
                  id="logradouro"
                  value={ logradouro }
                  className="form-control"
                  onChange={ e => setLogradouro(e.target.value) }
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
