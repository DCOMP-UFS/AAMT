/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ModalBody, ModalFooter } from '../../../components/Modal';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';


// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getZoneByIdRequest } from '../../../store/Zona/zonaActions';
import { 
    removerQuarteiraoEmZonaRequest, 
    removerQuarteiraoEmZonaReset,
    getQuarteiroesMunicipioSemZonaRequest
} from '../../../store/Quarteirao/quarteiraoActions';
import { showNotifyToast } from "../../../store/AppConfig/appConfigActions";
// STYLES
import { Button } from '../../../styles/global';

const ModalRemoveBlockInZone = ( {quarteirao, show, handleClose, ...props} ) => {
  const [ flLoading, setFlLoading ] = useState( false );

  function handleClick() {
    setFlLoading( true );
    props.removerQuarteiraoEmZonaRequest(quarteirao.id)
  }

  useEffect(() => {
    if( props.removedZone ) {
        props.getZoneByIdRequest( props.zona.id ); // atualizando lista de quarteirões da zona
        props.getQuarteiroesMunicipioSemZonaRequest( props.municipio_id ); //atualizando lista de quarteirões que podem ser adicionados

        setTimeout(() => { 
            setFlLoading(false)
            props.removerQuarteiraoEmZonaReset()
            props.showNotifyToast( "Quarteirão removido com sucesso", "success" )
            handleClose()
            //document.location.reload( true );
        }, 3000)
    }
    else{
        setFlLoading(false)
        props.removerQuarteiraoEmZonaReset()
    }
  }, [ props.removedZone ]);

  return(
    <Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={false} centered={ true }>
      <Modal.Header closeButton>
        <Modal.Title>
          Remover quarteirão da zona
        </Modal.Title>
      </Modal.Header>
      <ModalBody>
        <p>Deseja mesmo remover o quarteirão de nº {quarteirao.numero} dessa zona?</p>
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
                  Removendo...
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
  municipio_id: state.appConfig.usuario.municipio.id,
  zona: state.zona.zona,
  removedZone: state.quarteirao.removedZone,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    removerQuarteiraoEmZonaRequest, 
    removerQuarteiraoEmZonaReset,
    getQuarteiroesMunicipioSemZonaRequest,
    getZoneByIdRequest,
    showNotifyToast 
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRemoveBlockInZone);
