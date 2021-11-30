/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateLocationRequest, clearUpdate } from '../../../store/Localidade/localidadeActions';

// STYLES
import { Button } from '../../../styles/global';

function ModalDisabled( props ) {
  function handleClick() {
    props.tableSelected.forEach( row => {
      const { id } = props.localidades[ row.dataIndex ];

      props.updateLocationRequest( id, { ativo: 0 } );
    });

    props.clearUpdate();
  }

  useEffect(() => {
    props.clearUpdate();
  }, []);

  useEffect(() => {
    if( props.updated ) {
      $('#modal-desativar-localidade').modal('hide');
    }
  }, [ props.updated ]);

  return(
    <Modal id="modal-desativar-localidade" title="Desativar Localidade(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar a(s) localidade(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableLocation,
  localidades: state.localidade.localidades,
  updated: state.localidade.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateLocationRequest, clearUpdate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
