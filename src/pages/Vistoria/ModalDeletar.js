import React, { useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import LoadginGif from '../../assets/loading.gif';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { deletarVistoria } from '../../store/VistoriaCache/vistoriaCacheActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions'

// STYLES
import { Button } from '../../styles/global';

function ModalConfirmar({ tableSelected, ...props }) {
  const [ flLoading ] = useState( false );

  // useEffect(() => {
  //   if( updateUser ) {
  //     $('#modal-deletar-vistoria').modal('hide');
  //     setFlLoading( false );
  //     props.clearUpdateUser();
  //   }
  // }, [ updateUser ]);

  function handleClick() {
    props.deletarVistoria( tableSelected, props.trabalhoDiario.id );
    $('#modal-deletar-vistoria').modal('hide');
    props.showNotifyToast( "Vistoria(s) deletada(s) com sucesso", "success" )
    //espera 1s para recarregar a pagina
    setTimeout(() => { document.location.reload( true );}, 1000)
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
  tableSelected: state.supportInfo.tableSelection.tableVistoria,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    deletarVistoria,
    showNotifyToast
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalConfirmar);
