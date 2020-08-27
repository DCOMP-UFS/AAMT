import React, { useState } from 'react';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker
} from '@material-ui/pickers';
import ProcurarImovel from '../ProcurarImovel';
import InspecionarRecipiente from '../InspecionarRecipiente'
import { Row, Col } from 'react-bootstrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// STYLES
import { Separator, selectDefault } from '../../../../../styles/global';

function PNCD({ objetivo, ...props }) {
  const [ optionVisita, setOptionVisita ] = useState([
    { value: "N", label: "Normal" },
    { value: "R", label: "Recuperada" },
  ]);
  const [ optionPendencia, setOptionPendencia ] = useState([
    { value: 1, label: "Sim" },
    { value: 0, label: "Não" },
  ]);
  const [ optionInspecao, setOptionInspecao ] = useState([
    { value: 1, label: "Sim" },
    { value: 0, label: "Não" },
  ]);
  const [ visita, setVisita ] = useState({});
  const [ pendencia, setPendencia ] = useState({});
  const [ inspecao, setInspecao ] = useState({});
  const [ entrada, setEntrada ] = useState( new Date() );
  const [ saida, setSaida ] = useState( new Date() );

  return (
    <div>
      {/* Componente para escolha do imóvel da vistória */}
      <ProcurarImovel />

      <Separator />

      <Row className="mt-4">
        {/* Dados específicos do formulário PNCD */}
        <Col md="6">

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Row>
              <Col md="12">
                <h4 className="title">Vistória</h4>
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="horaEntrada">Horário de entrada <code>*</code></label>
                <TimePicker
                  id="horaEntrada"
                  className="form-control"
                  value={ entrada }
                  onChange={ date => setEntrada( date ) } />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="horaSaida">Horário de saída <code>*</code></label>
                <TimePicker
                  id="horaSaida"
                  className="form-control"
                  value={ saida }
                  onChange={ date => setSaida( date ) } />
              </Col>
            </Row>
          </MuiPickersUtilsProvider>

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
              <label htmlFor="pendencia">Pendência <code>*</code></label>
              <Select
                id="pendencia"
                styles={ selectDefault }
                options={ optionPendencia }
                value={ pendencia }
                onChange={ option => setPendencia( option ) } />
            </Col>

            <Col md="6" className="form-group">
              <label htmlFor="pendencia">Imóvel inspecionado <code>*</code></label>
              <Select
                id="inspecao"
                styles={ selectDefault }
                options={ optionInspecao }
                value={ inspecao }
                onChange={ option => setInspecao( option ) } />
            </Col>
          </Row>
        </Col>

        <Col md="6" >
          <InspecionarRecipiente objetivo={ objetivo } />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PNCD);
