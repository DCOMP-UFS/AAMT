import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import ProcurarImovel from '../ProcurarImovel';
import InspecionarRecipiente from '../InspecionarRecipiente'
import { Row, Col } from 'react-bootstrap';
import ButtonSave from '../../../../../components/ButtonSave';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { showNotifyToast } from '../../../../../store/actions/appConfig';
import { addVistoria, updateInspection } from '../../../../../store/actions/VistoriaCacheActions';
import { setRecipient, setSequenceInspection, setImmobile } from '../../../../../store/actions/VistoriaActions';

// STYLES
import { selectDefault } from '../../../../../styles/global';
import { ContainerFixed } from '../../../../../styles/util';

function PNCD({ rota, handleSave, trabalhoDiario_id, recipientes, imovel, objetivo, ...props }) {
  const [ optionVisita ] = useState([
    { value: "N", label: "Normal" },
    { value: "R", label: "Recuperada" },
  ]);
  const [ optionPendencia ] = useState([
    { value: null, label: "Nenhuma" },
    { value: "F", label: "Fechada" },
    { value: "R", label: "Recusada" }
  ]);
  const [ visita, setVisita ] = useState({});
  const [ pendencia, setPendencia ] = useState({});
  const [ entrada, setEntrada ] = useState( "" );
  const [ justificativa, setJustificativa ] = useState( null );
  const [ sequenciaVistoria, setSequenciaVistoria ] = useState( 0 );

  useEffect(() => {
    let seq = props.vistorias.length + 1;

    if( props.vistoria ) {
      const inspection                = props.vistoria;
      const class_inspectionSituation = optionVisita.find( option => props.vistoria.situacaoVistoria === option.value );
      const class_pendency            = optionPendencia.find( option => props.vistoria.pendencia === option.value );


      setEntrada( inspection.horaEntrada );
      setVisita( class_inspectionSituation );
      setPendencia( class_pendency );
      setJustificativa( inspection.justificativa );
      props.setRecipient( inspection.recipientes );
      props.setImmobile( inspection.imovel );
      seq = inspection.sequencia;
    }

    props.setSequenceInspection( seq );
    setSequenciaVistoria( seq );
  }, [optionPendencia, optionVisita, props]);

  useEffect(() => {
    if( handleSave )
      setTimeout(() => { window.location = window.location.origin + '/agente/vistoria'; }, 300);
  }, [ handleSave ]);

  function submit() {
    let fl_valido = true;

    if( !imovel ) {
      fl_valido = false;
      props.showNotifyToast( "Selecione o imóvel inspecionado na vistoria!", "warning" );
    }else if( entrada === "" ) {
      fl_valido = false;
      props.showNotifyToast( "O campo hora de entrada é obrigatório!", "warning" );
    }else if( !visita.value ) {
      fl_valido = false;
      props.showNotifyToast( "O campo visita é obrigatório!", "warning" );
    }

    if( fl_valido ) {
      const vistoria = {
        situacaoVistoria: visita.value,
        horaEntrada: entrada,
        pendencia: ( pendencia.value ? pendencia.value : null ),
        sequencia: sequenciaVistoria,
        imovel,
        recipientes,
        trabalhoDiario_id,
        justificativa
      };

      console.log(vistoria);

      if( props.indexInspection ) {
        props.updateInspection( vistoria, props.indexInspection );
      } else {
        props.addVistoria( vistoria );
      }
    }
  }

  return (
    <>
      <Row>
        <article className="col-md-12">
          <div className="card">
            <ProcurarImovel />
          </div>
        </article>
        <article className="col-md-12">
          <div className="card">
            <Row className="mt-4">
              {/* Dados específicos do formulário PNCD */}
              <Col md="6">
                <Row>
                  <Col md="12">
                    <h4 className="title">Vistoria</h4>
                  </Col>

                  <Col md="6" className="form-group">
                    <label htmlFor="horaEntrada">Horário de entrada <code>*</code></label>
                    <TextField
                      id="horaEntrada"
                      type="time"
                      value={ entrada }
                      className="form-control"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      onChange={ e => setEntrada( e.target.value ) }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="6" className="form-group">
                    <label htmlFor="visita">Visita <code>*</code></label>
                    <Select
                      id="visita"
                      styles={ selectDefault }
                      options={ optionVisita }
                      value={ visita }
                      onChange={ option => setVisita( option ) } />
                  </Col>

                  <Col md="6" className="form-group">
                    <label htmlFor="pendencia">Pendência</label>
                    <Select
                      id="pendencia"
                      styles={ selectDefault }
                      options={ optionPendencia }
                      value={ pendencia }
                      onChange={ option => setPendencia( option ) } />
                  </Col>
                </Row>

                {(pendencia.value === 'F' || pendencia.value === 'R') && (
                  <Row>
                    <Col md="12" className="form-group">
                      <label>Justificativa da pendência</label>
                      <textarea
                        id="justificativa"
                        value={ justificativa }
                        className="form-control"
                        onChange={ e => setJustificativa( e.target.value ) }
                        rows="5"
                        maxLength="255"
                        required
                      ></textarea>
                    </Col>
                  </Row>
                )}
              </Col>

              <Col md="6" >
                <InspecionarRecipiente objetivo={ objetivo } />
              </Col>
            </Row>
          </div>
        </article>
      </Row>

      <ContainerFixed>
        <ButtonSave
          title="Salvar Vistoria"
          className="bg-info text-white"
          loading={ false }
          type="button"
          onClick={ submit } />
      </ContainerFixed>
    </>
  );
}

const mapStateToProps = state => ({
  imovel: state.vistoria.imovel,
  recipientes: state.vistoria.recipientes,
  handleSave: state.vistoriaCache.handleSave,
  vistorias: state.vistoriaCache.vistorias,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  rota: state.rotaCache.rota,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    showNotifyToast,
    addVistoria,
    setRecipient,
    setSequenceInspection,
    setImmobile,
    updateInspection
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PNCD);
