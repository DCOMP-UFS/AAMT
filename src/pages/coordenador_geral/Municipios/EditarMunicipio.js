/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../../components/ButtonSave';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarCoordGeral';
import { updateCityRequest, getCityByIdRequest } from '../../../store/actions/MunicipioActions';
import { getNationsRequest } from '../../../store/actions/PaisActions';
import { GetRegionsByNationRequest } from '../../../store/actions/RegiaoActions';
import { GetStatesByRegionRequest } from '../../../store/actions/EstadoActions';
import { getRegionalHealthByStateRequest } from '../../../store/actions/RegionalSaudeActions';

// STYLES
import { FormGroup, selectDefault } from '../../../styles/global';
import { ContainerFixed } from '../../../styles/util';

function EditarMunicipio({ municipio, updateCityRequest, getCityByIdRequest, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ ativo, setAtivo ] = useState({});
  const [ pais, setPais ] = useState({});
  const [ optionPais, setOptionPais ] = useState([]);
  const [ regiao, setRegiao ] = useState({});
  const [ optionRegiao, setOptionRegiao ] = useState([]);
  const [ estado, setEstado ] = useState({});
  const [ optionEstado, setOptionEstado ] = useState([]);
  const [ regionalSaude, setRegionalSaude ] = useState({});
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState([]);

  const optionAtivo = [ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ];

  useEffect(() => {
    props.changeSidebar(4, 0);
    getCityByIdRequest( id );
  }, []);

  useEffect(() => {
    const options = props.paises.map(( p ) => {
      if( p.id === municipio.pais_id )
        setPais( { value: p.id, label: p.nome } );

      return ({ value: p.id, label: p.nome })
    });

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
    const options = props.regioes.map(( r ) => {
      if( r.id === municipio.regiao_id )
        setRegiao( { value: r.id, label: r.nome } );

      return ({ value: r.id, label: r.nome });
    });

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
    const options = props.estados.map(( e ) => {
      if( e.id === municipio.estado_id )
        setEstado( { value: e.id, label: e.nome } );

      return ({ value: e.id, label: e.nome });
    });

    setOptionEstado( options );
  }, [ props.estados ]);

  useEffect(() => {
    if( Object.entries(estado).length > 0 ) {
      props.getRegionalHealthByStateRequest( estado.value );
      setRegionalSaude({});
    }
  }, [ estado ]);

  useEffect(() => {
    const options = props.regionaisSaude.map(( r ) => {
      if( r.id === municipio.regional_saude_id )
        setRegionalSaude( { value: r.id, label: r.nome } );

      return ({ value: r.id, label: r.nome });
    });

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ]);

  useEffect(() => {
    if( Object.entries( municipio ).length > 0 ) {
      props.getNationsRequest();

      setCodigo( municipio.codigo );
      setNome( municipio.nome );
      setAtivo( { value: municipio.ativo, label: municipio.ativo ? 'Sim' : 'Não' } );
    }
  }, [ municipio ]);

  function handleSubmit( e ) {
    e.preventDefault();

    updateCityRequest( id, {
      codigo,
      nome,
      regionalSaude_id: regionalSaude.value,
      ativo: ativo.value
    });
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Município: <mark className="bg-info text-white" >{ municipio.nome }</mark></h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>
            <Row>
              <Col sm='6'>
                <form onSubmit={ handleSubmit }>
                <h4 className="title">Informações do município</h4>
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label htmlFor="up_codigo">Código <code>*</code></label>
                        <input id="up_codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } required />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
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
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="up_nome">Nome <code>*</code></label>
                        <input id="up_nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <ContainerFixed>
                    <ButtonSave
                      title="Salvar"
                      className="bg-info text-white"
                      type="submit" />
                  </ContainerFixed>
                </form>
              </Col>

              <Col sm='6'>
                <h4 className="title">Bairro/Localidade</h4>
              </Col>
            </Row>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  municipio: state.municipio.municipio,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    updateCityRequest,
    getCityByIdRequest,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarMunicipio);
