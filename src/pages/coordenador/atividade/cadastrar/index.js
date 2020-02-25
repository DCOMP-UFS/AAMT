/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebar';

// STYLES
import { ContainerMap } from './styles';
import { FormGroup, selectDefault } from '../../../../styles/global';

function Atividades({ ...props }) {
  const [ objetivo, setObjetivo ] = useState("");
  const [ ano, setAno ] = useState( null );
  const [ ciclo, setCiclo ] = useState({});
  const optionCiclo = [
    { value: 1, label: '1'},
    { value: 2, label: '2'},
    { value: 3, label: '3'},
    { value: 4, label: '4'},
    { value: 5, label: '5'},
    { value: 6, label: '6'},
  ]
  const [ abrangencia, setAbrangencia ] = useState({});
  const optionAbrangencia = [
    { value: 'lo', label: 'Por localidade'},
    { value: 'zo', label: 'Por zona'},
    { value: 'qt', label: 'Por quarteirão'}
  ]
  const [ metodologia, setMetodologia ] = useState({});
  const optionMetodologia = [
    { value: 1, label: 'LIRAa'},
    { value: 2, label: 'PNCD'},
  ]
  const [ objetivoMetodologia, setObjetivoMetodologia ] = useState({});
  const optionObjetivoMetodologia = [];

  useEffect(() => {
    props.changeSidebar(1, 2);
  }, []);

  function handleSubmit( e ) {
    e.preventDefault();
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Atividade</h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>

            <form onSubmit={ handleSubmit }>
              <Row>
                <Col sm='6'>
                  <Row>
                    <Col>
                    <FormGroup>
                      <label>Objetivo <code>*</code></label>
                      <textarea
                        id="objetivo"
                        value={ objetivo }
                        className="form-control"
                        onChange={ e => setObjetivo( e.target.value ) }
                        rows="5"
                        required
                      ></textarea>
                    </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Qual abrangência da atividade que deseja iniciar? <code>*</code></label>
                        <Select
                          id="abrangencia"
                          value={ abrangencia }
                          styles={ selectDefault }
                          options={ optionAbrangencia }
                          onChange={ e => setAbrangencia( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Ano <code>*</code></label>
                        <input
                          id="ano"
                          value={ ano ? ano : "" }
                          onChange={ e => setAno( e.target.value ) }
                          className="form-control"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Ciclo <code>*</code></label>
                        <Select
                          id="ciclo"
                          value={ ciclo }
                          styles={ selectDefault }
                          options={ optionCiclo }
                          onChange={ e => setCiclo( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Metodologia <code>*</code></label>
                        <Select
                          id="metodologia"
                          value={ metodologia }
                          styles={ selectDefault }
                          options={ optionMetodologia }
                          onChange={ e => setMetodologia( e ) }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Atividade <code>*</code></label>
                        <Select
                          id="objetivo"
                          value={ objetivoMetodologia }
                          styles={ selectDefault }
                          options={ optionObjetivoMetodologia }
                          onChange={ e => setObjetivoMetodologia( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col sm='6'>
                  <ContainerMap>
                    <Map className="map" google={props.google} zoom={14}>
                      <Marker
                        name={'Current location'}
                        />
                    </Map>
                  </ContainerMap>
                </Col>
              </Row>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCYow9L-l0V_XA6kzpt-62S4-VGKwLy65w"),
  LoadingContainer: (props) => (
    <div>Carregando mapa...</div>
  )
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Atividades))
