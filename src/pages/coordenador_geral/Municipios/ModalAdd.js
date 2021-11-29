/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createCityRequest, clearCreateCity, getCityByRegionalHealthRequest } from '../../../store/Municipio/municipioActions';
import { getNationsRequest } from '../../../store/Pais/paisActions';
import { GetRegionsByNationRequest } from '../../../store/actions/RegiaoActions';
import { GetStatesByRegionRequest } from '../../../store/Estado/estadoActions';
import { getRegionalHealthByStateRequest } from '../../../store/actions/RegionalSaudeActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAdd({ createCityRequest, createdCity, ...props }) {
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ pais, setPais ] = useState({ value: 37, label: 'BRASIL' });
  const [ optionPais, setOptionPais ] = useState([]);
  const [ regiao, setRegiao ] = useState({});
  const [ optionRegiao, setOptionRegiao ] = useState([]);
  const [ estado, setEstado ] = useState({});
  const [ optionEstado, setOptionEstado ] = useState([]);
  const [ regionalSaude, setRegionalSaude ] = useState({});
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState([]);
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    props.clearCreateCity();
    props.getNationsRequest();
  }, []);

  useEffect(() => {
    const options = props.paises.map(( p ) => ({ value: p.id, label: p.nome }));

    setOptionPais( options );
  }, [ props.paises ]);

  useEffect(() => {
    if( Object.entries(pais).length > 0 ) {
      props.GetRegionsByNationRequest( pais.value );
      setRegiao({});
      setEstado({});
      setOptionEstado([]);
      setRegionalSaude({});
      setOptionRegionalSaude([]);
    }
  }, [ pais ]);

  useEffect(() => {
    const options = props.regioes.map(( r ) => ({ value: r.id, label: r.nome }));

    setOptionRegiao( options );
  }, [ props.regioes ]);

  useEffect(() => {
    if( Object.entries(regiao).length > 0 ) {
      props.GetStatesByRegionRequest( regiao.value );
      setEstado({});
      setRegionalSaude({});
      setOptionRegionalSaude([]);
    }
  }, [ regiao ]);

  useEffect(() => {
    const options = props.estados.map(( e ) => ({ value: e.id, label: e.nome }));

    setOptionEstado( options );
  }, [ props.estados ]);

  useEffect(() => {
    if( Object.entries(estado).length > 0 ) {
      props.getRegionalHealthByStateRequest( estado.value );
      setRegionalSaude({});
    }
  }, [ estado ]);

  useEffect(() => {
    const options = props.regionaisSaude.map(( r ) => ({ value: r.id, label: r.nome }));

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ]);

  useEffect(() => {
    if( createdCity ) {
      $('#modal-novo-municipio').modal('hide');
      clearInput();
      setFlLoading( false );
      props.clearCreateCity();
    }
  }, [ createdCity ]);

  function clearInput() {
    setCodigo(null);
    setNome("");
  }

  function handleCadastrar( e ) {
    e.preventDefault();
    setFlLoading( true );

    createCityRequest( codigo, nome, regionalSaude.value );
  }

  return(
    <Modal id="modal-novo-municipio" title="Cadastrar Município" size='lg'>
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
        <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="pais">Páis <code>*</code></label>
                <Select
                  id="pais"
                  value={ pais }
                  styles={ selectDefault }
                  options={ optionPais }
                  onChange={ e => setPais(e) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="regiao">Região <code>*</code></label>
                <Select
                  id="regiao"
                  value={ regiao }
                  styles={ selectDefault }
                  options={ optionRegiao }
                  onChange={ e => setRegiao(e) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="estado">Estado <code>*</code></label>
                <Select
                  id="estado"
                  value={ estado }
                  styles={ selectDefault }
                  options={ optionEstado }
                  onChange={ e => setEstado(e) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="regionalSaude">Regional de saúde <code>*</code></label>
                <Select
                  id="regionalSaude"
                  value={ regionalSaude }
                  styles={ selectDefault }
                  options={ optionRegionalSaude }
                  onChange={ e => setRegionalSaude(e) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
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
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={ clearInput }>Limpar</Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit" loading={ flLoading.toString() } disabled={ flLoading ? 'disabled' : '' } >
                {
                  flLoading ?
                    (
                      <>
                        <img
                          src={ LoadginGif }
                          width="25"
                          style={{ marginRight: 10 }}
                          alt="Carregando"
                        />
                        Salvando...
                      </>
                    ) :
                    "Salvar"
                }
              </Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  createdCity: state.municipio.createdCity,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createCityRequest,
    clearCreateCity,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest,
    getCityByRegionalHealthRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
