/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Modal } from 'react-bootstrap';

// STYLES
import { Button } from '../../styles/global';

/**
 * Modal de confirmação do usuário
 * 
 * @param {string} title título do modal
 * @param {component} children componentes de corpo do modal
 * @param {boolean} show flag de abrir e fechar modal
 * @param {function} handleClose função de close do modal
 * @param {function} confimed função acionada caso de confirmação true
 * @returns 
 */
const ModalConfirmacao = ( { title, show, handleClose, confimed, children, ...props } ) => {
  return(
    <Modal show={ show } onHide={ handleClose }  backdrop="static" keyboard={false} { ...props }>
      <Modal.Header closeButton>
        <Modal.Title>{ title ? title : 'Confirmação' }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button className="secondary" onClick={ () => { handleClose(); confimed( false ); } }>Cancelar</Button>
        <Button className="danger" onClick={ () => confimed( true ) }>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmacao;
