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
import Select from 'react-select';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';
import { resetShowNotStarted, clearInspection } from '../../store/VistoriaCache/vistoriaCacheActions';
import { clearTrabalhoRotaCache, setTrabalhoRotaCache } from '../../store/RotaCache/rotaCacheActions';
import {
  isFinalizadoRequest,
  setIsFinalizado,
  getRouteRequest,
  isStartedRequest,
  resetOpenModal,
} from '../../store/Rota/rotaActions';

// STYLES
import { Button, selectDefault } from '../../styles/global';
import { PageIcon, PageHeader, PagePopUp, InfoBox } from '../../styles/util';
import { set } from 'date-fns';

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

const MinhaRota = ( { openModal, fl_iniciada, trabalhoDiario, rota, usuario, vistoriasCache, ...props } ) => {
  const [ trabalhoDiario_date, setTrabalhoDiario_date ] = useState( '' );
  const [ viewport, setViewport ]                       = useState( {
    width:      '100%',
    height:     '100%',
    latitude:   -15.7801,
    longitude:  -47.9292,
    zoom:       2
  } );
  const [ qtdTipoImovel, setQtdTipoImovel ]                       = useState( [ 0, 0, 0, 0 ] );
  const [ imoveis, setImoveis ]                                   = useState( [] );
  const [ rows, setRows ]                                         = useState( [] );

  //Contem todas as rotas que ainda não foram iniciadas e seu respectivos dados do trabalho diario
  const [ trabalhosRotasFiltrados, setTrabalhosRotasFiltrados ]   = useState( [] );

  //Armazena o index de cada elemento do array 'trabalhosRotasFiltrados' e o respectivo codigo da atividade
  //do trabalho diario
  const [ codigoAtividadeOptions, setCodigoAtividadeOptions ]   = useState( [{ value: null, label: '' }] );
  const [ codigoAtividade, setCodigoAtividade ]   = useState( {} );

  const [ entrouPagina, setEntrouPagina] = useState ( true )
  const [ openModalIniciarRota, setOpenModalIniciarRota] = useState ( false )

  const options                                         = {
    selectableRows: 'none'
  };

  //VistoriaCache pode armazena vistorias do trabalhos diario de varios usuarios
  //por isso é necessario coletar as vistorias do trabalho diario do usuario que está logado agora.
  //O estado abaixo armazena a lista de vistorias filtradas
  const [ vistoriasFiltradas, setVistoriasFiltradas ]  = useState( [] );

  //Use effect que serve para resetar
  //a pagina toda que que é acessada
  useEffect( () => {
    if(entrouPagina){
      setEntrouPagina(false)
      props.clearTrabalhoRotaCache()
    }
  } )

  useEffect( () => {
    const initHome = () => {
      const [ d, m, Y ]  = new Date().toLocaleDateString().split( '/' );
      const current_date = `${ Y }-${ m }-${ d }`;
      
      props.changeSidebar( "rota" );

      //Irá busca todos as rotas e seus repectivos trabalhos diarios agendados para hoje
      //Será armazenado no state "todosTrabalhosRotas" no rotaCacheReduce
      props.getRouteRequest( usuario.id, current_date );
      //props.clearInspection()
    }

    initHome();
  }, [] );

  useEffect( () => {
    const trabalhosRotasFilter = props.todosTrabalhosRotas.filter( elem => elem.trabalhoDiario.horaInicio == null)

    setCodigoAtividadeOptions( trabalhosRotasFilter.map( (elem,index) => ( { value: index, label: elem.trabalhoDiario.atividade.id } )) )

    setTrabalhosRotasFiltrados(trabalhosRotasFilter)
    //setIsCarregandoPagina(false)
  }, [props.todosTrabalhosRotas] );

  useEffect( () => {
    if(codigoAtividade.value != null){
      const trabalhoDiario = trabalhosRotasFiltrados[codigoAtividade.value].trabalhoDiario
      const rota = trabalhosRotasFiltrados[codigoAtividade.value].rota
      props.setTrabalhoRotaCache(trabalhoDiario,rota)
    }
  }, [codigoAtividade] );


  /**
   * Este effect verifica se existe algum trabalho diário valido em cache
   * caso tenha, seta a data, caso não limpa o cache.
   */
 /*  useEffect( () => {
    if( Object.entries( trabalhoDiario ).length > 0 ) {
      let date = trabalhoDiario.data.split( 'T' )[ 0 ].split( '-' );

      setTrabalhoDiario_date( `${ date[ 2 ] }/${ date[ 1 ] }/${ date[ 0 ] }` );
    } else {
      props.clearInspection(null);
    }
  }, [ trabalhoDiario ] ); */

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
      let filtragem = vistoriasCache.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario.id)
      setVistoriasFiltradas(filtragem)
      
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
   * Verica se o codigo da atividade que contem a rota
   * foi selecionado pelo usuario
   */
  const checkRota = () => {
    if(codigoAtividade.value != null){
      setOpenModalIniciarRota(true)
      {$('#modal-iniciar-rota').modal( 'show' )}
    }
    else
      props.showNotifyToast('Por favor selecione o codigo da atividade!', 'warning')
  }
  
  /**
   * Função que checa a situação do trabalho diário e retorna um componente
   * de notificação ao usuário
   * @returns {Component}
   */
  const informacoesRota = () => {   
    
    const [ d, m, Y ]  = new Date().toLocaleDateString().split( '/' );
    const current_date = `${ d }/${ m }/${ Y }`;

    if( props.todosTrabalhosRotas.length == 0 ) {
      return (
        <label className="m-0">Você não possui nenhuma rota em aberto para hoje ({current_date})</label>
      );
    } else if ( trabalhosRotasFiltrados.length == 0 ) {
      return (
        <label className="m-0">Você já iniciou todas as rotas de hoje ({current_date}). Por favor dirija-se para a página de Vistorias para finaliza-las!</label>
      );
    } else {
      return (
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <label className="m-0">
              <mark className="bg-warning mr-2">Atenção</mark>
              { `Você possui ${trabalhosRotasFiltrados.length}  rota(s) planejada(s) em aberto para hoje (${ current_date })!`}
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

  const cardAtividade = () => {

    if(props.todosTrabalhosRotas.length != 0 && trabalhosRotasFiltrados.length != 0){
      return (
        <article className="col-12">
          <div className="card">
            <label htmlFor="codigoAtividade">Selecione o codigo da atividade<code>*</code></label>
                <Select
                  id="codigoAtividade"
                  styles={ selectDefault }
                  options={ codigoAtividadeOptions }
                  value={ codigoAtividade }
                  onChange={ e => setCodigoAtividade( e ) }
                  required
                />
          </div>
        </article>
      )
    }
    else
        return <div></div>  
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
        <ModalIniciarTrabalho 
          id="modal-iniciar-rota" 
          isOpen={ openModalIniciarRota } 
          handleClose = { () => {setOpenModalIniciarRota(false)} }
          />
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
          {
          cardAtividade()
          }
          <article className="col-12">
            <ProgressBar className="bg-success" percentage={ vistoriasFiltradas.length } total={ imoveis.length } />
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
                    const inspection = vistoriasCache.find( vistoria => vistoria.imovel.id === imovel.id );

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
  usuario:              state.appConfig.usuario,
  trabalhoDiario:       state.rotaCache.trabalhoDiario,
  rota:                 state.rotaCache.rota,
  vistoriasCache:       state.vistoriaCache.vistorias,
  todosTrabalhosRotas:  state.rotaCache.todosTrabalhosRotas,
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
    clearTrabalhoRotaCache,
    isFinalizadoRequest,
    setIsFinalizado,
    setTrabalhoRotaCache,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( MinhaRota );
