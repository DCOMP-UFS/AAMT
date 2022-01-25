/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';

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

function ModalDisabled( props ) {
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
      }));
    })}

    //props.clearUpdate();
  
 
  useEffect(() => {
    //props.clearUpdate();
  }, []);

  useEffect(() => {
    if( props.updated ) {
      $('#modal-desativar-laboratorio').modal('hide');
    }
  }, [ props.updated ]);

  return(
    <Modal id="modal-desativar-laboratorio" title="Desativar Laboratorios(s)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) laboratorios(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ handleClick }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  tableSelected: state.supportInfo.tableSelection.tableLocation,
  laboratorios: state.nw_laboratorio.laboratorios,
  updated: state.nw_laboratorio.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({clearUpdate, getLaboratoriosRequest, updateLaboratoryRequest }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
