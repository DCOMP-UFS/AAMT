import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateAllUsuarioRequest, clearUpdateUser } from '../../store/Usuario/usuarioActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDesativar({ updateUser, tableSelected, ...props }) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( updateUser ) {
      $('#modal-desativar-usuario').modal('hide');
      props.clearUpdateUser();
    }
    setFlLoading( false );
  }, [ updateUser ]);

  function handleClick() {
    setFlLoading( true );
    tableSelected.forEach( row => {
      var user = props.usuarios[ row.dataIndex ];
      props.updateAllUsuarioRequest( user.id, {
         cpf: user.cpf,
         rg:  user.rg,
         email: user.email,
         celular: user.celular,
         ativo: 0,
         atuacoes: user.atuacoes
        } );
    });

    props.clearUpdateUser();
  }

  return(
    <Modal id="modal-desativar-usuario" title="Desativar Usuário(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) usuário(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal" disabled={ flLoading }>Cancelar</Button>
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
