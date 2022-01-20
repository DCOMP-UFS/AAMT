/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateCityRequest, clearUpdateCity } from '../../store/Municipio/municipioActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDisabled( props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.updatedCity ) {
      $('#modal-desativar-municipio').modal('hide');
      setFlLoading( false );
      props.clearUpdateCity();
    }
  }, [ props.updatedCity ]);

  function handleClick() {
    setFlLoading( true );
    props.tableSelected.forEach( row => {
      const { id } = props.municipios[ row.index ];

      props.updateCityRequest( id, { ativo: 0 } );
    });

    props.clearUpdateCity();
  }

  return(
    <Modal id="modal-desativar-municipio" title="Desativar Município(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) município(s)?</p>
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
  tableSelected: state.supportInfo.tableSelection.tableCity,
  municipios: state.municipio.municipios,
  updatedCity: state.municipio.updatedCity
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCityRequest, clearUpdateCity }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
