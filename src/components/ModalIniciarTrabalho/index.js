import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { Button } from '../../styles/global';
import ButtonSaveModal from '../../components/ButtonSaveModal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { startRouteRequest, setAuxIniciado } from '../../store/Rota/rotaActions';
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

const ModalIniciarTrabalho = ( { trabalhoDiario, atividade, ...props } ) => {
  const [ horaInicio, setHoraInicio ] = useState("");
  const [ dataRota, setDataRota ] = useState('');
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( trabalhoDiario.data ) {
      setDataRota( trabalhoDiario.data.split( 'T' )[0] );
    }
  }, [ trabalhoDiario ]);

  //Effect que verifica se as rotas foram iniciadas
  //responsavel por desativar o carregamento do botão Inicar
  useEffect(() => {
    setFlLoading (false)
    props.setAuxIniciado( undefined );
  }, [ props.auxIniciado ]);

  function handleSubmit( e ) {
    e.preventDefault();
    setFlLoading(true)
    props.startRouteRequest( trabalhoDiario.id, horaInicio );
  }

  return (
    <div id={ props.id } className={`modal fade ${ props.className }`} role="dialog" data-backdrop={ "static" }>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rota</h5>
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
                      <label htmlFor="horaInicio">Horario de Início<code>*</code></label>
                      <input
                        name="horaInicio"
                        className="form-control"
                        type="time"
                        onChange={ e => setHoraInicio( e.target.value ) }
                        value={ horaInicio }
                        required
                      />
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
              <ButtonSaveModal title="Iniciar" loading={ flLoading } disabled={ flLoading } type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  atividade: state.atividade,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  auxIniciado: state.rota.auxIniciado,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators( { startRouteRequest,showNotifyToast,setAuxIniciado }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalIniciarTrabalho );
