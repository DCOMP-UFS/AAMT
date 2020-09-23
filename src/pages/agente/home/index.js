import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaRoute, FaPlay } from 'react-icons/fa';
import ModalIniciarTrabalho from '../components/ModalIniciarTrabalho';
import RouteList from '../components/RouteList';
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
import { PageIcon, PageHeader, PagePopUp } from '../../../styles/util';

function HomeAgente({ openModal, fl_iniciada, trabalhoDiario, rota, usuario, ...props }) {
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
                    <>
                    <Row className="mb-3">
                      <Col className="d-flex justify-content-between align-items-center">
                        <label className="m-0">
                          <mark className="bg-warning mr-2">Atenção</mark>
                          Você possui uma rota planejada para hoje!
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
                    <Row>
                      <Col md="8" style={{ maxheight: '300px' }}>
                        <RouteList quarteiroes={ rota } />
                      </Col>
                      <Col md="4">
                        <div id="map-rota" style={{ width: '100%', height: '300px', background: '#ccc', lineHeight: '300px', textAlign: 'center' }}>Mapa</div>
                      </Col>
                    </Row>
                    </>
                  )
              }
            </div>
          </PagePopUp>
        </Row>
        <Row>
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Estatísticas</h4>
            </div>
          </article>
        </Row>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  rota: state.rotaCache.rota,
  fl_iniciada: state.rota.fl_iniciada,
  openModal: state.rota.openModal,
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
