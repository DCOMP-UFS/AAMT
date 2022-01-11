import React from 'react';
import { connect } from 'react-redux';
import Modal, { ModalBody, ModalFooter } from '../../../../components/Modal';
import { FaFileAlt } from 'react-icons/fa';
import { getDateBr } from '../../../../config/function';

// ACTIONS
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';

// STYLES
import { Container } from './styles';

export const ModalTrabalhoDiario = ({ trabalhos, id, title, ...props }) => {
  const abrirRelatorio = index => {
    const trabalho = trabalhos[ index ];
    if( trabalho.horaFim )
      window.location = window.location.origin.toString() + '/relatorio/diario/' + trabalho.id;
    else
      props.showNotifyToast( 'Não é possível visualizar boletim diário em aberto', 'warning' );
  }

  return (
    <Modal id={ id } title={ title }>
      <Container>
        <ModalBody>
          <ul className="listra-trabalho-diario">
            {
              trabalhos.map( ( trabalho, index ) => (
                <li key={ 'trab-' + trabalho.id } onClick={ () => abrirRelatorio( index ) }>
                  <div>
                    <FaFileAlt className="icon icon-md" />
                    <label className="mb-0 font-weight-bold">{ getDateBr( trabalho.data, 'date' ) }</label>
                  </div>
                  <div className="form-group mb-0">
                    <label className="mb-0">Jornada de trabalho</label>
                    <span>
                      { trabalho.horaInicio ? trabalho.horaInicio : '-- : --' } à { trabalho.horaFim ? trabalho.horaFim : '-- : --' }
                    </span>
                  </div>
                </li>
              ) )
            }
          </ul>
        </ModalBody>
      </Container>
    </Modal>
  );
}

const mapStateToProps = state => ({
  trabalhos: state.trabalhoDiario.trabalhos
});

const mapDispatchToProps = {
  showNotifyToast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalTrabalhoDiario );
