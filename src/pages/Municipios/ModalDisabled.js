/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateCityRequest, clearUpdateCity } from '../../store/actions/MunicipioActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDisabled( props ) {
  function handleClick() {
    props.tableSelected.forEach( row => {
      const { id } = props.municipios[ --row.id ];

      props.updateCityRequest( id, { ativo: 0 } );
    });

    props.clearUpdateCity();
  }

  useEffect(() => {
    props.clearUpdateCity();
  }, []);

  useEffect(() => {
    if( props.updatedCity ) {
      $('#modal-desativar-municipio').modal('hide');
    }
  }, [ props.updatedCity ]);

  return(
    <Modal id="modal-desativar-municipio" title="Desativar Município(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) município(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Desativar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableMunicipio,
  municipios: state.municipio.municipios,
  updatedCity: state.municipio.updatedCity
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCityRequest, clearUpdateCity }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
