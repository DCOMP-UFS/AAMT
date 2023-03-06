import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Col } from 'react-bootstrap';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalTrabalhoDiario from '../components/ModalTrabalhoDiario';
import $ from 'jquery';
import { dataToStringBr } from '../../../config/function';
import CircularProgress from '@material-ui/core/CircularProgress';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getResponsabilityActivitiesRequest } from '../../../store/Atividade/atividadeActions';
import { getCicloAbertoRequest, getOpenAndFinishedCyclesRequest } from '../../../store/Ciclo/cicloActions';
import { getTrabalhosEquipeAndUsuarioRequest, setTrabalhos } from '../../../store/TrabalhoDiario/trabalhoDiarioActions';

// STYLES
import { Container, PanelTitle } from './styles';
import { PageIcon, PageHeader } from '../../../styles/util';

//COMPONENTS
import { CycleSelector } from '../../../components/CycleSelector';

export const RelatorioDiario = ({ atividades, ciclos, usuario, ...props }) => {

  const [ cicloSelecionado, setCicloSelecionado ] = useState(null);
  const [ optionCiclos, setOptionCiclos ] = useState({});

  useEffect(() => {
    props.changeSidebar( "relatorio", "rlt_boletimDiario" );
    //props.getCicloAbertoRequest( usuario.municipio.regional.id );
    props.getOpenAndFinishedCyclesRequest(usuario.municipio.regional.id)
  }, []);

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
    if( cicloSelecionado != null){
      props.getResponsabilityActivitiesRequest( usuario.id, cicloSelecionado.value );
    }
  }, [ cicloSelecionado ]);

  const abrirModalTrabalho = (equipe_id, usuario_id) => {
    props.setTrabalhos( [] );
    props.getTrabalhosEquipeAndUsuarioRequest(equipe_id, usuario_id );

    $( '#modal-trabalho' ).modal( 'show' );
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Boletim Diário
        </h3>
      </PageHeader>
      
      <CycleSelector 
        optionCiclos={optionCiclos} 
        cicloSelecionado={cicloSelecionado} 
        setCicloSelecionado={ (e) => setCicloSelecionado(e) } />

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
              else if(atividades.length == 0) {
                return (
                  <div style={{ marginTop: "10%", marginLeft: "30%" }}>
                    <h3>Não foi encontrada nenhuma atividade</h3>
                  </div>
                )
              }
              else {
                return (
                  atividades.map( atividade => (
                    <Col key={ 'atv-' + atividade.id } md="4" className="mb-3">
                      <div className="card2">
                        <div className="card2-header">
                          <h3 className="title">{ atividade.metodologia.sigla }</h3>
                        </div>
                        <div className="card2-body">
                          <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Código</label>
                            <span>{ atividade.id }</span>
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Objetivo</label>
                            <span>{ atividade.objetivo.descricao }</span>
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Data de Início</label>
                            <span>{ dataToStringBr( cicloSelecionado.dataInicio) }</span>
                          </div>
                          {
                            atividade.equipes.map( equipe => (
                              <Accordion key={ 'eq-' + equipe.id } className="expansion">
                                <AccordionSummary
                                  expandIcon={ <ExpandMoreIcon /> }
                                  aria-controls="panel-side-content-0"
                                  id="panel-side-0"
                                >
                                  <PanelTitle>
                                    <p>{ equipe.apelido ? `Equipe ${equipe.apelido}` : 'Equipe' }</p>
                                  </PanelTitle>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <ul className="lista-membros">
                                    {
                                      equipe.membros.map( membro => (
                                        <li key={ 'mb-' + membro.usuario.id } onClick={ () => abrirModalTrabalho( equipe.id, membro.usuario.id ) }>{ membro.usuario.nome }</li>
                                      ) )
                                    }
                                  </ul>
                                </AccordionDetails>
                              </Accordion>
                            ) )
                          }
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

      <ModalTrabalhoDiario id="modal-trabalho" title="Selecione o dia que deseja ver" />
    </Container>
  )
}

const mapStateToProps = state => ( {
  usuario   : state.appConfig.usuario,
  ciclos    : state.ciclo.ciclos,
  atividades: state.atividade.atividades,
  searchResponsabilityActivities: state.atividade.searchResponsabilityActivities
} );

const mapDispatchToProps = {
  changeSidebar,
  getResponsabilityActivitiesRequest,
  getCicloAbertoRequest,
  getTrabalhosEquipeAndUsuarioRequest,
  setTrabalhos,
  getOpenAndFinishedCyclesRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( RelatorioDiario );
