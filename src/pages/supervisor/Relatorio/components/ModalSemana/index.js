import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';

// STYLES
import { Button, selectDefault } from '../../../../../styles/global';

export const ModalSemana = ({ atividade_id, ...props }) => {
  const [ semana, setSemana ] = useState( '' );
  const [ ano, setAno ] = useState( '' );
  const [ optionAno, setOptionAno ] = useState( [] );

  useEffect(() => {
    const start_year = new Date(2021, 1, 1).getFullYear();
    const current_year = new Date().getFullYear();
    let optionYear = [];

    for (let index = 0; index <= current_year - start_year; index++) {
      optionYear.push({ value: start_year + index, label: start_year + index });
    }

    setAno({ value: current_year - start_year, label: current_year });
    setOptionAno( optionYear );
  }, []);

  const submit = e => {
    e.preventDefault();
    window.location = window.location.origin.toString() + '/sup/relatorio/semanal/' + semana + '/' + atividade_id + '/' + ano.label;
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
              max="53"
              value={ semana }
              onChange={ e => setSemana( e.target.value ) }
              required
            />
            <br />
            <label htmlFor="ano">Ano<code>*</code></label>
            <Select
              id="ano"
              value={ ano }
              options={ optionAno }
              onChange={ e => setAno( e ) }
              styles={ selectDefault }
              isRequired={ true }
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
