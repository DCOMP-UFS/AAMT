/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { IoIosPaper } from 'react-icons/io';
import Select from 'react-select';
import cityIcon from '../../assets/city-icon.png';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getActivitiesOfCityRequest } from '../../store/Atividade/atividadeActions';
import { getAllowedCyclesRequest } from '../../store/Ciclo/cicloActions';

// STYLES
import {
  DescricaoAtividade,
  ObjetivoAtividade,
  Nomenclatura,
  UlHorizontal,
  LiH,
  CardBodyInfo,
  ContainerAtividade,
  Header,
  Body
} from './styles';
import { FormGroup, selectDefault } from '../../styles/global';
import {
  InfoGroup,
  UlIcon,
  LiIcon,
  ContainerUl,
  LiEmpty,
  PageIcon,
  PageHeader,
  PagePopUp
} from '../../styles/util';

const AtividadesRegConsultar = ({ ciclos, atividades, regionalSaude_id, ...props }) => {
  const [ ciclo, setCiclo ] = useState({});
  const [ situacaoCiclo, setSituacaoCiclo ] = useState({});
  const [ optionCiclo, setOptionCiclo ] = useState({});

  useEffect(() => {
    props.changeSidebar( "atividade", "at_consultar" );
    props.getActivitiesOfCityRequest( regionalSaude_id );
    props.getAllowedCyclesRequest( regionalSaude_id );
  }, []);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => {
      let current_date = new Date();
      let dataInicio = new Date( ciclo.dataInicio );
      let dataFim = new Date( ciclo.dataFim );
      current_date.setHours(0,0,0,0);
      dataInicio.setHours(0,0,0,0);
      dataFim.setHours(0,0,0,0);

      if( dataInicio <= current_date && dataFim >= current_date )
        setCiclo({ value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }`, dataInicio, dataFim });

      return (
        { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }`, dataInicio, dataFim }
      );
    });

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    // props.getActivitiesByCityRequest( ciclo.value, props.municipio_id );

    let current_date = new Date();
    current_date.setHours(0,0,0,0);

    if( ciclo.dataInicio > current_date )
      setSituacaoCiclo({ situacao: "Planejado", class: "bg-warning text-white ml-3" });
    else if( ciclo.dataFim < current_date )
      setSituacaoCiclo({ situacao: "Finalizado", class: "bg-info text-white ml-3" });
    else
      setSituacaoCiclo({ situacao: "Em aberto", class: "bg-info text-white ml-3" });
  }, [ ciclo ]);

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
          <PagePopUp className="w-100" style={{ paddingTop: 15, paddingBottom: 40, paddingRight: 15, paddingLeft: 15 }}>
            <div className="card">
              <CardBodyInfo>
                <div className="d-flex flex-grow-1 align-items-center">
                  <FormGroup className="w-50 m-0 mr-2 inline">
                    <label htmlFor="ciclo">Ciclo</label>
                    <Select
                      id="ciclo"
                      value={ ciclo }
                      styles={ selectDefault }
                      options={ optionCiclo }
                      onChange={ e => setCiclo( e ) }
                    />
                  </FormGroup>
                  <mark className={ situacaoCiclo.class }>{ situacaoCiclo.situacao }</mark>
                </div>

                <Nomenclatura>
                  <div>
                    <label>Responsabilidade</label>
                    <UlHorizontal>
                      <LiH>
                        <span>
                          <mark className="bg-primary text-white">R</mark> - Regional
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
                          <mark className="bg-warning text-white">A</mark> - Em aberto
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
    let classMarkResp = "";
    let responsabilidade = "";
    let situacao = "";
    let classMark = "";

    switch ( atv.situacao ) {
      case 1: // Em aberto
        classMark = "bg-warning text-white";
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
        classMarkResp = "bg-primary";
        responsabilidade = "R";
        break;

      default:
        classMarkResp = "bg-info";
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
              <mark className={`ml-2 ${ classMarkResp } text-white`}>{ responsabilidade }</mark>
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
    <ContainerAtividade className="theme-article col-md-4 stretch-card">
      <div className="card-atividade">
        <Header>
          <div className="icon">
            <img src={ cityIcon } width="35" alt=""/>
          </div>
          <div className="info">
            <h4 className="title">{ municipio.nome }</h4>
          </div>
        </Header>
        <Body>
          <InfoGroup>
            <label>Atividades</label>
            <UlIcon className="list-hover" style={{ maxHeight: "200px", minHeight: "200px" }}>
              { list }
            </UlIcon>
          </InfoGroup>
        </Body>
      </div>
    </ContainerAtividade>
  );
}

const mapStateToProps = state => ({
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  atividades      : state.atividade.atividades,
  ciclos          : state.ciclo.ciclos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getActivitiesOfCityRequest,
    getAllowedCyclesRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AtividadesRegConsultar );
