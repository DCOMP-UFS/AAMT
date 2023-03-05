import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaMapSigns } from 'react-icons/fa';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import SelecionarAtividade from './components/SelecionarAtividade';
import SelecionarAgente from './components/SelecionarAgente';
import SelecionarQuarteiroes from './components/SelecionarQuarteiroes';
import MapaRotas from './components/MapaRotas';
import LoadginGif from '../../../assets/loading.gif';

// ACTIONS
import { getOpenCycleRequest } from '../../../store/Ciclo/cicloActions';
import { getResponsabilityActivitiesRequest, setIndexEquipe, setIndexMembro } from '../../../store/Atividade/atividadeActions';
import { planejarRotaRequest, alterarRotaRequest, setCarregandoRota, getRotasPlanejadasRequest, setRotaPlanejada } from '../../../store/Rota/rotaActions';
import { showNotifyToast } from '../../../store/AppConfig/appConfigActions';
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';

// STYLES
import { PageIcon, PageHeader, PagePopUp, Steps, StepControl } from '../../../styles/util';
import { Button } from '../../../styles/global';
import { Container } from './styles';

export const PlanejarRota = ( {
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
} ) => {
  const [ currentDate, setCurrentDate] = useState( '' );
  const [ steps, setSteps ] = useState([
    { valid: false, name: 'Atividades', slug: 'selecionar_atividade', content: <SelecionarAtividade/> },
    { valid: false, name: 'Selecionar Agente', slug: 'selecionar_agente', content: <SelecionarAgente /> },
    { valid: false, name: 'Planejar Rota', slug: 'planejar_rota', content: <SelecionarQuarteiroes /> }
  ]);
  const [ indexStep, setIndexStep ] = useState( 0 );
  const [ isLoading, setIsLoading ] = useState( false );

  useEffect( () => {
    props.changeSidebar( "planejar_rota" );
    props.getOpenCycleRequest( regionalSaude_id );

    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
    setCurrentDate( `${ d <= 9 ? '0' + d : d }/${ m <= 9 ? '0' + m : m }/${ Y }` );
  }, [] );

  useEffect(() => {
    if( ciclo != null ) {
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
      setTimeout(() => { document.location.reload( true );}, 1500)
      
    }
    setIsLoading(false)
    props.setRotaPlanejada( null )
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

    let valido = true
    let msg = ''

    //Atividade atualmente selecionada
    const ativ = atividades[indexAtividade]

    //A atividade  foi encerrada, logo não é possivel planejar nova rota
    if(ativ.situacao === 3){
      valido = false
      msg = 'A atividade ja foi encerrada, não sendo mais possível fazer o seu planejamento'
    }
    else{
       //verifica se o supervisor selecionou ao menos um lado de um quarteirão
      valido = false
      rota_equipe.forEach( quarteirao => {
        quarteirao.lados.forEach( lado => {
          if( lado.selected )
            valido = true;    
        });
      });

      if(!valido) 
        msg = 'Selecione ao menos uma rua para rota do agente!'
    }

    return [ valido, msg ];
  }

  const submit = () => {
    //Significa que o agente selecionado ja possui uma rota planejada para hoje,
    //sendo que que ela ja foi iniciada
    if(equipes[ indexEquipe ].membros[ indexMembro ].trabalhoDiarioHoje.horaInicio)
      props.showNotifyToast( 'Não é possivel alterar um rota que ja foi iniciada', "warning" );
    else{
      const supervisor_id = usuario.id,
            equipe = equipes[ indexEquipe ],
            usuario_id = equipe.membros[ indexMembro ].usuario_id,
            equipe_id = equipe.id,
            trabalhoDiario_id = equipes[ indexEquipe ].membros[ indexMembro ].trabalhoDiarioHoje.id;

      let lados = [];
      rota_equipe.forEach( quarteirao => {
        quarteirao.lados.forEach( lado => {
          if( lado.selected ) lados.push( lado.id );
        });
      });

      //Faz com que o botão "Salvar/Alterar" fique com visual de carregamento
      setIsLoading(true)

      //Significa que o agente selecionado tem uma rota para hoje,
      //mas ela ainda não foi iniciada e portanto pode ser alterada
      if( trabalhoDiario_id){
        props.alterarRotaRequest( trabalhoDiario_id, lados )
      }
      else{
        props.planejarRotaRequest({
          supervisor_id,
          usuario_id,
          equipe_id,
          lados
        });
      }
    } 
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
                      'Não existe nenhum ciclo em aberto no momento. Retorne quando um novo ciclo tenha iniciado.'
                  }
                </label>
              </div>
            </PagePopUp>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tabs
              defaultActiveKey="planejar"
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
                            disabled={isLoading}
                          >
                            { (() => {
                              if(indexStep === steps.length - 1){
                                
                                if(isLoading){
                                  return (
                                    <>
                                      <img
                                        src={ LoadginGif }
                                        width="25"
                                        style={{ marginRight: 10 }}
                                        alt="Carregando"
                                      />
                                      Processando...
                                    </>
                                  )
                                }
                                //Se true, significa que o agente selecionado ja possui um trabalho diario para hoje
                                //e o supervisor deseja altera-la
                                else if(indexEquipe > -1 && indexMembro > -1 && equipes[ indexEquipe ].membros[ indexMembro ].trabalhoDiarioHoje.id != null)
                                  return 'Alterar'
                                else
                                  return 'Salvar'
                              }
                              else
                                return 'Avançar'
                            }) ()
                             
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
  ciclo             : state.ciclo.cicloAberto,
  regionalSaude_id  : state.appConfig.usuario.municipio.regional.id,
  usuario           : state.appConfig.usuario,
  indexAtividade    : state.atividade.indexAtividade,
  indexMembro       : state.atividade.indexMembro,
  equipes           : state.atividade.equipes,
  indexEquipe       : state.atividade.indexEquipe,
  fl_rota_planejada : state.rota.fl_rota_planejada,
  rota_equipe       : state.atividade.rota_equipe,
  atividades        : state.atividade.atividades
});

const mapDispatchToProps = {
  getOpenCycleRequest,
  getResponsabilityActivitiesRequest,
  showNotifyToast,
  planejarRotaRequest,
  setIndexEquipe,
  setIndexMembro,
  setCarregandoRota,
  getRotasPlanejadasRequest,
  changeSidebar,
  setRotaPlanejada,
  alterarRotaRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanejarRota);
