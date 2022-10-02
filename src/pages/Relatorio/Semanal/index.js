import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ModalSemana from '../components/ModalSemana';
import { dataToStringBr } from '../../../config/function';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getCicloAbertoRequest } from '../../../store/Ciclo/cicloActions';
import { getResponsabilityActivitiesRequest } from '../../../store/Atividade/atividadeActions';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader } from '../../../styles/util';

export const RelatorioSemanal = ({ atividades, ciclo, usuario, ...props }) => {
  const [ ano, setAno ]                   = useState( '' );
  const [ atividade_id, setAtividade_id ] = useState( -1 );
  const idMOdal                           = 'modal-semanal';
  const idElementMOdal                    = '#' + idMOdal;

  useEffect(() => {
    props.changeSidebar( "relatorio", "rlt_boletimSemanal" );
    props.getCicloAbertoRequest( usuario.municipio.regional.id );
  }, []);

  useEffect(() => {
    if( Object.entries( ciclo ).length > 0 ) {
      props.getResponsabilityActivitiesRequest( usuario.id, ciclo.id );
    }
  }, [ ciclo ]);

  const openModal = ( atv_id, ciclo_dataInicio ) => {
    setAtividade_id( atv_id );
    setAno( ciclo_dataInicio.split( '-' )[ 0 ] );

    $( idElementMOdal ).modal( 'show' );
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Boletim semanal
        </h3>
      </PageHeader>

      <section className="card-list">
        <article className="row">
          {
            atividades.map( atividade => (
              <Col key={ 'atv-' + atividade.id } md="4" className="mb-3">
                <div className="card2 cursor-pointer" onClick={ () => openModal( atividade.id, ciclo.dataInicio ) } >
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
                      <span>{ dataToStringBr( ciclo.dataInicio ) }</span>
                    </div>
                  </div>
                </div>
              </Col>
            ) )
          }
        </article>
      </section>

      <ModalSemana
        id={ idMOdal }
        title="Semana epidemiológica"
        size="sm"
        atividade_id={ atividade_id }
        ano={ ano }
      />
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
)( RelatorioSemanal );
