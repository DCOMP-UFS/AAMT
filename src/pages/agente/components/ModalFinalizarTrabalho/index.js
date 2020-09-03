import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { Button } from '../../../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { closeRouteRequest } from '../../../../store/actions/RotaActions';

// import { Container } from './styles';
// COMPONENTS
import ButtonClose from '../../../../components/ButtonClose';

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

function ModalFinalizarTrabalho({ vistorias, trabalhoDiario, atividade, ...props }) {
  const [ horaFim, setHoraFim ] = useState( getDate() );
  const [ dataRota, setDataRota ] = useState('');

  useEffect(() => {
    if( trabalhoDiario.data ) {
      setDataRota( trabalhoDiario.data.split( 'T' )[0] );
    }
  }, [ trabalhoDiario ]);

  function handleSubmit( e ) {
    e.preventDefault();
    props.closeRouteRequest( trabalhoDiario.id, horaFim, vistorias );
  }

  return (
    <div id={ props.id } className={`modal fade ${ props.className }`} role="dialog">
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
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Encerrar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  atividade: state.atividade,
  trabalhoDiario: state.rota.trabalhoDiario,
  vistorias: state.vistoriaCache.vistorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeRouteRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalFinalizarTrabalho);
