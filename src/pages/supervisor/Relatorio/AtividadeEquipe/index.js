/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { getDateBr } from '../../../../config/function';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarSupervisor';
import { getCicloAbertoRequest } from '../../../../store/Ciclo/cicloActions';
import { getResponsabilityActivitiesRequest } from '../../../../store/Atividade/atividadeActions';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader } from '../../../../styles/util';

export const RelatorioAtividadeEquipe = ({ atividades, ciclo, usuario, ...props }) => {
  useEffect(() => {
    props.changeSidebar( 6, 5 );
    props.getCicloAbertoRequest( usuario.municipio.regional.id );
  }, []);

  useEffect(() => {
    if( Object.entries( ciclo ).length > 0 ) {
      props.getResponsabilityActivitiesRequest( usuario.id, ciclo.id );
    }
  }, [ ciclo ]);

  const clickTeam = (equipe_id) => {
    window.location = window.location.origin.toString() + '/sup/relatorio/atividadeEquipe/' + equipe_id;
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Boletim da Equipe por Atividade
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
                    <ul className="lista-equipes">
                      {
                        atividade.equipes.map( equipe => (
                          <li key={ 'eq-' + equipe.id } onClick={() => clickTeam(equipe.id)}>{ equipe.apelido ? `Equipe ${equipe.apelido}` : 'Equipe' }</li>
                        ) )
                      }
                    </ul>
                  </div>
                </div>
              </Col>
            ) )
          }
        </article>
      </section>
    </Container>
  )
}

const mapStateToProps = state => ( {
  usuario   : state.appConfig.usuario,
  ciclo     : state.ciclo.ciclo,
  atividades: state.atividade.atividades
} );

const mapDispatchToProps = {
  changeSidebar,
  getCicloAbertoRequest,
  getResponsabilityActivitiesRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( RelatorioAtividadeEquipe );
