import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartPie } from 'react-icons/fa';
import Bar from '../../../../components/Charts/Bar';
import { tipoImovel as tipoImovelEnum, tipoRecipiente as tipoRecipienteEnum } from '../../../../config/enumerate';
import { Row, Col } from 'react-bootstrap';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarSupervisor';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader, InfoBox } from '../../../../styles/util';
import { Color } from '../../../../styles/global';

const initVar = {
  imoveisTipoData: {
    labels: Object.entries( tipoImovelEnum ).map(([ key, value ]) => ( value.sigla ) ),
    reload: false,
    datasets: [
      {
        label: 'Total',
        data: [ 8, 13, 8, 2 ],
        backgroundColor: [
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ]
        ],
        borderWidth: 1
      },
      {
        label: 'Duarte',
        data: [ 3, 6, 1, 0 ],
        backgroundColor: [
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ]
        ],
        borderWidth: 1
      },
      {
        label: 'Roseli',
        data: [ 4, 5, 2, 1 ],
        backgroundColor: [
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ]
        ],
        borderWidth: 1
      },
      {
        label: 'Kyara',
        data: [ 1, 2, 5, 1 ],
        backgroundColor: [
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ]
        ],
        borderWidth: 1
      }
    ]
  },
  numeroImoveisData: {
    labels: [ 'Trabalhados', 'Inspecionados', 'Com Foco', 'Tratados', 'Fechados/Recusados', 'Recuperados' ],
    reload: false,
    datasets: [
      {
        label: 'Total',
        data: [ 0, 0, 0, 0, 0, 0 ],
        backgroundColor: [
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ],
          Color.chartColor[ 0 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ],
          Color.chartColor[ 0 ][ 1 ]
        ],
        borderWidth: 1
      },
      {
        label: 'Duarte',
        data: [ 1, 3, 5, 2, 8, 2 ],
        backgroundColor: [
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ],
          Color.chartColor[ 1 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ],
          Color.chartColor[ 1 ][ 1 ]
        ],
        borderWidth: 1
      },
      {
        label: 'Roseli',
        data: [ 6, 3, 5, 2, 0, 1 ],
        backgroundColor: [
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ],
          Color.chartColor[ 2 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ],
          Color.chartColor[ 2 ][ 1 ]
        ],
        borderWidth: 1
      },
      {
        label: 'Kyara',
        data: [ 4, 6, 7, 3, 0, 0 ],
        backgroundColor: [
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ],
          Color.chartColor[ 3 ][ 0 ]
        ],
        borderColor: [
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ],
          Color.chartColor[ 3 ][ 1 ]
        ],
        borderWidth: 1
      }
    ]
  },
  depositosTipoData: {
    labels: tipoRecipienteEnum,
    reload: false,
    datasets: [
      {
        label: 'total',
        // A1, A2, B, C, D1, D2, E
        data: [ 0, 0, 0, 0, 0, 0 ],
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
          Color.chartColor[ 1 ][ 2 ],
          Color.chartColor[ 2 ][ 3 ],
          Color.chartColor[ 3 ][ 4 ],
          Color.chartColor[ 4 ][ 5 ],
          Color.chartColor[ 5 ][ 6 ],
          Color.chartColor[ 6 ][ 7 ],
          Color.chartColor[ 0 ][ 8 ]
        ],
        borderWidth: 1
      }
    ]
  }
}

const options = {
  legend: {
    display: true
  }
}

export const VisualizarRelatorio = ({ ...props }) => {
  const [ imoveisTipoData, setImoveisTipoData ]           = useState( initVar.imoveisTipoData );
  const [ numeroImoveisData, setNumeroImoveisData ]       = useState( initVar.numeroImoveisData );
  const [ depositosTipoData, setDepositosTipoData ]       = useState( initVar.depositosTipoData );
  const [ equipe_id, setEquipe_id ]                       = useState( undefined );
  const [ data, setData ]                                 = useState( '' );
  const [ qtdRecusa, setQtdRecusa ]                       = useState( 0 );
  const [ qtdFechada, setQtdFechada ]                     = useState( 0 );
  const [ qtdAmostra, setQtdAmostra ]                     = useState( 0 );
  const [ qtdDepositoTratado, setQtdDepositoTratado ]     = useState( 0 );
  const [ qtdTratamentoGrama, setQtdTratamentoGrama ]     = useState( 0 );
  const [ qtdDepositoEliminado, setQtdDepositoEliminado ] = useState( 0 );

  useEffect(() => {
    const eq = props.match.params.equipe_id;

    setEquipe_id( eq );
    setData( props.match.params.data );

    props.changeSidebar( 6, 2 );
  }, []);

  useEffect(() => {
    if( equipe_id && data !== '' ) {
      console.log( equipe_id, data );
    }
  }, [ data, equipe_id ]);

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Boletim Diário da Equipe Furia - 17/05/2021
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Imóveis por tipo</h2>
                <Bar data={ imoveisTipoData } options={ options } />
              </div>
            </article>
          </Col>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Imóveis</h2>
                <Bar data={ numeroImoveisData } options={ options } />
              </div>
            </article>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Amostras por Agente</h2>
                <Bar data={ imoveisTipoData } options={ options } />
              </div>
            </article>
          </Col>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Larvicida por Agente</h2>
                <Bar data={ numeroImoveisData } options={ options } />
              </div>
            </article>
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <article style={{ height: '100%', padding: '0 0 30px' }}>
              <div className="card h-100">
                <h2 className="title">Depósitos por tipo</h2>
                <Bar data={ depositosTipoData } options={ options } />
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
    </Container>
  )
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  changeSidebar
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( VisualizarRelatorio );
