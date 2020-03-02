/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { deleteHouseRequest } from '../../../store/actions/QuarteiraoActions';

// STYLES
import { Button } from '../../../styles/global';

function ModalDeleteHouse({ imovel, ...props }) {
  function handleClick() {
    props.deleteHouseRequest( imovel.id, imovel.lado.id );
    $('#modal-excluir-imovel').modal('hide');
  }

  return(
    <Modal id="modal-excluir-imovel" title="Excluir Imóvel" centered={ true }>
      <ModalBody>
        <p>{"Deseja excluir o imóvel nº " + imovel.numero + "?"}</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  imovel: state.supportInfo.imovelSelect
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteHouseRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDeleteHouse);
