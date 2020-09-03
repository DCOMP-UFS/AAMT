import React from 'react';
import ButtonNewObject from '../../../../../components/ButtonNewObject';
import ModalCadastrarInspecao from './ModalCadastrarInspecao';
import ButtonClose from '../../../../../components/ButtonClose';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { removerRecipiente } from '../../../../../store/actions/VistoriaActions';

// STYLES
import {
  Container,
  UlIcon,
  LiIcon,
  ContainerIcon,
  DivDescription,
  ListContainer
} from './styles';
import { LiEmpty } from '../../../../../styles/global';

function InspecionarRecipiente({ sequenciaRecipiente, vistorias, trabalhoDiario_id, recipientes, objetivo, ...props }) {
  function getNextIdRecipiente( lastId ) {
    const arrayId = lastId.split(".");

    let count = arrayId[ arrayId.length - 1 ];
    arrayId.pop();

    let str = arrayId.reduce( ( accumulator, value ) => accumulator + "." + value );

    return str + "." + (parseInt( count ) + 1);
  }

  return (
    <Container>
      <div>
        <h4>
          Recipiente(s) inspecionado(s)
          <ButtonNewObject
            title="Cadastrar Inspeção"
            data-toggle="modal"
            data-target="#modalCadastrarInspecao" />
        </h4>

        <ListRecipiente
          recipientes={ recipientes }
          trabalhoDiario_id={ trabalhoDiario_id }
          vistoriaSequencia={ vistorias.length + 1 }
          removerRecipiente={ props.removerRecipiente } />

        <ModalCadastrarInspecao objetivo={ objetivo } />
      </div>
    </Container>
  );
}

function ListRecipiente({ recipientes, trabalhoDiario_id, vistoriaSequencia, ...props }) {
  let li = recipientes.map(( recipiente, index ) =>
    <LiIcon key={ index }>
      <ListContainer>
        <ContainerIcon className="ContainerIcon" >
          { recipiente.tipoRecipiente }
        </ContainerIcon>
        <DivDescription>
          <div>
            <span className="mr-2">Cód. do recipiente: { `${ trabalhoDiario_id }.${ vistoriaSequencia }.${ recipiente.sequencia }` }</span>
          </div>
          <span>Nº amostra(s): { recipiente.amostras.length }</span>
        </DivDescription>
      </ListContainer>
      <ButtonClose
        className="ml-2 text-danger"
        title="Remover recipiente"
        onClick={ () => props.removerRecipiente( index ) } />
    </LiIcon>
  );

  if( recipientes.length === 0 ) {
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
  recipientes: state.vistoria.recipientes,
  reload: state.vistoria.reload,
  trabalhoDiario_id: state.rota.trabalhoDiario.id,
  vistorias: state.vistoriaCache.vistorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removerRecipiente }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspecionarRecipiente);
