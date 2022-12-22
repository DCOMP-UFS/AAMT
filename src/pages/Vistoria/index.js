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
import Select from 'react-select';
import LoadingPage from '../../components/LoadingPage';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getRoutesRequest, isFinalizadoRequest, getRoutesReset } from '../../store/Rota/rotaActions';
import { resetHandleSave, routeNotStarted } from '../../store/VistoriaCache/vistoriaCacheActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions'
import { setTrabalhoRotaCache, clearTrabalhoRotaCache } from '../../store/RotaCache/rotaCacheActions';

// STYLES
import { Button, selectDefault } from '../../styles/global';
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

const Vistoria = ( { vistoriasCache, usuario, trabalhoDiario, rota, showNotStarted, ...props } ) => {
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

  //VistoriaCache pode armazena vistorias do trabalhos diario de varios usuarios
  //por isso é necessario coletar as vistorias do trabalho diario do usuario que está logado agora.
  //O estado abaixo armazena a lista de vistorias filtradas
  const [ vistoriasFiltradas, setVistoriasFiltradas ]  = useState( [] );
  
  const [ trabalhosRotasFiltrados, setTrabalhosRotasFiltrados ]   = useState( [] );

  const [ codigoAtividadeOptions, setCodigoAtividadeOptions ]   = useState( [{ value: null, label: '' }] );
  const [ codigoAtividade, setCodigoAtividade ]   = useState( {} );

  const [ isPageLoading, setIsPageLoading ] = useState(true)

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
              else if(trabalhosRotasFiltrados.length == 0){
                props.showNotifyToast("Não existe uma rota para adicionar vistorias",'warning')
              }
              else if(codigoAtividade.value == null){
                props.showNotifyToast("Por favor selecione o codigo da atividade que contem a rota",'warning')
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

  useEffect( () => {
    props.changeSidebar( "vistoria" );

    const [ d, m, Y ]  = new Date().toLocaleDateString().split('/');
    const current_date = `${ Y }-${ m }-${ d }`;

    props.getRoutesRequest( usuario.id, current_date );
    props.resetHandleSave();
  }, [] );

  //Esse useEffect faz com que a pagina fique carregando até que a requisição
  //feita no useEffect acima (atraves do 'props.getRouteRequest') seja finalizada
  useEffect( () => {
    if(props.fl_rotas_encontradas != undefined){
      setIsPageLoading(false)
      props.getRoutesReset()
    }
  }, [ props.fl_rotas_encontradas ] );
  
  useEffect( () => {

    //Busca os trabalhos diarios que faltam ser finalizados
    const trabalhosRotasFilter = props.todosTrabalhosRotas.filter( 
      elem => elem.trabalhoDiario.horaInicio != null && elem.trabalhoDiario.horaFim == null
    )

    setCodigoAtividadeOptions( trabalhosRotasFilter.map( (elem,index) => ( { 
      value: index, 
      label: elem.trabalhoDiario.atividade.id+" ( Metodologia - "+elem.trabalhoDiario.atividade.metodologia.sigla+" )" 
    } )) )

    //Caso exista um trabalho diario armazenado no cache
    if(trabalhoDiario.id){
      // verifica se o trabalho diario do cache ainda pertence à lista de trabalhos que devem ser finalizados hoje
      const index = trabalhosRotasFilter.findIndex( elem => ( elem.trabalhoDiario.id == trabalhoDiario.id ) )

      if(index != -1){
        const codigoOption = { 
          value: index, 
          label: trabalhosRotasFilter[index].trabalhoDiario.atividade.id+" ( Metodologia - "+trabalhosRotasFilter[index].trabalhoDiario.atividade.metodologia.sigla+" )"  
        }
        setCodigoAtividade(codigoOption)
      }
      else{
        setCodigoAtividade({value: null, label: ' ' })
        //limpa o trabalho diario do cache e a sua respectiva rota
        props.clearTrabalhoRotaCache()
      }
    }

    setTrabalhosRotasFiltrados(trabalhosRotasFilter)

  }, [props.todosTrabalhosRotas] );

  useEffect( () => {
    if(codigoAtividade.value != null){
      const trabalhoDiario = trabalhosRotasFiltrados[codigoAtividade.value].trabalhoDiario
      const rota = trabalhosRotasFiltrados[codigoAtividade.value].rota
      props.setTrabalhoRotaCache(trabalhoDiario,rota)
    }
  }, [codigoAtividade] );

  useEffect( () => {
    const createRows = () => {
      let vists = []
      let filtragem = []

      if(trabalhoDiario.id)
        filtragem = vistoriasCache.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario.id)

      setVistoriasFiltradas(filtragem)
      
      //Apenas as vistorias do trabalho diario atual são mostradas
      filtragem.forEach( ( vistoria, index ) => {
          vists.push([
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
          ])
      } );
      setRows( vists );
    }

    createRows();
  }, [ vistoriasCache, props.reload, trabalhoDiario ] );

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
    else
      setImoveis( [] );
  }, [ rota ] );

  function openModalFinalizarRota() {
    if(codigoAtividade.value == null)
      props.showNotifyToast("Por favor selecione o codigo da atividade que contem a rota","warning")
    else{
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
  }
  if(isPageLoading){
    return(<LoadingPage/>)
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
              {( () => 
                {
                  if(trabalhosRotasFiltrados.length == 0){
                    return (
                      <Row>
                        <Col className="d-flex align-items-center">
                          <label className="m-0">
                            Sem rotas para serem finalizadas. Por favor dirija-se para a página de Rota e verifique se existem rotas para serem iniciadas
                          </label>
                        </Col>
                      </Row>
                    )
                  }
                  return (
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
                  )
              }) ()}
            </div>
          </PagePopUp>

          <article className={trabalhosRotasFiltrados.length == 0 ? "d-none" : "col-12"}>
            <div className="card">
            < label htmlFor="codigoAtividade">Selecione o codigo da atividade<code>*</code></label>
              <div style={{width:"30%"}}>
                <Select
                  id="codigoAtividade"
                  styles={ selectDefault }
                  options={ codigoAtividadeOptions }
                  value={ codigoAtividade }
                  onChange={ e => setCodigoAtividade( e ) }
                  required
                />
              </div>
            </div>
          </article>

          <article className="col-12">
            <ProgressBar className="bg-success" percentage={ vistoriasFiltradas.length } total={ imoveis.length } />
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
                      const inspection = vistoriasCache.find(vistoria => vistoria.imovel.id === imovel.id );

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
  vistoriasCache: state.vistoriaCache.vistorias,
  showNotStarted: state.vistoriaCache.showNotStarted,
  reload        : state.vistoriaCache.reload,
  isFinalizado  : state.rota.isFinalizado,
  todosTrabalhosRotas:  state.rotaCache.todosTrabalhosRotas,
  manterTrabalhoRota: state.rotaCache.manterTrabalhoRota,
  fl_rotas_encontradas: state.rota.fl_rotas_encontradas
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
  changeSidebar,
  getRoutesRequest,
  resetHandleSave,
  routeNotStarted,
  changeTableSelected,
  isFinalizadoRequest,
  showNotifyToast,
  setTrabalhoRotaCache,
  clearTrabalhoRotaCache,
  getRoutesReset,
}, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Vistoria );
