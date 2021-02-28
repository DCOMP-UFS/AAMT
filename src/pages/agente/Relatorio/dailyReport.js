import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaChartPie } from 'react-icons/fa';
import { tipoImovel as tipoImovelEnum } from '../../../config/enumerate';
import { tipoRecipiente as tipoRecipienteEnum } from '../../../config/enumerate';
import Bar from '../../../components/Charts/Bar';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarAgente';
import { getDailyWorkByIdRequest } from '../../../store/actions/trabalhoDiario';
import { getInspectsByDailyWorkRequest } from '../../../store/actions/VistoriaActions';

// STYLES
import { Color } from '../../../styles/global';
import { PageIcon, PageHeader, InfoBox } from '../../../styles/util';

function DailyReport({ usuario, vistorias, trabalhoDiario, ...props }) {
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
  const [ data, setData ] = useState( '' );

  useEffect(() => {
    props.changeSidebar( 3, 1 );
    props.getDailyWorkByIdRequest( props.match.params.trabalho_diario_id );
    props.getInspectsByDailyWorkRequest( props.match.params.trabalho_diario_id );
  }, []);

  // Consultando a data do trabalho diário
  useEffect(() => {
    if( trabalhoDiario ) {
      const [ Y, m, d ] = trabalhoDiario.data.split( 'T' )[ 0 ].split( '-' );
      setData( `${ d }/${ m }/${ Y }` );
    }
  }, [ trabalhoDiario ]);

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
          Resumo diário - { data }
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Imóveis por tipo</h2>
                <Bar data={ imoveisTipoData } />
              </div>
            </article>
          </Col>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Imóveis</h2>
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
                    <div className="info-title">Amostra(s)</div>
                    <div className="info-subtitle">Nº amostras</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdAmostra }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-danger template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Recusa(s)</div>
                    <div className="info-subtitle">Nº de recusas</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdRecusa }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-warning template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Fechada(s)</div>
                    <div className="info-subtitle">Nº imóveis fechados</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdFechada }</span>
                  </div>
                </div>
              </InfoBox>

              <InfoBox className="mb-3 bg-info template-no-icon text-white">
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

              <InfoBox className="mb-3 bg-primary template-no-icon text-white">
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
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  vistorias: state.vistoria.vistorias,
  trabalhoDiario: state.trabalhoDiario.trabalhoDiario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getInspectsByDailyWorkRequest,
    getDailyWorkByIdRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( DailyReport );
