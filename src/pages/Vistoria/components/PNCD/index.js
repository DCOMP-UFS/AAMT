import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import ProcurarImovel from '../ProcurarImovel';
import InspecionarRecipiente from '../InspecionarRecipiente'
import { Row, Col } from 'react-bootstrap';
import ButtonSave from '../../../../components/ButtonSave';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';
import { addVistoria, updateInspection } from '../../../../store/VistoriaCache/vistoriaCacheActions';
import { setRecipient, setSequenceInspection, setImmobile } from '../../../../store/Vistoria/vistoriaActions';

// STYLES
import { selectDefault } from '../../../../styles/global';
import { ContainerFixed } from '../../../../styles/util';

//FUNCTION
import {isBlank} from '../../../../config/function'

function PNCD({ rota, handleSave, trabalhoDiario_id, recipientes, imovel, objetivo, ...props }) {
  const [ optionVisita ]                            = useState( [
    { value: "N", label: "Normal" },
    { value: "R", label: "Recuperada" },
  ] );
  const [ optionPendencia ]                         = useState( [
    { value: null, label: "Nenhuma" },
    { value: "F", label: "Fechada" },
    { value: "R", label: "Recusada" }
  ] );
  const [ visita, setVisita ]                       = useState( {} );
  const [ pendencia, setPendencia ]                 = useState( {} );
  const [ entrada, setEntrada ]                     = useState( "" );
  const [ justificativa, setJustificativa ]         = useState( null );
  const [ sequenciaVistoria, setSequenciaVistoria ] = useState( 0 );

  useEffect( () => {
    //Coletar da vistoriasCache somente as vistorias do trabalho diario atual
    let vistoriasFiltradas = props.vistoriasCache.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario_id)
    let seq = vistoriasFiltradas.length + 1;
  
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
  }, [ ] );
  //optionPendencia, optionVisita, props
  
  useEffect( () => {
    if( handleSave )
      setTimeout( () => { window.location = window.location.origin + '/vistoria'; }, 300 );
  }, [ handleSave ] );

  function isImovelSelected(){
    if( !imovel || imovel.id == null)
      return false
    
    return true
  }

  function submit() {
    let fl_valido = true;

     //Horario da vistoria não pode ser antes do horario de inicio do trabalho diario
    //O metodo slice está sendo usado para remover os segundos da string de hora
    let horario_minimo = props.trabalhoDiario_horaInicio.slice(0,-3)

    if( !isImovelSelected() ) {
      fl_valido = false;
      props.showNotifyToast( "Selecione o imóvel inspecionado na vistoria!", "warning" );
    }else if(imovel.numero == ''){
      fl_valido = false;
      props.showNotifyToast( "O Nº imóvel é obrigatório!", "warning" );
    }else if(imovel.responsavel == null || isBlank(imovel.responsavel)){
      fl_valido = false;
      props.showNotifyToast( "O responsavel do imóvel é obrigatório!", "warning" );
    }else if( entrada === "" ) {
      fl_valido = false;
      props.showNotifyToast( "O campo hora de entrada é obrigatório!", "warning" );
    }else if( entrada < horario_minimo ) {
      fl_valido = false;
      props.showNotifyToast( `O horário da vistoria deve ser no mínimo o mesmo que o horário de início do trabalho: ${horario_minimo}`, "warning" );
    }else if( !visita.value ) {
      fl_valido = false;
      props.showNotifyToast( "O campo visita é obrigatório!", "warning" );
    }
    else if(pendencia.value && recipientes.length > 0){
      fl_valido = false;
      props.showNotifyToast( "Vistoria com pendência fechada ou recusada não pode ter depositos cadastrados!", "warning" );
    }

    if( fl_valido ) {
      const vistoria = {
        situacaoVistoria: visita.value,
        horaEntrada:      entrada,
        pendencia:        ( pendencia.value ? pendencia.value : null ),
        sequencia:        sequenciaVistoria,
        imovel,
        recipientes,
        trabalhoDiario_id,
        justificativa
      };

      if( props.indexInspection != null ) {
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
            {/*isPaginaEdicao Indica para o componente se ele está sendo usado na pagina de edição de vistoria*/}
            <ProcurarImovel isPaginaEdicao={ props.indexInspection != null ? true : false }/>
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
                    <p className="text-description">
                      Atenção os campos com <code>*</code> são obrigatórios
                    </p>
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

                { ( pendencia.value === 'F' || pendencia.value === 'R' ) && (
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
                ) }
              </Col>

              <Col md="6" >
                 {/*isPaginaEdicao Indica para o componente se ele está sendo usado na pagina de edição de vistoria*/}
                <InspecionarRecipiente 
                  objetivo={ objetivo } 
                  isPaginaEdicao={ props.indexInspection != null ? true : false}
                  vistoriaPendente={pendencia.value}
                />
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
  vistoriasCache: state.vistoriaCache.vistorias,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  rota: state.rotaCache.rota,
  trabalhoDiario_horaInicio: state.rotaCache.trabalhoDiario.horaInicio,
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
