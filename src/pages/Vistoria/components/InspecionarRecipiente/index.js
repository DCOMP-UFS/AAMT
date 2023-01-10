import React from 'react';
import ButtonNewObject from '../../../../components/ButtonNewObject';
import ModalCadastrarInspecao from './ModalCadastrarInspecao';
import ModalEditarInspecao from './ModalEditarInspecao';
import ModalDuplicateInspection from './ModalDuplicateInspection';
import $ from 'jquery';
import { FaEllipsisV } from 'react-icons/fa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { removerRecipiente, changeUpdatedIndex, changeDuplicatorIndex } from '../../../../store/Vistoria/vistoriaActions';
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';

// STYLES
import {
  Container,
  UlIcon,
  LiIcon,
  ContainerIcon,
  DivDescription,
  ListContainer
} from './styles';
import { LiEmpty } from '../../../../styles/global';

function InspecionarRecipiente({ sequenciaRecipiente, inspectionSequence, vistorias, trabalhoDiario_id, 
                                 recipientes, objetivo, isPaginaEdicao, vistoriaPendente, ...props }) {
  function openModalEdit( index ) {
    props.changeUpdatedIndex( index );
    $('#modalEditarInspecao').modal('show');
  }

  function openModalDuplicate( index ) {
    props.changeDuplicatorIndex( index );
    $( '#modalDuplicateInspection' ).modal( 'show' );
  };

  return (
    <Container>
      <div>
        <h4>
          Depósito(s) inspecionado(s)
          <ButtonNewObject
            title="Cadastrar Inspeção"
            data-toggle="modal"
            onClick={() => {
              if(vistoriaPendente === "inv")
                props.showNotifyToast( "Por favor selecione o valor do campo pendência!", "warning" );
              else if(vistoriaPendente === "F" || vistoriaPendente === "R")
                props.showNotifyToast( "Vistoria com pendência fechada ou recusada não pode ter depositos cadastrados!", "warning" );
              else 
                $( '#modalCadastrarInspecao' ).modal( 'show' )
            }} />
        </h4>

        <ListRecipiente
          recipientes={ recipientes }
          trabalhoDiario_id={ trabalhoDiario_id }
          vistoriaSequencia={ inspectionSequence }
          removerRecipiente={ props.removerRecipiente }
          openModalEdit={ openModalEdit }
          openModalDuplicate={ openModalDuplicate }
        />

        <ModalCadastrarInspecao objetivo={ objetivo } />
         {/*isPaginaEdicao Indica para o componente se ele está sendo usado na pagina de edição de vistoria*/}
        <ModalEditarInspecao objetivo={ objetivo } isPaginaEdicao={isPaginaEdicao}/>
        <ModalDuplicateInspection />
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
            <span className="mr-2">Recipiente: { recipiente.sequencia }</span>
          </div>
          <span>Amostra(s): { recipiente.amostras.length }</span>
        </DivDescription>
      </ListContainer>
      <button className="dropdown-toggle no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <FaEllipsisV />
      </button>
      <div className="dropdown-menu dropdown-menu-right">
        <button
          className="dropdown-item"
          onClick={ () => props.openModalEdit( index ) }
        >Editar</button>
        <button
          className="dropdown-item"
          onClick={ () => props.openModalDuplicate( index ) }
          disabled={ recipiente.amostras.length > 0 }
        >Replicar</button>
        <div className="dropdown-divider"></div>
        <button
          className="dropdown-item bg-danger"
          onClick={ () => props.removerRecipiente( index ) }
        >Remover</button>
      </div>
    </LiIcon>
  );

  if( recipientes.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhum depósito cadastrado</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon>
      { li }
    </UlIcon>
  )
}

const mapStateToProps = state => ({
  inspectionSequence: state.vistoria.inspectionSequence,
  recipientes: state.vistoria.recipientes,
  reload: state.vistoria.reload,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  vistorias: state.vistoriaCache.vistorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removerRecipiente, changeUpdatedIndex, changeDuplicatorIndex, showNotifyToast, }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspecionarRecipiente);
