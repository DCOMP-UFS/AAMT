/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { deleteStreetRequest } from '../../store/Rua/ruaActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDeleteStreet({ ruas, index, ...props }) {
  const [ rua, setRua ] = useState({ nome: "" });

  function handleClick() {
    props.deleteStreetRequest( rua.id, index );
    $('#modal-excluir-rua').modal('hide');
  }

  useEffect(() => {
    if( Number.isInteger( index ) ) {
      setRua( ruas[ index ] );
    }
  }, [ index ]);

  return(
    <Modal id="modal-excluir-rua" title="Excluir Rua" centered={ true }>
      <ModalBody>
        <p>{"Deseja excluir a rua " + rua.nome + "?"}</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  ruas: state.rua.ruas,
  index: state.rua.indexSelect,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteStreetRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDeleteStreet);
