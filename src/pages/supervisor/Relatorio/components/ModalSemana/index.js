import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';

// STYLES
import { Button } from '../../../../../styles/global';

export const ModalSemana = ({ atividade_id, ano, ...props }) => {
  const [ semana, setSemana ] = useState( '' );

  const submit = e => {
    e.preventDefault();
    window.location = window.location.origin.toString() + '/sup/relatorio/semanal/' + semana + '/' + atividade_id + '/' + ano;
  }

  return (
    <Modal { ...props }>
      <form onSubmit={ submit }>
        <ModalBody>
          <div className="form-group mb-0">
            <label htmlFor="semana">Semana Epidemiológica<code>*</code></label>
            <input
              className="form-control"
              type="number"
              id="semana"
              min="1"
              value={ semana }
              onChange={ e => setSemana( e.target.value ) }
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="info" type="submit">Salvar</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalSemana );
