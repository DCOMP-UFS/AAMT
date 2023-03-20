import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartLine } from 'react-icons/fa';
import { Col } from 'react-bootstrap';
import { dataToStringBr } from '../../../config/function';
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

export const RelatorioAtividade = ({ atividades, ciclos, usuario, ...props }) => {

  const [ cicloSelecionado, setCicloSelecionado ] = useState(null);
  const [ optionCiclos, setOptionCiclos ] = useState({});

  useEffect(() => {
    props.changeSidebar( "relatorio", "rlt_porAtividade" );
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

  const submit = (atividade_id) => {
    window.location = window.location.origin.toString() + '/relatorio/atividade/' + atividade_id;
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartLine /></PageIcon>
          Boletim por atividade
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
)( RelatorioAtividade );
