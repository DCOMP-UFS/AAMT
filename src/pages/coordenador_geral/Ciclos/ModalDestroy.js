/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';


// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { destroyCycleRequest } from '../../../store/actions/CicloActions';
import { showNotifyToast } from '../../../store/actions/appConfig';

// STYLES
import { Button } from '../../../styles/global';

function ModalDestroy( props ) {
  function handleClick() {
    props.tableSelected.forEach( row => {
      const { id, situacao } = props.ciclos[ row.dataIndex ];

      if( situacao === "Em aberto" || situacao === "Finalizado" )
        props.showNotifyToast( "Não é permitido excluir ciclo em aberto ou finalizado", "warning" );
      else
        props.destroyCycleRequest( id );
    });

    $('#modal-excluir-ciclo').modal('hide');
  }

  return(
    <Modal id="modal-excluir-ciclo" title="Excluir Ciclo(s)" centered={ true }>
      <ModalBody>
        <p>Atenção se excluir este(s) ciclo(s) todas as informações serão perididas. Deseja, mesmo assim, excluir o(s) ciclo(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableCycle,
  ciclos: state.ciclo.ciclos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ destroyCycleRequest, showNotifyToast }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDestroy);
