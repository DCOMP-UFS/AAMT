import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';
import { FaFileAlt } from 'react-icons/fa';

// STYLES
import { Container } from './styles';
// import { Button } from '../../../../../styles/global';

export const ModalTrabalhoDiario = ({ id, title, ...props }) => {
  return (
    <Modal id={ id } title={ title }>
      <Container>
        <ModalBody>
          <ul className="listra-trabalho-diario">
            <li>
              <div>
                <FaFileAlt className="icon icon-md" />
                <label className="mb-0 font-weight-bold">13/05/2021</label>
              </div>
              <div className="form-group mb-0">
                <label className="mb-0">Jornada de trabalho</label>
                <span>-- : -- à --:--</span>
              </div>
            </li>
            <li>
              <div>
                <FaFileAlt className="icon icon-md" />
                <label className="mb-0 font-weight-bold">13/05/2021</label>
              </div>
              <div className="form-group mb-0">
                <label className="mb-0">Jornada de trabalho</label>
                <span>-- : -- à --:--</span>
              </div>
            </li>
            <li>
              <div>
                <FaFileAlt className="icon icon-md" />
                <label className="mb-0 font-weight-bold">13/05/2021</label>
              </div>
              <div className="form-group mb-0">
                <label className="mb-0">Jornada de trabalho</label>
                <span>-- : -- à --:--</span>
              </div>
            </li>
          </ul>
        </ModalBody>
      </Container>
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
)( ModalTrabalhoDiario );
