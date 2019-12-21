import React, { Component } from 'react';
import { FaVial } from 'react-icons/fa';
import Select from 'react-select';

// REDUX
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// COMPONENTS
import { Button, Separator } from '../../../styles/global';
import {
  Container,
  UlAmostra,
  LiAmostra,
  ContainerIcon,
  DivDescription,
  UlUnidade,
  LiUnidade,
  LiEmpty,
  ContainerInfo,
  IconDelete,
} from './styles';
import ButtonNewObject from '../../ButtonNewObject';
import ButtonClose from '../../ButtonClose';

// ENUMERATE
import { tipoRecipiente, tipoColetor, situacaoUnidade } from '../../../config/enumerate';

class Amostra extends Component {
  state = {
    optionRecipiente: tipoRecipiente.map(
      tipo => {return { value: tipo, label: [tipo] }}
    ),
    optionColetor: tipoColetor.map(
      tipo => {return { value: tipo, label: [tipo] }}
    ),

    coletor: "",
    tempAmostra: {
      idAmostra: "1.5.3",
      tipoRecipiente: "",
      unidade: [],
    }
  }

  handleRecipienteAmostra = recipiente => {
    let tempAmostra = this.state.tempAmostra;
    tempAmostra.tipoRecipiente = recipiente.value;

    this.setState({
      tempAmostra
    });
  }

  handleColetorAmostra = coletor => {
    this.setState({
      coletor: coletor.value
    });
  }

  addUnidade = () => {
    let tempAmostra = this.state.tempAmostra;
    const idUnidade = tempAmostra.idAmostra + "." + (tempAmostra.unidade.length + 1);

    tempAmostra.unidade.push({
      idUnidade: idUnidade,
      tipoColetor: this.state.coletor,
      situacao: situacaoUnidade[0]
    });

    this.setState({
      tempAmostra
    });
  }

  cadastraAmostra = () => {
    console.log("Cara sou muito bom");
  }

  render() {
    const amostra = this.props.amostra;
    const tempAmostra = this.state.tempAmostra;

    return (
      <div className="row">
        <div className="col-12">
          <h4>
            Amostra(s)
            <ButtonNewObject
              title="Nova amostra"
              data-toggle="modal"
              data-target="#modalNovaAmostra" />
          </h4>

          <Container>
            <ListAmostra amostra={ amostra } />
          </Container>

          <ModalNovaAmostra
            id="modalNovaAmostra"
            title="Amostra"
            cadastraAmostra={ this.cadastraAmostra }>

            <div className="row">
              <div className="form-group col-12">
                <strong>Código da amostra: { tempAmostra.idAmostra }</strong>
              </div>

              <div className="form-group col-12">
                <label htmlFor="recipienteAmostra">Recipiente <code>*</code></label>
                <Select
                  id="recipienteAmostra"
                  options={ this.state.optionRecipiente }
                  onChange={ this.handleRecipienteAmostra } />
              </div>

              <Separator />

              <div className="form-group col-12">

                <label htmlFor="coletorAmostra">
                  Coletor <code>*</code>
                  <ButtonNewObject
                    title="Unidade"
                    onClick={ this.addUnidade } />
                </label>
                <Select
                  id="coletorAmostra"
                  options={ this.state.optionColetor }
                  onChange={ this.handleColetorAmostra } />

              </div>

              <div className="form-group col-12">
                <label>
                  Unidade(s) <code>*</code>
                </label>
                <ListUnidade unidade={ tempAmostra.unidade } />
              </div>
            </div>

          </ModalNovaAmostra>
        </div>
      </div>
    );
  }
}

function ListAmostra(props) {
  const amostra = props.amostra;

  let li = amostra.map( (amostra, index) => {
    return (
      <LiAmostra key={ index }>
        <ContainerIcon>
          <FaVial className="icon-sm"/>
        </ContainerIcon>
        <DivDescription>
          <span>Código da amostra: { amostra.idAmostra }</span>
          <span>Nº de unidades: { amostra.unidade.length }</span>
        </DivDescription>
      </LiAmostra>
    );
  });

  if( amostra.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhuma amostra cadastrada</h4>
    </LiEmpty>
  }

  return (
    <UlAmostra>
      { li }
    </UlAmostra>
  );
}

function ListUnidade(props) {
  const unidade = props.unidade;

  let li = unidade.map( (unidade, index) => {
    return (
      <LiUnidade key={ index }>
        <ContainerIcon>
          <FaVial className="icon-sm"/>
        </ContainerIcon>
        <DivDescription>
          <ContainerInfo>
            <span>Código da unidade: { unidade.idUnidade }</span>
            <span>Coletor: { unidade.tipoColetor }</span>
          </ContainerInfo>
          <IconDelete>
            <ButtonClose title="Remover"/>
          </IconDelete>
        </DivDescription>
      </LiUnidade>
    );
  });

  if( unidade.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhuma unidade de amostra cadastrada</h4>
    </LiEmpty>
  }

  return (
    <UlUnidade>
      { li }
    </UlUnidade>
  );
}

const ModalNovaAmostra = (props) => {
  return (
    <div id={ props.id } className="modal fade show" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ props.title }</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { props.children }
          </div>
          <div className="modal-footer">
            <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
            <Button type="button" onClick={ () => props.cadastraAmostra() }>Cadastrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  amostra: state.supportInfo.form_vistoria.amostra,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Amostra);
