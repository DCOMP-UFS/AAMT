import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';

//Importando CSS exclusivo para páginas do template
import '../style.css';

import { selectDefault, selectLg, selectSm, CardDark, FormGroup } from '../../../styles/global';

class Form extends Component {
  state = {
    select1: -1,
    select2: -1,
    select3: -1,
    time: new Date('2014-08-18T21:11'),

    optionSelect: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
    ],
  }

  constructor(props) {
    super(props);

    this.props.changeSidebar(6, 0);
  }

  handleTime = time => {
    this.setState({
      time
    })
  }

  render() {
    return (
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Elementos básicos de um formulário</h4>
              <p className="text-description">
                Exemplos de elementos básicos do template
              </p>

              <form className="form-basico">
                <div className="form-group">
                  <label htmlFor="ex_inputCidade1">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ex_inputCidade1"
                    placeholder="Location" />
                </div>

                <div className="form-group">
                  <label htmlFor="ex_textearea1">Textarea</label>
                  <textarea className="form-control" id="ex_textearea1" rows="4"></textarea>
                </div>
              </form>
            </div>
          </article>

          {/* Tamanho dos input's */}
          <article className="col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Tamanho do input</h4>
              <p className="text-description">Adicione as classes <code>.form-control-lg</code> ou <code>.form-control-sm</code></p>


              <div className="form-group">
                <label>Input grande</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  />
              </div>

              <div className="form-group">
                <label>Input padrão</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  />
              </div>

              <div className="form-group">
                <label>Input pequeno</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Username"
                  />
              </div>
            </div>
          </article>

          {/* Tamanho dos select's */}
          <article className="col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Tamanho do input</h4>
              <p className="text-description">Adicione as classes <code>.form-control-lg</code> ou <code>.form-control-sm</code></p>

              <div className="form-group">
                <label htmlFor="ex_FormControlSelect1">Select grande</label>
                <Select
                  styles={ selectLg }
                  options={this.state.optionSelect} />
              </div>

              <div className="form-group">
                <label htmlFor="ex_FormControlSelect1">Select padrão</label>
                <Select
                  styles={ selectDefault }
                  options={this.state.optionSelect} />
              </div>

              <div className="form-group">
                <label htmlFor="ex_FormControlSelect1">Select padrão</label>
                <Select
                  styles={ selectSm }
                  options={this.state.optionSelect} />
              </div>
            </div>
          </article>

          {/* DARK INPUT'S */}
          <article className="col-md-6 stretch-card">
            <CardDark>
              <h4 className="title">Input Dark</h4>
              <p className="text-description">Adicione as classes <code>.form-control-lg</code> ou <code>.form-control-sm</code></p>


              <FormGroup className="form-dark">
                <label>Input grande</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  />
              </FormGroup>

              <FormGroup className="form-dark">
                <label>Input padrão</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  />
              </FormGroup>

              <FormGroup className="form-dark">
                <label>Input pequeno</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Username"
                  />
              </FormGroup>
            </CardDark>
          </article>

          {/* Tamanho dos select's */}
          <article className="col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Select Dark</h4>
              <p className="text-description">Adicione as classes <code>.form-control-lg</code> ou <code>.form-control-sm</code></p>

              <div className="form-group">
                <label htmlFor="ex_FormControlSelect1">Select grande</label>
                <Select
                  styles={ selectLg }
                  options={this.state.optionSelect} />
              </div>

              <div className="form-group">
                <label htmlFor="ex_FormControlSelect1">Select padrão</label>
                <Select
                  styles={ selectDefault }
                  options={this.state.optionSelect} />
              </div>

              <div className="form-group">
                <label htmlFor="ex_FormControlSelect1">Select padrão</label>
                <Select
                  styles={ selectSm }
                  options={this.state.optionSelect} />
              </div>
            </div>
          </article>

          {/* Input de tempo */}
          <article className="col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Input's de data</h4>
              <p className="text-description">Adicione as classes <code>.form-control-lg</code> ou <code>.form-control-sm</code></p>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="form-group">
                  <label htmlFor="hora">Hora</label>
                  <TimePicker
                    id="hora"
                    className="form-control"
                    value={ this.state.time }
                    onChange={ this.handleTime.bind(this) } />
                </div>
              </MuiPickersUtilsProvider>
            </div>
          </article>

        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
