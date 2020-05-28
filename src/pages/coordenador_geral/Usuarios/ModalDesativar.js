import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateAllUsuarioRequest, clearUpdateUser } from '../../../store/actions/UsuarioActions';

// STYLES
import { Button } from '../../../styles/global';

function ModalDesativar({ updateUser, tableSelected, ...props }) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( updateUser ) {
      $('#modal-desativar-usuario').modal('hide');
      setFlLoading( false );
      props.clearUpdateUser();
    }
  }, [ updateUser ]);

  function handleClick() {
    setFlLoading( true );
    tableSelected.forEach( row => {
      const { id } = props.usuarios[ row.dataIndex ];
      props.updateAllUsuarioRequest( id, { ativo: 0 } );
    });

    props.clearUpdateUser();
  }

  return(
    <Modal id="modal-desativar-usuario" title="Desativar Usuário(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) usuário(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button
          className="danger"
          onClick={ handleClick }
          loading={ flLoading }
          disabled={ flLoading }
        >
          {
            flLoading ?
              (
                <>
                  <img
                    src={ LoadginGif }
                    width="25"
                    style={{ marginRight: 10 }}
                    alt="Carregando"
                  />
                  Desativando...
                </>
              ) :
              "Confirmar"
          }
        </Button>
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
