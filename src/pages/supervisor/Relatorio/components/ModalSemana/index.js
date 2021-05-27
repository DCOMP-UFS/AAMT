import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';

// STYLES
import { Button } from '../../../../../styles/global';

export const ModalSemana = ({ ...props }) => {
  return (
    <Modal { ...props }>
      <form>
        <ModalBody>
          <div className="form-group mb-0">
            <label htmlFor="semana">Semana Epidemiológica<code>*</code></label>
            <input className="form-control" type="number" id="semana" min="1" />
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
