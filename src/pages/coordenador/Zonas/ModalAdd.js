/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createZoneRequest, clearCreate } from '../../../store/Zona/zonaActions';

// STYLES
import { Button } from '../../../styles/global';

function ModalAdd({ createZoneRequest, created, municipio_id, ...props }) {
  function handleCadastrar( e ) {
    e.preventDefault();

    createZoneRequest( municipio_id );
  }

  useEffect(() => {
    props.clearCreate();
  }, []);

  useEffect(() => {
    if( created ) {
      $('#modal-novo-zona').modal('hide');
      props.clearCreate();
    }
  }, [ created ]);

  return(
    <Modal id="modal-novo-zona" title="Cadastrar Zona">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <p>O nome da zona é gerado automaticamente, deseja realmente criar uma zona?</p>
        </ModalBody>
        <ModalFooter>
          <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  created: state.zona.created
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createZoneRequest, clearCreate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
