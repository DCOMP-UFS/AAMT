/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { abrangencia as abrangenciaEnum }  from '../../../config/enumerate';
import ButtonSave from '../../../components/ButtonSave';
import SelectWrap from '../../../components/SelectWrap'

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getMethodologiesRequest } from '../../../store/Metodologia/metodologiaActions';
import { getAllowedCyclesRequest } from '../../../store/Ciclo/cicloActions';
import { createActiveRequest } from '../../../store/Atividade/atividadeActions';

// STYLES
import { FormGroup, selectDefault } from '../../../styles/global';
import { ContainerFixed } from '../../../styles/util';

import {isBlank} from '../../../config/function';

const Atividades = ( { metodologias, ciclos, ...props } ) => {
  const [ objetivoAtividade, setObjetivoAtividade ] = useState( "" );
  const [ ciclo, setCiclo ]                         = useState( {} );
  const [ flTodosImoveis, setFlTodosImoveis ]       = useState( { value: false, label: "Não" } );
  const [ optionCiclo, setOptionCiclo ]             = useState( {} );
  const [ abrangencia, setAbrangencia ]             = useState( {} );
  const [ metodologia, setMetodologia ]             = useState( {} );
  const [ optionMetodologia, setOptionMetodologia ] = useState( [] );
  const [ objetivo, setObjetivo ]                   = useState( {} );
  const [ optionObjetivo, setoptionObjetivo ]       = useState( [] );
  const [ optionflTodosImoveis ]                    = useState( [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ] );
  const optionAbrangencia                           = Object.entries( abrangenciaEnum )
    .map( ( [ key, value ] ) => {
      return { value: value.id, label: value.label };
    } );
  const [ isValidObjetivo, setIsValidObjetivo ] = useState( true );

  useEffect(() => {
    props.changeSidebar( "atividade_municipio", "atm_cadastrar" );
    props.getMethodologiesRequest();
    props.getAllowedCyclesRequest( props.regionalSaude_id );
  }, []);

  useEffect(() => {
    const option = metodologias.map( (m, index) => (
      { value: m.id, label: m.sigla, index }
    ));

    setOptionMetodologia( option );
  }, [ metodologias ]);

  useEffect(() => {
    setObjetivo({});

    if( Object.entries(metodologia).length > 0 ) {
      const option = metodologias[ metodologia.index ].objetivos.map( atv => (
        { value: atv.id, label: atv.descricao }
      ));

      setoptionObjetivo( option );
    }
  }, [ metodologia ]);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => (
      { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }` }
    ));

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    if( props.created )
      window.location = window.location.origin.toString() + "/atividadesMunicipal";
  }, [ props.created ]);

  function handleSubmit( e ) {
    e.preventDefault();

    if(isBlank(objetivoAtividade))
      setIsValidObjetivo(false)
    else{
      setIsValidObjetivo(true)
      
     props.createActiveRequest(
        objetivoAtividade,
        flTodosImoveis.value,
        2,//responsabilidade
        ciclo.value,
        props.municipio_id,
        metodologia.value,
        objetivo.value,
        abrangencia.value
      );
    }
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
              <ContainerFixed>
                <ButtonSave
                  title="Salvar"
                  className="bg-info text-white"
                  type="submit" />
              </ContainerFixed>
              <Row>
                <Col>
                  <Row>
                    <Col>
                    <FormGroup>
                      <label>Objetivo da atividade <code>*</code></label>
                      <textarea
                        id="objetivoAtividade"
                        value={ objetivoAtividade }
                        className="form-control"
                        onChange={ e => setObjetivoAtividade( e.target.value ) }
                        rows="5"
                        required
                      ></textarea>
                       {
                        !isValidObjetivo ?
                          <span className="form-label-invalid">Objetivo inválido</span> :
                          ''
                        }
                    </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Metodologia <code>*</code></label>
                        <SelectWrap
                          id="metodologia"
                          value={ metodologia }
                          styles={ selectDefault }
                          options={ optionMetodologia }
                          onChange={ e => setMetodologia( e ) }
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Atividade <code>*</code></label>
                        <SelectWrap
                          id="objetivo"
                          value={ objetivo }
                          styles={ selectDefault }
                          options={ optionObjetivo }
                          onChange={ e => setObjetivo( e ) }
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="flTodosImoveis">Realizar a atividade em todos os imóveis? <code>*</code></label>
                        <SelectWrap
                          id="flTodosImoveis"
                          value={ flTodosImoveis }
                          options={ optionflTodosImoveis }
                          onChange={ e => setFlTodosImoveis(e) }
                          styles={ selectDefault }
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Abrangência <code>*</code></label>
                        <SelectWrap
                          id="abrangencia"
                          value={ abrangencia }
                          styles={ selectDefault }
                          options={ optionAbrangencia }
                          onChange={ e => setAbrangencia( e ) }
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Ciclo <code>*</code></label>
                        <SelectWrap
                          id="ciclo"
                          value={ ciclo }
                          styles={ selectDefault }
                          options={ optionCiclo }
                          onChange={ e => setCiclo( e ) }
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  municipio_id    : state.appConfig.usuario.municipio.id,
  regionalSaude_id: state.appConfig.usuario.municipio.regional.id,
  metodologias    : state.metodologia.metodologias,
  ciclos          : state.ciclo.ciclos,
  created         : state.atividade.created
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getMethodologiesRequest,
    getAllowedCyclesRequest,
    createActiveRequest
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Atividades );
