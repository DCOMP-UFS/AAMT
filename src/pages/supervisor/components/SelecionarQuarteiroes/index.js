import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PopDescription from '../../../../components/PopDescription';
import Checkbox from '@material-ui/core/Checkbox';
import { FaUser } from 'react-icons/fa';
import Loading from '../../../../components/Loading';
import { situacaoLadoEnum } from '../../../../config/enumerate.js';

// ACTIONS
import { toggleLado, getRotaEquipeRequest, setFl_loading, checarRota } from '../../../../store/Atividade/atividadeActions';

// STYLES
import { Container, Block, Usuario, Avatar, StreetCard } from './styles';

export const SelecionarQuarteiroes = ({ fl_loading, indexEquipe, indexMembro, rota_equipe, equipes, ...props }) => {
  useEffect(() => {
    if( indexEquipe !== -1 ) {
      props.setFl_loading( true );
      props.getRotaEquipeRequest( equipes[ indexEquipe ].id );
    }
  }, [ indexEquipe ]);

  useEffect(() => {
    if( rota_equipe.length > 0 )
      props.setFl_loading( false );
  }, [ rota_equipe ]);

  useEffect(() => {
    if( indexMembro > -1 )
      props.checarRota();
  }, [ indexMembro ])

  return (
    <Container>
      <Usuario>
        <Avatar>
          <FaUser />
        </Avatar>
        { indexEquipe > -1 && indexMembro > -1 ? equipes[ indexEquipe ].membros[ indexMembro ].usuario.nome : '' }
      </Usuario>

      <Row>
        <Col md="12">
          <h4 className="title">
            Selecione os Quarteirões
            <PopDescription
              title="Seleção de Quarteirões"
              placement="right"
              content="Selecione os quarteirões que o agente irá trabalhar."
            />
          </h4>
        </Col>
      </Row>
      <Row id="list-quarteirao" style={{ paddingBottom: '30px', minHeight: '500px', maxHeight: '500px', overflow: 'auto' }}>
        {
          fl_loading ?
            <Loading element="#list-quarteirao" /> :
            rota_equipe.map( ( quarteirao, indexQuarteirao ) => (
              <Col key={ "qrt_" + quarteirao.id } xs="12" sm="6">
                <Block >
                  <label>Quarteirão: Nº { quarteirao.numero }</label>

                  <ul className="sides">
                    {
                      quarteirao.lados.map( ( lado, indexLado ) => {
                        let fl_usuario_selecionado = false;

                        if( indexEquipe > -1 && indexMembro > -1 && lado.situacao === 4 ) {
                          if( equipes[ indexEquipe ].membros[ indexMembro ].usuario_id === lado.usuario_id ) {
                            fl_usuario_selecionado = true;
                          } else {
                            fl_usuario_selecionado = false;
                          }
                        }

                        return (
                          <li
                            key={ "lado_" + lado.id }
                            className={
                              lado.situacao === 3 ? 'disabled' :
                              lado.situacao === 4 && !fl_usuario_selecionado ? 'disabled' :
                              ''
                            }
                            onClick={ () => {
                              if( lado.situacao !== 3 )
                                props.toggleLado( indexQuarteirao, indexLado )
                            }}
                          >
                            {/* situacao_lado_id
                            1 - Em aberto
                            2 - Fazendo
                            3 - Concluído
                            4 - Planejado */}
                            <StreetCard className={
                              lado.situacao === 3 ? 'success' :
                              lado.situacao === 4 ? 'warning' :
                              ''
                            }>
                              <div className="body">
                                <Checkbox
                                  color="primary"
                                  className="p-0 pr-2"
                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                                  checked={ lado.selected ? lado.selected : false }
                                />
                                { lado.rua.nome }
                              </div>
                              <div className="footer">
                                <span>{
                                  situacaoLadoEnum.find( sit => sit.id === lado.situacao ).label
                                }</span>
                                <span>{ `${ lado.vistorias }/${ lado.imoveis }` }</span>
                              </div>
                            </StreetCard>
                          </li>
                        )
                      })
                    }
                  </ul>
                </Block>
              </Col>
            ))
        }
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  equipes: state.nw_atividade.equipes,
  rota_equipe: state.nw_atividade.rota_equipe,
  indexEquipe: state.nw_atividade.indexEquipe,
  indexMembro: state.nw_atividade.indexMembro,
  reload: state.nw_atividade.reload,
  fl_loading: state.nw_atividade.fl_loading,
});

const mapDispatchToProps = {
  toggleLado,
  getRotaEquipeRequest,
  setFl_loading,
  checarRota
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SelecionarQuarteiroes );
