import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';

// STYLES
import { Button } from '../../../../../styles/global';

export const ModalDia = ({ ...props }) => {
  return (
    <Modal { ...props }>
      <form>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="data">Data<code>*</code></label>
            <input className="form-control" type="date" name="data" id="data" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="info" type="submit">Consultar</Button>
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
)( ModalDia );
