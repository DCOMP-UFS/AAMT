import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
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
import { addVistoria } from '../../../../../store/actions/VistoriaCacheActions';

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

function PNCD({ handleSave, trabalhoDiario_id, sequenciaVistoria, recipientes, imovel, objetivo, ...props }) {
  const classes = useStyles();
  const [ optionVisita, setOptionVisita ] = useState([
    { value: "N", label: "Normal" },
    { value: "R", label: "Recuperada" },
  ]);
  const [ optionPendencia, setOptionPendencia ] = useState([
    { value: "F", label: "Fechada" },
    { value: "R", label: "Recusada" }
  ]);
  const [ visita, setVisita ] = useState({});
  const [ pendencia, setPendencia ] = useState({});
  const [ entrada, setEntrada ] = useState( "" );

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
        trabalhoDiario_id
      };

      props.addVistoria( vistoria );
    }
  }

  return (
    <div>
      {/* Componente para escolha do imóvel da vistória */}
      <ProcurarImovel />

      <Separator />

      <Row className="mt-4">
        {/* Dados específicos do formulário PNCD */}
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
  sequenciaVistoria: state.vistoriaCache.sequenciaVistoria,
  handleSave: state.vistoriaCache.handleSave,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showNotifyToast, addVistoria }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PNCD);
