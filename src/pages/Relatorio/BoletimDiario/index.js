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
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getDailyWorkByIdRequest } from '../../../store/TrabalhoDiario/trabalhoDiarioActions';
import { getInspectsByDailyWorkRequest } from '../../../store/Vistoria/vistoriaActions';

// STYLES
import { Color } from '../../../styles/global';
import { PageIcon, PageHeader, InfoBox } from '../../../styles/util';

const initVar = {
  imoveisTipoData: {
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
  },
  numeroImoveisData: {
    labels: [ 'Trabalhados', 'Inspecionados', 'Com Foco', 'Tratados', 'Fechados/Recusados', 'Recuperados' ],
    reload: false,
    datasets: [{
      data: [ 0, 0, 0, 0, 0, 0 ],
      backgroundColor: [
        Color.chartColor[1][0],
        Color.chartColor[2][0],
        Color.chartColor[3][0],
        Color.chartColor[4][0],
        Color.chartColor[5][0],
        Color.chartColor[6][0]
      ],
      borderColor: [
        Color.chartColor[1][1],
        Color.chartColor[2][1],
        Color.chartColor[3][1],
        Color.chartColor[4][1],
        Color.chartColor[5][1],
        Color.chartColor[6][1]
      ],
      borderWidth: 1
    }]
  },
  depositosTipoData: {
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
  }
}

function BoletimDiario({ usuario, vistorias, trabalhoDiario, ...props }) {
  const [ imoveisTipoData, setImoveisTipoData ]     = useState(initVar.imoveisTipoData);
  const [ numeroImoveisData, setNumeroImoveisData ] = useState(initVar.numeroImoveisData);
  const [ depositosTipoData, setDepositosTipoData ] = useState(initVar.depositosTipoData);
  const [ qtdRecusa, setQtdRecusa ] = useState( 0 );
  const [ qtdFechada, setQtdFechada ] = useState( 0 );
  const [ qtdAmostra, setQtdAmostra ] = useState( 0 );
  const [ qtdDepositoTratado, setQtdDepositoTratado ] = useState( 0 );
  const [ qtdTratamentoGrama, setQtdTratamentoGrama ] = useState( 0 );
  const [ qtdDepositoEliminado, setQtdDepositoEliminado ] = useState( 0 );
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
    let itData          = initVar.imoveisTipoData,
        niData          = initVar.numeroImoveisData,
        dtData          = initVar.depositosTipoData,
        qtdR            = 0,
        qtdF            = 0,
        qtdA            = 0,
        qtdDepTrat      = 0,
        qtdDepElim      = 0,
        qtdTratGrama    = 0,
        qtdResidencial  = 0,
        qtdTb           = 0,
        qtdComercial    = 0,
        qtdPE           = 0,
        depA1           = 0,
        depA2           = 0,
        depB            = 0,
        depC            = 0,
        depD1           = 0,
        depD2           = 0,
        depE            = 0,
        qtdTrabalhados  = 0,
        qtdInspecionado = 0,
        qtdFoco         = 0,
        qtdTratado      = 0,
        qtdPendencia    = 0,
        qtdRecuperado   = 0;

    vistorias.forEach(( vistoria, index ) => {
      switch ( vistoria.imovel.tipoImovel ) {
        case tipoImovelEnum.residencial.id:// residencial
          qtdResidencial++;
          break;
        case tipoImovelEnum.terrenoBaldio.id:// TB
          qtdTb++;
          break;
        case tipoImovelEnum.comercial.id:// Comercial
          qtdComercial++;
          break;
        default:// pontoEstrategico
          qtdPE++;
          break;
      }

      let fl_tratado = false;
      vistoria.depositos.forEach( d => {
        qtdA += d.amostras.length;
        if( d.fl_tratado ) {
          fl_tratado = true;
          qtdDepTrat++;

          qtdTratGrama += d.tratamentos.length > 0 ? d.tratamentos[ 0 ].quantidade : 0;
        }
        if( d.fl_eliminado ) qtdDepElim++;
        if( d.fl_comFoco ) qtdFoco++;

        switch ( d.tipoRecipiente ) {
          case "A1":
            depA1++;
            break;
          case "A2":
            depA2++;
            break;
          case "B":
            depB++;
            break;
          case "C":
            depC++;
            break;
          case "D1":
            depD1++;
            break;
          case "D2":
            depD2++;
            break;
          default:// E
            depE++;
            break;
        }
      });

      if( fl_tratado ) qtdTratado++;

      if( vistoria.situacaoVistoria === "N" ) qtdInspecionado++;
      else qtdRecuperado++;

      qtdTrabalhados++;

      if((vistoria.pendencia === "F" || vistoria.pendencia === "R"))
        qtdPendencia++;

      if( vistoria.pendencia === "F" ) qtdF++;
      else if( vistoria.pendencia === "R" ) qtdR++;
    });

    // Gráfico de vistoria por tipo de imóvel
    itData.datasets[ 0 ].data[ 0 ] = qtdResidencial;
    itData.datasets[ 0 ].data[ 1 ] = qtdTb;
    itData.datasets[ 0 ].data[ 2 ] = qtdComercial;
    itData.datasets[ 0 ].data[ 3 ] = qtdPE;

    // Gráfico de tipo de depósito
    dtData.datasets[ 0 ].data[ 0 ] = depA1;
    dtData.datasets[ 0 ].data[ 1 ] = depA2;
    dtData.datasets[ 0 ].data[ 2 ] = depB;
    dtData.datasets[ 0 ].data[ 3 ] = depC;
    dtData.datasets[ 0 ].data[ 4 ] = depD1;
    dtData.datasets[ 0 ].data[ 5 ] = depD2;
    dtData.datasets[ 0 ].data[ 6 ] = depE;

    // Gráfico de vistorias
    niData.datasets[ 0 ].data[ 0 ] = qtdTrabalhados;
    niData.datasets[ 0 ].data[ 1 ] = qtdInspecionado;
    niData.datasets[ 0 ].data[ 2 ] = qtdFoco;
    niData.datasets[ 0 ].data[ 3 ] = qtdTratado;
    niData.datasets[ 0 ].data[ 4 ] = qtdPendencia;
    niData.datasets[ 0 ].data[ 5 ] = qtdRecuperado;

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
)( BoletimDiario );
