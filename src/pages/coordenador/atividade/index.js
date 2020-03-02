/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';
import { getAllowedCyclesRequest } from '../../../store/actions/CicloActions';
import { getActivitiesByCityRequest } from '../../../store/actions/AtividadeActions';

// STYLES
import { ContainerAtividade } from './styles';
import { FormGroup, selectDefault } from '../../../styles/global';
import { InfoGroup } from '../../../styles/util';

function PlanejarAtividade({ ciclos, atividades, ...props }) {
  const [ ciclo, setCiclo ] = useState({});
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
        { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }` }
      );
    });

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    props.getActivitiesByCityRequest( ciclo.value, props.municipio_id );
  }, [ ciclo ]);

  // useEffect(() => {
  //   console.log(atividades);
  // }, [ atividades ]);

  return (
    <section className="card-list">
      <Row>
        <Col>
          <FormGroup className="col-3">
            <label>Ciclo <code>*</code></label>
            <Select
              id="ciclo"
              value={ ciclo }
              styles={ selectDefault }
              options={ optionCiclo }
              onChange={ e => setCiclo( e ) }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        {
          atividades.map( (atv, index) => {
            return (
              <ContainerAtividade key={ index } className="theme-article col-md-4 stretch-card" >
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
