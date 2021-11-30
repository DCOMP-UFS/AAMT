/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateZoneRequest, clearUpdate } from '../../../store/Zona/zonaActions';

// STYLES
import { Button } from '../../../styles/global';

function ModalDisabled( props ) {
  function handleClick() {
    props.tableSelected.forEach( row => {
      const { id } = props.zonas[ row.dataIndex ];

      props.updateZoneRequest( id, { ativo: 0 } );
    });

    props.clearUpdate();
  }

  useEffect(() => {
    props.clearUpdate();
  }, []);

  useEffect(() => {
    if( props.updated ) {
      $('#modal-desativar-zona').modal('hide');
    }
  }, [ props.updated ]);

  return(
    <Modal id="modal-desativar-zona" title="Desativar Zona(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar a(s) zona(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableZone,
  zonas: state.zona.zonas,
  updated: state.zona.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateZoneRequest, clearUpdate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
