import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import ProcurarImovel from '../ProcurarImovel';
import InspecionarRecipiente from '../InspecionarRecipiente'
import { Row, Col } from 'react-bootstrap';
import ButtonSave from '../../../../components/ButtonSave';
// ENUMERATE
import { tipoImovel as tipoImovelEnum } from '../../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';
import { addVistoria, updateInspection } from '../../../../store/VistoriaCache/vistoriaCacheActions';
import { setRecipient, setSequenceInspection, setImmobile } from '../../../../store/Vistoria/vistoriaActions';

// STYLES
import { Separator, selectDefault } from '../../../../styles/global';
import { ContainerFixed } from '../../../../styles/util';

//FUNCTION
import {isBlank} from '../../../../config/function'

function LIRAa({ handleSave, trabalhoDiario_id, recipientes, imovel, objetivo, ...props }) {
  const [ entrada, setEntrada ] = useState( "" );
  const [ visita, setVisita ] = useState({ value: "N", label: "Normal" });
  const [ sequenciaVistoria, setSequenciaVistoria ] = useState( 0 );
  const [ optionVisita ] = useState([
    { value: "N", label: "Normal" },
    { value: "R", label: "Recuperada" },
  ]);
  const [ loadingSaveButton, setLoadingSaveButton ] = useState(false)

  useEffect(() => {
    //Coletar da vistoriasCache somente as vistorias do trabalho diario atual
    let vistoriasFiltradas = props.vistoriasCache.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario_id)

    let seq = vistoriasFiltradas.length + 1;

    if( props.vistoria ) {
      const inspection = props.vistoria;

      setEntrada( inspection.horaEntrada );
      props.setRecipient( inspection.recipientes );
      props.setImmobile( inspection.imovel );
      seq = inspection.sequencia;
    }

    props.setSequenceInspection( seq );
    setSequenciaVistoria( seq );
  }, []);

  useEffect(() => {
    if( handleSave )
      setTimeout(() => { window.location = window.location.origin + '/vistoria'; }, 300);
  }, [ handleSave ]);

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
    }
    

    if( fl_valido ) {
      imovel.sequencia = imovel.sequencia == "" ? null : imovel.sequencia
      setLoadingSaveButton(true)
      const vistoria = {
        situacaoVistoria: visita.value,
        horaEntrada: entrada,
        sequencia: sequenciaVistoria,
        imovel,
        recipientes,
        trabalhoDiario_id
      };

      // Editar
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
        {/* Componente para escolha do imóvel da vistoria */}
        <article className="col-md-12">
          <div className="card">
             {/*isPaginaEdicao Indica para o componente se ele está sendo usado na pagina de edição de vistoria*/}
            <ProcurarImovel isPaginaEdicao={ props.indexInspection != null ? true : false}/>
          </div>
        </article>
        <article className="col-md-12">
          <div className="card">
            <Row className="mt-4">
              {/* Dados específicos do formulário LIRAa */}
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
                  <Col md="6" className="form-group">
                    <label htmlFor="horaEntrada">Imóvel</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled="disabled"
                      value={
                        imovel ?
                          imovel.tipoImovel === tipoImovelEnum.terrenoBaldio.id ?
                            "TB" :
                            "Outro"
                          : ""
                      }
                      onChange={ e => {} } />
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
                      isDisabled={ true }
                      onChange={ option => setVisita( option ) } />
                  </Col>
                </Row>
              </Col>

              <Col md="6" >
                {/*isPaginaEdicao Indica para o componente se ele está sendo usado na pagina de edição de vistoria*/}
                <InspecionarRecipiente objetivo={ objetivo } isPaginaEdicao={ props.indexInspection != null ? true : false}  />
              </Col>
            </Row>
          </div>
        </article>
        <ContainerFixed>
          <ButtonSave
            title="Salvar Vistoria"
            className="bg-info text-white"
            loading={ loadingSaveButton }
            disabled={ loadingSaveButton }
            type="button"
            onClick={ submit } />
        </ContainerFixed>
      </Row>
    </>
  );
}

const mapStateToProps = state => ({
  rota: state.rotaCache.rota,
  imovel: state.vistoria.imovel,
  recipientes: state.vistoria.recipientes,
  vistoriasCache: state.vistoriaCache.vistorias,
  handleSave: state.vistoriaCache.handleSave,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  reload: state.vistoria.reload,
  trabalhoDiario_horaInicio: state.rotaCache.trabalhoDiario.horaInicio
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    showNotifyToast,
    addVistoria,
    updateInspection,
    setRecipient,
    setSequenceInspection,
    setImmobile
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LIRAa);
