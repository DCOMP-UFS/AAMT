/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { clearUpdate } from '../../store/Localidade/localidadeActions';
import { getLaboratoriosRequest, updateLaboratoryRequest } from '../../store/Laboratorio/laboratorioActions'; 

// MODELS
import { Laboratorio } from '../../config/models';

// STYLES
import { Button } from '../../styles/global';

function ModalDisabled( { show, handleClose, municipio, ...props } ) {
  function handleClick() {
    props.tableSelected.forEach( row => {
      const lab = props.laboratorios[ row.dataIndex ];
      props.updateLaboratoryRequest( new Laboratorio( {
        cnpjId: lab.cnpj,
        cnpj: lab.cnpj,
        nome: lab.nome,
        endereco: lab.endereco,
        tipoLaboratorio: lab.tipoLaboratorio,
        ativo: false,
        municipio_id: municipio.id
      }));
    handleClose();
    })}


  return(
    <Modal show={ show } onHide={ handleClose } id="modal-desativar-laboratorio" title="Desativar Laboratorios(s)" centered={ true } >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p>Deseja desativar o(s) laboratorios(s)?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableLocation,
  laboratorios: state.nw_laboratorio.laboratorios,
  municipio : state.appConfig.usuario.municipio,
  updated: state.nw_laboratorio.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({clearUpdate, getLaboratoriosRequest, updateLaboratoryRequest }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
