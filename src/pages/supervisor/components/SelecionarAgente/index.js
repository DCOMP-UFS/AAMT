import React from 'react';
import { connect } from 'react-redux';
import PopDescription from '../../../../components/PopDescription';
import { Row, Col } from 'react-bootstrap';
import { FaUsers, FaUser } from 'react-icons/fa';

// ACTIONS
import { setIndexEquipe, setIndexMembro } from '../../../../store/Atividade/atividadeActions';

// STYLES
import { Container, EquipeCard } from './styles';

export const SelecionarAgente = ({ equipes, ...props }) => {
  const handlerMembro = ( indexEquipe, indexMembro ) => {
    props.setIndexEquipe( indexEquipe );
    props.setIndexMembro( indexMembro );
  };

  return (
    <Container>
      <Row>
        <Col md="12">
          <h4 className="title">
            Selecione um Agente
            <PopDescription
              title="Selecione Agente"
              placement="right"
              content="Selecione um agente para planejar a rota de trabalho."
            />
          </h4>
        </Col>
      </Row>
      <Row>
        {
          equipes.map( ( equipe, indexEquipe ) => (
            <Col key={ 'eq_' + equipe.id } className="col-12 col-sm-6 col-md-4">
              <EquipeCard>
                <div className="ag-header">
                  <FaUsers className="icon icon-md" />
                  <input
                    type="text"
                    placeholder={ equipe.apelido ? '' : 'Equipe' }
                  />
                </div>
                <div className="ag-body">
                  <ul className="lista-membros">
                    {
                      equipe.membros.map( ( membro, indexMembro ) => (
                        <li
                          key={ "membro_" + membro.usuario_id }
                          className={
                            `membro ${ (indexEquipe === props.indexEquipe && indexMembro === props.indexMembro) ? 'active' : '' }`
                          }
                          onClick={ () => handlerMembro( indexEquipe, indexMembro ) }
                        >
                          <div className="foto">
                            <FaUser />
                          </div>
                          <div className="perfil">
                            <span>{ membro.usuario.nome }</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </EquipeCard>
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  equipes: state.nw_atividade.equipes,
  indexEquipe: state.nw_atividade.indexEquipe,
  indexMembro: state.nw_atividade.indexMembro
})

const mapDispatchToProps = {
  setIndexEquipe,
  setIndexMembro
}

export default connect(mapStateToProps, mapDispatchToProps)(SelecionarAgente)
