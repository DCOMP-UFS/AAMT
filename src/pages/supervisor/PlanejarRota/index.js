import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaMapSigns } from 'react-icons/fa';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import SelecionarAtividade from '../components/SelecionarAtividade';
import SelecionarAgente from '../components/SelecionarAgente';
import SelecionarQuarteiroes from '../components/SelecionarQuarteiroes';
import MapaRotas from '../components/MapaRotas';

// ACTIONS
import { getOpenCycleRequest } from '../../../store/actions/CicloActions';
import { getResponsabilityActivitiesRequest, setIndexEquipe, setIndexMembro } from '../../../store/Atividade/atividadeActions';
import { planejarRotaRequest, setCarregandoRota, getRotasPlanejadasRequest } from '../../../store/Rota/rotaActions';
import { showNotifyToast } from '../../../store/actions/appConfig';

// STYLES
import { PageIcon, PageHeader, PagePopUp, Steps, StepControl } from '../../../styles/util';
import { Button } from '../../../styles/global';
import { Container } from './styles';

export const PlanejarRota = ({
  fl_rota_planejada,
  indexEquipe,
  indexMembro,
  indexAtividade,
  equipes,
  atividades,
  ciclo,
  regionalSaude_id,
  usuario,
  rota_equipe,
  ...props
}) => {
  const [ currentDate, setCurrentDate] = useState( '' );
  const [ steps, setSteps ] = useState([
    { valid: false, name: 'Atividades', slug: 'selecionar_atividade', content: <SelecionarAtividade /> },
    { valid: false, name: 'Selecionar Agente', slug: 'selecionar_agente', content: <SelecionarAgente /> },
    { valid: false, name: 'Planejar Rota', slug: 'planejar_rota', content: <SelecionarQuarteiroes /> }
  ]);
  const [ indexStep, setIndexStep ] = useState( 0 );

  useEffect(() => {
    props.getOpenCycleRequest( regionalSaude_id );

    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
    setCurrentDate( `${ d <= 9 ? '0' + d : d }/${ m <= 9 ? '0' + m : m }/${ Y }` );
  }, []);

  useEffect(() => {
    if( Object.entries( ciclo ).length > 0 ) {
      props.getResponsabilityActivitiesRequest(usuario.id, ciclo.id);
    }
  }, [ ciclo ]);

  useEffect(() => {
    if( fl_rota_planejada ) {
      const iEquipe = indexEquipe;
      props.showNotifyToast( "Rota salva com sucesso", "success" );
      setIndexStep( 0 );
      props.setIndexEquipe( -1 );
      props.setIndexMembro( -1 );
    }
  }, [ fl_rota_planejada ])

  const next = () => {
    let [ valido, mensagem ] = [ false, '' ];

    if( indexStep === 0 )
      [ valido, mensagem ] = validarAtividade();
    if( indexStep === 1 )
      [ valido, mensagem ] = validarAgente();
    if( indexStep === 2 )
      [ valido, mensagem ] = validarRota();

    if( valido ) {
      if( indexStep === 2 ) {
        submit();
      } else {
        let s     = steps,
            index = indexStep + 1 < steps.length ? indexStep + 1 : indexStep;

        s[ indexStep ].valid = true;

        setSteps( s );
        setIndexStep( index );
      }
    } else {
      let s = steps;

      s[ indexStep ].valid = false;
      props.showNotifyToast( mensagem, "warning" );
    }
  }

  const prev = () => {
    setIndexStep( indexStep - 1 >= 0 ? indexStep - 1 : 0 );
  }

  const validarAtividade = () => {
    return indexAtividade > -1 ? [ true, '' ] : [ false, 'Selecione uma atividade antes de prosseguir' ];
  }

  const validarAgente = () => {
    return indexMembro > -1 ? [ true, '' ] : [ false, 'Selecione um agente antes de prosseguir' ];
  }

  const validarRota = () => {
    let fl_um_selecionado = false; // se for false o supervisor não selecionou nenhum quarteirão.

    rota_equipe.forEach( quarteirao => {
      quarteirao.lados.forEach( lado => {
        if( lado.selected ) fl_um_selecionado = true;
      });
    });

    return fl_um_selecionado ? [ true, '' ] : [ false, 'Selecione ao menos uma rua para rota do agente!' ];
  }

  const submit = () => {
    const supervisor_id = usuario.id,
          equipe = equipes[ indexEquipe ],
          usuario_id = equipe.membros[ indexMembro ].usuario_id,
          equipe_id = equipe.id;

    let lados = [];
    rota_equipe.forEach( quarteirao => {
      quarteirao.lados.forEach( lado => {
        if( lado.selected ) lados.push( lado.id );
      });
    });

    props.planejarRotaRequest({
      supervisor_id,
      usuario_id,
      equipe_id,
      lados
    });
  }

  const consultarRotas = () => {
    props.setCarregandoRota( true );
    props.getRotasPlanejadasRequest( ciclo.id, usuario.id );
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaMapSigns /></PageIcon>
          Planejamento de Rotas
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <Col>
            <PagePopUp className="w-100">
              <div className="card">
                <label className="m-0">
                  {
                    ciclo ?
                      Object.entries( ciclo ).length > 0 ?
                        `Ciclo ${ ciclo.ano }.${ ciclo.sequencia }: selecione uma equipe para planejar as rotas do dia ${ currentDate }.` :
                        "Não há ciclo em abertos"
                      :
                      ''
                  }
                </label>
              </div>
            </PagePopUp>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tabs
              defaultActiveKey="rotas"
              className="nav-page"
              onSelect={ e => { if( e === 'rotas' ) consultarRotas(); } }
            >
              <Tab eventKey="planejar" title="Planejar">
                <article>
                  <div className="card p-0">
                    <Steps>
                      <div className="menu-steps">
                        <ul className="steps">
                          {
                            steps.map((step, index) => {
                              return (
                                <li
                                  key={ step.slug ? step.slug : index }
                                  className={`step-item ${ step.valid ? 'valid' : '' } ${ indexStep == index ? 'active' : '' }`}
                                >{ step.name }</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                      <div className="step-panel">
                        {
                          steps.map((step, index) => {
                            return(
                              <div
                                key={ step.slug }
                                className={`panel-item ${ indexStep == index ? 'active' : '' }`}>
                                { step.content }
                              </div>
                            );
                          })
                        }

                        <StepControl>
                          <Button
                            type="button"
                            className={ `secondary ${ indexStep > 0 ? 'visible' : 'invisible' }` }
                            onClick={ prev }
                          >
                            Voltar
                          </Button>
                          <Button
                            type="submit"
                            className="info"
                            onClick={ next }
                          >
                            {
                              indexStep === steps.length - 1 ? 'Salvar' : 'Avançar'
                            }
                          </Button>
                        </StepControl>
                      </div>
                    </Steps>
                  </div>
                </article>
              </Tab>
              <Tab eventKey="rotas" title="Rotas">
                <MapaRotas id="container-rotas" />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  ciclo: state.ciclo.cicloAberto,
  regionalSaude_id: state.appConfig.usuario.municipio.regional.id,
  usuario: state.appConfig.usuario,
  indexAtividade: state.nw_atividade.indexAtividade,
  indexMembro: state.nw_atividade.indexMembro,
  equipes: state.nw_atividade.equipes,
  indexEquipe: state.nw_atividade.indexEquipe,
  fl_rota_planejada: state.nw_rota.fl_rota_planejada,
  rota_equipe: state.nw_atividade.rota_equipe,
});

const mapDispatchToProps = {
  getOpenCycleRequest,
  getResponsabilityActivitiesRequest,
  showNotifyToast,
  planejarRotaRequest,
  setIndexEquipe,
  setIndexMembro,
  setCarregandoRota,
  getRotasPlanejadasRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanejarRota);
