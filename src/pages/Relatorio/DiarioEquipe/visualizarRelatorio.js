import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartPie } from 'react-icons/fa';
import Bar from '../../../components/Charts/Bar';
import { tipoImovelEnum, tipoRecipiente as tipoRecipienteEnum, situacao_imovel_enum } from '../../../config/enumerate';
import { Row, Col } from 'react-bootstrap';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getBoletimDiarioEquipeRequest } from '../../../store/Relatorio/relatorioActions';
import { getMembrosRequest } from '../../../store/Equipe/equipeActions';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader, InfoBox } from '../../../styles/util';
import { Color } from '../../../styles/global';

const initVar = {
  imoveisTipoData: {
    labels: tipoImovelEnum.map( tipo => ( tipo.sigla ) ),
    reload: false,
    datasets: [
      {
        label: 'Total',
        data: [ 0, 0, 0, 0 ],
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
      }
    ]
  },
  numeroImoveisData: {
    labels: situacao_imovel_enum.map( situacao => situacao.label ),
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
  },
  larvicidaPorAgente: {
    labels: [],
    reload: false,
    datasets: [
      {
        label: 'total',
        data: [],
        borderWidth: 1
      }
    ]
  },
  amostrasPorAgente: {
    labels: [],
    reload: false,
    datasets: [
      {
        label: 'total',
        data: [],
        borderWidth: 1
      }
    ]
  },
}

const options = {
  legend: {
    display: true
  }
}

export const VisualizarRelatorio = ({ membros, boletimDiarioEquipe, ...props }) => {
  const [ imoveisTipoData, setImoveisTipoData ]           = useState( initVar.imoveisTipoData );
  const [ numeroImoveisData, setNumeroImoveisData ]       = useState( initVar.numeroImoveisData );
  const [ depositosTipoData, setDepositosTipoData ]       = useState( initVar.depositosTipoData );
  const [ larvicidaPorAgente, setLarvicidaPorAgente ]     = useState( initVar.larvicidaPorAgente );
  const [ amostrasPorAgente, setAmostrasPorAgente ]       = useState( initVar.amostrasPorAgente );
  const [ dataString, setDataString ]                     = useState( '' );
  const [ qtdRecusa, setQtdRecusa ]                       = useState( 0 );
  const [ qtdFechada, setQtdFechada ]                     = useState( 0 );
  const [ qtdAmostra, setQtdAmostra ]                     = useState( 0 );
  const [ qtdDepositoTratado, setQtdDepositoTratado ]     = useState( 0 );
  const [ qtdTratamentoGrama, setQtdTratamentoGrama ]     = useState( 0 );
  const [ qtdDepositoEliminado, setQtdDepositoEliminado ] = useState( 0 );

  useEffect(() => {
    const equipe_id = props.match.params.equipe_id;
    const data = props.match.params.data

    const [ Y, m, d ] = data.split( '-' );
    setDataString( `${ d }/${ m }/${ Y }` );

    if( equipe_id && data !== '' ){
      props.getMembrosRequest( equipe_id );
      props.getBoletimDiarioEquipeRequest( equipe_id, data );
    }

    props.changeSidebar( "relatorio", "rlt_boletimDiarioEquipe" );
  }, []);

  useEffect(() => {
    if( membros.length > 0 )
      loadChart();
  }, [ boletimDiarioEquipe ]);

  useEffect(() => {
    if( membros.length > 0 ) {
      let iTipo     = initVar.imoveisTipoData;
      let datasets  = iTipo.datasets;

      let data = membros.map( ( membro, index ) => {
        let nome = membro.usuario.nome.split( " " );

        if( nome.length > 2 )
          nome = nome[ 0 ] + " " + nome[ nome.length - 1 ];
        else
          nome = nome[ 0 ];

        return (
          {
            label: nome,
            usuario_id: membro.usuario.id,
            data: [ 0, 0, 0, 0 ],
            backgroundColor: [
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ]
            ],
            borderColor: [
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ]
            ],
            borderWidth: 1
          }
        );
      });

      datasets = [ ...datasets, ...data ];

      setImoveisTipoData({
        labels: tipoImovelEnum.map( tipo => ( tipo.sigla ) ),
        reload: false,
        datasets
      });

      let iSituacao     = initVar.numeroImoveisData;
      datasets          = iSituacao.datasets;

      data = membros.map( ( membro, index ) => {
        let nome = membro.usuario.nome.split( " " );

        if( nome.length > 2 )
          nome = nome[ 0 ] + " " + nome[ nome.length - 1 ];
        else
          nome = nome[ 0 ];

        return (
          {
            label: nome,
            usuario_id: membro.usuario.id,
            data: [ 0, 0, 0, 0, 0, 0 ],
            backgroundColor: [
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ],
              Color.chartColor[ index + 1 ][ 0 ]
            ],
            borderColor: [
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ],
              Color.chartColor[ index + 1 ][ 1 ]
            ],
            borderWidth: 1
          }
        );
      });

      datasets = [ ...datasets, ...data ];

      setNumeroImoveisData({
        labels: situacao_imovel_enum.map( situacao => situacao.label ),
        reload: false,
        datasets
      });

      let larvPorAgente = larvicidaPorAgente;
      let labels        = [];
      let cores         = [];
      let cores_borda   = [];
      let agentes       = [];

      data = membros.map( ( membro, index ) => {
        let nome = membro.usuario.nome.split( " " );

        if( nome.length > 2 )
          nome = nome[ 0 ] + " " + nome[ nome.length - 1 ];
        else
          nome = nome[ 0 ];

        labels.push( nome );
        cores.push( Color.chartColor[ index ][ 0 ] );
        cores_borda.push( Color.chartColor[ index ][ 1 ] );
        agentes.push( membro.usuario.id );
        return 0;
      });

      larvPorAgente.datasets[ 0 ].data            = data;
      larvPorAgente.datasets[ 0 ].backgroundColor = cores;
      larvPorAgente.datasets[ 0 ].borderColor     = cores_borda;
      larvPorAgente.datasets[ 0 ].agentes         = agentes;

      setLarvicidaPorAgente({
        ...larvPorAgente,
        labels,
        reload: !larvPorAgente.reload
      });

      let ams_por_agente  = amostrasPorAgente;
      let labels_ams      = [];
      let cores_ams       = [];
      let cores_borda_ams = [];
      let agentes_ams     = [];

      let data_ams = membros.map( ( membro, index ) => {
        let nome = membro.usuario.nome.split( " " );

        if( nome.length > 2 )
          nome = nome[ 0 ] + " " + nome[ nome.length - 1 ];
        else
          nome = nome[ 0 ];

        labels_ams.push( nome );
        cores_ams.push( Color.chartColor[ index ][ 0 ] );
        cores_borda_ams.push( Color.chartColor[ index ][ 1 ] );
        agentes_ams.push( membro.usuario.id );
        return 0;
      });

      ams_por_agente.datasets[ 0 ].data            = data_ams;
      ams_por_agente.datasets[ 0 ].backgroundColor = cores_ams;
      ams_por_agente.datasets[ 0 ].borderColor     = cores_borda_ams;
      ams_por_agente.datasets[ 0 ].agentes         = agentes_ams;

      setAmostrasPorAgente({
        ...ams_por_agente,
        labels: labels_ams,
        reload: !ams_por_agente.reload
      });

      loadChart();
    }
  }, [ membros ]);

  const loadChart = () => {
    if( Object.entries( boletimDiarioEquipe ).length > 0 ) {
      const imPorTipo     = boletimDiarioEquipe.imoveisPorTipo;
      const imPorSituacao = boletimDiarioEquipe.imoveisPorSituacao;

      // Alterando cardInfo númericos
      setQtdAmostra( boletimDiarioEquipe.amostras.total );
      setQtdRecusa( boletimDiarioEquipe.imoveis.recusados );
      setQtdFechada( boletimDiarioEquipe.imoveis.fechados );
      setQtdDepositoEliminado( boletimDiarioEquipe.depositos.eliminados );
      setQtdDepositoTratado( boletimDiarioEquipe.depositos.tratados );
      setQtdTratamentoGrama( boletimDiarioEquipe.depositos.qtd_larvicida );

      // Alterando o gráfico larvicida por Agente
      let larvPorAgente = larvicidaPorAgente;
      boletimDiarioEquipe.larvicidaPorAgente.forEach( agente => {
        let indexAgente = larvPorAgente.datasets[ 0 ].agentes.findIndex( ag => ag === agente.usuario.id );

        if( indexAgente !== -1 ) {
          larvPorAgente.datasets[ 0 ].data[ indexAgente ] += agente.value;
        }
      } );

      setLarvicidaPorAgente( {
        ...larvPorAgente,
        reload: !larvPorAgente.reload
      } );

      // Alterando o gráfico amostras por Agente
      let amsPorAgente = amostrasPorAgente;
      boletimDiarioEquipe.amostrasPorAgente.forEach( agente => {
        let indexAgente = amsPorAgente.datasets[ 0 ].agentes.findIndex( ag => ag === agente.usuario.id );

        if( indexAgente !== -1 ) {
          amsPorAgente.datasets[ 0 ].data[ indexAgente ] += agente.value;
        }
      } );

      setAmostrasPorAgente( {
        ...amsPorAgente,
        reload: !amsPorAgente.reload
      } );

      // Alterando o gráfico depósitos por tipo
      let depTipo = depositosTipoData;
      depTipo.datasets[ 0 ].data = boletimDiarioEquipe.depositosPorTipo.map( qtd_deposito => qtd_deposito.value );

      setDepositosTipoData({
        ...depTipo,
        reload: !depTipo.reload
      });

      // Alterando o gráfico imóveis por tipo
      let datasets  = imoveisTipoData.datasets;

      tipoImovelEnum.forEach( tipo => {
        let data_index = 0; // Residencial

        if( tipo.slug === 'terreno_baldio' )
          data_index = 1;
        if( tipo.slug === 'comercial' )
          data_index = 2;
        if( tipo.slug === 'ponto_estrategico' )
          data_index = 3;

        datasets[ 0 ].data[ data_index ] = imPorTipo[ tipo.slug ].total;

        imPorTipo[ tipo.slug ].agentes.forEach( agente => {
          datasets = datasets.map( dataset => {
            if( dataset.usuario_id )
              if( agente.usuario.id === dataset.usuario_id )
                dataset.data[ data_index ] += agente.valor;

            return dataset;
          } );
        } );
      } );

      setImoveisTipoData({
        labels: tipoImovelEnum.map( tipo => ( tipo.sigla ) ),
        reload: !imoveisTipoData.reload,
        datasets
      });

      // Alterando o gráfico imóveis por situacao
      datasets  = numeroImoveisData.datasets;
      situacao_imovel_enum.forEach( situacao => {
        let data_index = 0; // Trabalhado

        if( situacao.slug === 'pesquisado' )
          data_index = 1;
        if( situacao.slug === 'foco' )
          data_index = 2;
        if( situacao.slug === 'tratado' )
          data_index = 3;
        if( situacao.slug === 'pendencia' )
          data_index = 4;
        if( situacao.slug === 'recuperado' )
          data_index = 5;

        datasets[ 0 ].data[ data_index ] = imPorSituacao[ situacao.slug ].total;

        imPorSituacao[ situacao.slug ].agentes.forEach( agente => {
          datasets = datasets.map( dataset => {
            if( dataset.usuario_id )
              if( agente.usuario.id === dataset.usuario_id )
                dataset.data[ data_index ] += agente.valor;

            return dataset;
          } );
        } );
      } );

      setNumeroImoveisData({
        labels: situacao_imovel_enum.map( situacao => situacao.label ),
        reload: !numeroImoveisData.reload,
        datasets
      });
    }
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Boletim diário por equipe - {dataString}
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Imóveis por tipo</h2>
                <Bar data={ imoveisTipoData } options={ options } />
                <Row>
                  <Col md="5">
                    <small><b>R</b> - Residencial </small>
                  </Col>
                  <Col md="5">
                    <small><b>C</b> - Comercial</small>
                  </Col>
                  <Col md="5">
                    <small><b>TB</b> - Terreno Baldio</small>
                  </Col>
                  <Col md="5">
                    <small><b>PE</b> - Ponto Estratégico</small>
                  </Col>
                </Row>
              </div>
            </article>
          </Col>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Imóveis</h2>
                <Bar data={ numeroImoveisData } options={ options } />
                <Row>
                  <Col md="8">
                    <small><b>Trabalhados</b> - imóveis vistoriados sem pendência </small>
                  </Col>
                  <Col md="12">
                    <small><b>Pesquisados</b> - imóveis com ao menos 1 deposito adicionado na vistoria</small>
                  </Col>
                  <Col md="12">
                    <small><b>Com Foco</b> - imóveis com ao menos 1 deposito com foco adicionado na vistoria</small>
                  </Col>
                  <Col md="12">
                    <small><b>Tratados</b> - imóveis com ao menos 1 deposito tratado adicionado na vistoria</small>
                  </Col>
                  <Col md="12">
                    <small><b>Fechado/Recusado</b> - imóveis com vistoria pendente por está fechado ou por recusa</small>
                  </Col>
                  <Col md="12">
                    <small><b>Recuperados</b> - imoveis que foram vistoriados mais de uma vez</small>
                  </Col>
                </Row>
              </div>
            </article>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Amostras por Agente</h2>
                <Bar data={ amostrasPorAgente } options={ { legend: { display: false } } } />
              </div>
            </article>
          </Col>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Larvicida por Agente(g)</h2>
                <Bar data={ larvicidaPorAgente } options={ { legend: { display: false } } } />
              </div>
            </article>
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <article style={{ height: '100%', padding: '0 0 30px' }}>
              <div className="card h-100">
                <h2 className="title">Depósitos por tipo</h2>
                <Bar data={ depositosTipoData } options={ { legend: { display: false } } } />
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
  boletimDiarioEquipe: state.nw_relatorio.boletimDiarioEquipe,
  membros: state.nw_equipe.membros
});

const mapDispatchToProps = {
  changeSidebar,
  getBoletimDiarioEquipeRequest,
  getMembrosRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( VisualizarRelatorio );
