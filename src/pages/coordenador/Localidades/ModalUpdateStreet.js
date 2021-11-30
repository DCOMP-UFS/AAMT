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
import { updateStreetRequest } from '../../../store/Rua/ruaActions';
import { getLocationByCityRequest } from '../../../store/Localidade/localidadeActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalUpdateStreet({ updated, index, ...props }) {
  const [ id, setId ] = useState( null );
  const [ localidade, setLocalidade ] = useState({});
  const [ optionLocalidade, setOptionLocalidade ] = useState([]);
  const [ logradouro, setLogradouro ] = useState("");
  const [ cep, setCep ] = useState("");

  useEffect(() => {
    props.getLocationByCityRequest( props.municipio_id );
  }, []);

  useEffect(() => {
    if( updated ) {
      $('#modal-editar-rua').modal('hide');
    }
  }, [ updated ]);

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));
    setOptionLocalidade( options );
  }, [ props.localidades ]);

  useEffect(() => {
    if( Number.isInteger( index ) ) {
      const rua = props.ruas[index];
      setId( rua.id );
      setLogradouro( rua.nome );
      setCep( rua.cep );
      setLocalidade({ value: rua.localidade.id, label: rua.localidade.nome });
    }
  }, [ index ]);

  function handleCadastrar( e ) {
    e.preventDefault();

    props.updateStreetRequest( id, {
      nome: logradouro,
      cep,
      localidade_id: localidade.id
    });
  }

  return(
    <Modal id="modal-editar-rua" title="Cadastrar Rua">
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
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="cep">CEP</label>
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
                <label htmlFor="logradouro">Logradouro</label>
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
  ruas: state.rua.ruas,
  updated: state.rua.updated,
  index: state.rua.indexSelect,
  municipio: state.appConfig.usuario.municipio.id,
  localidades: state.localidade.localidades
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getLocationByCityRequest, updateStreetRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateStreet);
