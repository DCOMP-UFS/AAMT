import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalTrabalhoDiario from '../components/ModalTrabalhoDiario';
import $ from 'jquery';
import { getDateBr } from '../../../../config/function';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarSupervisor';
import { getResponsabilityActivitiesRequest } from '../../../../store/Atividade/atividadeActions';
import { getCicloAbertoRequest } from '../../../../store/Ciclo/cicloActions';
import { getTrabalhosUsuarioRequest, setTrabalhos } from '../../../../store/TrabalhoDiario/trabalhoDiarioActions';

// STYLES
import { Container, PanelTitle } from './styles';
import { PageIcon, PageHeader } from '../../../../styles/util';

export const RelatorioDiario = ({ atividades, ciclo, usuario, ...props }) => {
  useEffect(() => {
    props.changeSidebar( 6, 1 );
    props.getCicloAbertoRequest( usuario.municipio.regional.id );
  }, []);

  useEffect(() => {
    if( Object.entries( ciclo ).length > 0 ) {
      props.getResponsabilityActivitiesRequest( usuario.id, ciclo.id );
    }
  }, [ ciclo ]);

  const abrirModalTrabalho = usuario_id => {
    props.setTrabalhos( [] );
    props.getTrabalhosUsuarioRequest( usuario_id );

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

      <section className="card-list">
        <article className="row">
          {
            atividades.map( atividade => (
              <Col key={ 'atv-' + atividade.id } md="4" className="mb-3">
                <div className="card2">
                  <div className="card2-header">
                    <h3 className="title">{ atividade.metodologia.sigla }</h3>
                  </div>
                  <div className="card2-body">
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Objetivo</label>
                      <span>{ atividade.objetivo.descricao }</span>
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Data de Início</label>
                      <span>{ getDateBr( ciclo.dataInicio, 'date' ) }</span>
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
                                  <li key={ 'mb-' + membro.usuario.id } onClick={ () => abrirModalTrabalho( membro.usuario.id ) }>{ membro.usuario.nome }</li>
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
          }
        </article>
      </section>

      <ModalTrabalhoDiario id="modal-trabalho" title="Selecione o dia que deseja ver" />
    </Container>
  )
}

const mapStateToProps = state => ( {
  usuario   : state.appConfig.usuario,
  ciclo     : state.nw_ciclo.ciclo,
  atividades: state.atividade.atividades
} );

const mapDispatchToProps = {
  changeSidebar,
  getResponsabilityActivitiesRequest,
  getCicloAbertoRequest,
  getTrabalhosUsuarioRequest,
  setTrabalhos
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( RelatorioDiario );
