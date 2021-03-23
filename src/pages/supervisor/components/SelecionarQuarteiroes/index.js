import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PopDescription from '../../../../components/PopDescription';
import Checkbox from '@material-ui/core/Checkbox';
import { FaUser } from 'react-icons/fa';
import Loading from '../../../../components/Loading';

// ACTIONS
import { toggleLado } from '../../../../store/Atividade/atividadeActions';

// STYLES
import { Container, Block, Usuario, Avatar } from './styles';

export const SelecionarQuarteiroes = ({ indexEquipe, indexMembro, equipes, ...props }) => {
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
      <Row id="list-quarteirao" style={{ minHeight: '500px', maxHeight: '500px', overflow: 'auto' }}>
        {
          // !fl_consultando_rotas ?
          !true ?
            <Loading element="#list-quarteirao" /> :
            indexEquipe > -1 ?
              equipes[ indexEquipe ].quarteiroes.map( ( quarteirao, indexQuarteirao ) => (
                <Col key={ "qrt_" + quarteirao.id } xs="12" sm="6">
                  <Block >
                    <label>Quarteirão: Nº { quarteirao.numero }</label>

                    <ul className="sides">
                      {
                        quarteirao.lados.map( ( lado, indexLado ) => (
                          <li
                            key={ "lado_" + lado.id }
                            onClick={ () => props.toggleLado( indexQuarteirao, indexLado ) }
                          >
                            <Checkbox
                              color="primary"
                              className="p-0 pr-2"
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                              checked={ lado.selected ? lado.selected : false }
                            />
                            { lado.rua.nome }
                          </li>
                        ))
                      }
                    </ul>
                  </Block>
                </Col>
              )) :
              ''
        }
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  equipes: state.nw_atividade.equipes,
  indexEquipe: state.nw_atividade.indexEquipe,
  indexMembro: state.nw_atividade.indexMembro,
  reload: state.nw_atividade.reload,
});

const mapDispatchToProps = {
  toggleLado
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SelecionarQuarteiroes );
