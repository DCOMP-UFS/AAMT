/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import { abrangencia as abrangenciaEnum }  from '../../../config/enumerate';
import ButtonSave from '../../../components/ButtonSave';

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

const AtividadesRegCadastrar = ( { metodologias, ciclos, ...props } ) => {
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
  const [ metodologia, setMetodologia ] = useState({});
  const [ optionMetodologia, setOptionMetodologia ] = useState([]);
  const [ objetivo, setObjetivo ] = useState({});
  const [ optionObjetivo, setoptionObjetivo ] = useState([]);
  const [ listaMunicipios, setListaMunicipios ] = useState([]);
  const [ flBtnLoading, setFlBtnLoading ] = useState( false );

  useEffect(() => {
    props.changeSidebar( "atividade", "at_cadastrar" );
    props.getMethodologiesRequest();
    props.getAllowedCyclesRequest( props.regionalSaude_id );
    props.getCityByRegionalHealthRequest( props.regionalSaude_id );
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
    const lista = props.municipios.map( municipio => ({
      checked: false,
      municipio
    }));

    setListaMunicipios(lista);
  }, [ props.municipios ]);

  useEffect(() => {
    if( props.created )
      window.location = window.location.origin.toString() + "/cg/atividades";
  }, [ props.created ]);

  function handleSubmit( e ) {
    e.preventDefault();
    setFlBtnLoading( true );

    const mun = listaMunicipios
      .filter( l => l.checked )
      .map( l => ( l.municipio ));

    for (const m of mun) {
      props.createActiveRequest(
        objetivoAtividade,
        flTodosImoveis.value,
        1,//responsabilidade
        ciclo.value,
        m.id,
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
                          value={ objetivo }
                          styles={ selectDefault }
                          options={ optionObjetivo }
                          onChange={ e => setObjetivo( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="flTodosImoveis">Realizar a atividade em todos os imóveis? <code>*</code></label>
                        <Select
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
                    <Col>
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
                </Col>
                <Col sm='6'>
                  <h4 className="title">Município(s)</h4>
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
  metodologias    : state.metodologia.metodologias,
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
