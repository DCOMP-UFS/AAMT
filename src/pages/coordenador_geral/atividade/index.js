/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { IoIosPaper } from 'react-icons/io';
import Select from 'react-select';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarCoordGeral';
import { getActivitiesOfCityRequest } from '../../../store/actions/AtividadeActions';

// STYLES
import {
  DescricaoAtividade,
  ObjetivoAtividade,
  Nomenclatura,
  UlHorizontal,
  LiH,
  CardBodyInfo
} from './styles';
import { FormGroup, selectDefault } from '../../../styles/global';
import {
  InfoGroup,
  UlIcon,
  LiIcon,
  ContainerUl,
  LiEmpty,
  PageIcon,
  PageHeader,
  PagePopUp
} from '../../../styles/util';

function ConsultarAtividades({ atividades, ...props }) {
  useEffect(() => {
    props.changeSidebar(2, 1);
    props.getActivitiesOfCityRequest( props.regionalSaude_id );
  }, []);

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><IoIosPaper /></PageIcon>
          Atividades por Municípios
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <CardBodyInfo>
                <FormGroup className="w-25 m-0 inline">
                  <label htmlFor="ciclo">Ciclo</label>
                  <Select
                    id="ciclo"
                    styles={ selectDefault }
                  />
                </FormGroup>

                <Nomenclatura>
                  <div>
                    <label>Responsabilidade</label>
                    <UlHorizontal>
                      <LiH>
                        <span>
                          <mark className="bg-info text-white">R</mark> - Regional
                        </span>
                      </LiH>
                      <LiH>
                        <span>
                          <mark className="ml-2 bg-info text-white">M</mark> - Municipal
                        </span>
                      </LiH>
                    </UlHorizontal>
                  </div>
                  <div>
                    <label>Situação da atividade</label>
                    <UlHorizontal>
                      <LiH>
                        <span>
                          <mark className="bg-info text-white">A</mark> - Em aberto
                        </span>
                      </LiH>
                      <LiH>
                        <span>
                          <mark className="ml-2 bg-success text-white">C</mark> - Concluída
                        </span>
                      </LiH>
                      <LiH>
                        <span>
                          <mark className="ml-2 bg-danger text-white">N</mark> - Não Concluída
                        </span>
                      </LiH>
                    </UlHorizontal>
                  </div>
                </Nomenclatura>
              </CardBodyInfo>
            </div>
          </PagePopUp>
        </Row>

        <Row>
          {
            atividades.map( (municipio, index) => (
              <CardAtividades key={ index } municipio={ municipio } />
            ))
          }
        </Row>
      </section>
    </>
  );
}

function CardAtividades({ municipio }) {
  let list = municipio.atividades.map( (atv, index) => {
    let responsabilidade = "";
    let situacao = "";
    let classMark = "";

    switch ( atv.situacao ) {
      case 1: // Em aberto
        classMark = "bg-info text-white";
        situacao = "A";
        break;

      case 2: // Concluída
        classMark = "bg-success text-white";
        situacao = "C";
        break;

      default: // Não concluída
        classMark = "bg-danger text-white";
        situacao = "N";
        break;
    }

    switch ( atv.responsabilidade ) {
      case 1:
        responsabilidade = "R";
        break;

      default:
        responsabilidade = "M";
        break;
    }

    return (
      <LiIcon
        key={ index }
        onClick={
          () => {
            window.location = `${ window.location.origin.toString() }/cg/atividades/${ atv.id }`
          }
        }
      >
        <ContainerUl>
          <DescricaoAtividade>
            <div style={{ flex: "3" }}>
              <span className="mr-2">{ atv.metodologia.sigla }</span>
              <ObjetivoAtividade>{ atv.objetivo.descricao }</ObjetivoAtividade>
            </div>
            <div>
              <mark className="ml-2 bg-info text-white">{ responsabilidade }</mark>
              <mark className={`ml-2 ${ classMark }`}>{ situacao }</mark>
            </div>
          </DescricaoAtividade>
        </ContainerUl>
      </LiIcon>
    )
  });

  if( list.length === 0 ) {
    list = <LiEmpty className="p-2"><h4 className="title w-100 text-center m-0">Nenhuma atividade cadastrada</h4></LiEmpty>
  }

  return(
    <Col sm="4" className="p-0">
      <article>
        <div className="card">
          <h4 className="title mb-4">
            { municipio.nome } <mark className="bg-primary text-white">{ municipio.codigo }</mark>
          </h4>

          <InfoGroup>
            <label>Atividades</label>
            <UlIcon style={{ maxHeight: "200px", minHeight: "200px" }}>
              { list }
            </UlIcon>
          </InfoGroup>
        </div>
      </article>
    </Col>
  );
}

const mapStateToProps = state => ({
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  atividades: state.atividade.atividades
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getActivitiesOfCityRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ConsultarAtividades )
