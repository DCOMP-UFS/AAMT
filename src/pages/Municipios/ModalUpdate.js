/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateCityRequest, clearUpdateCity } from '../../store/actions/MunicipioActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../styles/global';

function ModalUpdate({ updateCityRequest, updatedCity, ...props }) {
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ ativo, setAtivo ] = useState({});

  const optionAtivo = [ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ];

  function handleSubmit( e ) {
    e.preventDefault();
    const id = props.municipios[ props.indexCity ].id;

    updateCityRequest( id, {
      codigo,
      nome,
      ativo: ativo.value
    });

    props.clearUpdateCity();
  }

  useEffect(() => {
    props.clearUpdateCity();
  }, []);

  useEffect(() => {
    if( updatedCity ) {
      $('#modal-update-city').modal('hide');
    }
  }, [ updatedCity ]);

  useEffect(() => {
    if( props.indexCity >= 0 ) {
      setCity();
    }
  }, [ props.indexCity ]);

  function setCity() {
    const municipio = props.municipios[ props.indexCity ];

    const label = municipio.ativo ? 'Sim' : 'Não';

    setCodigo( municipio.codigo );
    setNome( municipio.nome );
    setAtivo({ value: municipio.ativo, label });
  }

  return(
    <Modal id="modal-update-city" title="Atualizar Usuário">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="up_codigo">Código <code>*</code></label>
                <input id="up_codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="up_nome">Nome <code>*</code></label>
                <input id="up_nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="up_ativo">Ativo <code>*</code></label>
                <Select
                  value={ ativo }
                  styles={ selectDefault }
                  options={ optionAtivo }
                  onChange={ e => setAtivo(e) }
                  required />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  updatedCity: state.municipio.updatedCity,
  indexCity: state.municipio.indexCity,
  municipios: state.municipio.municipios
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCityRequest, clearUpdateCity }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdate);
