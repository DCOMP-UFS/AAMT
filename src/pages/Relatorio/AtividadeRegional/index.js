import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { dataToStringBr } from '../../../config/function';
import CircularProgress from '@material-ui/core/CircularProgress';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getCicloAbertoRequest, getOpenAndFinishedCyclesRequest } from '../../../store/Ciclo/cicloActions';
import { getResponsabilityActivitiesRequest } from '../../../store/Atividade/atividadeActions';
import { getCityByRegionalHealthRequest } from '../../../store/Municipio/municipioActions';

// STYLES
import { Container, CardBodyInfo } from './styles';
import { PageIcon, PageHeader, PagePopUp } from '../../../styles/util';
import { FormGroup, selectDefault } from '../../../styles/global';


//COMPONENTS
import { CycleSelector } from '../../../components/CycleSelector';

export const RelatorioAtividadeRegional = ({ atividades, ciclos, municipios, usuario, ...props }) => {

  const [ cicloSelecionado, setCicloSelecionado ] = useState(null);
  const [ optionCiclos, setOptionCiclos ] = useState({});
  const [ optionMunicipios, setOptionMunicipios ] = useState([])
  const [ municipioSelecionado, setMunicipioSelecionado ] = useState({ label:"Todos", value:null })
  const [ atividadesFiltradas, setAtividadesFiltradas] = useState([])

  useEffect(() => {
    props.changeSidebar( "relatorio", "rlt_porAtividadeRegional" );
    //props.getCicloAbertoRequest( usuario.municipio.regional.id );
    props.getCityByRegionalHealthRequest(usuario.regionalSaude.id, null);
    props.getOpenAndFinishedCyclesRequest(usuario.regionalSaude.id)
  }, []);

  useEffect(() => {
    const lista = municipios.map( municipio => ({ value: municipio.id, label: municipio.nome }));
    lista.unshift( { label:"Todos", value:null } )
    setOptionMunicipios(lista);
  }, [ municipios ]);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => {
      let current_date = new Date();
      let dataInicio = new Date( ciclo.dataInicio );
      let dataFim = new Date( ciclo.dataFim );
      current_date.setHours(0,0,0,0);
      dataInicio.setHours(0,0,0,0);
      dataFim.setHours(0,0,0,0);

      const periodo_ciclo = " -> de "+dataToStringBr(ciclo.dataInicio)+" até "+dataToStringBr(ciclo.dataFim)

      if( dataInicio <= current_date && dataFim >= current_date )
        setCicloSelecionado({ 
          value: ciclo.id, 
          label: `${ ciclo.ano }.${ ciclo.sequencia }`+periodo_ciclo, 
          dataInicio: ciclo.dataInicio, 
          dataFim: ciclo.dataFim });

      return (
        { 
          value: ciclo.id, 
          label: `${ ciclo.ano }.${ ciclo.sequencia }`+periodo_ciclo, 
          dataInicio: ciclo.dataInicio, 
          dataFim: ciclo.dataFim 
        }
      );
    });

    setOptionCiclos(options);
  }, [ ciclos ]);

  useEffect(() => {
    if( cicloSelecionado != null) {
      props.getResponsabilityActivitiesRequest( usuario.id, cicloSelecionado.value );
    }
  }, [ cicloSelecionado ]);


  useEffect(() => {
    if( props.searchResponsabilityActivities == false) {
      if(municipioSelecionado.value != null){
        const filter_ativ = atividades.filter( ativ => ativ.municipio.id == municipioSelecionado.value)
        setAtividadesFiltradas(filter_ativ)
      }
      else{
        setAtividadesFiltradas(atividades)
      }
    }
  }, [ props.searchResponsabilityActivities ]);

  useEffect(() => {
    if(municipioSelecionado.value != null){
      const filter_ativ = atividades.filter( ativ => ativ.municipio.id == municipioSelecionado.value)
      setAtividadesFiltradas(filter_ativ)
    }
    else{
      setAtividadesFiltradas(atividades)
    }
  }, [ municipioSelecionado ]);

  const submit = (atividade_id) => {
    window.location = window.location.origin.toString() + '/relatorio/atividadeRegional/' + atividade_id;
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Boletim por atividade da regional
        </h3>
      </PageHeader>

      <CycleSelector 
        optionCiclos={optionCiclos} 
        cicloSelecionado={cicloSelecionado} 
        setCicloSelecionado={ (e) => setCicloSelecionado(e) } 
        paddingBottom={2}
        />
      
      <section className="card-list">
        <Row>
          <PagePopUp className="w-100" style={{ paddingBottom: 40, paddingRight: 15, paddingLeft: 15 }}>
            <div className="card">
              <CardBodyInfo>
                <div className="d-flex flex-grow-1 align-items-center">
                  <FormGroup className="w-50 m-0 mr-2 inline">
                      <label htmlFor="ciclo"><b>Filtragem por município</b></label>
                      <Select
                      id="municipio"
                      value={ municipioSelecionado }
                      styles={ selectDefault }
                      options={ optionMunicipios }
                      onChange={ (e) => setMunicipioSelecionado(e) }
                      isDisabled={ props.searchResponsabilityActivities || cicloSelecionado == null }
                      />
                  </FormGroup>
                </div>
              </CardBodyInfo>
            </div>
          </PagePopUp>
        </Row>
      </section>

      <section className="card-list">
        <article className="row">
          {
            (() => {
              if(props.searchResponsabilityActivities){
                return (
                  <div style={{ marginTop: "25%", marginLeft: "50%" }}>
                    <CircularProgress color="inherit" />
                  </div>
                )
              }
              else if(atividadesFiltradas.length == 0) {
                return (
                  <div style={{ marginTop: "10%", marginLeft: "30%" }}>
                    <h3>Não foi encontrada nenhuma atividade</h3>
                  </div>
                )
              }
              else{
                return(
                  atividadesFiltradas.map( atividade => (
                    <Col key={ 'atv-' + atividade.id } md="4" onClick={() => submit(atividade.id)}>
                      <div className="card2 atividade">
                        <div className="card2-header">
                          <h3 className="title">{ atividade.metodologia.sigla }</h3>
                        </div>
                        <div className="card2-body">
                          <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Código</label>
                            <span>{ atividade.id }</span>
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Município</label>
                            <span>{ atividade.municipio.nome }</span>
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Operação</label>{/* O objetivo da atividade é mostrado como operação para o usuario */}
                            <span>{ atividade.objetivo.descricao }</span>
                          </div>
                          <div className="form-group mb-0">
                            <label style={{ fontWeight: 'bold' }}>Data de Início</label>
                            <span>{ dataToStringBr( cicloSelecionado.dataInicio ) }</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ) )
                )
              }
            })()
          }
        </article>
      </section>
    </Container>
  )
}

const mapStateToProps = state => ( {
  usuario    : state.appConfig.usuario,
  ciclos     : state.ciclo.ciclos,
  atividades : state.atividade.atividades,
  municipios : state.municipio.municipiosList,
  searchResponsabilityActivities: state.atividade.searchResponsabilityActivities
} );

const mapDispatchToProps = {
  changeSidebar,
  getCicloAbertoRequest,
  getResponsabilityActivitiesRequest,
  getOpenAndFinishedCyclesRequest,
  getCityByRegionalHealthRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( RelatorioAtividadeRegional );
