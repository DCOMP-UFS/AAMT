/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { IoIosPaper } from 'react-icons/io';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarCoordGeral';
import { getActivitiesOfCityRequest } from '../../../store/actions/AtividadeActions';

// STYLES
import { DescricaoAtividade, ObjetivoAtividade } from './styles';
import {
  InfoGroup,
  UlIcon,
  LiIcon,
  ContainerUl,
  LiEmpty,
  PageIcon,
  PageHeader
} from '../../../styles/util';

function PlanejarAtividade({ atividades, ...props }) {
  useEffect(() => {
    props.changeSidebar(2, 1);
    props.getActivitiesOfCityRequest( props.regionalSaude_id );
  }, []);

  useEffect(() => {
    console.log(atividades);

  }, [atividades]);

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
    let classLi = "";

    switch ( atv.situacao ) {
      case 1:
        classLi = "";
        break;

      case 2:
        classLi = "bg-success text-white";
        break;

      default:
        classLi = "bg-danger text-white";
        break;
    }

    switch ( atv.responsabilidade ) {
      case 1:
        responsabilidade = "Regional";
        break;

      default:
        responsabilidade = "Municipal";
        break;
    }

    return (
      <LiIcon key={ index } className={ classLi } >
        <ContainerUl>
          <DescricaoAtividade>
            <div style={{ flex: "3" }}>
              <span className="mr-2">{ atv.metodologia.sigla }</span>
              <ObjetivoAtividade>{ atv.objetivo.descricao }</ObjetivoAtividade>
            </div>
            <div>
              <mark className="ml-2 bg-info text-white">{ responsabilidade }</mark>
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
            <UlIcon style={{ maxHeight: "250px" }}>
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
)( PlanejarAtividade )
