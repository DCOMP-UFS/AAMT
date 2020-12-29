import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaChartPie, FaSearch } from 'react-icons/fa';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { tipoImovel as tipoImovelEnum } from '../../../../config/enumerate';
import { tipoRecipiente as tipoRecipienteEnum } from '../../../../config/enumerate';
import Pie from '../../../../components/Charts/Pie';
import Bar from '../../../../components/Charts/Bar';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarAgente';
import { getInspectsRequest } from '../../../../store/actions/VistoriaActions';

// STYLES
import { Color, Button } from '../../../../styles/global';
import { PageIcon, PageHeader, PagePopUp, NumberDash } from '../../../../styles/util';

function Agent_metrics({ usuario, vistorias, ...props }) {
  const [ tabKey, setTabKey] = useState('relatorio');
  const [ imoveisTipoData, setImoveisTipoData ] = useState({
    labels: Object.entries( tipoImovelEnum ).map(([ key, value ]) => ( value.sigla ) ),
    reload: false,
    datasets: [{
      data: [ 0, 0, 0, 0 ],
      backgroundColor: [
        Color.chartColor[1][0],
        Color.chartColor[2][0],
        Color.chartColor[3][0],
        Color.chartColor[4][0]
      ],
      borderColor: [
        Color.chartColor[1][1],
        Color.chartColor[2][1],
        Color.chartColor[3][1],
        Color.chartColor[4][1]
      ],
      borderWidth: 1
    }]
  });
  const [ numeroImoveisData, setNumeroImoveisData ] = useState({
    labels: [ 'Tratados', 'Inspecionados', 'Recuperados' ],
    reload: false,
    datasets: [{
      data: [ 0, 0, 0 ],
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
  });
  const [ depositosTipoData, setDepositosTipoData ] = useState({
    labels: tipoRecipienteEnum,
    reload: false,
    datasets: [{
          //  A1 A2 B  C  D1 D2 E  TOTAL
      data: [ 0, 0, 0, 0, 0, 0, 0 ],
      backgroundColor: [
        Color.chartColor[0][0],
        Color.chartColor[1][0],
        Color.chartColor[2][0],
        Color.chartColor[3][0],
        Color.chartColor[4][0],
        Color.chartColor[5][0],
        Color.chartColor[6][0],
        Color.chartColor[0][0]
      ],
      borderColor: [
        Color.chartColor[0][1],
        Color.chartColor[1][2],
        Color.chartColor[2][3],
        Color.chartColor[3][4],
        Color.chartColor[4][5],
        Color.chartColor[5][6],
        Color.chartColor[6][7],
        Color.chartColor[0][8]
      ],
      borderWidth: 1
    }]
  });
  const [ qtdRecusa, setQtdRecusa ] = useState( 0 );
  const [ qtdFechada, setQtdFechada ] = useState( 0 );
  const [ qtdAmostra, setQtdAmostra ] = useState( 0 );
  const [ qtdDepositoTratado, setQtdDepositoTratado ] = useState( 0 );
  const [ qtdTratamentoGrama, setQtdTratamentoGrama ] = useState( 0 );
  const [ qtdDepositoEliminado, setQtdDepositoEliminado ] = useState( 0 );
  const [ totalDepositos, setTotalDepositos ] = useState( 0 );

  useEffect(() => {
    props.changeSidebar( 3, 1 );
    props.getInspectsRequest( usuario.id );
  }, []);

  useEffect(() => {
    filter();
  }, [ vistorias, props.reload ]);

  function filter() {
    let itData = imoveisTipoData;
    let niData = numeroImoveisData;
    let dtData = depositosTipoData;
    let qtdR = qtdRecusa;
    let qtdF = qtdFechada;
    let qtdA = qtdAmostra;
    let qtdDepTrat = qtdDepositoTratado;
    let qtdDepElim = qtdDepositoEliminado;
    let qtdTratGrama = qtdTratamentoGrama;
    let totalDep = totalDepositos;

    let filter_vistorias = vistorias.filter( vistoria => {
      return true;
    });

    filter_vistorias.forEach( ( vistoria, index ) => {
      switch ( vistoria.imovel.tipoImovel ) {
        case tipoImovelEnum.residencial.id:// residencial
          itData.datasets[ 0 ].data[ 0 ]++;
          break;
        case tipoImovelEnum.terrenoBaldio.id:
          itData.datasets[ 0 ].data[ 1 ]++;
          break;
        case tipoImovelEnum.comercial.id:
          itData.datasets[ 0 ].data[ 2 ]++;
          break;
        default:// pontoEstrategico
          itData.datasets[ 0 ].data[ 3 ]++;
          break;
      }

      totalDep += vistoria.depositos.length;

      let fl_tratado = false;
      vistoria.depositos.forEach( d => {
        qtdA += d.amostras.length;
        if( d.fl_tratado ){
          fl_tratado = true;
          qtdDepTrat++;

          qtdTratGrama += d.tratamentos[ 0 ].quantidade;
        }

        if( d.fl_eliminado ) qtdDepElim++;

        switch ( d.tipoRecipiente ) {
          case "A1":
            dtData.datasets[ 0 ].data[ 0 ]++;
            break;
          case "A2":
            dtData.datasets[ 0 ].data[ 1 ]++;
            break;
          case "B":
            dtData.datasets[ 0 ].data[ 2 ]++;
            break;
          case "C":
            dtData.datasets[ 0 ].data[ 3 ]++;
            break;
          case "D1":
            dtData.datasets[ 0 ].data[ 4 ]++;
            break;
          case "D2":
            dtData.datasets[ 0 ].data[ 5 ]++;
            break;

          default:// E
            dtData.datasets[ 0 ].data[ 6 ]++;
            break;
        }
      });

      if( fl_tratado ) niData.datasets[ 0 ].data[ 0 ]++;
      if( vistoria.situacaoVistoria === "N" ) niData.datasets[ 0 ].data[ 1 ]++;
      else niData.datasets[ 0 ].data[ 2 ]++;

      if( vistoria.pendencia === "F" ) qtdF++;
      else if( vistoria.pendencia === "R" ) qtdR++;
    });

    itData.reload = !itData.reload;
    niData.reload = !niData.reload;
    dtData.reload = !depositosTipoData.reload;
    setImoveisTipoData( itData );
    setNumeroImoveisData( niData );
    setDepositosTipoData( dtData );
    setQtdFechada( qtdF );
    setQtdRecusa( qtdR );
    setQtdAmostra( qtdA );
    setQtdDepositoTratado( qtdDepTrat );
    setQtdDepositoEliminado( qtdDepElim );
    setQtdTratamentoGrama( qtdTratGrama );
    setTotalDepositos( totalDep );
  };

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Meus Índices
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <Row>
                <Col className="mb-2">
                  <h4 className="d-inline">Filtrar</h4>

                  <Button
                    className="float-right"
                    type="button"
                    onClick={ () => console.log( "Submit" ) }>
                    <FaSearch className="btn-icon" />
                    Buscar
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col md="8" className="form-group">
                  <label>Período</label>
                  <Row>
                    <Col>
                      <input
                        name="data_inicio"
                        type="date"
                        className="form-control" />
                    </Col>
                    <Col>
                      <input
                        name="data_fim"
                        type="date"
                        className="form-control" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </PagePopUp>
        </Row>
        <Row>
          <Col className="pt-40">
            <Tabs
              className="nav-page"
              activeKey={ tabKey }
              onSelect={ k => setTabKey( k ) }
            >
              <Tab eventKey="relatorio" title="Índices">
                <Row>
                  <Col md="6">
                    <article className="p-0">
                      <div className="card">
                        <h2 className="title">Nº imóveis trabalhados por tipo</h2>
                        <Pie data={ imoveisTipoData } />
                      </div>
                    </article>
                  </Col>
                  <Col md="6">
                    <article className="p-0">
                      <div className="card">
                        <h2 className="title">Nº imóveis</h2>
                        <Bar data={ numeroImoveisData } />
                      </div>
                    </article>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    <article style={{ height: '100%', padding: '0 0 30px' }}>
                      <div className="card h-100">
                        <h2 className="title">Nº Depósitos Inspecionados, por tipo</h2>
                        <Bar data={ depositosTipoData } />
                      </div>
                    </article>
                  </Col>
                  <Col md="4">
                    <article className="p-0">
                      <div className="card">
                        <Row>
                          <NumberDash className="col border-r margin-b">
                            <h4 className="legend">Recusas</h4>
                            <h2>{ qtdRecusa }</h2>
                          </NumberDash>
                          <NumberDash className="col margin-b">
                            <h4 className="legend">Fechados</h4>
                            <h2>{ qtdFechada }</h2>
                          </NumberDash>
                        </Row>
                        <Row>
                          <NumberDash className="col">
                            <h4 className="legend">Nº Amostras Coletadas</h4>
                            <h2>{ qtdAmostra }</h2>
                          </NumberDash>
                        </Row>
                      </div>
                    </article>
                    <article className="p-0">
                      <div className="card">
                        <h2 className="title">Nº Depósitos Tratados</h2>
                        <Row>
                          <NumberDash className="col border-r margin-b">
                            <h4 className="legend">Eliminados</h4>
                            <h2>{ qtdDepositoEliminado }</h2>
                          </NumberDash>
                          <NumberDash className="col margin-b">
                            <h4 className="legend">Tratados</h4>
                            <h2>{ qtdDepositoTratado }</h2>
                          </NumberDash>
                        </Row>
                        <Row>
                          <NumberDash className="col border-r margin-b">
                            <h4 className="legend">Total dep.</h4>
                            <h2>{ totalDepositos }</h2>
                          </NumberDash>
                          <NumberDash className="col">
                            <h4 className="legend">Qtde (Gramas)</h4>
                            <h2>{ qtdTratamentoGrama } g</h2>
                          </NumberDash>
                        </Row>
                      </div>
                    </article>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  vistorias: state.vistoria.vistorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getInspectsRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Agent_metrics );