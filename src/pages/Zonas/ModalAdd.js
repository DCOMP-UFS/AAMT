/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import ButtonSaveModal from '../../components/ButtonSaveModal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createZoneRequest, clearCreate } from '../../store/Zona/zonaActions';

// STYLES
import { Button } from '../../styles/global';
import { FormGroup } from '../../styles/global';

// VALIDATIONS FUNCTIONS
import {isBlank,onlyLetters} from '../../config/function';

function ModalAdd({ createZoneRequest, created, municipio_id, ...props }) {

  const [ nome, setNome ]                 = useState( "" );
  const [ isValidNome, setIsValidNome ]   = useState( true );
  const [ flLoading, setFlLoading ]       = useState( false );

  function handleCadastrar( e ) {
    e.preventDefault();
    if(isBlank(nome))
      setIsValidNome(false)
    else{
      setIsValidNome(true)
      setFlLoading(true)
      createZoneRequest( municipio_id, nome );
    }
  }

  useEffect(() => {
    props.clearCreate();
  }, []);

  useEffect(() => {
    setFlLoading(false)
    if( created ){
      closeModal();
    }
    
    props.clearCreate();
    
  }, [ created ]);

  function closeModal() {
    clearInput();
    $('#modal-novo-zona').modal('hide');
  }

  function clearInput() {
    setIsValidNome(true);
    setNome( "" );
  }

  return(
    <Modal id="modal-novo-zona" title="Cadastrar Zona">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
        <p className="text-description">
          Atenção os campos com <code>*</code> são obrigatórios
        </p>
        <Row>
            <Col>
              <FormGroup>
                <label htmlFor="nome">Nome <code>*</code></label>
                <input 
                  id="nome" 
                  value={nome} 
                  className ={ `form-control ${ !isValidNome ? 'invalid' : '' }` } 
                  onChange={ (e) => (onlyLetters(e.target.value) ? setNome(e.target.value) : () => {} )} 
                  required />
                  {
                    !isValidNome ?
                      <span class="form-label-invalid">Nome inválido</span> :
                      ''
                  }
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button 
            type="button" 
            className="secondary" 
            data-dismiss="modal" 
            onClick = { closeModal } 
            disabled={ flLoading }>
              Cancelar
          </Button>
          <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  created: state.zona.created
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createZoneRequest, clearCreate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
