import React, { useEffect, useState } from 'react';
import { FaClipboardCheck, FaCheckDouble } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import Typography from "@material-ui/core/Typography";
import Table, { ButtonAdd, ButtonDelete } from '../../components/Table';
import dotenv from 'dotenv';
import ModalFinalizarTrabalho from '../../components/ModalFinalizarTrabalho';
import ModalDeletar from './ModalDeletar';
import { tipoImovel as tipoImovelEnum } from '../../config/enumerate';
import ProgressBar from '../../components/ProgressBar';
import ReactMapGL, { Marker } from 'react-map-gl';
import img_home_icon from '../../assets/home-icon.png';
import img_home_icon_green from '../../assets/home-icon-green.png';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getRouteRequest } from '../../store/Rota/rotaActions';
import { resetHandleSave, routeNotStarted } from '../../store/VistoriaCache/vistoriaCacheActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { isFinalizadoRequest } from '../../store/Rota/rotaActions';
import {showNotifyToast} from '../../store/AppConfig/appConfigActions'

// STYLES
import { Button } from '../../styles/global';
import { PageIcon, PageHeader, PagePopUp } from '../../styles/util';
import { Container } from './styles';

dotenv.config();

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
      sortDirection: 'desc',
      align: "left",
      disablePadding: false
    }
  }
];

const Vistoria = ( { vistorias, usuario, trabalhoDiario, rota, showNotStarted, ...props } ) => {
  const [ rows, setRows ]         = useState( [] );
  const [ imoveis, setImoveis ]   = useState( [] );
  const [ viewport, setViewport ] = useState( {
    width     : '100%',
    height    : '100%',
    latitude  : -10.968002,
    longitude : -37.081680,
    zoom      : 14
  } );
  const [ultimoHorarioVistoria, setUltimoHorarioVistoria] = useState(null)

  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar Vistoria"
          onClick={
            () => {
              if( rows.length < imoveis.length ){
                window.location.href = (
                  window.location.origin.toString() +
                  "/vistoria/cadastrar"
                );
              }
              else{
                props.showNotifyToast("Todos os imoveis ja foram vistoriados",'warning')
              }
            }
          }/>
      );
    },
    customToolbarSelect: ( { data } ) => {
      props.changeTableSelected( 'tableVistoria', data );
      return (
        <ButtonDelete
          title       ="Deletar Vistoria(s)"
          data-toggle ="modal"
          data-target ="#modal-deletar-vistoria"
          data        ={ data } 
        />
      );
    },
    onRowClick: ( row, ...props ) => {
      const index = row[ 0 ].props[ 'data-index' ];

      window.location = `${ window.location.origin.toString() }/vistoria/editar/${ index }`;
    },
  };

  /**
   * Este effect é acionado assim que o componente e montado e verifica se existe
   * algum trabalho diário iniciado e, se sim, se a rota de trabalho já foi 
   * finalizada na base
   */
  useEffect( () => {
    const initVistoria = () => {
      if( trabalhoDiario.id ) {
        props.isFinalizadoRequest( trabalhoDiario.id );
      }
    }

    initVistoria();
  }, [] );

  /**
   * Este effect monitora a variável isFinalizado, caso ela seja true
   * significa que o trabalho diário salvo em cache já está finalizado na base
   * de dados e não deve ser permitido cadastrar novas vistorias
   */
  useEffect( () => {
    const checkFinalizado = () => {
      if( props.isFinalizado ) {
        window.location = window.location.origin + '/rota';
      }
    }

    checkFinalizado();
  }, [ props.isFinalizado ] );

  /**
   * Este effect monitora a variável showNotStarted que verifica se a rota de 
   * trabalho foi iniciada
   */
  useEffect( () => {
    if( showNotStarted )
      setTimeout( () => { window.location = window.location.origin + '/rota'; }, 300 );
  }, [ showNotStarted ] );

  useEffect( () => {
    const createRows = () => {
      const vists = vistorias.map( ( vistoria, index ) => (
        [
          index,
          vistoria.imovel.numeroQuarteirao,
          vistoria.imovel.logradouro,
          vistoria.imovel.numero,
          vistoria.imovel.sequencia,
          tipoImovelEnum[
            Object.entries( tipoImovelEnum ).find( ( [ key, value ] ) => value.id === vistoria.imovel.tipoImovel )[ 0 ]
          ].sigla,
          vistoria.situacaoVistoria === "N" ? "Normal" : "Recuperada",
          vistoria.pendencia ? ( vistoria.pendencia === "F" ? "Fechada" : "Recusada" ) : "",
          vistoria.horaEntrada
        ]
      ) );
      setRows( vists );
    }

    createRows();
  }, [ vistorias, props.reload ] );

  useEffect(() => {
    if( !trabalhoDiario.id ) {
      props.routeNotStarted();
    } else if( !trabalhoDiario.horaInicio ) {
      props.routeNotStarted();
    }

    props.changeSidebar( "vistoria" );

    const [ d, m, Y ]  = new Date().toLocaleDateString().split('/');
    const current_date = `${ Y }-${ m }-${ d }`;

    props.getRouteRequest( usuario.id, current_date );
    props.resetHandleSave();
  }, [ trabalhoDiario.horaInicio, trabalhoDiario.id, usuario.id ] );

  // pegando a lista de imóveis planejados para trabalho
  useEffect( () => {
    if( rota.length > 0 ) {
      let imo = [];

      rota.forEach( q => {
        q.lados.forEach( l => {
          let i = l.imoveis.map(imovel => ( { ...imovel, rua: l.rua.nome, quarteirao: q.numero } ) );

          imo = [ ...i, ...imo ];
        } );
      } );

      setViewport( {
        width     : '100%',
        height    : '100%',
        latitude  : imo[ 0 ].lat ? parseFloat( imo[ 0 ].lat ) : -15.7801,
        longitude : imo[ 0 ].lng ? parseFloat( imo[ 0 ].lng ) : -47.9292,
        zoom      : 14
      } );
      setImoveis( imo );
    }
  }, [ rota ] );

  function openModalFinalizarRota() {
    let ultimoHorario = ""
    //Procura o horario da ultima vistoria
    rows.forEach( l => {
      if(l[8] > ultimoHorario)
        ultimoHorario = l[8]
    } )
    if(ultimoHorario != "")
      setUltimoHorarioVistoria(ultimoHorario)
    else
      setUltimoHorarioVistoria(null)
      
    $('#modal-finalizar-rota').modal( 'show' );
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaClipboardCheck /></PageIcon>
          Vistoria de Campo
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <PagePopUp className="w-100 col-12">
            <div className="card">
              <Row>
                <Col className="d-flex align-items-center">
                  <Button
                    type      ="button"
                    className ="success btn-small mr-2"
                    onClick   ={ openModalFinalizarRota }
                  >
                    <FaCheckDouble className="btn-icon" />
                    Encerrar Rota
                  </Button>

                  <label className="m-0">
                    Após finalizar a rota não será mais possível modificar os dados das vistorias!
                  </label>
                </Col>
              </Row>
            </div>
          </PagePopUp>

          <article className="col-12">
            <ProgressBar className="bg-success" percentage={ vistorias.length } total={ imoveis.length } />
          </article>

          <article className="col-md-12">
            <div className="card">
              <div style={ { height: '300px', width: '100%', backgroundColor: '#ccc' } }>
                <ReactMapGL
                  { ...viewport }
                  onViewportChange    ={ nextViewport => setViewport( nextViewport ) }
                  mapboxApiAccessToken={ process.env.REACT_APP_MAP_TOKEN }
                >
                  {
                    rota.map( r => r.lados.map( lado => lado.imoveis.map( ( imovel, index ) => {
                      const inspection = vistorias.find(vistoria => vistoria.imovel.id === imovel.id );

                      return (
                        <Marker
                          key       ={ index }
                          latitude  ={ parseFloat( imovel.lat ) }
                          longitude ={ parseFloat( imovel.lng ) }
                          offsetLeft={ -20 }
                          offsetTop ={ -10 }
                        >
                          <img
                            src={
                              inspection ? img_home_icon_green : img_home_icon
                            }
                            width="25"
                            alt="Carregando"
                          />
                        </Marker>
                      )
                    } ) ) )
                  }
                </ReactMapGL>
              </div>
            </div>
          </article>
        </Row>
        <Row>
          <article className="col-md-12 stretch-card mb-0">
              <Col className="p-0">
                <Table
                  title="Vistorias Realizadas"
                  columns={ columns }
                  data={ rows }
                  options={ options } />
              </Col>
          </article>
        </Row>
        
        {/* 
          horarioUltimaVistoria armazena o horario da ultima vistoria, sendo que recebe null
          caso não exista vistoria
         */}
        <ModalFinalizarTrabalho id="modal-finalizar-rota" horarioUltimaVistoria={ultimoHorarioVistoria} />
        <ModalDeletar />
      </section>
    </Container>
  );
}

const mapStateToProps = state => ( {
  usuario       : state.appConfig.usuario,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  rota          : state.rotaCache.rota,
  quarteirao    : state.quarteirao.quarteirao,
  form_vistoria : state.supportInfo.form_vistoria,
  vistorias     : state.vistoriaCache.vistorias,
  showNotStarted: state.vistoriaCache.showNotStarted,
  reload        : state.vistoriaCache.reload,
  isFinalizado  : state.rota.isFinalizado,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
  changeSidebar,
  getRouteRequest,
  resetHandleSave,
  routeNotStarted,
  changeTableSelected,
  isFinalizadoRequest,
  showNotifyToast
}, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Vistoria );
