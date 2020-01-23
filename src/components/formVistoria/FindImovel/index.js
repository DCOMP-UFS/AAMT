import React, { Component } from 'react';
import Select from 'react-select';
import { IoIosHome } from 'react-icons/io';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTION
import { setVistoriaImovel, setImovelSelect, handleQuarteirao } from '../../../store/actions/supportInfo';

// COMPONENTS
import { UlImovel, LiImovel, ContainerIcon, DivDescription, LiEmpty, Span } from './styles';
import { selectDefault } from '../../../styles/global';
import ButtonNewObject from '../../ButtonNewObject';
import ModalRegistrarImovel from './ModalRegistrarImovel';

// ENUMERATE
import { tipoImovel } from '../../../config/enumerate';

class FindImovel extends Component {
  state = {
    optionQuarteirao: this.props.quarteirao.map( (quarteirao, index) => {
      return { value: index, label: quarteirao.idQuarteirao };
    }),
    numero: "",
    sequencia: "",

    optionTipoImovel: tipoImovel.map(tipo => ({ value: tipo, label: tipo })),
    tipoImovel: { value: "", label: ""},
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleInputImovel(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let imovel = this.props.imovelSelect;
    imovel[name] = value;

    this.props.setImovelSelect(imovel);
  }

  handleTipoImovel = event => {
    const tipoImovel = event.value;

    let imovel = this.props.imovelSelect;
    imovel.tipoImovel = tipoImovel;

    this.props.setImovelSelect(imovel);
  }

  handleList = (index) => {
    const quarteirao = this.props.quarteirao[this.props.findImovel.indexQuarteirao];
    const imovel = quarteirao.imovel[index];

    this.props.setVistoriaImovel(index, imovel);
  };

  handleQuarteirao = event => {
    const indexQuarteirao = event.value;
    const idQuarteirao = this.state.optionQuarteirao[indexQuarteirao].label;

    this.props.handleQuarteirao(idQuarteirao, indexQuarteirao);
  }

  render() {
    const findImovel = this.props.findImovel;
    const quarteirao = this.props.quarteirao;
    const imovelSelect = this.props.imovelSelect;

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <h4 className="title">Filtrar</h4>
              <div className="form-group">
                <label>Nº do quarteirão?</label>
                <Select
                  styles={ selectDefault }
                  options={this.state.optionQuarteirao}
                  onChange={ this.handleQuarteirao } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Nº do imóvel?</label>
                <input
                  name="numero"
                  type="number"
                  min="0"
                  className="form-control"
                  value={ this.state.numero }
                  onChange={ this.handleInputChange.bind(this) } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Sequência</label>
                <input
                  name="sequencia"
                  type="number"
                  min="0"
                  className="form-control"
                  value={ this.state.sequencia }
                  onChange={ this.handleInputChange.bind(this) } />
              </div>
            </div>

            <div className="col-md-12">
              <h4 className="title">Imóvel selecionado</h4>
              {
                imovelSelect.idImovel === -1 ?
                  <p className="description">Nenhum imóvel selecionado</p> :
                  <p className="description">Registro do imóvel: <mark className="bg-success text-white">{imovelSelect.idImovel}</mark></p>
              }
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Nº do imóvel<code>*</code></label>
                <input
                  name="numero"
                  className="form-control"
                  type="number"
                  min="0"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.numero === -1 ? "" : imovelSelect.numero }
                  onChange={ this.handleInputImovel.bind(this) } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Sequência</label>
                <input
                  name="sequencia"
                  type="number"
                  min="0"
                  className="form-control"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.sequencia === -1 ? "" : imovelSelect.sequencia }
                  onChange={ this.handleInputImovel.bind(this) } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Responsável<code>*</code></label>
                <input
                  name="responsavel"
                  type="text"
                  className="form-control"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.responsavel }
                  onChange={ this.handleInputImovel.bind(this) } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Tipo do imóvel<code>*</code></label>
                <Select
                  name="tipoImovel"
                  styles={ selectDefault }
                  isDisabled={ !findImovel.selectImovel }
                  value={{ value: imovelSelect.tipoImovel, label: imovelSelect.tipoImovel }}
                  options={ this.state.optionTipoImovel }
                  onChange={ this.handleTipoImovel.bind(this) } />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label>Complemento</label>
                <input
                  name="complemento"
                  type="text"
                  className="form-control"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.complemento }
                  onChange={ this.handleInputImovel.bind(this) } />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>
            Imóveis
            <ButtonNewObject
              title="Cadastrar um novo imóvel"
              data-toggle="modal"
              data-target="#modalRegistrarImovel" />
          </h4>

          <ListImovel
            imovelSelect={ imovelSelect.idImovel }
            imovel={
              findImovel.indexQuarteirao === -1 ?
                [] :
                quarteirao[findImovel.indexQuarteirao].imovel
            }
            handleList={ this.handleList }
            numero={ this.state.numero === "" ? "-1" : this.state.numero }
            sequencia={ this.state.sequencia === "" ? "-1" : this.state.sequencia } />

            <ModalRegistrarImovel />
        </div>
      </div>
    );
  }
}

function ListImovel( props ) {
  const imovel = props.imovel;
  const handleList = props.handleList;
  const imovelSelect = props.imovelSelect;
  const numero = parseInt(props.numero);
  const sequencia = parseInt(props.sequencia);

  const filterImovel = imovel.filter(
    imovel => {
      return (
        numero === -1 ||
        (
          imovel.numero === numero &&
          ( sequencia === -1 || imovel.sequencia === sequencia )
        )
      );
    }
  );

  let li = filterImovel.map(( imovel, index ) =>
    <LiImovel
      key={ imovel.idImovel }
      className={ imovelSelect === imovel.idImovel ? "active" : "" }
      onClick={ () => handleList( index ) }>
    <ContainerIcon className="ContainerIcon" >
      <IoIosHome />
    </ContainerIcon>
    <DivDescription>
      <div>
        <span className="mr-2">Nº: { imovel.numero }</span>
        <span>Seq.: { imovel.sequencia === -1 ? "" : imovel.sequencia }</span>
      </div>
      <Span>Responsável: { imovel.responsavel }</Span>
    </DivDescription>
  </LiImovel>
  );

  if(filterImovel.length === 0) {
    li = <LiEmpty>
      <h4>Nenhum imóvel encontrado</h4>
    </LiEmpty>;
  }

  return (
    <UlImovel>
      { li }
    </UlImovel>
  )
}

const mapStateToProps = state => ({
  findImovel: {
    idQuarteirao: state.supportInfo.form_vistoria.findImovel.idQuarteirao,
    indexQuarteirao: state.supportInfo.form_vistoria.findImovel.indexQuarteirao,
    selectImovel: state.supportInfo.form_vistoria.findImovel.selectImovel,
  },
  imovelSelect: {
    index: state.supportInfo.form_vistoria.imovel.index,
    idImovel: state.supportInfo.form_vistoria.imovel.idImovel,
    numero: state.supportInfo.form_vistoria.imovel.numero,
    sequencia: state.supportInfo.form_vistoria.imovel.sequencia,
    tipoImovel: state.supportInfo.form_vistoria.imovel.tipoImovel,
    complemento: state.supportInfo.form_vistoria.imovel.complemento,
    responsavel: state.supportInfo.form_vistoria.imovel.responsavel,
  },
  quarteirao: state.supportInfo.quarteirao
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setVistoriaImovel, setImovelSelect, handleQuarteirao }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindImovel);
