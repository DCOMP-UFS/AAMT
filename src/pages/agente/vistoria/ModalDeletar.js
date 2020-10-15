import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { deletarVistoria } from '../../../store/actions/VistoriaCacheActions';

// STYLES
import { Button } from '../../../styles/global';

function ModalConfirmar({ tableSelected, ...props }) {
  const [ flLoading, setFlLoading ] = useState( false );

  // useEffect(() => {
  //   if( updateUser ) {
  //     $('#modal-deletar-vistoria').modal('hide');
  //     setFlLoading( false );
  //     props.clearUpdateUser();
  //   }
  // }, [ updateUser ]);

  function handleClick() {
    props.deletarVistoria( tableSelected );
  }

  return(
    <Modal id="modal-deletar-vistoria" title="Apagar Vistoria(s)" centered={ true }>
      <ModalBody>
        <p>Deseja apagar a(s) vistoria(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button
          className="danger"
          onClick={ handleClick }
          loading={ flLoading.toString() }
          disabled={ flLoading ? 'disabled' : '' }
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
                  Apagando...
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
  tableSelected: state.supportInfo.tableSelection.tableVistoria
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    deletarVistoria
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalConfirmar);
