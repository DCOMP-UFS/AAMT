import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartPie } from 'react-icons/fa';
import Bar from '../../../../components/Charts/Bar';
import { tipoImovel as tipoImovelEnum, tipoRecipiente as tipoRecipienteEnum } from '../../../../config/enumerate';
import { Row, Col } from 'react-bootstrap';

// ACTIONS
import { changeSidebar } from '../../../../store/SidebarSupervisor/sidebarSupervisorActions';
import { getBoletimSemanalRequest } from '../../../../store/Relatorio/relatorioActions';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader, InfoBox } from '../../../../styles/util';
import { Color } from '../../../../styles/global';

const initVar = {
  imoveisTipoData: {
    labels: [ 'Residência', 'Comércio', 'TB', 'PE', 'Total' ],
    reload: false,
    datasets: [{
      data: [ 0, 0, 0, 0, 0 ],
      backgroundColor: [
        Color.chartColor[ 0 ][ 0 ],
        Color.chartColor[ 1 ][ 0 ],
        Color.chartColor[ 2 ][ 0 ],
        Color.chartColor[ 3 ][ 0 ],
        Color.chartColor[ 4 ][ 0 ]
      ],
      borderColor: [
        Color.chartColor[ 0 ][ 1 ],
        Color.chartColor[ 1 ][ 1 ],
        Color.chartColor[ 2 ][ 1 ],
        Color.chartColor[ 3 ][ 1 ],
        Color.chartColor[ 4 ][ 1 ]
      ],
      borderWidth: 1
    }]
  },
  numeroImoveisData: {
    labels: [ 'Trabalhados', 'Inspecionados', 'Com Foco', 'Tratados', 'Fechados', 'Recusados', 'Recuperados' ],
    reload: false,
    datasets: [
      {
        data: [ 0, 0, 0, 0, 0, 0, 0 ],
        backgroundColor: [
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 4 ][ 0 ],
          Color.chartColor[ 5 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 4 ][ 1 ],
          Color.chartColor[ 5 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ]
        ],
        borderWidth: 1
      },
    ]
  },
  depositosTipoData: {
    labels: [ ...tipoRecipienteEnum, 'Total' ],
    reload: false,
    datasets: [{
        label: 'total',
        // A1, A2, B, C, D1, D2, E
        data: [ 0, 0, 0, 0, 0, 0, 0 ],
        backgroundColor: [
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 4 ][ 0 ],
          Color.chartColor[ 5 ][ 0 ],
          Color.chartColor[ 6 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 4 ][ 1 ],
          Color.chartColor[ 5 ][ 1 ],
          Color.chartColor[ 6 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ]
        ],
        borderWidth: 1
    }]
  }
}

export const VisualizarRelatorio = ({ boletimSemanal, ...props }) => {
  const [ imoveisTipoData, setImoveisTipoData ]           = useState( initVar.imoveisTipoData );
  const [ numeroImoveisData, setNumeroImoveisData ]       = useState( initVar.numeroImoveisData );
  const [ depositosTipoData, setDepositosTipoData ]       = useState( initVar.depositosTipoData );
  const [ qtdAgente, setQtdAgente ]                     = useState( 0 );
  const [ qtdAmostra, setQtdAmostra ]                     = useState( 0 );
  const [ qtdDepositoTratado, setQtdDepositoTratado ]     = useState( 0 );
  const [ qtdDeposito, setQtdDeposito ]                   = useState( 0 );
  const [ qtdTratamentoGrama, setQtdTratamentoGrama ]     = useState( 0 );
  const [ qtdDepositoEliminado, setQtdDepositoEliminado ] = useState( 0 );
  const [ semana, setSemana ]                             = useState( 0 );
  const [ atividade_id, setAtividade_id ]                 = useState( 0 );
  const [ ano, setAno ]                                   = useState( '' );
  const [ amostrasPorDepositos, setAmostrasPorDepositos ] = useState( [] );
  const [ amostrasPorImoveis, setAmostrasPorImoveis ]     = useState( [] );
  const [ amostrasPorExemplar, setAmostrasPorExemplar ]     = useState( [] );
  const [ quarteiroesConcluidos, setQuarteiroesConcluidos ] = useState( [] );
  const [ quarteiroesTrabalhados, setQuarteiroesTrabalhados ] = useState( [] );
  const [ quarteiroesAedesAegypti, setQuarteiroesAedesAegypti ] = useState( [] );
  const [ quarteiroesAedesAlbopictus, setQuarteiroesAedesAlbopictus ] = useState( [] );

  function sliceIntoSubArrays (array, size) {
    const res = [];
    for (let i = 0; i < array.length; i += size) {
      const sub_array = array.slice(i, i + size);
      res.push(sub_array);
    };
    return res;
  }

  useEffect(() => {
    const { semana, atividade_id, ano } = props.match.params;

    props.changeSidebar( 6, 3 );
    setSemana( semana );
    setAtividade_id( atividade_id );
    setAno( ano );
    props.getBoletimSemanalRequest( semana, atividade_id, ano );
    console.log(boletimSemanal);
  }, []);

  useEffect(() => {
    if( Object.entries( boletimSemanal ).length ) {
      setQtdTratamentoGrama( boletimSemanal.depositTreated[ 1 ].value );
      setQtdDepositoTratado( boletimSemanal.depositTreated[ 2 ].value );
      setQtdAgente( boletimSemanal.epiWeek.totalAgentes );
      setQtdDepositoEliminado( boletimSemanal.recipientDestination[ 0 ].value );
      setQtdAmostra( boletimSemanal.totalSample );
      setAmostrasPorDepositos( boletimSemanal.sampleByDeposit );
      setAmostrasPorImoveis( boletimSemanal.sampleByProperty );
      setAmostrasPorExemplar( boletimSemanal.sampleExemplary );

      const qrt_concluidos = boletimSemanal.situacao_quarteirao.concluidos;
      const qrt_trabalhados = boletimSemanal.situacao_quarteirao.trabalhados;
      const qrt_pstv_aegypti = boletimSemanal.quarteiroesPositivos.aedesAegypti;
      const qrt_pstv_albopictus = boletimSemanal.quarteiroesPositivos.aedesAlbopictus;

      setQuarteiroesTrabalhados( sliceIntoSubArrays(qrt_trabalhados, 10) );
      setQuarteiroesConcluidos( sliceIntoSubArrays(qrt_concluidos, 10) );
      setQuarteiroesAedesAegypti( sliceIntoSubArrays(qrt_pstv_aegypti, 10) );
      setQuarteiroesAedesAlbopictus( sliceIntoSubArrays(qrt_pstv_albopictus, 10) );

      let iTipoData         = imoveisTipoData,
          nImoveisData      = numeroImoveisData,
          dTipoData = depositosTipoData;

      // Imóveis trabalhados
      nImoveisData.datasets[ 0 ].data[ 0 ] = boletimSemanal.propertiesByStatus[ 0 ].value;
      // Imóveis inspecionados
      nImoveisData.datasets[ 0 ].data[ 1 ] = boletimSemanal.properties[ 0 ].value;
      // Imóveis tratados
      nImoveisData.datasets[ 0 ].data[ 3 ] = boletimSemanal.properties[ 1 ].value;
      // Imóveis fechados
      nImoveisData.datasets[ 0 ].data[ 4 ] = boletimSemanal.propertiesByPendency[ 0 ].value;
      // Imóveis recusados
      nImoveisData.datasets[ 0 ].data[ 5 ] = boletimSemanal.propertiesByPendency[ 1 ].value;
      // Imóveis recuperados
      nImoveisData.datasets[ 0 ].data[ 6 ] = boletimSemanal.propertiesByStatus[ 1 ].value;

      // Imóveis do tipo residência
      iTipoData.datasets[ 0 ].data[ 0 ] = boletimSemanal.propertiesByType[ 0 ].value;
      // Imóveis do tipo comércio
      iTipoData.datasets[ 0 ].data[ 1 ] = boletimSemanal.propertiesByType[ 2 ].value;
      // Imóveis do tipo terreno baldio
      iTipoData.datasets[ 0 ].data[ 2 ] = boletimSemanal.propertiesByType[ 1 ].value;
      // Imóveis do tipo ponto estratégico
      iTipoData.datasets[ 0 ].data[ 3 ] = boletimSemanal.propertiesByType[ 3 ].value;
      // Imóveis total
      iTipoData.datasets[ 0 ].data[ 4 ] = boletimSemanal.propertiesByType[ 4 ].value;

      // Depósitos inspecionado por tipo A1
      dTipoData.datasets[ 0 ].data[ 0 ] = boletimSemanal.recipientsByType[ 0 ].value;
      // Depósitos inspecionado por tipo A2
      dTipoData.datasets[ 0 ].data[ 1 ] = boletimSemanal.recipientsByType[ 1 ].value;
      // Depósitos inspecionado por tipo B
      dTipoData.datasets[ 0 ].data[ 2 ] = boletimSemanal.recipientsByType[ 2 ].value;
      // Depósitos inspecionado por tipo C
      dTipoData.datasets[ 0 ].data[ 3 ] = boletimSemanal.recipientsByType[ 3 ].value;
      // Depósitos inspecionado por tipo D1
      dTipoData.datasets[ 0 ].data[ 4 ] = boletimSemanal.recipientsByType[ 4 ].value;
      // Depósitos inspecionado por tipo D2
      dTipoData.datasets[ 0 ].data[ 5 ] = boletimSemanal.recipientsByType[ 5 ].value;
      // Depósitos inspecionado por tipo E
      dTipoData.datasets[ 0 ].data[ 6 ] = boletimSemanal.recipientsByType[ 6 ].value;
      // Depósitos total
      setQtdDeposito( dTipoData.datasets[ 0 ].data.reduce( ( ac, d ) => ac + d ) );

      nImoveisData.reload = !nImoveisData.reload;
      setNumeroImoveisData( nImoveisData );
      iTipoData.reload = !iTipoData.reload;
      setImoveisTipoData( iTipoData );
      dTipoData.reload = !dTipoData.reload;
      setDepositosTipoData( dTipoData );

      console.log( boletimSemanal );
    }
  }, [ boletimSemanal ]);

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Boletim Semanal - Semana Epidemiológica { semana } de { ano }
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº imóveis trabalhados por tipo</h2>
                <Bar data={ imoveisTipoData } />
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
          <Col md="9">
            <article style={{ height: '100%', padding: '0 0 30px' }}>
              <div className="card h-100">
                <h2 className="title">Depósitos por tipo</h2>
                <Bar data={ depositosTipoData } />
              </div>
            </article>
          </Col>
          <Col md="3">
            <article className="p-0">
              <InfoBox className="mb-3 bg-primary template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Agente(s)</div>
                    <div className="info-subtitle">Nº na semana</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdAgente }</span>
                  </div>
                </div>
              </InfoBox>
              <InfoBox className="mb-3 bg-info template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Depósito(s)</div>
                    <div className="info-subtitle">Nº depositos</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdDeposito }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-danger template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Amostra(s)</div>
                    <div className="info-subtitle">Nº amostras</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdAmostra }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-primary template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Eliminado(s)</div>
                    <div className="info-subtitle">Qtd. Depósito(s)</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdDepositoEliminado }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-info template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Tratado(s)</div>
                    <div className="info-subtitle">Qtd. Depósito(s)</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdDepositoTratado }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-danger template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Larvicida</div>
                    <div className="info-subtitle">Qtd. usada</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdTratamentoGrama }g</span>
                  </div>
                </div>
              </InfoBox>
            </article>
          </Col>
        </Row>
        <Row>
        <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº dos quarteirões trabalhados</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      quarteiroesTrabalhados.map( ( row, index ) => (
                        <tr key={ 'qrt-trab-' + index }>
                          {
                            row.map( ( quarteirao, index ) => (
                              <td>{quarteirao.numero}</td>
                            ) )
                          }
                        </tr>
                      ) )
                    }
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº dos quarteirões concluídos</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      quarteiroesConcluidos.map( ( row, index ) => (
                        <tr key={ 'qrt-conc-' + index }>
                          {
                            row.map( ( quarteirao, index ) => (
                              <td>{quarteirao.numero}</td>
                            ) )
                          }
                        </tr>
                      ) )
                    }
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº depósitos com espécimes por tipo</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Mosquito</th>
                      <th>A1</th>
                      <th>A2</th>
                      <th>B</th>
                      <th>C</th>
                      <th>D1</th>
                      <th>D2</th>
                      <th>E</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aedes aegypti</td>
                      {
                        amostrasPorDepositos.map( ( row, index ) => (
                          <td key={ 'aegypti-' + index }>{ row.value[ 0 ].value }</td>
                        ))
                      }
                      <td>{ amostrasPorDepositos.reduce( ( ac, row ) => ( ac + row.value[ 0 ].value ), 0 ) }</td>
                    </tr>
                    <tr>
                      <td>Aedes albopictus</td>
                      {
                        amostrasPorDepositos.map( ( row, index ) => (
                          <td key={ 'albopictus-' + index }>{ row.value[ 1 ].value }</td>
                        ))
                      }
                      <td>{ amostrasPorDepositos.reduce( ( ac, row ) => ( ac + row.value[ 1 ].value ), 0 ) }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº de imóveis com espécimes por tipo</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Mosquito</th>
                      <th>Residência</th>
                      <th>Comércio</th>
                      <th>TB</th>
                      <th>PE</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aedes aegypti</td>
                      {
                        amostrasPorImoveis.map( ( row, index ) => (
                          <td key={ 'imoveis-albopictus-' + index }>{ row.value[ 0 ].value }</td>
                        ))
                      }
                      <td>{ amostrasPorImoveis.reduce( ( ac, row ) => ( ac + row.value[ 0 ].value ), 0 ) }</td>
                    </tr>
                    <tr>
                      <td>Aedes albopictus</td>
                      {
                        amostrasPorImoveis.map( ( row, index ) => (
                          <td key={ 'imoveis-albopictus-' + index }>{ row.value[ 1 ].value }</td>
                        ))
                      }
                      <td>{ amostrasPorImoveis.reduce( ( ac, row ) => ( ac + row.value[ 1 ].value ), 0 ) }</td>
                    </tr>
                    <tr>
                      <td>Outros</td>
                      {
                        amostrasPorImoveis.map( ( row, index ) => (
                          <td key={ 'imoveis-albopictus-' + index }>{ row.value[ 2 ].value }</td>
                        ))
                      }
                      <td>{ amostrasPorImoveis.reduce( ( ac, row ) => ( ac + row.value[ 2 ].value ), 0 ) }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº de exemplares</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Mosquito</th>
                      <th>Ovos</th>
                      <th>Pupas</th>
                      <th>Exúvias de pupa</th>
                      <th>Larvas</th>
                      <th>Adultos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aedes aegypti</td>
                      {
                        amostrasPorExemplar.map( ( row, index ) => (
                          <td key={ 'imoveis-albopictus-' + index }>{ row.value[ 0 ].value }</td>
                        ))
                      }
                    </tr>
                    <tr>
                      <td>Aedes albopictus</td>
                      {
                        amostrasPorExemplar.map( ( row, index ) => (
                          <td key={ 'imoveis-albopictus-' + index }>{ row.value[ 1 ].value }</td>
                        ))
                      }
                    </tr>
                    <tr>
                      <td>Outros</td>
                      {
                        amostrasPorExemplar.map( ( row, index ) => (
                          <td key={ 'imoveis-albopictus-' + index }>{ row.value[ 2 ].value }</td>
                        ))
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº dos quarteirões com Aedes aegypti</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      quarteiroesAedesAegypti.map( ( row, index ) => (
                        <tr key={ 'qrt-pos-aedes-' + index }>
                          {
                            row.map( ( quarteirao, index ) => (
                              <td>{quarteirao}</td>
                            ) )
                          }
                        </tr>
                      ) )
                    }
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº dos quarteirões com Aedes albopictus</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                      <th>Nº/Seq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      quarteiroesAedesAlbopictus.map( ( row, index ) => (
                        <tr key={ 'qrt-pos-aedes-' + index }>
                          {
                            row.map( ( quarteirao, index ) => (
                              <td>{quarteirao}</td>
                            ) )
                          }
                        </tr>
                      ) )
                    }
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

const mapStateToProps = state => ({
  boletimSemanal: state.nw_relatorio.boletimSemanal
});

const mapDispatchToProps = {
  changeSidebar,
  getBoletimSemanalRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( VisualizarRelatorio );
