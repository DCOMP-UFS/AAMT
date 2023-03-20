/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import { abrangencia as abrangenciaEnum }  from '../../../config/enumerate';
import ButtonSave from '../../../components/ButtonSave';
import SelectWrap from '../../../components/SelectWrap'

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getMethodologiesRequest } from '../../../store/Metodologia/metodologiaActions';
import { getAllowedCyclesRequest } from '../../../store/Ciclo/cicloActions';
import { getCityByRegionalHealthRequest } from '../../../store/Municipio/municipioActions';
import { createActiveRequest } from '../../../store/Atividade/atividadeActions';

// STYLES
import { FormGroup, selectDefault } from '../../../styles/global';
import {
  ContainerFixed,
  UlIcon,
  LiIcon,
  ContainerUl,
  DivDescription
} from '../../../styles/util';

import {isBlank} from '../../../config/function';

const AtividadesRegCadastrar = ( { propositos, ciclos, ...props } ) => {
  const [ reload, setReload ] = useState( false );
  const [ objetivoAtividade, setObjetivoAtividade ] = useState("");
  const [ ciclo, setCiclo ] = useState({});
  const [ flTodosImoveis, setFlTodosImoveis ] = useState({ value: false, label: "Não" });
  const [ optionCiclo, setOptionCiclo ] = useState({});
  const [ optionflTodosImoveis ] = useState([
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ]);
  const [ abrangencia, setAbrangencia ] = useState({});
  const optionAbrangencia = Object.entries(abrangenciaEnum).map(([key, value]) => {
    return { value: value.id, label: value.label };
  });
  const [ proposito, setProposito ] = useState({});
  const [ optionProposito, setOptionProposito ] = useState([]);
  const [ operacao, setOperacao ] = useState({});
  const [ optionOperacao, setoptionOperacao ] = useState([]);
  const [ listaMunicipios, setListaMunicipios ] = useState([]);
  const [ flBtnLoading, setFlBtnLoading ] = useState( false );
  const [ isValidObjetivoAtividade, setIsValidObjetivoAtividade ] = useState( true );
  const [ isValidListaMunicipios, setIsListaMunicipios ] = useState( true );

  useEffect(() => {
    props.changeSidebar( "atividade", "at_cadastrar" );
    props.getMethodologiesRequest();
    props.getAllowedCyclesRequest( props.regionalSaude_id );
    props.getCityByRegionalHealthRequest( props.regionalSaude_id );
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

      setoptionOperacao( option );
    }
  }, [ proposito ]);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => (
      { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }` }
    ));

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    const lista = props.municipios.map( municipio => ({
      checked: false,
      municipio
    }));

    setListaMunicipios(lista);
  }, [ props.municipios ]);

  useEffect(() => {
    if( props.created )
      window.location = window.location.origin.toString() + "/atividadesRegional";
    
    setFlBtnLoading(false)
  }, [ props.created ]);

  function handleSubmit( e ) {
    e.preventDefault();
    setFlBtnLoading( true );
    
    setIsValidObjetivoAtividade(true)
    setIsListaMunicipios(true)

    const mun = listaMunicipios
      .filter( l => l.checked )
      .map( l => ( l.municipio ));
    
    if(isBlank(objetivoAtividade))
      setIsValidObjetivoAtividade(false)
    else if(mun.length == 0)
      setIsListaMunicipios(false)
    else{
      for (const m of mun) {
        props.createActiveRequest(
          objetivoAtividade,
          flTodosImoveis.value,
          1,//responsabilidade
          ciclo.value,
          m.id,
          proposito.value, // proposito é como e exibido para o usuario, no banco esse valor se chama metodologia
          operacao.value,  // operação é como é exibido para o usuario, no banco esse valor se chama objetivo
          abrangencia.value
        );
      }
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
                  loading={ flBtnLoading }
                  disabled={ flBtnLoading }
                  type="submit"
                />
              </ContainerFixed>
              <Row>
                <Col sm='6'>
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
                          id="operacao"
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
                        <label htmlFor="flTodosImoveis">Em todos os imóveis? <code>*</code></label>
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
                <Col sm='6'>
                  <h4 className="title">Município(s)<code>*</code></h4>
                  {
                        !isValidListaMunicipios ?
                          <span className="form-label-invalid">Selecione pelo menos um município</span> :
                          ''
                  }
                  <p className="text-description">
                    Qual(is) os município(s) deseja aplicar a atividade?
                  </p>

                  <UlIcon>
                    {listaMunicipios.map( (lista, index) => {
                      const { checked, municipio } = lista;
                      return (
                        <LiIcon
                          key={ index }
                          onClick={
                            (e) => {
                              let lista = listaMunicipios;
                              lista[ index ].checked = !lista[ index ].checked;
                              setListaMunicipios( lista );
                              setReload( !reload );
                            }
                          }
                        >
                          <ContainerUl>
                            <Checkbox
                              checked={ checked }
                              onChange={
                                (e) => {
                                  let lista = listaMunicipios;
                                  lista[ index ].checked = e.target.checked;
                                  setListaMunicipios( lista );
                                  setReload( !reload );
                                }
                              }
                            />
                            <DivDescription>
                              <div>{ municipio.nome }</div>
                            </DivDescription>
                          </ContainerUl>
                        </LiIcon>
                      );
                    })}
                  </UlIcon>
                </Col>
              </Row>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ( {
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  propositos      : state.metodologia.metodologias,
  ciclos          : state.ciclo.ciclos,
  municipios      : state.municipio.municipiosList,
  created         : state.atividade.created
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    changeSidebar,
    getMethodologiesRequest,
    getAllowedCyclesRequest,
    getCityByRegionalHealthRequest,
    createActiveRequest
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AtividadesRegCadastrar );
