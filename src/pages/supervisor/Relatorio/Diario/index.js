import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalTrabalhoDiario from '../components/ModalTrabalhoDiario';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarSupervisor';

// STYLES
import { Container, PanelTitle } from './styles';
import { PageIcon, PageHeader } from '../../../../styles/util';

export const RelatorioDiario = ({ ...props }) => {
  useEffect(() => {
    props.changeSidebar( 6, 1 );
  }, []);

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Relatório Diário
        </h3>
      </PageHeader>

      <section className="card-list">
        <article className="row">
          <Col md="4">
            <div className="card2">
              <div className="card2-header">
                <h3 className="title">PNCD</h3>
              </div>
              <div className="card2-body">
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Objetivo</label>
                  <span>LI+T - Levantamento de Índice + Tratamento</span>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Data de Início</label>
                  <span>03/03/2021</span>
                </div>

                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel-side-content-0"
                    id="panel-side-0"
                  >
                    <PanelTitle>
                      <p>Equipe</p>
                      <small className="text-muted">Furia</small>
                    </PanelTitle>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul className="lista-membros">
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Kyara Rufino Ávila</li>
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Duarte</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel-side-content-1"
                    id="panel-side-1"
                  >
                    <PanelTitle>
                      <p>Equipe</p>
                    </PanelTitle>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul className="lista-membros">
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Kyara Rufino Ávila</li>
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Duarte</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="card2">
              <div className="card2-header">
                <h3 className="title">LIRAa</h3>
              </div>
              <div className="card2-body">
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Objetivo</label>
                  <span>LI - Levantamento de Índice</span>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Data de Início</label>
                  <span>03/03/2021</span>
                </div>

                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel-side-content-0"
                    id="panel-side-0"
                  >
                    <PanelTitle>
                      <p>Equipe</p>
                      <small className="text-muted">Furia</small>
                    </PanelTitle>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul className="lista-membros">
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Kyara Rufino Ávila</li>
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Duarte</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel-side-content-1"
                    id="panel-side-1"
                  >
                    <PanelTitle>
                      <p>Equipe</p>
                    </PanelTitle>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul className="lista-membros">
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Kyara Rufino Ávila</li>
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Duarte</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="card2">
              <div className="card2-header">
                <h3 className="title">PNCD</h3>
              </div>
              <div className="card2-body">
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Objetivo</label>
                  <span>PE - Ponto Estratégico</span>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Data de Início</label>
                  <span>03/03/2021</span>
                </div>

                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel-side-content-0"
                    id="panel-side-0"
                  >
                    <PanelTitle>
                      <p>Equipe</p>
                      <small className="text-muted">Furia</small>
                    </PanelTitle>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul className="lista-membros">
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Kyara Rufino Ávila</li>
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Duarte</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel-side-content-1"
                    id="panel-side-1"
                  >
                    <PanelTitle>
                      <p>Equipe</p>
                    </PanelTitle>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul className="lista-membros">
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Kyara Rufino Ávila</li>
                      <li onClick={ () => $( '#modal-trabalho' ).modal( 'show' ) }>Duarte</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          </Col>
        </article>
      </section>

      <ModalTrabalhoDiario id="modal-trabalho" title="Selecione o dia que deseja ver" />
    </Container>
  )
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  changeSidebar
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( RelatorioDiario );
