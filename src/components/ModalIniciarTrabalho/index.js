import React, { Component } from 'react';

import { Button } from '../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { addTrabalhoDiario } from '../../store/actions/trabalhoDiario';

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

class ModalIniciarTrabalho extends Component {
  constructor(props) {
    super(props);

    let today = getDate()

    this.state = {
      dataInicio: today
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {

    let trabalhoDiario = {
      id: 1,
      dataInicio: this.state.dataInicio,
      dataFim: ""
    }

    this.props.addTrabalhoDiario( trabalhoDiario );
  }

  render() {
    const atv = this.props.atividade.atividades[ this.props.atividade.atividadeAtiva ];

    return (
      <div id="modalTrabalhoDiario" className="modal fade show" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Trabalho Diário</h5>
              <ButtonClose title="Fechar" data-dismiss="modal" aria-label="Close" />
            </div>
            <form onSubmit={ () => { this.handleSubmit(); return false } } >
              <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="idAtividade">Código da Atividade: { atv.id }</label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataInicio">Data e hora de início<code>*</code></label>
                    <input
                      name="dataInicio"
                      className="form-control"
                      type="datetime-local"
                      onChange={ this.handleInputChange }
                      value={ this.state.dataInicio } />
                  </div>
              </div>
              <div className="modal-footer">
                <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
                <Button type="submit">Iniciar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  atividade: state.atividade,
  trabalhoDiario: state.trabalhoDiario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addTrabalhoDiario }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalIniciarTrabalho);
