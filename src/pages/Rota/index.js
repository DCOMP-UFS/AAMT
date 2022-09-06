import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaRoute, FaPlay, FaHome, FaHouseDamage, FaStore, FaMapMarkerAlt } from 'react-icons/fa';
import ModalIniciarTrabalho from '../../components/ModalIniciarTrabalho';
import dotenv from 'dotenv';
import ReactMapGL, { Marker } from 'react-map-gl';
import img_home_icon from '../../assets/home-icon.png';
import img_home_icon_green from '../../assets/home-icon-green.png';
import Typography from "@material-ui/core/Typography";
import Table from '../../components/Table';
import ProgressBar from '../../components/ProgressBar';
import { tipoImovelEnum } from '../../config/enumerate';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';
import { resetShowNotStarted, clearInspection } from '../../store/VistoriaCache/vistoriaCacheActions';
import { clearRotaCache } from '../../store/RotaCache/rotaCacheActions';
import {
  isFinalizadoRequest,
  setIsFinalizado,
  getRouteRequest,
  isStartedRequest,
  resetOpenModal
} from '../../store/Rota/rotaActions';

// STYLES
import { Button } from '../../styles/global';
import { PageIcon, PageHeader, PagePopUp, InfoBox } from '../../styles/util';

dotenv.config();

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      filter: false,
      display: 'false',
      customBodyRender: ( value, tableMeta, updateValue ) => (
        <Typography data-index={ value }>{ value }</Typography>
      )
    }
  },
  {
    name: "numImovel",
    label: "Nº",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "seqImovel",
    label: "Seq.",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "tipoImovel",
    label: "Tipo",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "lado",
    label: "Rua",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "quarteirao",
    label: "Quart.",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  }
];

const MinhaRota = ( { openModal, fl_iniciada, trabalhoDiario, rota, usuario, vistorias, ...props } ) => {
  const [ trabalhoDiario_date, setTrabalhoDiario_date ] = useState( '' );
  const [ viewport, setViewport ]                       = useState( {
    width:      '100%',
    height:     '100%',
    latitude:   -15.7801,
    longitude:  -47.9292,
    zoom:       2
  } );
  const [ qtdTipoImovel, setQtdTipoImovel ]             = useState( [ 0, 0, 0, 0 ] );
  const [ imoveis, setImoveis ]                         = useState( [] );
  const [ rows, setRows ]                               = useState( [] );
  const options                                         = {
    selectableRows: 'none'
  };

  useEffect( () => {
    const initHome = () => {
      const [ d, m, Y ]  = new Date().toLocaleDateString().split( '/' );
      const current_date = `${ Y }-${ m }-${ d }`;
      
      props.changeSidebar( "rota" );
      props.getRouteRequest( usuario.id, current_date );
      //props.clearInspection()
    }

    initHome();
  }, [] );

  useEffect(() => {
    if( props.showNotStarted ) {
      if( !trabalhoDiario.id ) props.showNotifyToast( "Você não possui uma rota planejada para hoje!", "warning" );
      if( !trabalhoDiario.horaInicio ) props.showNotifyToast( "Você deve iniciar a rota antes de registrar as vistorias!", "warning" );

      setTimeout( () => { props.resetShowNotStarted() }, 500 );
    }
  }, [ props.showNotStarted, trabalhoDiario.horaInicio, trabalhoDiario.id ] );

  useEffect( () => {
    if( fl_iniciada ) // consultando os dados da rota, a rota back end já faz verificação se está iniciado ou n.
      window.location = window.location.origin.toString() + '/vistoria';
  }, [ fl_iniciada ] );

  useEffect( () => {
    if( openModal && trabalhoDiario.id ) {
      $('#modal-iniciar-rota').modal( 'show' );
      props.resetOpenModal();
    }
  }, [ openModal, trabalhoDiario.id ] );

  /**
   * Este effect verifica se existe algum trabalho diário valido em cache
   * caso tenha, seta a data, caso não limpa o cache.
   */
  useEffect( () => {
    if( Object.entries( trabalhoDiario ).length > 0 ) {
      let date = trabalhoDiario.data.split( 'T' )[ 0 ].split( '-' );

      setTrabalhoDiario_date( `${ date[ 2 ] }/${ date[ 1 ] }/${ date[ 0 ] }` );
    } else {
      props.clearInspection();
    }
  }, [ trabalhoDiario ] );

  useEffect( () => {
    if( rota.length > 0 ) {
      let imo = [];

      rota.forEach( q => {
        q.lados.forEach( l => {
          let i = l.imoveis.map( imovel => ( { ...imovel, rua: l.rua.nome, quarteirao: q.numero } ) );

          imo = [ ...i, ...imo ];
        } );
      } );

      setViewport( {
        width:      '100%',
        height:     '100%',
        latitude:   imo[ 0 ].lat ? parseFloat( imo[ 0 ].lat ) : -15.7801,
        longitude:  imo[ 0 ].lng ? parseFloat( imo[ 0 ].lng ) : -47.9292,
        zoom:       14
      } );
      setImoveis( imo );
    }
  }, [ rota ] );

  useEffect( () => {
    function createRows() {
      let qtdTipo = [ 0, 0, 0, 0 ];
      const imovs = imoveis.map( ( imovel, index ) => {
        switch( imovel.tipoImovel ) {
          case 1: qtdTipo[ 0 ]++; break; // Residêncial
          case 2: qtdTipo[ 1 ]++; break; // Terreno Baldio
          case 3: qtdTipo[ 2 ]++; break; // Comercial
          default: qtdTipo[ 3 ]++; break; // Ponto Estratégico
        }

        const tipoImovel = tipoImovelEnum.find( tipo => imovel.tipoImovel === tipo.id );

        return (
          [
            index,
            imovel.numero,
            imovel.sequencia ? imovel.sequencia : '',
            tipoImovel.label,
            imovel.rua,
            imovel.quarteirao,
          ]
        )
      } );

      setRows( imovs );
      setQtdTipoImovel( qtdTipo );
    }

    createRows();
  }, [ imoveis ] );

  /**
   * Este effect monitora a variável isFinalizado, caso ela seja true
   * significa que o trabalho diário salvo em cache já está finalizado na base
   * de dados e não deve ser permitido cadastrar novas vistorias
   */
   useEffect(() => {
    const checkFinalizado = () => {
      if( props.isFinalizado ) {
        const [ d, m, Y ]  = new Date().toLocaleDateString().split( '/' );
        const current_date = `${ Y }-${ m }-${ d }`;
        
        props.clearRotaCache();
        props.setIsFinalizado( undefined );
        props.getRouteRequest( usuario.id, current_date );
      }
    }

    checkFinalizado();
  }, [ props.isFinalizado ] );

  /**
   * Verica se o trabalho diário foi startado.
   */
  function checkRota() {
    props.isStartedRequest( trabalhoDiario.id );
  }
  
  /**
   * Função que checa a situação do trabalho diário e retorna um componente
   * de notificação ao usuário
   * @returns {Component}
   */
  const informacoesRota = () => {    
    if( typeof trabalhoDiario.id === 'undefined' ) {
      return (
        <label className="m-0">Você não possui nenhuma rota em aberto!</label>
      );
    } else if ( trabalhoDiario.horaInicio ) {
      return (
        <label className="m-0">Você possui uma rota iniciada, realize as vistorias e finalize a rota antes de iniciar uma nova rota!</label>
      );
    } else {
      return (
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <label className="m-0">
              <mark className="bg-warning mr-2">Atenção</mark>
              { `Você possui uma rota planejada em aberto, ${ trabalhoDiario_date }!`}
            </label>
            <Button
              type="button"
              className="success btn-small"
              onClick={ checkRota }>
              <FaPlay className="btn-icon"
            />
              Iniciar Rota
            </Button>
          </Col>
        </Row>
      );
    }
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaRoute /></PageIcon>
          Planejamento do Dia
        </h3>
      </PageHeader>

      <section className="card-list">
        <ModalIniciarTrabalho id="modal-iniciar-rota" />
        <Row>
          <PagePopUp className="w-100 col-12">
            <div className="card">
              {
                informacoesRota()
              }
            </div>
          </PagePopUp>
        </Row>

        <Row>
          <article className="col-12">
            <ProgressBar className="bg-success" percentage={ vistorias.length } total={ imoveis.length } />
          </article>
          <article className="col-md-8">
            <div className="card" style={ { height: '350px' } }>
              <ReactMapGL
                { ...viewport }
                onViewportChange={ nextViewport => setViewport( nextViewport ) }
                mapboxApiAccessToken={ process.env.REACT_APP_MAP_TOKEN }
              >
                {
                  rota.map( r => r.lados.map( lado => lado.imoveis.map(( imovel, index ) => {
                    const inspection = vistorias.find( vistoria => vistoria.imovel.id === imovel.id );

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
          </article>
          <article className="col-md-4">
            <InfoBox className="mb-3 bg-info">
              <span className="info-box-icon"><FaHome /></span>

              <div className="info-box-content">
                <span className="info-box-text">Residências</span>
                <span className="info-box-number">{ qtdTipoImovel[ 0 ] }</span>
              </div>
            </InfoBox>
            <InfoBox className="mb-3 bg-danger">
              <span className="info-box-icon"><FaHouseDamage /></span>

              <div className="info-box-content">
                <span className="info-box-text">Terreno Baldio</span>
                <span className="info-box-number">{ qtdTipoImovel[ 1 ] }</span>
              </div>
            </InfoBox>
            <InfoBox className="mb-3 bg-warning">
              <span className="info-box-icon"><FaStore /></span>

              <div className="info-box-content">
                <span className="info-box-text">Comercial</span>
                <span className="info-box-number">{ qtdTipoImovel[ 2 ] }</span>
              </div>
            </InfoBox>
            <InfoBox className="bg-primary">
              <span className="info-box-icon"><FaMapMarkerAlt /></span>

              <div className="info-box-content">
                <span className="info-box-text">Ponto estratégico</span>
                <span className="info-box-number">{ qtdTipoImovel[ 3 ] }</span>
              </div>
            </InfoBox>
          </article>
          <article className="col-12">
            <div className="card">
              <Table
                className="table-rounded-none"
                title="Imóveis"
                columns={ columns }
                data={ rows }
                options={ options } />
            </div>
          </article>
        </Row>
      </section>
    </>
  );
}

const mapStateToProps = state => ( {
  usuario:        state.appConfig.usuario,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  rota:           state.rotaCache.rota,
  fl_iniciada:    state.rota.fl_iniciada,
  openModal:      state.rota.openModal,
  showNotStarted: state.vistoriaCache.showNotStarted,
  vistorias:      state.vistoriaCache.vistorias,
  isFinalizado:   state.rota.isFinalizado,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    changeSidebar,
    getRouteRequest,
    isStartedRequest,
    showNotifyToast,
    resetShowNotStarted,
    resetOpenModal,
    clearInspection,
    clearRotaCache,
    isFinalizadoRequest,
    setIsFinalizado,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( MinhaRota );
