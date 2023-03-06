import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Col } from 'react-bootstrap';
import ModalSemana from '../components/ModalSemana';
import { dataToStringBr } from '../../../config/function';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getCicloAbertoRequest, getOpenAndFinishedCyclesRequest } from '../../../store/Ciclo/cicloActions';
import { getResponsabilityActivitiesRequest } from '../../../store/Atividade/atividadeActions';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader } from '../../../styles/util';

//COMPONENTS
import { CycleSelector } from '../../../components/CycleSelector';

export const RelatorioSemanal = ({ atividades, ciclos, usuario, ...props }) => {
  const [ ano, setAno ]                   = useState( '' );
  const [ atividade_id, setAtividade_id ] = useState( -1 );
  const idMOdal                           = 'modal-semanal';
  const idElementMOdal                    = '#' + idMOdal;
  const [ cicloSelecionado, setCicloSelecionado ] = useState(null);
  const [ optionCiclos, setOptionCiclos ] = useState({});

  useEffect(() => {
    props.changeSidebar( "relatorio", "rlt_boletimSemanal" );
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
    if( cicloSelecionado != null) {
      props.getResponsabilityActivitiesRequest( usuario.id, cicloSelecionado.value );
    }
  }, [ cicloSelecionado ]);

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
              else{
                return(
                  atividades.map( atividade => (
                    <Col key={ 'atv-' + atividade.id } md="4" className="mb-3">
                      <div className="card2 cursor-pointer" onClick={ () => openModal( atividade.id, cicloSelecionado.dataInicio ) } >
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
  ciclos     : state.ciclo.ciclos,
  atividades: state.atividade.atividades,
  searchResponsabilityActivities: state.atividade.searchResponsabilityActivities
} );

const mapDispatchToProps = {
  changeSidebar,
  getCicloAbertoRequest,
  getResponsabilityActivitiesRequest,
  getOpenAndFinishedCyclesRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( RelatorioSemanal );
