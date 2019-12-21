import React, { Component } from 'react';
import Select from 'react-select';
import { IoIosHome } from 'react-icons/io';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTION
import { setVistoriaImovel, handleQuarteirao } from '../../../store/actions/supportInfo';

// COMPONENTS
import { UlImovel, LiImovel, ContainerIcon, DivDescription, LiEmpty } from './styles';
import { selectDefault } from '../../../styles/global';

class FindImovel extends Component {
  state = {
    optionQuarteirao: this.props.quarteirao.map( (quarteirao, index) => {
      return { value: index, label: quarteirao.idQuarteirao };
    }),
    numero: ""
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
            <div className="col-md-6">
              <div className="form-group">
                <label>Nº do quarteirão?<code>*</code></label>
                <Select
                  styles={ selectDefault }
                  options={this.state.optionQuarteirao}
                  onChange={ this.handleQuarteirao } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Nº do imóvel?<code>*</code></label>
                <input
                  name="numero"
                  type="number"
                  className="form-control"
                  value={ this.state.numero }
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
                  type="text"
                  className="form-control"
                  value={ imovelSelect.numero === -1 ? "" : imovelSelect.numero }
                  onChange={ () => console.log("Bl") } />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Sequência</label>
                <input
                  type="text"
                  className="form-control"
                  value={ imovelSelect.sequencia === -1 ? "" : imovelSelect.sequencia }
                  onChange={ () => console.log("Bl") } />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label>Complemento<code>*</code></label>
                <input
                  type="text"
                  className="form-control"
                  value={ imovelSelect.complemento }
                  onChange={ () => console.log("Bl") } />
              </div>
            </div>

            <div className="col-md-12">
            <div className="form-group">
              <label>Responsável<code>*</code></label>
              <input
                type="text"
                className="form-control"
                value={ imovelSelect.responsavel }
                onChange={ () => console.log("Bl") } />
            </div>
          </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Imóveis no quarteirão</h4>

          <ListImovel
            imovelSelect={ imovelSelect.idImovel }
            imovel={
              findImovel.indexQuarteirao === -1 ?
                [] :
                quarteirao[findImovel.indexQuarteirao].imovel
            }
            handleList={ this.handleList }
            numero={ this.state.numero === "" ? "-1" : this.state.numero } />
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

  const filterImovel = imovel.filter(
    imovel => {
      return (numero === -1 || imovel.numero === numero);
    }
  );

  let li = filterImovel.map(( imovel, index ) =>
    <LiImovel
      key={ imovel.idImovel }
      className={ imovelSelect === imovel.idImovel ? "active" : "" }
      onClick={ () => handleList( index ) }>
    <ContainerIcon>
      <IoIosHome className="icon-lg" />
    </ContainerIcon>
    <DivDescription>
      <h4 className="title">Nº { imovel.numero }</h4>
      <p>
        <strong>Responsável:</strong> { imovel.responsavel }
      </p>
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
  },
  imovelSelect: {
    index: state.supportInfo.form_vistoria.imovel.index,
    idImovel: state.supportInfo.form_vistoria.imovel.idImovel,
    numero: state.supportInfo.form_vistoria.imovel.numero,
    complemento: state.supportInfo.form_vistoria.imovel.complemento,
    responsavel: state.supportInfo.form_vistoria.imovel.responsavel,
  },
  quarteirao: state.supportInfo.quarteirao
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setVistoriaImovel, handleQuarteirao }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindImovel);
