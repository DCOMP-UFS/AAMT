/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';


// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateZoneRequest, clearUpdate, getZoneByCityRequest } from '../../store/Zona/zonaActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDisabled( props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  function handleClick() {
    setFlLoading( true );
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
      props.getZoneByCityRequest( props.municipio_id, 'sim' );
      setFlLoading( false );
      $('#modal-desativar-zona').modal('hide');
    }
  }, [ props.updated ]);

  return(
    <Modal id="modal-desativar-zona" title="Excluir Zona(s)" centered={ true }>
      <ModalBody>
        <p>Deseja mesmo excluir a(s) zona(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button 
          className="secondary" 
          data-dismiss="modal" 
          disabled={ flLoading }>
            Cancelar
        </Button>
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
                  Excluindo...
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
  tableSelected: state.supportInfo.tableSelection.tableZone,
  zonas: state.zona.zonas,
  updated: state.zona.updated,
  municipio_id: state.appConfig.usuario.municipio.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateZoneRequest, clearUpdate, getZoneByCityRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
