/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FaMapSigns } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ModalPlanejarRota from './ModalPlanejarRota';
import ButtonSave from '../../../components/ButtonSave';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarSupervisor';
import { getOpenCycleRequest } from '../../../store/actions/CicloActions';
import { getActivitiesSupRequest, addPlanejamento, getTeamsSupRequest } from '../../../store/actions/DefinirRotaActions';
import { loadPlanning, savePlainRequest } from '../../../store/actions/DefinirRotaActions';
import { clearCachePlanning, getPlanningRequest } from '../../../store/actions/DefinirRotaCacheActions';

// STYLES
import { ListAtividade, Article, Team } from './styles';
import { ContainerFixed, PageIcon, PageHeader, PagePopUp } from '../../../styles/util';

function DefinirRota({ usuario, atividades, equipes, planejamentoCache, ciclo, regionalSaude_id, ...props }) {
  const [ indexAtividade, setIndexAtividade] = useState( 0 );
  const [ loading, setLoading] = useState( false );

  useEffect(() => {
    props.changeSidebar(2, 1);
    props.getOpenCycleRequest(regionalSaude_id);
    props.getActivitiesSupRequest( usuario.id );
  }, []);

  useEffect(() => {
    if( !props.flConsultado ) {
      props.getPlanningRequest( usuario.id );
    } else {
      let dataAtual = new Date().toLocaleDateString('en-US');

      if ( props.dataRota !== dataAtual) {
        props.clearCachePlanning();
      } else {
        props.loadPlanning( planejamentoCache );
      }
    }
  }, [ props.flConsultado ]);

  useEffect(() => {
    handleActivity( 0 );
  }, [ atividades ]);

  function handleActivity( index ) {
    if( atividades.length > 0 ) {
      props.getTeamsSupRequest( atividades[ index ].id );
      setIndexAtividade( index );
    }
  }

  function handleTeam( eq ) {
    props.addPlanejamento( eq );
  }

  useEffect(() => {
    setLoading( false );
  }, props.toggleLoading );

  function save() {
    setLoading( true );
    props.savePlainRequest( usuario.id, planejamentoCache );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaMapSigns /></PageIcon>
          Planejamento de Rotas
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <label className="m-0">
                {
                  Object.entries(ciclo).length > 0 ?
                    `Ciclo ${ ciclo.ano }.${ ciclo.sequencia }: selecione uma equipe para planejar as rotas do dia.` :
                    "Não há ciclo em abertos"
                }
              </label>
            </div>
          </PagePopUp>
        </Row>

        <Row>
          <Article className="col-md-12 stretch-card">
            <div className="card">
              <Row>
                <Col md="4" className="pr-20">
                  <ListAtividade className="list-activity">
                    {
                      atividades.map( (atv, index) => {
                        let objSigla = atv.objetivo.descricao.split(' - ')[0];

                        return (
                          <li
                            key={ index }
                            onClick={ () => handleActivity( index ) }
                            className={ indexAtividade === index ? 'active' : '' }>
                            <mark className="bg-primary text-white">{ atv.id }</mark>
                            <span>{ atv.metodologia.sigla }</span>
                            <span>{ objSigla }</span>
                          </li>
                        );
                      })
                    }
                  </ListAtividade>
                </Col>
                <Col md="8" className="pl-20 border-left-temp">
                    <div className="header-equipe">
                      <h4 className="title">Minhas Equipes</h4>

                      {
                        equipes ?
                          equipes.map( (eq, index ) => (
                            <Team
                              key={ index }
                              href="#modal-planejar-rota"
                              data-toggle="modal"
                              data-target="#modal-planejar-rota"
                              onClick={ () => handleTeam( eq ) }>
                              <h6>
                                Equipe { eq.id }
                              </h6>
                              <ul className="members">
                                {
                                  eq.membros.filter( m => m.usuario.id !== usuario.id ).map( (m, index) => {
                                    let names = m.usuario.nome.split(' ');
                                    let userName = names[0] + ( names.length > 1 ? ' ' + names[ names.length - 1 ] : '' );

                                    return (
                                      <li key={ index }>
                                        <mark>{ userName }</mark>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </Team>
                          )) :
                          ""
                      }
                    </div>
                </Col>
              </Row>
            </div>
          </Article>
        </Row>

        <ContainerFixed>
          <ButtonSave
            title="Salvar Planejamento"
            className="bg-info text-white"
            loading={ loading }
            type="button"
            onClick={ save } />
        </ContainerFixed>
      </section>

      <ModalPlanejarRota />
    </>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  regionalSaude_id: state.appConfig.usuario.municipio.regional.id,
  ciclo: state.ciclo.cicloAberto,
  atividades: state.definirRota.atividades,
  planejamentoCache: state.definirRotaCache.planejamento,
  equipes: state.definirRota.equipes,
  dataRota: state.definirRotaCache.data,
  flConsultado: state.definirRotaCache.flConsultado,
  toggleLoading: state.definirRotaCache.toggleLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getOpenCycleRequest,
    getActivitiesSupRequest,
    addPlanejamento,
    getTeamsSupRequest,
    clearCachePlanning,
    loadPlanning,
    getPlanningRequest,
    savePlainRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( DefinirRota );
