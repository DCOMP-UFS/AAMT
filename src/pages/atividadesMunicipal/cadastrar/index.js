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

const Atividades = ( { propositos, ciclos, ...props } ) => {
  const [ objetivoAtividade, setObjetivoAtividade ] = useState( "" );
  const [ ciclo, setCiclo ]                         = useState( {} );
  const [ flTodosImoveis, setFlTodosImoveis ]       = useState( { value: false, label: "Não" } );
  const [ optionCiclo, setOptionCiclo ]             = useState( {} );
  const [ abrangencia, setAbrangencia ]             = useState( {} );
  const [ proposito, setProposito ]                 = useState( {} );
  const [ optionProposito, setOptionProposito ]     = useState( [] );
  const [ operacao, setOperacao ]                   = useState( {} );
  const [ optionOperacao, setOptionOperacao ]       = useState( [] );
  const [ optionflTodosImoveis ]                    = useState( [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ] );
  const optionAbrangencia                           = Object.entries( abrangenciaEnum )
    .map( ( [ key, value ] ) => {
      return { value: value.id, label: value.label };
    } );
  const [ isValidObjetivoAtividade, setIsValidObjetivoAtividade ] = useState( true );
  const [ loadingSaveButton, setLoadingSaveButton ]  = useState( false )
  
  useEffect(() => {
    props.changeSidebar( "atividade_municipio", "atm_cadastrar" );
    props.getMethodologiesRequest();
    props.getAllowedCyclesRequest( props.regionalSaude_id );
  }, []);

  useEffect(() => {
    const option = propositos.map( (m, index) => (
      { value: m.id, label: m.sigla, index }
    ));

    setOptionProposito( option );
  }, [ propositos ]);

  useEffect(() => {
    setOperacao({});

    if( Object.entries(proposito).length > 0 ) {
      const option = propositos[ proposito.index ].objetivos.map( atv => (
        { value: atv.id, label: atv.descricao }
      ));

      setOptionOperacao( option );
    }
  }, [ proposito ]);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => (
      { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }` }
    ));

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    if( props.created )
      window.location = window.location.origin.toString() + "/atividadesMunicipal";

    setLoadingSaveButton(false)
  }, [ props.created ]);

  function handleSubmit( e ) {
    e.preventDefault();

    if(isBlank(objetivoAtividade))
      setIsValidObjetivoAtividade(false)
    else{
      setIsValidObjetivoAtividade(true)
      setLoadingSaveButton(true)

      props.createActiveRequest(
          objetivoAtividade,
          flTodosImoveis.value,
          2,//responsabilidade
          ciclo.value,
          props.municipio_id,
          proposito.value, // proposito é como e exibido para o usuario, no banco esse valor se chama metodologia
          operacao.value,  // operação é como é exibido para o usuario, no banco esse valor se chama objetivo
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
              Atenção! Os campos com <code>*</code> são obrigatórios
            </p>

            <form onSubmit={ handleSubmit }>
              <ContainerFixed>
                <ButtonSave
                  title="Salvar"
                  className="bg-info text-white"
                  type="submit"
                  loading={ loadingSaveButton }
                  disabled={ loadingSaveButton } 
                  />
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
                        !isValidObjetivoAtividade ?
                          <span className="form-label-invalid">Objetivo inválido</span> :
                          ''
                        }
                    </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Propósito <code>*</code></label>
                        <SelectWrap
                          id="proposito"
                          value={ proposito }
                          styles={ selectDefault }
                          options={ optionProposito }
                          onChange={ e => setProposito( e ) }
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Operação <code>*</code></label>
                        <SelectWrap
                          id="Operação"
                          value={ operacao }
                          styles={ selectDefault }
                          options={ optionOperacao }
                          onChange={ e => setOperacao( e ) }
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
  propositos      : state.metodologia.metodologias,
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
