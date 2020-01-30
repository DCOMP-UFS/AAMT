import React, { useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateAllUsuarioRequest, clearUpdateUser } from '../../store/actions/UsuarioActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDesativar( props ) {
  function handleClick() {
    props.tableSelected.forEach( row => {
      const { id } = props.usuarios[ row.index ];

      props.updateAllUsuarioRequest( id, { ativo: 0 } );
    });

    props.clearUpdateUser();
  }

  useEffect(() => {
    if( props.updateUser ) {
      $('#modal-desativar-usuario').modal('hide');
    }
  }, [ props.updateUser ]);

  return(
    <Modal id="modal-desativar-usuario" title="Desativar Usuário(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) usuário(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Desativar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableUser,
  usuarios: state.usuario.usuarios,
  updateUser: state.usuario.updateUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateAllUsuarioRequest, clearUpdateUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDesativar);
