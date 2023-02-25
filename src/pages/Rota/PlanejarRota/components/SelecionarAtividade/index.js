import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PopDescription from '../../../../../components/PopDescription';
import { Row, Col } from 'react-bootstrap';
import { responsabilidadeAtividadeEnum as responsabilidadeEnum, abrangenciaEnum } from '../../../../../config/enumerate';
import  ModalEncerrarAtividade  from '../ModalEncerrarAtividade';
import { Button } from '../../../../../styles/global';
import $ from 'jquery';

// ACTIONS
import { setEquipes, setIndexAtividade, setIndexEquipe, setIndexMembro } from '../../../../../store/Atividade/atividadeActions';

// STYLES
import { Container, AtividadeCard } from './styles';

export const SelecionarAtividade = ({ indexAtividade, atividades, ...props }) => {

  const [ idAtividadeEncerrar, setIdAtividadeEncerrar ] = useState( -1 );

  const handleAtividade = ( equipes, index ) => {
    props.setEquipes( equipes );
    props.setIndexAtividade( index );
    props.setIndexEquipe( -1 )
    props.setIndexMembro( -1 )
  }

  //Abre o modal "ModalEncerrarAtividade"
  //tambem seta o id da atividade que será encerrada
  function abrirModalEncerrarAtividade(id) {
    setIdAtividadeEncerrar(id)
    $('#modal-encerrar-atividade').modal('show');
  }

  function permitirEncerramneto(atividade){
    //A atividade ja está encerrada
    if(atividade.situacao == 3)
      return false
    
    //flTodosImoveis indica se a atividade deve vistoriar todos os imoveis ou não
    //caso seja falso, significa que o supervisor pode encerrar a atividade quando achar
    //que um numero suficiente de imoveis foram vistoriados
    if(!atividade.flTodosImoveis)
      return true
    
    return false
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
        {
          atividades.map( ( atividade, index ) => {
            return (
              <Col md="6" sm="6" xs="12">
                <AtividadeCard
                  key={ atividade.id }
                  className={ indexAtividade === index ? 'active' : '' }
                  onClick={ () => handleAtividade( atividade.equipes, index ) }
                >
                  <Row>
                    <Col>
                      <div className="ca-header">
                        <h4 className="ca-title">{ atividade.metodologia.sigla }</h4>
                        <span className="ca-sub-title">{ atividade.objetivo.sigla }</span>
                      </div>
                    </Col>
                    <Col>
                      <div className={atividade.situacao == 3 ? "ca-header" : "d-none"}>
                        <h2>
                          <code>Encerrado</code>
                        </h2>
                      </div>
                    </Col>
                  </Row>
                  <hr/>
                  <div className="ca-info">
                    <div className="ca-label font-weight-bold">Código:</div>
                    <div className="ca-value">{ atividade.id }</div>
                  </div>
                  <div className="ca-info">
                    <div className="ca-label font-weight-bold">Trabalhar todos imóveis:</div>
                    <div className="ca-value">{ atividade.flTodosImoveis ? 'Sim' : 'Não' }</div>
                  </div>
                  <div className="ca-info">
                    <div className="ca-label font-weight-bold">Abrangência:</div>
                    <div className="ca-value">
                      {
                        abrangenciaEnum.find( a => a.id === atividade.abrangencia ).label
                      }
                    </div>
                  </div>
                  <div className="ca-info">
                    <div className="ca-label font-weight-bold">Responsabilidade:</div>
                    <div className="ca-value">
                      {
                        responsabilidadeEnum.find( r => r.id === atividade.responsabilidade ).label
                      }
                    </div>
                  </div>
                  <div className="ca-row-info">
                    <div className="ca-label font-weight-bold">Objetivo da Atividade</div>
                    <div className="ca-value">{ atividade.objetivoAtividade }</div>
                  </div>
                  <div className={permitirEncerramneto(atividade) ? "ca-row-info" : "d-none"}>
                      <Button
                          className="bg-info text-white"
                          onClick={ () =>  abrirModalEncerrarAtividade(atividade.id)}
                      >
                        Encerrar
                      </Button>
                  </div>
                </AtividadeCard>
              </Col>
            )
          })
        }
      </Row>
      <ModalEncerrarAtividade id='modal-encerrar-atividade' atividadeId = {idAtividadeEncerrar}/>
    </Container>
  )
}

const mapStateToProps = state => ({
  atividades    : state.atividade.atividades,
  indexAtividade: state.atividade.indexAtividade
})

const mapDispatchToProps = {
  setEquipes,
  setIndexAtividade,
  setIndexEquipe,
  setIndexMembro,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelecionarAtividade)
