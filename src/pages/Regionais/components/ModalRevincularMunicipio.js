/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { rebindMunicipioRegionalRequest, rebindMunicipioRegionalReset } from '../../../store/Municipio/municipioActions';
import { showNotifyToast } from "../../../store/AppConfig/appConfigActions";

// STYLES
import { Button } from '../../../styles/global';

function ModalRevincularMuncipio( { regional_id, municipio, ...props} ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.rebindedCity ) {
      props.showNotifyToast( "Municipios antigos atualizado com sucesso", "success" )
      setFlLoading( false );
      $('#modal-revincular-municipio').modal('hide');
      props.rebindMunicipioRegionalReset();
      setTimeout(() => { 
        document.location.reload( true );
      }, 1500)
    }

    setFlLoading( false );
    props.rebindMunicipioRegionalReset();
  }, [ props.rebindedCity ]);

  function handleClick() {
    setFlLoading( true );
    props.rebindMunicipioRegionalRequest(municipio.id, regional_id)
  }

  return(
    <Modal id="modal-revincular-municipio" title="Revincular Município" backdrop="static" keyboard={false} centered={ true }>
      <ModalBody>
        <p>Deseja revincula este município à regional?</p>
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
  rebindedCity: state.municipio.rebindedCity,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    rebindMunicipioRegionalRequest, 
    rebindMunicipioRegionalReset,
    showNotifyToast,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRevincularMuncipio);
