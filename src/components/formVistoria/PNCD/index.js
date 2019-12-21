import React, { Component } from 'react';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker
} from '@material-ui/pickers';

// REDUX
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// COMPONENTS
import FindImovel from '../FindImovel';
import Amostra from '../Amostra';
import { Separator, selectDefault } from '../../../styles/global';

class PNCD extends Component {
  state = {
    optionVisita: [
      { value: "N", label: "Normal" },
      { value: "R", label: "Recuperada" },
    ],
    visita: "",
    optionPendencia: [
      { value: 1, label: "Sim" },
      { value: 0, label: "Não" },
    ],
    pendencia: "",
    optionInspecao: [
      { value: 1, label: "Sim" },
      { value: 0, label: "Não" },
    ],
    inspecao: "",
  }

  handleEntradaChange = date => {
    this.setState({
      entrada: date,
    })
  };

  handleSaidaChange = date => {
    this.setState({
      saida: date,
    })
  };

  handleVisita = option => {
    this.setState({
      visita: option.value,
    })
  }

  handlePendencia = option => {
    this.setState({
      pendencia: option.value,
    })
  }

  handleInspecao = option => {
    this.setState({
      inspecao: option.value,
    })
  }

  render() {
    return (
      <div>
        {/* Componente para escolha do imóvel da vistória */}
        <FindImovel />

        <Separator />

        <div className="row mt-4">
          {/* Dados específicos do formulário PNCD */}
          <div className="col-md-6">

            <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <div className="row">
                <div className="col-12">
                  <h4 className="title">Vistória</h4>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="horaEntrada">Horário de entrada <code>*</code></label>
                  <TimePicker
                    id="horaEntrada"
                    value={ this.state.entrada }
                    onChange={ this.handleEntradaChange.bind(this) } />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="horaSaida">Horário de saída <code>*</code></label>
                  <TimePicker
                    id="horaSaida"
                    value={ this.state.entrada }
                    onChange={ this.handleSaidaChange.bind(this) } />
                </div>
              </div>

            </MuiPickersUtilsProvider>

            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="visita">Visita <code>*</code></label>
                <Select
                  id="visita"
                  styles={ selectDefault }
                  options={ this.state.optionVisita }
                  onChange={ this.handleVisita } />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="pendencia">Pendência <code>*</code></label>
                <Select
                  id="pendencia"
                  styles={ selectDefault }
                  options={ this.state.optionPendencia }
                  onChange={ this.handlePendencia } />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="pendencia">Imóvel inspecionado <code>*</code></label>
                <Select
                  id="inspecao"
                  styles={ selectDefault }
                  options={ this.state.optionInspecao }
                  onChange={ this.handleInspecao } />
              </div>
            </div>

          </div>

          <div className="col-md-6">
            <Amostra />
          </div>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({

});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(PNCD);
