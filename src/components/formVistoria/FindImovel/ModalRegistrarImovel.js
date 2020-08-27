import React, { Component } from 'react';
import Select from 'react-select';
import $ from 'jquery';
import { validInputInt, validInputIsEmpty, validInputFloat } from '../../../config/function'

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { setImovelSelect, addImovelQuarteirao } from '../../../store/actions/supportInfo';

// COMPONENTS
// import { Container } from './styles';
import { Button, selectDefault } from '../../../styles/global';

// ENUMERATE
import { tipoImovel } from '../../../config/enumerate';

const createImovel = (idImovel, numero, sequencia, tipoImovel, complemento, responsavel, long, lat) => {
  return { idImovel, numero, sequencia, tipoImovel, complemento, responsavel, long, lat }
}

class ModalRegistrarImovel extends Component {
  state = {
    optionQuarteirao: this.props.quarteirao.map( (quarteirao, index) => {
      return { value: index, label: quarteirao.idQuarteirao, name: "indexQuarteirao" };
    }),


    // optionTipoImovel: tipoImovel.map(tipo => ({ value: tipo, label: tipo, name: "tipoImovel" })),
    optionTipoImovel: Object.entries(tipoImovel).map(([key, value]) => {
      return { value: value.id, label: value.label, name: "tipoImovel" };
    }),
    tipoImovel: { value: "", label: ""},

    indexQuarteirao: { value: "", label: ""},
    numero: "",
    sequencia: "",
    responsavel: "",
    complemento: "",
    long: "",
    lat: "",
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSelectChange(event) {
    const value = event.value;
    const label = event.label;
    const name = event.name;

    this.setState({
      [name]: { value, label, name }
    });
  }

  submit = () => {
    // Validação
    let fl_valido = 1; // 1 -> válido | 0 -> inválido
    const indexQuarteirao = this.state.indexQuarteirao.value;
    const numero = this.state.numero;
    const sequencia = this.state.sequencia === "" ? -1 : this.state.sequencia;
    const tipoImovel = this.state.tipoImovel.value;
    const complemento = this.state.complemento;
    const responsavel = this.state.responsavel;
    const long = this.state.long;
    const lat = this.state.lat;

    if( !validInputIsEmpty( "#indexQuarteirao", indexQuarteirao ) ) fl_valido = 0;
    if( !validInputInt( "#numero", numero ) ) fl_valido = 0;
    if( !validInputIsEmpty( "#tipoImovel", tipoImovel ) ) fl_valido = 0;
    if( !validInputIsEmpty( "#responsavel", responsavel ) ) fl_valido = 0;
    if( !validInputFloat( "#long", long ) ) fl_valido = 0;
    if( !validInputFloat( "#lat", lat ) ) fl_valido = 0;

    if( fl_valido ) {

      const imovel = createImovel(
        -1,
        numero,
        sequencia,
        tipoImovel,
        complemento,
        responsavel,
        long,
        lat,
      );

      this.props.addImovelQuarteirao( indexQuarteirao, imovel );
      this.props.setImovelSelect( imovel );

      $('#modalRegistrarImovel').modal('hide');

    }
  }

  render() {
    return (

      <div id="modalRegistrarImovel" className="modal fade show" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registrar Imóvel</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Nº do quarteirão<code>*</code></label>
                  <Select
                    id="indexQuarteirao"
                    name="indexQuarteirao"
                    styles={ selectDefault }
                    options={this.state.optionQuarteirao}
                    onChange={ this.handleSelectChange.bind(this) } />
                </div>
              </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nº do imóvel<code>*</code></label>
                    <input
                      id="numero"
                      name="numero"
                      className="form-control"
                      type="number"
                      min="0"
                      value={ this.state.numero }
                      onChange={ this.handleInputChange.bind(this) } />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sequência</label>
                    <input
                      id="sequencia"
                      name="sequencia"
                      type="number"
                      min="0"
                      className="form-control"
                      value={ this.state.sequencia }
                      onChange={ this.handleInputChange.bind(this) } />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Responsável<code>*</code></label>
                    <input
                      id="responsavel"
                      name="responsavel"
                      type="text"
                      className="form-control"
                      value={ this.state.responsavel }
                      onChange={ this.handleInputChange.bind(this) } />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tipo do imóvel<code>*</code></label>
                    <Select
                      id="tipoImovel"
                      name="tipoImovel"
                      styles={ selectDefault }
                      options={ this.state.optionTipoImovel }
                      onChange={ this.handleSelectChange.bind(this) } />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label>Complemento</label>
                    <input
                      id="complemento"
                      name="complemento"
                      type="text"
                      className="form-control"
                      value={ this.state.complemento }
                      onChange={ this.handleInputChange.bind(this) } />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Longitude<code>*</code></label>
                    <input
                      id="long"
                      name="long"
                      type="number"
                      className="form-control"
                      value={ this.state.long }
                      onChange={ this.handleInputChange.bind(this) } />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Latitude<code>*</code></label>
                    <input
                      id="lat"
                      name="lat"
                      type="number"
                      className="form-control"
                      value={ this.state.lat }
                      onChange={ this.handleInputChange.bind(this) } />
                  </div>
                </div>
              </div>


            </div>
            <div className="modal-footer">
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="button" onClick={ this.submit }>Cadastrar</Button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  quarteirao: state.supportInfo.quarteirao
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setImovelSelect, addImovelQuarteirao }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ModalRegistrarImovel);
