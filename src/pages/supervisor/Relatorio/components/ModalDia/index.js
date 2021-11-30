import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';

// STYLES
import { Button } from '../../../../../styles/global';

export const ModalDia = ({ equipe_id, ...props }) => {
  const [ data, setData ] = useState( '' );

  const submit = e => {
    e.preventDefault();
    window.location = window.location.origin.toString() + '/sup/relatorio/diarioEquipe/' + equipe_id + '/' + data;
  }

  return (
    <Modal { ...props }>
      <form onSubmit={ submit }>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="data">Data<code>*</code></label>
            <input
              className="form-control"
              value={ data }
              type="date"
              name="data"
              id="data"
              required
              onChange={ e => setData( e.target.value ) }
            />
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
