import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaChartPie, FaSearch } from 'react-icons/fa';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from '../../../components/Table';
import Typography from "@material-ui/core/Typography";
import { tipoImovel as tipoImovelEnum } from '../../../config/enumerate';
import { tipoRecipiente as tipoRecipienteEnum } from '../../../config/enumerate';
import Pie from '../../../components/Charts/Pie';
import Bar from '../../../components/Charts/Bar';
import Select from 'react-select';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarAgente';
import { getInspectsRequest } from '../../../store/actions/VistoriaActions';

// STYLES
import { Color, Button, selectDefault } from '../../../styles/global';
import { PageIcon, PageHeader, PagePopUp, NumberDash } from '../../../styles/util';

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      filter: false,
      display: 'false',
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography data-index={ value }>{ value }</Typography>
      )
    }
  },
  {
    name: "numQuarteirao",
    label: "Nº do Quart.",
    options: {
      filter: true,
      sortDirection: 'asc',
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "logradouro",
    label: "Logradouro",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "numero",
    label: "Nº",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "sequencia",
    label: "Sequência",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "tipoImovel",
    label: "Tipo do Imóvel",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "visita",
    label: "Visita",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "pendencia",
    label: "Pendência",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "horaEntrada",
    label: "Hora de entrada",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  }
];

const options = {
  onRowClick: (row, ...props) => {
    const index = row[0].props['data-index'];
    console.log( index );

    // window.location = `${ window.location.origin.toString() }/agente/vistoria/editar/${ index }`;
  }
};

function TrabalhoDiario({ usuario, vistorias, ...props }) {
  const [ tabKey, setTabKey] = useState('relatorio');
  const [ rows, setRows ] = useState([]);
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
          //  A1 A2 B  C  D1 D2 E
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
  const [ optionsTrabalhoDiario, setOptionsTrabalhoDiario ] = useState( [] );
  const [ trabalhoDiario, setTrabalhoDiario ] = useState( {} );

  useEffect(() => {
    props.changeSidebar(3, 2);
    props.getInspectsRequest( usuario.id );
  }, []);

  useEffect(() => {
    filter();
    console.log( vistorias );

    let trabDiario = [],
        optTrabalhoDiario = [];
    vistorias.forEach( vistoria => {
      let pos = trabDiario.indexOf( vistoria.trabalhoDiario.id );
      if( pos === -1 ) {
        trabDiario.push( vistoria.trabalhoDiario.id );

        let data = vistoria.trabalhoDiario.data.split( "T" )[ 0 ].split( "-" );
        optTrabalhoDiario.push({
          value: vistoria.trabalhoDiario.id,
          label:
            `${ data[ 2 ] }/${ data[ 1 ] }/${ data[ 0 ] } - ` +
            `${ vistoria.trabalhoDiario.equipe.atividade.metodologia.sigla } ` +
            `${ vistoria.trabalhoDiario.equipe.atividade.objetivo.sigla }`
        });
      }
    });

    setOptionsTrabalhoDiario( optTrabalhoDiario );
  }, [ vistorias ]);

  useEffect(() => {
    filter();
  }, [ trabalhoDiario ]);

  function filter() {
    let itData        = imoveisTipoData;
    let niData        = numeroImoveisData;
    let dtData        = depositosTipoData;
    let qtdR          = 0;
    let qtdF          = 0;
    let qtdA          = 0;
    let qtdDepTrat    = 0;
    let qtdDepElim    = 0;
    let qtdTratGrama  = 0;
    let totalDep      = 0;

    const filter_vistorias = vistorias.filter( vistoria => {
      if( trabalhoDiario.value ) {
        if( trabalhoDiario.value === vistoria.trabalhoDiario.id ) return true;
        else return false;
      } else {
        return true;
      }
    });

    // Resetando valores
    itData.datasets[ 0 ].data = [ 0, 0, 0, 0 ];
    niData.datasets[ 0 ].data = [ 0, 0, 0 ];
    dtData.datasets[ 0 ].data = [ 0, 0, 0, 0, 0, 0, 0 ];

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

    createRows( filter_vistorias );

    itData.reload = !itData.reload;
    niData.reload = !niData.reload;
    dtData.reload = !dtData.reload;

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

  function createRows( array_vistorias ) {
    const vists = array_vistorias.map( ( vistoria, index ) => {
      return ([
        index,
        vistoria.imovel.lado.quarteirao.numero,
        vistoria.imovel.lado.rua.nome,
        vistoria.imovel.numero,
        vistoria.imovel.sequencia,
        tipoImovelEnum[
          Object.entries( tipoImovelEnum ).find(([ key, value ]) => value.id === vistoria.imovel.tipoImovel )[0]
        ].sigla,
        vistoria.situacaoVistoria === "N" ? "Normal" : "Recuperada",
        vistoria.pendencia ? ( vistoria.pendencia === "F" ? "Fechada" : "Recusada" ) : "",
        vistoria.horaEntrada
      ])
    });

    setRows( vists );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Relatórios
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <Row>
                <Col md="4" className="mb-2">
                  <label htmlFor="trabalhoDiario">Trabalho Diário</label>
                  <Select
                    id="trabalhoDiario"
                    options={ optionsTrabalhoDiario }
                    value={ trabalhoDiario }
                    styles={ selectDefault }
                    onChange={ option => setTrabalhoDiario( option ) } />
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
              <Tab eventKey="relatorio" title="Dashboard">
                <Row>
                  <Col md="4">
                    <article className="p-0">
                      <div className="card">
                        <h2 className="title">Nº imóveis trabalhados por tipo</h2>
                        <Pie data={ imoveisTipoData } />
                      </div>
                    </article>
                  </Col>
                  <Col md="4">
                    <article className="p-0">
                      <div className="card">
                        <h2 className="title">Nº imóveis</h2>
                        <Bar data={ numeroImoveisData } />
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
                            <h4 className="legend">Nº Tubitos/Amostras Coletadas</h4>
                            <h2>{ qtdAmostra }</h2>
                          </NumberDash>
                        </Row>
                      </div>
                    </article>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    <article className="p-0">
                      <div className="card">
                        <h2 className="title">Nº Depósitos Inspecionados, por tipo</h2>
                        <Bar data={ depositosTipoData } />
                      </div>
                    </article>
                  </Col>
                  <Col md="4">
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
              {/* <Tab eventKey="desempenho" title="Desempenho"></Tab> */}
              <Tab eventKey="vistorias" title="Vistorias">
                <Table
                  title="Vistorias"
                  columns={ columns }
                  data={ rows }
                  options={ options } />
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
)( TrabalhoDiario );
