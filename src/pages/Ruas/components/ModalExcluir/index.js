/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONSy
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';
import { deleteStreetRequest, clearDelete, getStreetByCityRequest } from '../../../../store/Rua/ruaActions';

// STYLES
import { Button } from '../../../../styles/global';

function ModalExcluirRua( { ruaId, indexRua, ...props } ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.deleted ) {
      props.getStreetByCityRequest(props.municipio.id)
      setFlLoading( false );
      $('#'+props.id).modal('hide');
      props.clearDelete()
    }else if( props.deleted === false ) {
       setFlLoading( false );
       props.clearDelete()
    }
  }, [ props.deleted ]);

  function handleClick() {
    setFlLoading(true);
    props.deleteStreetRequest(ruaId, indexRua)
  }

  return(
    <Modal id={props.id} title="Excluir Logradouro" centered={ true }>
      <ModalBody>
        <p>Deseja mesmo excluir este logradouro?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal" disabled={ flLoading }>Cancelar</Button>
        <Button
          className="danger"
          onClick={ handleClick }
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
                  Encerrando...
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
  deleted:   state.rua.deleted,
  municipio: state.appConfig.usuario.municipio
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    showNotifyToast,
    deleteStreetRequest, 
    clearDelete,
    getStreetByCityRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalExcluirRua);
