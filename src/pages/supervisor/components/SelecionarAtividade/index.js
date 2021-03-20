import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PopDescription from '../../../../components/PopDescription';
import { Row, Col } from 'react-bootstrap';
import { responsabilidadeAtividadeEnum as responsabilidadeEnum, abrangenciaEnum } from '../../../../config/enumerate';

// ACTIONS
import { setEquipes, setIndexAtividade } from '../../../../store/Atividade/atividadeActions';

// STYLES
import { Container, AtividadeCard } from './styles';

export const SelecionarAtividade = ({ indexAtividade, atividades, ...props }) => {
  const handleAtividade = ( equipes, index ) => {
    props.setEquipes( equipes );
    props.setIndexAtividade( index );
  }

  return (
    <Container>
      <Row>
        <Col md="12">
          <h4 className="title">
            Selecione a Atividade
            <PopDescription
              title="Selecione a Atividade"
              placement="right"
              content="Selecione uma atividade para visualizar as equipes de sua responsabilidade e planejar as rotas de trabalho."
            />
          </h4>
        </Col>
        <Col>
          {
            atividades.map( ( atividade, index ) => {
              return (
                <AtividadeCard
                  key={ atividade.id }
                  className={ `col-12 col-sm-6 col-md-4 p-0 ${ indexAtividade === index ? 'active' : '' }` }
                  onClick={ () => handleAtividade( atividade.equipes, index ) }
                >
                  <div className="ca-header">
                    <h4 className="ca-title">{ atividade.metodologia.sigla }</h4>
                    <span className="ca-sub-title">{ atividade.objetivo.sigla }</span>
                  </div>
                  <hr/>
                  <div className="ca-info">
                    <div className="ca-label">Trabalhar todos imóveis</div>
                    <div className="ca-value">{ atividade.flTodosImoveis ? 'Sim' : 'Não' }</div>
                  </div>
                  <div className="ca-info">
                    <div className="ca-label">Abrangência</div>
                    <div className="ca-value">
                      {
                        abrangenciaEnum.find( a => a.id === atividade.abrangencia ).label
                      }
                    </div>
                  </div>
                  <div className="ca-info">
                    <div className="ca-label">Responsabilidade</div>
                    <div className="ca-value">
                      {
                        responsabilidadeEnum.find( r => r.id === atividade.responsabilidade ).label
                      }
                    </div>
                  </div>
                  <div className="ca-row-info">
                    <div className="ca-label">Objetivo da Atividade</div>
                    <div className="ca-value">{ atividade.objetivoAtividade }</div>
                  </div>
                </AtividadeCard>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  atividades: state.nw_atividade.atividades,
  indexAtividade: state.nw_atividade.indexAtividade
})

const mapDispatchToProps = {
  setEquipes,
  setIndexAtividade
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelecionarAtividade)
