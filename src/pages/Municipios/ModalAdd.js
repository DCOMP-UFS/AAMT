/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createCityRequest, clearCreateCity } from '../../store/actions/MunicipioActions';

// STYLES
import { Button, FormGroup } from '../../styles/global';

function ModalAdd({ createCityRequest, createdCity, ...props }) {
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");

  function handleCadastrar( e ) {
    e.preventDefault();

    createCityRequest( codigo, nome );
  }

  useEffect(() => {
    props.clearCreateCity()
  }, []);

  useEffect(() => {
    if( createdCity ) {
      $('#modal-novo-municipio').modal('hide');
      setCodigo(null);
      setNome("");
    }
  }, [ createdCity ]);

  return(
    <Modal id="modal-novo-municipio" title="Cadastrar Município">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="codigo">Código <code>*</code></label>
                <input id="codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } required />
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
        </ModalBody>
        <ModalFooter>
          <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
          <Button type="submit">Cadastrar</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  createdCity: state.municipio.createdCity
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createCityRequest, clearCreateCity }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
