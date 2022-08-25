/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateLocationRequest, clearUpdate, getLocationByCityRequest, } from '../../store/Localidade/localidadeActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDisabled(props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  function handleClick() {
    setFlLoading( true );
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
      props.getLocationByCityRequest( props.municipio_id );
      setFlLoading( false );
      $('#modal-desativar-localidade').modal('hide');
    }
  }, [ props.updated ]);

  return(
    <Modal id="modal-desativar-localidade" title="Desativar Localidade(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar a(s) localidade(s)?</p>
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
  tableSelected: state.supportInfo.tableSelection.tableLocation,
  localidades: state.localidade.localidades,
  updated: state.localidade.updated,
  municipio_id: state.appConfig.usuario.municipio.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateLocationRequest, clearUpdate, getLocationByCityRequest, }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
