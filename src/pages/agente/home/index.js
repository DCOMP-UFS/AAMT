import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaRoute, FaPlay } from 'react-icons/fa';
import ModalIniciarTrabalho from '../components/ModalIniciarTrabalho';
import RouteList from '../components/RouteList';
import ReactMapGL, { Marker } from 'react-map-gl';
import dotenv from 'dotenv';
import img_home_icon from '../../../assets/home-icon.png';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarAgente';
import { getRouteRequest, isStartedRequest, resetOpenModal } from '../../../store/actions/RotaActions';
import { showNotifyToast } from '../../../store/actions/appConfig';
import { resetShowNotStarted } from '../../../store/actions/VistoriaCacheActions';

// STYLES
import { Button } from '../../../styles/global';
import { PageIcon, PageHeader, PagePopUp, NumberDash } from '../../../styles/util';
import { tr } from 'date-fns/locale';

dotenv.config();

function HomeAgente({ openModal, fl_iniciada, trabalhoDiario, rota, usuario, ...props }) {
  const [ trabalhoDiario_date, setTrabalhoDiario_date ] = useState( '' );
  const [ viewport, setViewport ] = useState({
    width: '100%',
    height: '100%',
    latitude: -10.968002,
    longitude: -37.081680,
    zoom: 14
  });
  const [ qtdQuarteirao, setQtdQuarteirao ] = useState( 0 );
  const [ imoveis, setImoveis ] = useState( [] );

  useEffect(() => {
    props.changeSidebar(1, 1);

    const [ d, m, Y ]  = new Date().toLocaleDateString('en-GB').split('/');
    const current_date = `${Y}-${m}-${d}`;

    props.getRouteRequest( usuario.id, current_date );
  }, []);

  useEffect(() => {
    if( props.showNotStarted ) {
      if( !trabalhoDiario.id ) props.showNotifyToast( "Você não possui uma rota planejada para hoje!", "warning" );
      if( !trabalhoDiario.horaInicio ) props.showNotifyToast( "Você deve iniciar a rota antes de registrar as vistorias!", "warning" );

      setTimeout(() => { props.resetShowNotStarted() }, 500);
    }
  }, [ props.showNotStarted ]);

  useEffect(() => {
    if( fl_iniciada ) // consultando os dados da rota, a rota back end já faz verificação se está iniciado ou n.
      window.location = window.location.origin.toString() + '/agente/vistoria';
  }, [ fl_iniciada ]);

  useEffect(() => {
    if( openModal && trabalhoDiario.id ) {
      $('#modal-iniciar-rota').modal('show');
      props.resetOpenModal();
    }
  }, [ openModal ]);

  useEffect(() => {
    let date = trabalhoDiario.data.split( 'T' )[ 0 ].split( '-' );

    setTrabalhoDiario_date( `${ date[ 2 ] }/${ date[ 1 ] }/${ date[ 0 ] }` );
  }, [ trabalhoDiario ]);

  useEffect(() => {
    let imo = [];

    rota.forEach(q => {
      q.lados.forEach(l => {
        let i = l.imoveis.map(imovel => ({ ...imovel, rua: l.rua.nome, quarteirao: q.numero }));

        imo = [ ...i, ...imo ];
      });
    });

    setImoveis( imo );
  }, [ rota ]);

  function checkRota() {
    props.isStartedRequest( trabalhoDiario.id );
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
          <PagePopUp className="w-100">
            <div className="card">
              {
                typeof trabalhoDiario.id === 'undefined' ?
                  (
                    <label className="m-0">Você não possui uma rota planejada para hoje!</label>
                  ) :
                  (
                    <Row>
                      <Col className="d-flex justify-content-between align-items-center">
                        <label className="m-0">
                          <mark className="bg-warning mr-2">Atenção</mark>
                          { `Você possui uma rota planejada para hoje, ${ trabalhoDiario_date }!`}
                        </label>
                        <Button
                          type="button"
                          className="success btn-small"
                          onClick={ checkRota }>
                          <FaPlay className="btn-icon" />
                          Iniciar Rota
                        </Button>
                      </Col>
                    </Row>
                  )
              }
            </div>
          </PagePopUp>
        </Row>
        <Row>
          <article className="col-md-12 stretch-card">
            <div className="card">
              <Row className="mb-3">
                <Col md="6" style={{ maxheight: '350px' }}>
                  <RouteList quarteiroes={ rota } />
                </Col>
                <Col md="6" style={{ height: '350px' }}>
                  <ReactMapGL
                    {...viewport}
                    onViewportChange={ nextViewport => setViewport( nextViewport ) }
                    mapboxApiAccessToken={ process.env.REACT_APP_MAP_TOKEN }
                  >
                    {
                      imoveis.map(( imovel, index ) => (
                        <Marker
                          key={ index }
                          latitude={ parseFloat( imovel.lat ) }
                          longitude={ parseFloat( imovel.lng ) }
                          offsetLeft={ -20 }
                          offsetTop={ -10 }
                        >
                          <img
                            src={ img_home_icon }
                            width="25"
                            alt="Carregando"
                          />
                        </Marker>
                      ))
                    }
                  </ReactMapGL>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Row>
                    <NumberDash className="col border-r margin-b">
                      <h5 className="legend">Quarteiroes</h5>
                      <h4>{ rota.length }</h4>
                    </NumberDash>
                    <NumberDash className="col margin-b">
                      <h5 className="legend">Vistorias/Imóveis</h5>
                      <h4>{ `0/${ imoveis.length }` }</h4>
                    </NumberDash>
                  </Row>
                </Col>
                <Col md="6" xs="12">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Nº</th>
                        <th scope="col">Seq.</th>
                        <th scope="col">Rua</th>
                        <th scope="col">Quart.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        imoveis.map(( imovel, index ) => (
                          <tr key={ index }>
                            <td>{ imovel.numero }</td>
                            <td>{ imovel.sequencia ? imovel.sequencia : '' }</td>
                            <td>{ imovel.rua }</td>
                            <td>{ imovel.quarteirao }</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>
          </article>
        </Row>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  usuario:        state.appConfig.usuario,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  rota:           state.rotaCache.rota,
  fl_iniciada:    state.rota.fl_iniciada,
  openModal:      state.rota.openModal,
  showNotStarted: state.vistoriaCache.showNotStarted
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getRouteRequest,
    isStartedRequest,
    showNotifyToast,
    resetShowNotStarted,
    resetOpenModal
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeAgente);
