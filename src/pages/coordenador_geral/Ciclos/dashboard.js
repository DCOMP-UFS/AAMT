/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Doughnut from '../../../components/Charts/Doughnut';
import { Card, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { FaSyncAlt } from 'react-icons/fa';


// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarCoordGeral';
import { getCyclesForYearRequest } from '../../../store/actions/CicloActions';

// STYLES
import { Container } from './styles';
import { Color, FormGroup, selectDefault } from '../../../styles/global';
import { PagePopUp, PageIcon, PageHeader } from '../../../styles/util';

function DashBoardCiclo({ ciclos, regional_id, ...props }) {
  useEffect(() => {
    props.changeSidebar(1, 1);
    props.getCyclesForYearRequest( regional_id, "2020" );
  }, []);

  useEffect(() => {
  }, [ ciclos ]);

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaSyncAlt /></PageIcon>
          Dashboard Ciclos
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <div className="d-flex align-content">
                <FormGroup className="w-25 m-0 inline">
                  <label htmlFor="ano">Ano</label>
                  <Select
                    id="ano"
                    styles={ selectDefault }
                  />
                </FormGroup>
              </div>
            </div>
          </PagePopUp>
        </Row>

        <Row>
          <Container>
            <ListCycle ciclos={ ciclos } />
          </Container>
        </Row>
      </section>
    </>
  );
}

function ListCycle( props ) {
  const cards = props.ciclos.map( ( ciclo, index ) => {
    let [ ano, mes, dia ] = ciclo.dataInicio.split('T')[0].split('-');
    const dataInicio = `${ dia }/${ mes }/${ ano }`;
    [ ano, mes, dia ] = ciclo.dataFim.split('T')[0].split('-');
    const dataFim = `${ dia }/${ mes }/${ ano }`;

    const atividade = ciclo.atividades.reduce((qtdAtividade, atv) => {
      switch ( atv.situacao ) {
        case 1:
          qtdAtividade[0] = qtdAtividade[0] + 1;
          break;

        case 2:
          qtdAtividade[1] = qtdAtividade[1] + 1;
          break;

        default:
          qtdAtividade[2] = qtdAtividade[2] + 1;
          break;
      }

      return qtdAtividade;
    }, [ 0, 0, 0 ]);

    const data = {
      labels: ['Atividades', 'Concluídas', 'Não Concluídas'],
      datasets: [{
        data: atividade,
        backgroundColor: [
          Color.chartColor[1][0],
          Color.chartColor[2][0],
          Color.chartColor[3][0]
        ],
        borderColor: [
          Color.chartColor[1][1],
          Color.chartColor[2][1],
          Color.chartColor[3][1]
        ],
        borderWidth: 1
      }]
    }

    return (
      <Col key={ index } sm="4">
        <Card className="text-center card-cycle">
          <Card.Body>
            <div className="text-left">
              <h4 className="title">Ciclo <mark className="mark-primary">{ `${ciclo.ano}.${ciclo.sequencia}` }</mark></h4>
              <p className="text-description">{ dataInicio } à { dataFim }</p>
            </div>
            <Doughnut data={data} />
          </Card.Body>
          <Card.Footer className="text-muted text-right">
            { atividade[1] }/{ ciclo.atividades.length } Atividade(s) Concluídos
          </Card.Footer>
        </Card>
      </Col>
    );
  });

  return (
    <Row>
      { cards }
    </Row>
  );
}

const mapStateToProps = state => ({
  regional_id: state.appConfig.usuario.regionalSaude.id,
  ciclos: state.ciclo.ciclos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getCyclesForYearRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardCiclo);
