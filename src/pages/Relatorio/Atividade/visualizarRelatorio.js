import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { FaChartPie } from 'react-icons/fa';
import Bar from '../../../components/Charts/Bar';
import { tipoImovel as tipoImovelEnum, tipoRecipiente as tipoRecipienteEnum } from '../../../config/enumerate';
import { Row, Col } from 'react-bootstrap';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getBoletimAtividadeRequest } from '../../../store/Relatorio/relatorioActions';

// STYLES
import { Container } from './styles';
import { PageIcon, PageHeader, InfoBox } from '../../../styles/util';
import { Color, selectDefault } from '../../../styles/global';

const initVar = {
  imoveisTipoData: {
    labels: [ 'R', 'C', 'TB', 'PE', 'Total' ],
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
    labels: [ 'Trabalhados', 'Pesquisados', 'Com Foco', 'Tratados', 'Fechados', 'Recusados', 'Recuperados' ],
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
        // A1, A2, B, C, D1, D2, E, Total
        data: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
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

export const VisualizarRelatorio = ({ boletimAtividade, ...props }) => {
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
  const [ quarteiroesConcluidosPendencia, setQuarteiroesConcluidosPendencia] = useState( [] );
  const [ quarteiroesTrabalhados, setQuarteiroesTrabalhados ] = useState( [] );
  const [ quarteiroesAedesAegypti, setQuarteiroesAedesAegypti ] = useState( [] );
  const [ quarteiroesAedesAlbopictus, setQuarteiroesAedesAlbopictus ] = useState( [] );
  const [ optionsLocalidade, setOptionsLocalidade ] = useState( [{ value: -1, label: 'Todas' }] )
  const [ localidade, setLocalidade ] = useState( { value: -1, label: 'Todas' } )

  const [qrtConcluidoTotal, setQrtConcluidoTotal]  = useState( [] );
  const [qrtConcluidosPendenciaTotal, setQrtConcluidosPendenciaTotal] = useState( [] );
  const [qrtTrabalhadosTotal, setQrtTrabalhadosTotal] = useState( [] );
  const [qrtAegyptiTotal, setQrtAegyptiTotal] = useState( [] );
  const [qrtAlbopictustTotal, setQrtAlbopictustTotal] = useState( [] );

  function sliceIntoSubArrays (array, size) {
    const res = [];
    for (let i = 0; i < array.length; i += size) {
      const sub_array = array.slice(i, i + size);
      res.push(sub_array);
    };
    return res;
  }

  useEffect(() => {
    const { atividade_id } = props.match.params;

    props.changeSidebar( "relatorio", "rlt_porAtividade" );
    setAtividade_id( atividade_id );
    props.getBoletimAtividadeRequest( atividade_id );
  }, []);

  useEffect(() => {
    if( Object.entries( boletimAtividade ).length ) {
      setQtdTratamentoGrama( boletimAtividade.depositTreated[ 1 ].value );
      setQtdDepositoTratado( boletimAtividade.depositTreated[ 2 ].value );
      // setQtdAgente( boletimAtividade.epiWeek.totalAgentes );
      setQtdDepositoEliminado( boletimAtividade.recipientDestination[ 0 ].value );
      setQtdAmostra( boletimAtividade.totalSample );
      setAmostrasPorDepositos( boletimAtividade.sampleByDeposit );
      setAmostrasPorImoveis( boletimAtividade.sampleByProperty );
      setAmostrasPorExemplar( boletimAtividade.sampleExemplary );

      const qrt_concluidos = boletimAtividade.situacao_quarteirao.concluidos;
      const qrt_concluidosPendencia = boletimAtividade.situacao_quarteirao.concluidosPendencia;
      const qrt_trabalhados = boletimAtividade.situacao_quarteirao.trabalhados;
      const qrt_pstv_aegypti = boletimAtividade.quarteiroesPositivos.aedesAegypti;
      const qrt_pstv_albopictus = boletimAtividade.quarteiroesPositivos.aedesAlbopictus;

      setQrtConcluidoTotal(qrt_concluidos)
      setQrtConcluidosPendenciaTotal(qrt_concluidosPendencia)
      setQrtTrabalhadosTotal(qrt_trabalhados)
      setQrtAegyptiTotal(qrt_pstv_aegypti)
      setQrtAlbopictustTotal(qrt_pstv_albopictus)

      let listaLocalidades = [{ value: -1, label: 'Todas' }]
      listaLocalidades = addLocalidadesUnicas(listaLocalidades, qrt_trabalhados)
      listaLocalidades = addLocalidadesUnicas(listaLocalidades, qrt_concluidos)
      listaLocalidades = addLocalidadesUnicas(listaLocalidades, qrt_concluidosPendencia)

      setOptionsLocalidade(listaLocalidades)
      
      setQuarteiroesTrabalhados( sliceIntoSubArrays(qrt_trabalhados, 10) );
      setQuarteiroesConcluidos( sliceIntoSubArrays(qrt_concluidos, 10) );
      setQuarteiroesConcluidosPendencia( sliceIntoSubArrays(qrt_concluidosPendencia, 10) );
      setQuarteiroesAedesAegypti( sliceIntoSubArrays(qrt_pstv_aegypti, 10) );
      setQuarteiroesAedesAlbopictus( sliceIntoSubArrays(qrt_pstv_albopictus, 10) );

      let iTipoData         = imoveisTipoData,
          nImoveisData      = numeroImoveisData,
          dTipoData = depositosTipoData;

      // Imóveis trabalhados
      nImoveisData.datasets[ 0 ].data[ 0 ] = boletimAtividade.propertiesByStatus[ 2 ].value;
      // Imóveis pesquisados
      nImoveisData.datasets[ 0 ].data[ 1 ] = boletimAtividade.properties[ 0 ].value;
       // Imóveis com foco
       nImoveisData.datasets[ 0 ].data[ 2 ] = boletimAtividade.properties[ 2 ].value;
      // Imóveis tratados
      nImoveisData.datasets[ 0 ].data[ 3 ] = boletimAtividade.properties[ 1 ].value;
      // Imóveis fechados
      nImoveisData.datasets[ 0 ].data[ 4 ] = boletimAtividade.propertiesByPendency[ 0 ].value;
      // Imóveis recusados
      nImoveisData.datasets[ 0 ].data[ 5 ] = boletimAtividade.propertiesByPendency[ 1 ].value;
      // Imóveis recuperados
      nImoveisData.datasets[ 0 ].data[ 6 ] = boletimAtividade.propertiesByStatus[ 1 ].value;

      // Imóveis do tipo residência
      iTipoData.datasets[ 0 ].data[ 0 ] = boletimAtividade.propertiesByType[ 0 ].value;
      // Imóveis do tipo comércio
      iTipoData.datasets[ 0 ].data[ 1 ] = boletimAtividade.propertiesByType[ 2 ].value;
      // Imóveis do tipo terreno baldio
      iTipoData.datasets[ 0 ].data[ 2 ] = boletimAtividade.propertiesByType[ 1 ].value;
      // Imóveis do tipo ponto estratégico
      iTipoData.datasets[ 0 ].data[ 3 ] = boletimAtividade.propertiesByType[ 3 ].value;
      // Imóveis total
      iTipoData.datasets[ 0 ].data[ 4 ] = boletimAtividade.propertiesByType[ 4 ].value;

      // Depósitos inspecionado por tipo A1
      dTipoData.datasets[ 0 ].data[ 0 ] = boletimAtividade.recipientsByType[ 0 ].value;
      // Depósitos inspecionado por tipo A2
      dTipoData.datasets[ 0 ].data[ 1 ] = boletimAtividade.recipientsByType[ 1 ].value;
      // Depósitos inspecionado por tipo B
      dTipoData.datasets[ 0 ].data[ 2 ] = boletimAtividade.recipientsByType[ 2 ].value;
      // Depósitos inspecionado por tipo C
      dTipoData.datasets[ 0 ].data[ 3 ] = boletimAtividade.recipientsByType[ 3 ].value;
      // Depósitos inspecionado por tipo D1
      dTipoData.datasets[ 0 ].data[ 4 ] = boletimAtividade.recipientsByType[ 4 ].value;
      // Depósitos inspecionado por tipo D2
      dTipoData.datasets[ 0 ].data[ 5 ] = boletimAtividade.recipientsByType[ 5 ].value;
      // Depósitos inspecionado por tipo E
      dTipoData.datasets[ 0 ].data[ 6 ] = boletimAtividade.recipientsByType[ 6 ].value;
      // Depósitos total
      var depositosTotais =  dTipoData.datasets[ 0 ].data.reduce( ( ac, d ) => ac + d )
      dTipoData.datasets[ 0 ].data[ 7 ] = depositosTotais
      setQtdDeposito(depositosTotais);

      nImoveisData.reload = !nImoveisData.reload;
      setNumeroImoveisData( nImoveisData );
      iTipoData.reload = !iTipoData.reload;
      setImoveisTipoData( iTipoData );
      dTipoData.reload = !dTipoData.reload;
      setDepositosTipoData( dTipoData );
    }
  }, [ boletimAtividade ]);

  useEffect(() => {
    if(localidade.value != -1){
      const newQuarteiroesTrabalhados = qrtTrabalhadosTotal.filter( q => q.localidade_id == localidade.value)
      const newQuarteiroesConcluidos = qrtConcluidoTotal.filter( q => q.localidade_id == localidade.value)
      const newQuarteiroesConcluidosPendencia = qrtConcluidosPendenciaTotal.filter( q => q.localidade_id == localidade.value)
      const newQuarteiroesAedesAegypti = qrtAegyptiTotal.filter( q => q.localidade_id == localidade.value)
      const newQuarteiroesAedesAlbopictus = qrtAlbopictustTotal.filter( q => q.localidade_id == localidade.value)
      

      setQuarteiroesTrabalhados( sliceIntoSubArrays(newQuarteiroesTrabalhados, 10) );
      setQuarteiroesConcluidos( sliceIntoSubArrays(newQuarteiroesConcluidos, 10) );
      setQuarteiroesConcluidosPendencia( sliceIntoSubArrays(newQuarteiroesConcluidosPendencia, 10) );
      setQuarteiroesAedesAegypti( sliceIntoSubArrays(newQuarteiroesAedesAegypti, 10) );
      setQuarteiroesAedesAlbopictus( sliceIntoSubArrays(newQuarteiroesAedesAlbopictus, 10) );
    }
    else{
      setQuarteiroesTrabalhados( sliceIntoSubArrays(qrtTrabalhadosTotal, 10) );
      setQuarteiroesConcluidos( sliceIntoSubArrays(qrtConcluidoTotal, 10) );
      setQuarteiroesConcluidosPendencia( sliceIntoSubArrays(qrtConcluidosPendenciaTotal, 10) );
      setQuarteiroesAedesAegypti( sliceIntoSubArrays(qrtAegyptiTotal, 10) );
      setQuarteiroesAedesAlbopictus( sliceIntoSubArrays(qrtAlbopictustTotal, 10) );
    }
  }, [localidade]);

  //Adiconar localidades não repetidas na lista localidades
  function addLocalidadesUnicas( listaLocalidades, listaQuarteiroes ){

    listaQuarteiroes.forEach( q => {
      let localidadeRepetida = false

      for( const loc of listaLocalidades ) {
        if( loc.value == q.localidade_id ){
          localidadeRepetida = true
          break;
        }
      }
      if(!localidadeRepetida)
        listaLocalidades.push({ value: q.localidade_id, label: q.localidade_nome })
    });

    return listaLocalidades
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Boletim Geral da Atividade
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <Col md="6">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº imóveis trabalhados por tipo</h2>
                <Bar data={ imoveisTipoData } />
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
                <h2 className="title">Nº imóveis</h2>
                <Bar data={ numeroImoveisData } />
                <div style={{ marginTop: 10 }}></div>
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
                    <small><b>Fechados</b> - imóveis com vistoria pendente por está fechado</small>
                  </Col>
                  <Col md="12">
                    <small><b>Recuperados</b> - imóveis com vistoria pendente por recusa</small>
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
              {/* <InfoBox className="mb-3 bg-primary template-no-icon text-white">
                <div className="info-box-content">
                  <div className="content-left">
                    <div className="info-title">Agente(s)</div>
                    <div className="info-subtitle">Nº na semana</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdAgente }</span>
                  </div>
                </div>
              </InfoBox> */}
              <InfoBox className="mb-3 bg-info template-no-icon text-white">
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
                    <div className="info-title">Depósito(s)</div>
                    <div className="info-subtitle">Nº depositos</div>
                  </div>
                  <div className="content-right">
                    <span className="info-box-number">{ qtdDeposito }</span>
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
                <h2 className="title">Nº dos quarteirões para serem trabalhados</h2>
                <div className="form-group" style={{ marginTop: "15px", width:"200px"}}>
                  <label>Localidade:</label>
                  <Select
                    styles={ selectDefault }
                    options={ optionsLocalidade }
                    onChange={ option => setLocalidade( option ) }
                    value={ localidade } />
                </div>
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
                              quarteirao.sequencia == null ?
                                <td>{quarteirao.numero}</td>
                              :
                                <td>{quarteirao.numero} / {quarteirao.sequencia}</td>
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
                <div className="form-group" style={{ marginTop: "15px", width:"200px"}}>
                  <label>Localidade:</label>
                  <Select
                    styles={ selectDefault }
                    options={ optionsLocalidade }
                    onChange={ option => setLocalidade( option ) }
                    value={ localidade } />
                </div>
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
                              quarteirao.sequencia == null ?
                                <td>{quarteirao.numero}</td>
                              :
                                <td>{quarteirao.numero} / {quarteirao.sequencia}</td>
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
                <h2 className="title">Nº dos quarteirões concluídos com pendência</h2>
                <div className="form-group" style={{ marginTop: "15px", width:"200px"}}>
                  <label>Localidade:</label>
                  <Select
                    styles={ selectDefault }
                    options={ optionsLocalidade }
                    onChange={ option => setLocalidade( option ) }
                    value={ localidade } />
                </div>
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
                      quarteiroesConcluidosPendencia.map( ( row, index ) => (
                        <tr key={ 'qrt-conc-' + index }>
                          {
                            row.map( ( quarteirao, index ) => (
                              quarteirao.sequencia == null ?
                                <td>{quarteirao.numero}</td>
                              :
                                <td>{quarteirao.numero} / {quarteirao.sequencia}</td>
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
                <h2 className="title">Nº de espécimes por tipo de depósitos</h2>
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
                    <tr>
                      <td>Outros</td>
                      {
                        amostrasPorDepositos.map( ( row, index ) => (
                          <td key={ 'albopictus-' + index }>{ row.value[ 2 ].value }</td>
                        ))
                      }
                      <td>{ amostrasPorDepositos.reduce( ( ac, row ) => ( ac + row.value[ 2 ].value ), 0 ) }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </Col>
          <Col md="12">
            <article className="p-0">
              <div className="card">
                <h2 className="title">Nº de espécimes por tipo de imóvel</h2>
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
                <h2 className="title">Nº de espécimes por estágio</h2>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Mosquito</th>
                      <th>Pupas</th>
                      <th>Larvas</th>
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
                <div className="form-group" style={{ marginTop: "15px", width:"200px"}}>
                  <label>Localidade:</label>
                  <Select
                    styles={ selectDefault }
                    options={ optionsLocalidade }
                    onChange={ option => setLocalidade( option ) }
                    value={ localidade } />
                </div>
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
                              quarteirao.sequencia == null ?
                                <td>{quarteirao.numero}</td>
                              :
                                <td>{quarteirao.numero} / {quarteirao.sequencia}</td>
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
                <div className="form-group" style={{ marginTop: "15px", width:"200px"}}>
                  <label>Localidade:</label>
                  <Select
                    styles={ selectDefault }
                    options={ optionsLocalidade }
                    onChange={ option => setLocalidade( option ) }
                    value={ localidade } />
                </div>
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
                              quarteirao.sequencia == null ?
                                <td>{quarteirao.numero}</td>
                              :
                                <td>{quarteirao.numero} / {quarteirao.sequencia}</td>
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
  boletimAtividade: state.nw_relatorio.boletimAtividade
});

const mapDispatchToProps = {
  changeSidebar,
  getBoletimAtividadeRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( VisualizarRelatorio );
