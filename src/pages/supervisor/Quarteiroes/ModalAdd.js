/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';
import Fab from '@material-ui/core/Fab';
import AddBox from '@material-ui/icons/AddBox';
import BorderOuterIcon from '@material-ui/icons/BorderOuter';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createCityBlockRequest, clearCreate } from '../../../store/actions/QuarteiraoActions';
import { getLocationByCityRequest } from '../../../store/actions/LocalidadeActions';
import { getZoneByLocalityRequest } from '../../../store/actions/ZonaActions';
import { getStreetByLocalityRequest } from '../../../store/actions/RuaActions';

// STYLES
import { ContainerSide, UlSides, LiSide, ContainerIcon, DivDescription, Span } from './styles';
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault, Separator } from '../../../styles/global';

function ModalAdd({ createCityBlockRequest, municipio_id, created, ...props }) {
  const [ numero, setNumero ] = useState( null );
  const [ lado, setLado ] = useState({
    numero: null,
    localidade_id: null,
    rua_id: null,
    logradouro: "",
    cep: "",
    outro: ""
  });
  const [ lados, setLados ] = useState([]);
  const [ localidade, setLocalidade ] = useState({});
  const [ optionLocalidade, setOptionLocalidade ] = useState([]);
  const [ zona, setZona ] = useState({});
  const [ optionZona, setOptionZona ] = useState([]);
  const [ rua, setRua ] = useState({ value: null });
  const [ optionRua, setOptionRua ] = useState([]);
  const [ numeroLado, setNumeroLado ] = useState( null );
  const [ outra, setOutra ] = useState( "" );
  const [ cep, setCep ] = useState( "" );

  useEffect(() => {
    props.clearCreate();
    props.getLocationByCityRequest( municipio_id );
  }, []);

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));

    setOptionLocalidade( options );
  }, [ props.localidades ]);

  useEffect(() => {
    const options = props.zonas.map(( z ) => ({ value: z.id, label: z.nome }));

    setOptionZona( options );
  }, [ props.zonas ]);

  useEffect(() => {
    const options = props.ruas.map(( r ) => ({ value: r.id, label: r.nome, cep: r.cep }));
    options.push({ value: null, label: "Outra" });

    setOptionRua( options );
  }, [ props.ruas ]);

  useEffect(() => {
    setLado({ ...lado, localidade_id: localidade.value });
    props.getZoneByLocalityRequest( localidade.value );
    props.getStreetByLocalityRequest( localidade.value );

    setZona({});
  }, [ localidade ]);

  useEffect(() => {
    if( created ) {
      $('#modal-novo-quarteirao').modal('hide');
      setLocalidade({});
      setZona({});
      setOptionZona([]);
      setNumero( null );
      setLados([]);
      props.clearCreate();
    }
  }, [ created ]);

  function clearInput() {
    setLocalidade({});
    setZona({});
    setOptionZona([]);
    setNumero( null );
    setLados([]);
  }

  function addSide() {
    const l = {
      numero: numeroLado,
      localidade_id: localidade.value,
      rua_id: rua.value,
      logradouro: rua.value ? rua.label : outra,
      cep: rua.cep ? rua.cep : cep,
      outro: outra
    };

    setRua({ value: null });
    setNumeroLado( null );
    setCep("");
    setOutra("");

    setLados( [...lados, l] );
  }

  function handleCadastrar( e ) {
    e.preventDefault();

    createCityBlockRequest( numero, zona.value, lados );
  }

  return(
    <Modal id="modal-novo-quarteirao" title="Cadastrar Quarteirão" size="lg">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="localidade">Localidade <code>*</code></label>
                <Select
                  id="localidade"
                  value={ localidade }
                  styles={ selectDefault }
                  options={ optionLocalidade }
                  onChange={ e => { setLocalidade(e); }}
                  required />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="zona">Zona <code>*</code></label>
                <Select
                  id="zona"
                  value={ zona }
                  styles={ selectDefault }
                  options={ optionZona }
                  onChange={ e => { setZona(e); } }
                  required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="numero">Número <code>*</code></label>
                <input
                  id="numero"
                  value={ numero ? numero : "" }
                  type="number"
                  className="form-control"
                  onChange={ e => setNumero( e.target.value ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>Lados <code>*</code></label>
                <ContainerSide>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="rua">Rua <code>*</code></label>
                        <Select
                          id="rua"
                          value={ rua }
                          styles={ selectDefault }
                          options={ optionRua }
                          onChange={ e => setRua( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label htmlFor="cep">CEP</label>
                        <input
                          id="cep"
                          value={ cep }
                          className="form-control"
                          onChange={ e => setCep( e.target.value ) }
                          disabled={ rua.value ? true : false }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label htmlFor="outra">Outra</label>
                        <input
                          id="outra"
                          value={ outra }
                          className="form-control"
                          onChange={ e => setOutra( e.target.value ) }
                          disabled={ rua.value ? true : false }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="numeroLado">Número do lado <code>*</code></label>
                        <input
                          id="numeroLado"
                          value={ numeroLado ? numeroLado : "" }
                          type="number"
                          className="form-control"
                          onChange={ e => setNumeroLado( e.target.value ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-right">
                      <Fab
                        className="bg-success text-white"
                        size="medium"
                        aria-label="add"
                        onClick={ addSide }
                      >
                        <AddBox />
                      </Fab>
                    </Col>
                  </Row>

                  <Separator className="mt-3" />

                  <UlSides>
                    {
                      lados.map( (lado, index) => (
                        <LiSide key={ index }>
                          <ContainerIcon>
                            <BorderOuterIcon />
                          </ContainerIcon>
                          <DivDescription>
                            <div>
                              <span className="mr-2">Nº: { lado.numero }</span>
                              <mark>{ lado.logradouro }</mark>
                            </div>

                            <Span></Span>
                          </DivDescription>
                        </LiSide>
                      ))
                    }
                  </UlSides>
                </ContainerSide>
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
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  created: state.quarteirao.created,
  localidades: state.localidade.localidades,
  zonas: state.zona.zonas,
  ruas: state.rua.ruas
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createCityBlockRequest,
    clearCreate,
    getLocationByCityRequest,
    getZoneByLocalityRequest,
    getStreetByLocalityRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
