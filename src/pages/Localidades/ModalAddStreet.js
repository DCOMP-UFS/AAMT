/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createStreetRequest } from '../../store/actions/RuaActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup } from '../../styles/global';

function ModalAddStreet({ created, ...props }) {
  const [ logradouro, setLogradouro ] = useState("");
  const [ cep, setCep ] = useState("");

  useEffect(() => {
    if( created ) {
      $('#modal-novo-rua').modal('hide');
      setLogradouro("");
      setCep("");
    }
  }, [ created ]);

  function handleSubmit( e ) {
    e.preventDefault();
    props.createStreetRequest( logradouro, cep, props['data-localidade-id'] );
  }

  return(
    <Modal id="modal-novo-rua" title="Editar Rua">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="cep">CEP <code>*</code></label>
                <input
                  id="cep"
                  value={ cep }
                  className="form-control"
                  onChange={ e => setCep(e.target.value) }
                  required
                />
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
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow className="justify-content-end">
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
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
  bindActionCreators({ createStreetRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddStreet);
