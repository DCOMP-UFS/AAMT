import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PopDescription from '../../../../../components/PopDescription';
import Checkbox from '@material-ui/core/Checkbox';
import { FaUser } from 'react-icons/fa';
import Loading from '../../../../../components/Loading';
import { situacaoLadoEnum } from '../../../../../config/enumerate.js';

// ACTIONS
import { toggleLado, getRotaEquipeRequest, setFl_loading, checarRota } from '../../../../../store/Atividade/atividadeActions';

// STYLES
import { Container, Block, Usuario, Avatar, StreetCard } from './styles';

/**
 * Componente de step da página de planejamento de rotas.
 * Este step é responsável por selecionar as ruas que um agente irá trabalhar e
 * solicitar o planejamento de sua rota.
 * 
 * @param {Boolean} fl_loading alternador do componente loading
 * @param {Integer} indexEquipe index da equipe selecionada no array de equipes
 * @param {Integer} indexMembro membro selecionado para planejamento da rota
 * @param {Array} rota_equipe quarteiroes planejados para equipe selecionada
 * @param {Array} equipes lista de equipes de responsabilidade do supervisor 
 * @param {Object} props demais parametros do componente
 * @returns 
 */
export const SelecionarQuarteiroes = ( { fl_loading, indexEquipe, indexMembro, rota_equipe, equipes, ...props } ) => {
  /**
   * Este effect é acionado assi mque o componente é montado.
   * Sua responsabilidade é ativar o componente de loading e solicitar
   * as rotas planejadas para equipe.
   */
  useEffect( () => {
    if( indexEquipe !== -1 ) {
      props.setFl_loading( true );
      props.getRotaEquipeRequest( equipes[ indexEquipe ].id );
    }
  }, [ indexEquipe ] );

  /**
   * Verificando se o indexMembro é válido, se sim, solicita
   * as rotas que já estão planejadas.
   */
  useEffect( () => {
    if( indexMembro > -1 )
      props.checarRota();
  }, [ indexMembro ] );

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
      <Row id="list-quarteirao" style={ { paddingBottom: '30px', minHeight: '500px', maxHeight: '500px', overflow: 'auto' } }>
        <ExibirQuarteiroes 
          rota_equipe={ rota_equipe } 
          fl_loading={ fl_loading }
          equipes={ equipes }
          indexEquipe={ indexEquipe }
          indexMembro={ indexMembro }
          toggleLado={ props.toggleLado }
        />
      </Row>
    </Container>
  )
}

const ExibirQuarteiroes = ( { rota_equipe, fl_loading, indexEquipe, indexMembro, equipes, toggleLado, ...props } ) => {
  if( fl_loading ) {
    return <Loading element="#list-quarteirao" />;
  } else if( rota_equipe.length == 0 ) {
    return (
      <div className="info-empty text-muted">
        <p>Não existe nenhum quarteirão planejado para sua equipe</p>
      </div>
    );
  } else {
    return rota_equipe.map( ( quarteirao, indexQuarteirao ) => (
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
                        toggleLado( indexQuarteirao, indexLado )
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
    ) );
  }
};

const mapStateToProps = state => ( {
  usuario     : state.appConfig.usuario,
  equipes     : state.atividade.equipes,
  rota_equipe : state.atividade.rota_equipe,
  indexEquipe : state.atividade.indexEquipe,
  indexMembro : state.atividade.indexMembro,
  reload      : state.atividade.reload,
  fl_loading  : state.atividade.fl_loading,
} );

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
