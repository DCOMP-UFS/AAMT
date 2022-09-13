import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ButtonSaveModal from '../../components/ButtonSaveModal';
import $ from 'jquery';

import { Button } from '../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { closeRouteRequest, getRouteRequest, setAuxFinalizado } from '../../store/Rota/rotaActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// import { Container } from './styles';
// COMPONENTS
import ButtonClose from '../ButtonClose';

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var hh = String(today.getHours()).padStart(2, '0');
  var minutes = String(today.getMinutes()).padStart(2, '0');
  var ss = String(today.getSeconds()).padStart(2, '0');

  today = yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + minutes + ":" + ss;

  return today;
}



function ModalFinalizarTrabalho({ usuario, vistoriasCache, trabalhoDiario, atividade, horarioUltimaVistoria, ...props }) {
  const [ horaFim, setHoraFim ] = useState( getDate() );
  const [ dataRota, setDataRota ] = useState('');
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( trabalhoDiario.data ) {
      setDataRota( trabalhoDiario.data.split( 'T' )[0] );
    }
  }, [ trabalhoDiario ]);

  //Effect que verifica se as rotas foram finalizadas
  //responsavel por desativar o carregamento do botão Encerrar
  useEffect(() => {
    if(props.auxFinalizado)
      $( "#"+props.id ).modal( 'hide' );
    setFlLoading (false)
    props.setAuxFinalizado( undefined );
  }, [ props.auxFinalizado ]);

  function handleSubmit( e ) {
    e.preventDefault();
    
    const horaInicio = trabalhoDiario.horaInicio.slice(0,-3)
    
    if(horarioUltimaVistoria && horaFim < horarioUltimaVistoria)
      props.showNotifyToast(`Horario de Encerramento deve ser no minimo igual ao Horario da ultima vistoria: ${horarioUltimaVistoria}` ,"warning")
    else if (horaFim < horaInicio)
      props.showNotifyToast("Horario de Encerramento deve ser no minimo igual ao Horario de Início","warning")
    else{
      setFlLoading (true)
      const vistoriasFiltradas = vistoriasCache.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario.id)
      props.closeRouteRequest( usuario.id, trabalhoDiario.id, horaFim, vistoriasFiltradas );
    }
  }

  return (
    <div id={ props.id } className={`modal fade ${ props.className }`} role="dialog" data-backdrop={ "static" }>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Encerrar Rota</h5>
            <ButtonClose title="Fechar" data-dismiss="modal" aria-label="Close" />
          </div>
          <form onSubmit={ handleSubmit } >
            <div className="modal-body">
                <div className="form-group">
                  {
                    trabalhoDiario.atividade ?
                      (
                        <label htmlFor="idAtividade">
                          <mark className="mr-2 bg-info text-white"><strong>{ trabalhoDiario.atividade.metodologia.sigla }</strong></mark>
                          { trabalhoDiario.atividade.objetivo.descricao }
                        </label>
                      ) :
                      ''
                  }
                </div>

                <Row>
                  <Col md="6">
                    <div className="form-group">
                      <label>Rota planejada para</label>
                      <input
                        className="form-control"
                        type="date"
                        value={ dataRota }
                        disabled={ true } />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="horaInicio">Horário de Início</label>
                      <input
                        name="horaInicio"
                        className="form-control"
                        type="time"
                        value={ trabalhoDiario.horaInicio ? trabalhoDiario.horaInicio.slice(0,-3) : "" }
                        disabled={ true } />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="horaFim">Horário de encerramento<code>*</code></label>
                      <input
                        name="horaFim"
                        className="form-control"
                        type="time"
                        onChange={ e => setHoraFim( e.target.value ) }
                        value={ horaFim }
                        required={ true } />
                    </div>
                  </Col>
                </Row>
            </div>
            <div className="modal-footer">
            <Button 
                type="button" 
                className="secondary" 
                data-dismiss="modal" 
                disabled={ flLoading }>
                  Cancelar
              </Button>
              <ButtonSaveModal title="Encerrar" loading={ flLoading } disabled={ flLoading } type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  atividade: state.atividade,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  vistoriasCache: state.vistoriaCache.vistorias,
  auxFinalizado: state.rota.auxFinalizado
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeRouteRequest, getRouteRequest, showNotifyToast, setAuxFinalizado }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalFinalizarTrabalho);
