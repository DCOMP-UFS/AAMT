/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createZoneRequest, clearCreate } from '../../../store/actions/ZonaActions';
import { getLocationByCityRequest } from '../../../store/actions/LocalidadeActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAdd({ createZoneRequest, created, municipio_id, ...props }) {
  const [ localidade, setLocalidade ] = useState({});
  const [ optionLocalidade, setOptionLocalidade ] = useState([]);

  function handleCadastrar( e ) {
    e.preventDefault();

    createZoneRequest( localidade.value );
  }

  useEffect(() => {
    props.clearCreate();
    props.getLocationByCityRequest( municipio_id );
  }, []);

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));

    setOptionLocalidade( options );
  }, [ props.localidades ]);

  useEffect(() => {
    if( created ) {
      $('#modal-novo-zona').modal('hide');
      setLocalidade({});
      props.clearCreate();
    }
  }, [ created ]);

  return(
    <Modal id="modal-novo-zona" title="Cadastrar Zona">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="localidade">Localidade</label>
                <Select
                  id="localidade"
                  value={ localidade }
                  styles={ selectDefault }
                  options={ optionLocalidade }
                  onChange={ e => setLocalidade(e) }
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
  municipio_id: state.appConfig.usuario.municipio.id,
  created: state.zona.created,
  localidades: state.localidade.localidades
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createZoneRequest, clearCreate, getLocationByCityRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
