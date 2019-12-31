import React, { Component } from 'react';
import Select from 'react-select';
import { FaVial } from 'react-icons/fa';
import { validInputIsNull } from '../../../config/function';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { addInspecao, addUnidade } from '../../../store/actions/supportInfo';

// COMPONENTS
import { ContainerUnidade } from './styles';
import {
  Button,
  selectDefault,
  Separator,
  UlIcon,
  LiIcon,
  LiEmpty,
  ContainerIcon,
  DivDescription
} from '../../../styles/global';
import ButtonNewObject from '../../ButtonNewObject';
import ButtonClose from '../../ButtonClose';

// ENUMERATE
import { tipoRecipiente, tipoColetor, situacaoUnidade } from '../../../config/enumerate';

class ModalCadastrarInspecao extends Component {
  state = {
    optionsTipoRecipiente: tipoRecipiente.map( tipo => (
      { value: tipo, label: tipo, name: "tipoRecipiente" }
    ) ),
    optionsSimNao: [
      { value: true, label: "Sim" },
      { value: false, label: "Não" }
    ],
    optionsTipoColetor: tipoColetor.map( tipo => (
      { value: tipo, label: tipo, name: "tipoColetor" }
    ) ),

    tipoColetor: { value: null, label: null, name: "tipoColetor" },
    tipoRecipiente: { value: null, label: null, name: "tipoRecipiente" },
    fl_eliminado: { value: null, label: null, name: "fl_eliminado" },
    fl_tratado: { value: null, label: null, name: "fl_tratado" },
    fl_foco: { value: null, label: null, name: "fl_foco" },
    numUnidade: 0,
    unidade: []
  }

  handleSelect = select => {
    const name = select.name;

    this.setState({
      [name]: select
    });
  }

  addUnidade = () => {
    let fl_valido = true;// true -> válido | false -> inválido
    const tipoColetor = this.state.tipoColetor.value;

    if( !validInputIsNull( "#tipoColetor", tipoColetor ) ) fl_valido = false;

    if( fl_valido ) {
      let numUnidade = this.state.numUnidade + 1;
      let listUnidade = this.state.unidade;

      const unidade = {
        idUnidade: this.props.idRecipiente + "." + numUnidade,
        tipoColetor,
        situacao: situacaoUnidade[0]
      }

      listUnidade.push( unidade );

      this.setState({
        numUnidade,
        listUnidade
      });
    }
  }

  removeUnidade = index => {
    let unidade = this.state.unidade;

    unidade.splice( index, 1 );

    this.setState({
      unidade
    });
  }

  submit = () => {
    // Validação
    let fl_valido = true;// true -> válido | false -> inválido
    const idRecipiente = this.props.idRecipiente;
    const tipoRecipiente = this.state.tipoRecipiente.value;
    const fl_eliminado = this.state.fl_eliminado.value;
    const fl_tratado = this.state.fl_tratado.value;
    const fl_foco = this.state.fl_foco.value;
    const unidade = this.state.unidade;

    if( !validInputIsNull( "#tipoRecipiente", tipoRecipiente ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_eliminado", fl_eliminado ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_tratado", fl_tratado ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_foco", fl_foco ) ) fl_valido = false;

    if( fl_valido ) {
      this.props.addInspecao( idRecipiente, tipoRecipiente, fl_eliminado, fl_tratado, fl_foco );

      unidade.forEach( unidade => {
        this.props.addUnidade( unidade.idUnidade, unidade.tipoColetor, unidade.situacao );
      });

      // Reset state
      this.setState({
        tipoColetor: { value: null, label: null, name: "tipoColetor" },
        tipoRecipiente: { value: null, label: null, name: "tipoRecipiente" },
        fl_eliminado: { value: null, label: null, name: "fl_eliminado" },
        fl_tratado: { value: null, label: null, name: "fl_tratado" },
        fl_foco: { value: null, label: null, name: "fl_foco" },
        numUnidade: 0,
        unidade: []
      });

      $('#modalCadastrarInspecao').modal('hide');
    }
  }

  render() {
    return (
      <div id="modalCadastrarInspecao" className="modal fade show" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Cadastrar Inspeção</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">

              <div className="form-group">
                <label htmlFor="tipoRecipiente">Tipo de recipiente <code>*</code></label>

                <Select
                  id="tipoRecipiente"
                  options={ this.state.optionsTipoRecipiente }
                  value={ this.state.tipoRecipiente }
                  styles={ selectDefault }
                  onChange={ this.handleSelect } />
              </div>

              <div className="form-group">
                <label htmlFor="fl_eliminado">Recipiente eliminado? <code>*</code></label>

                <Select
                  id="fl_eliminado"
                  options={ this.state.optionsSimNao.map( option => ({ ...option, name: "fl_eliminado" }) ) }
                  value={ this.state.fl_eliminado }
                  styles={ selectDefault }
                  onChange={ this.handleSelect } />
              </div>

              <div className="form-group">
                <label htmlFor="fl_tratado">Recipiente tratado? <code>*</code></label>

                <Select
                  id="fl_tratado"
                  options={ this.state.optionsSimNao.map( option => ({ ...option, name: "fl_tratado" }) ) }
                  value={ this.state.fl_tratado }
                  styles={ selectDefault }
                  onChange={ this.handleSelect } />
              </div>

              <div className="form-group">
                <label htmlFor="fl_foco">Com foco? <code>*</code></label>

                <Select
                  id="fl_foco"
                  options={ this.state.optionsSimNao.map( option => ({ ...option, name: "fl_foco" }) ) }
                  value={ this.state.fl_foco }
                  styles={ selectDefault }
                  onChange={ this.handleSelect } />
              </div>

              <ContainerUnidade className={ this.state.fl_foco.value ? "active" : "" } >
                <Separator />

                <h4>
                  Cadastrar Amostra(s)
                  <ButtonNewObject
                    title="Cadastrar Amostra"
                    onClick={ this.addUnidade } />
                </h4>

                <div className="form-group">
                  <label htmlFor="tipoColetor">Coletor <code>*</code></label>
                  <Select
                    id="tipoColetor"
                    options={ this.state.optionsTipoColetor }
                    value={ this.state.coletor }
                    styles={ selectDefault }
                    onChange={ this.handleSelect } />
                </div>

                <ListUnidade unidade={ this.state.unidade } remove={ this.removeUnidade } />
              </ContainerUnidade>

            </div>

            <div className="modal-footer">
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="button" onClick={ this.submit } >Cadastrar</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ListUnidade( props ) {
  const unidade = props.unidade;
  const remove = props.remove;

  let li = unidade.map(( unidade, index ) =>
    <LiIcon
      key={ index } >
    <ContainerIcon className="ContainerIcon" >
      <FaVial />
    </ContainerIcon>
    <DivDescription>
      <div>
        <span className="mr-2">Cód.: { unidade.idUnidade }</span>
        <span>Coletor: { unidade.tipoColetor }</span>
      </div>

      <ButtonClose
        title="Remover amostra"
        onClick={ () => remove( index ) } />
    </DivDescription>
  </LiIcon>
  );

  if( unidade.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhuma amostra cadastrada</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon>
      { li }
    </UlIcon>
  )
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addInspecao, addUnidade }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCadastrarInspecao);
