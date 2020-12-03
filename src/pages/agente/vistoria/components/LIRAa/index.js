import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ProcurarImovel from '../ProcurarImovel';
import InspecionarRecipiente from '../InspecionarRecipiente'
import { Row, Col } from 'react-bootstrap';
import ButtonSave from '../../../../../components/ButtonSave';
// ENUMERATE
import { tipoImovel as tipoImovelEnum } from '../../../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { showNotifyToast } from '../../../../../store/actions/appConfig';
import { addVistoria, updateInspection } from '../../../../../store/actions/VistoriaCacheActions';
import { setRecipient, setSequenceInspection, setImmobile } from '../../../../../store/actions/VistoriaActions';

// STYLES
import { Separator, selectDefault } from '../../../../../styles/global';
import { ContainerFixed } from '../../../../../styles/util';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function LIRAa({ handleSave, trabalhoDiario_id, recipientes, imovel, objetivo, ...props }) {
  const classes = useStyles();
  const [ entrada, setEntrada ] = useState( "" );
  const [ visita, setVisita ] = useState({ value: "N", label: "Normal" });
  const [ sequenciaVistoria, setSequenciaVistoria ] = useState( 0 );
  const [ optionVisita, setOptionVisita ] = useState([
    { value: "N", label: "Normal" },
    { value: "R", label: "Recuperada" },
  ]);

  useEffect(() => {
    let seq = props.vistorias.length + 1;

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
    }

    if( fl_valido ) {
      const vistoria = {
        situacaoVistoria: visita.value,
        horaEntrada: entrada,
        sequencia: sequenciaVistoria,
        imovel,
        recipientes,
        trabalhoDiario_id
      };

      // Editar
      if( props.indexInspection ) props.updateInspection( vistoria, props.indexInspection );
      else props.addVistoria( vistoria );
    }
  }

  return (
    <div>
      {/* Componente para escolha do imóvel da vistória */}
      <ProcurarImovel />

      <Separator />

      <Row className="mt-4">
        {/* Dados específicos do formulário LIRAa */}
        <Col md="6">
          <Row>
            <Col md="12">
              <h4 className="title">Vistória</h4>
            </Col>

            <Col md="6" className="form-group">
              <label htmlFor="horaEntrada">Horário de entrada <code>*</code></label>
              <TextField
                id="horaEntrada"
                type="time"
                value={ entrada }
                className={ classes.textField }
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
          <InspecionarRecipiente objetivo={ objetivo } />
        </Col>
      </Row>

      <ContainerFixed>
        <ButtonSave
          title="Salvar Vistoria"
          className="bg-info text-white"
          loading={ false }
          type="button"
          onClick={ submit } />
      </ContainerFixed>
    </div>
  );
}

const mapStateToProps = state => ({
  imovel: state.vistoria.imovel,
  recipientes: state.vistoria.recipientes,
  vistorias: state.vistoriaCache.vistorias,
  handleSave: state.vistoriaCache.handleSave,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  reload: state.vistoria.reload
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
