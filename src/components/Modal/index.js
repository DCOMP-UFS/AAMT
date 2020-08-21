import React, { useState } from 'react';
import ButtonClose from '../ButtonClose';
import $ from 'jquery';

// STYLES
import { Button } from '../../styles/global';

export default function Modal({ id, title, ...props }) {
  const centered = props.centered ? 'modal-dialog-centered' : '';
  // lg or sm or null
  const size = props.size ? `modal-${ props.size }` : '';

  return(
    <div id={ id } className="modal fade show" role="dialog" data-backdrop={ props.backdrop } >
        <div className={`modal-dialog ${ centered } ${ size }`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ title }</h5>
              <ButtonClose title="Fechar" data-dismiss="modal" aria-label="Close" />
            </div>
            { props.children }
          </div>
        </div>
      </div>
  );
}

export function ModalBody({ children }) {
  return(
    <div className="modal-body">
      {children}
    </div>
  );
}

export function ModalFooter({ children }) {
  return(
    <div className="modal-footer">
      {/* <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
      <Button type="submit">Iniciar</Button> */}
      {children}
    </div>
  );
}

export function ModalConfirm( props ) {
  const [ id ] = useState( props.id ? props.id : "modal-confirm" );

  function confirm() {
    props.confirm();
    $(`#${ id }`).modal('hide');
  }

  return(
    <Modal id={ id } title={ props.title } centered={ true } backdrop={ props.backdrop }>
      <ModalBody>
        { props.children }
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button className="danger" onClick={ confirm }>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}
