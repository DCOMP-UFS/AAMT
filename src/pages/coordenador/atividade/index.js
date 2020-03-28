/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IoIosPaper } from 'react-icons/io';
import { Row } from 'react-bootstrap';
import Select from 'react-select';
import { situacaoAtividade } from '../../../config/enumerate';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';
import { getAllowedCyclesRequest } from '../../../store/actions/CicloActions';
import { getActivitiesByCityRequest } from '../../../store/actions/AtividadeActions';

// STYLES
import { ContainerAtividade, ContainerCiclo } from './styles';
import { FormGroup, selectDefault } from '../../../styles/global';
import { InfoGroup, PagePopUp, PageIcon, PageHeader } from '../../../styles/util';

function PlanejarAtividade({ ciclos, atividades, ...props }) {
  const [ ciclo, setCiclo ] = useState({});
  const [ situacaoCiclo, setSituacaoCiclo ] = useState({});
  const [ optionCiclo, setOptionCiclo ] = useState({});

  useEffect(() => {
    props.changeSidebar(1, 1);
    props.getAllowedCyclesRequest( props.regionalSaude_id );
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
        setCiclo({ value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }` });

      return (
        { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }`, dataInicio, dataFim }
      );
    });

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    props.getActivitiesByCityRequest( ciclo.value, props.municipio_id );

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
          Atividades
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <ContainerCiclo>
                <FormGroup className="w-25 m-0 inline">
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
              </ContainerCiclo>
            </div>
          </PagePopUp>
        </Row>

        <Row>
          {
            atividades.map( (atv, index) => {
              return (
                <ContainerAtividade
                  key={ index }
                  className="theme-article col-md-4 stretch-card"
                  onClick={
                    () => {
                      switch( atv.situacao ) {
                        case situacaoAtividade.aberta.id:
                          window.location = `${ window.location.origin.toString() }/coord/atividades/planejamento/${ atv.id }`;
                          break;
                        default:
                          break;
                      }
                    }
                  }
                >
                  <div className="card">
                    <h4 className="title mb-4">
                      Atividade <mark className="bg-primary text-white">{ atv.id }</mark>
                    </h4>

                    <InfoGroup>
                      <label>Metodologia</label>
                      <p>{ atv.metodologia.sigla }</p>
                    </InfoGroup>

                    <InfoGroup>
                      <label>Objetivo</label>
                      <p>{ atv.objetivo.descricao }</p>
                    </InfoGroup>

                    <InfoGroup>
                      <label>Responsabilidade</label>
                      <p>{ atv.responsabilidade === 1 ? "Regional" : "Municipal" }</p>
                    </InfoGroup>
                  </div>
                </ContainerAtividade>
              );
            })
          }
        </Row>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  regionalSaude_id: state.appConfig.usuario.municipio.regional.id,
  municipio_id: state.appConfig.usuario.municipio.id,
  atividades: state.atividade.atividades,
  ciclos: state.ciclo.ciclos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getAllowedCyclesRequest,
    getActivitiesByCityRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( PlanejarAtividade )
