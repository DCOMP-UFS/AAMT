import React from 'react';
import ButtonNewObject from '../../../../../components/ButtonNewObject';
import ModalCadastrarInspecao from './ModalCadastrarInspecao';
import ModalEditarInspecao from './ModalEditarInspecao';
import ButtonClose from '../../../../../components/ButtonClose';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { removerRecipiente, changeUpdatedIndex } from '../../../../../store/actions/VistoriaActions';

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
  function openModalEdit( index ) {
    props.changeUpdatedIndex( index );
    $('#modalEditarInspecao').modal('show');
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
          removerRecipiente={ props.removerRecipiente }
          openModalEdit={ openModalEdit } />

        <ModalCadastrarInspecao objetivo={ objetivo } />
        <ModalEditarInspecao objetivo={ objetivo } />
      </div>
    </Container>
  );
}

function ListRecipiente({ recipientes, trabalhoDiario_id, vistoriaSequencia, ...props }) {
  let li = recipientes.map(( recipiente, index ) =>
    <LiIcon key={ index }>
      <ListContainer onClick={ () => props.openModalEdit( index ) }>
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
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  vistorias: state.vistoriaCache.vistorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removerRecipiente, changeUpdatedIndex }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspecionarRecipiente);
