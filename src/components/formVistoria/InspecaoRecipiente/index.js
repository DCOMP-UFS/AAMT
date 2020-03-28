import React, { Component } from 'react';
import { FaVial } from 'react-icons/fa';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// COMPONENTS
// import { Container } from './styles';
import {
  UlIcon,
  LiIcon,
  LiEmpty,
  ContainerIcon,
  DivDescription
} from '../../../styles/global';
import ButtonNewObject from '../../ButtonNewObject';
import ModalCadastrarInspecao from './ModalCadastrarInspecao';

class InspecaoRecipiente extends Component {
  getNextIdRecipiente( lastId ) {
    const arrayId = lastId.split(".");

    let count = arrayId[ arrayId.length - 1 ];
    arrayId.pop();

    let str = arrayId.reduce( ( accumulator, value ) => accumulator + "." + value );

    return str + "." + (parseInt( count ) + 1);
  }

  render() {
    const recipiente = this.props.recipiente;
    const nextIdRecipiente = this.getNextIdRecipiente(
      recipiente.length === 0 ? "1.5.0" : recipiente[ recipiente.length - 1 ].idRecipiente
    );

    return (
      <div>
        <h4>
          Recipiente(s) inspecionado(s)
          <ButtonNewObject
            title="Cadastrar Inspeção"
            data-toggle="modal"
            data-target="#modalCadastrarInspecao" />
        </h4>

        <ListRecipiente recipiente={recipiente} />

        <ModalCadastrarInspecao idRecipiente={ nextIdRecipiente } />
      </div>
    );
  }
}

function ListRecipiente( props ) {
  const recipiente = props.recipiente;

  let li = recipiente.map(( recipiente, index ) =>
    <LiIcon
      key={ index }
    >
      <ContainerIcon className="ContainerIcon" >
        <FaVial />
      </ContainerIcon>
      <DivDescription>
        <div>
          <span className="mr-2">Cód.: { recipiente.idRecipiente }</span>
        </div>
        <span>Nº amostra(s): { recipiente.unidade.length }</span>
      </DivDescription>
    </LiIcon>
  );

  if( recipiente.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhum recipiente cadastrado</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon>
      { li }
    </UlIcon>
  )
}

const mapStateToProps = state => ({
  recipiente: state.supportInfo.form_vistoria.recipienteInspecionado,
  numRecipiente: state.supportInfo.form_vistoria.numRecipiente,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(InspecaoRecipiente);
