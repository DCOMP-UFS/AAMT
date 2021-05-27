import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarSupervisor';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader } from '../../../../styles/util';

export const RelatorioAtividadeEquipe = ({ ...props }) => {
  useEffect(() => {
    props.changeSidebar( 6, 5 );
  }, []);

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Relatório Diário por Equipe
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

                <ul className="lista-equipes">
                  <li>Equipe Furia</li>
                  <li>Equipe</li>
                </ul>
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

                <ul className="lista-equipes">
                  <li>Equipe Furia</li>
                  <li>Equipe</li>
                </ul>
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

                <ul className="lista-equipes">
                  <li>Equipe Furia</li>
                  <li>Equipe</li>
                </ul>
              </div>
            </div>
          </Col>
        </article>
      </section>
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
)( RelatorioAtividadeEquipe );
