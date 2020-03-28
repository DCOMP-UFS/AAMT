/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateCycleRequest } from '../../../store/actions/CicloActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalUpdateCycle({ ciclos, index, ...props }) {
  const [ ano, setAno ] = useState({});
  const [ sequencia, setSequencia ] = useState({});
  const [ dataInicio, setDataInicio ] = useState("");
  const [ dataFim, setDataFim ] = useState("");
  const [ optionSequencia ] = useState([
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ]);
  const [ optionAno, setOptionAno ] = useState([]);

  useEffect(() => {
    const current_year = new Date().getFullYear();
    let optionYear = [];

    for (let index = 0; index < 6; index++) {
      optionYear.push({ value: current_year + index, label: current_year + index });
    }

    setOptionAno( optionYear );
  }, []);

  useEffect(() => {
    if( index >= 0 ){
      const ciclo = ciclos[ index ];

      setAno({ value: ciclo.ano, label: ciclo.ano });
      setSequencia({ value: ciclo.sequencia, label: ciclo.sequencia });
      setDataInicio( ciclo.dataInicio.split('T')[0] );
      setDataFim( ciclo.dataFim.split('T')[0] );
    }
  }, [ index ]);

  function clearInput() {
    setAno({});
    setSequencia({});
    setDataInicio("");
    setDataFim("");
  }

  function handleSubmit( e ) {
    e.preventDefault();

    props.updateCycleRequest( ciclos[ index ].id, {
      ano: ano.value,
      sequencia: sequencia.value,
      dataInicio: dataInicio,
      dataFim: dataFim
    });

    $('#modal-editar-ciclo').modal('hide');
  }

  return(
    <Modal id="modal-editar-ciclo" title="Editar Ciclo" size="lg">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="ano">Ano <code>*</code></label>
              <Select
                id="ano"
                value={ ano }
                options={ optionAno }
                onChange={ e => setAno( e ) }
                styles={ selectDefault }
                isRequired={ true }
                required
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="sequencia">Sequência <code>*</code></label>
              <Select
                id="sequencia"
                value={ sequencia }
                options={ optionSequencia }
                onChange={ e => setSequencia( e ) }
                styles={ selectDefault }
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="ano">Data de início <code>*</code></label>
              <input
                type="date"
                className="form-control"
                value={ dataInicio }
                min={ new Date().toISOString().split("T")[0] }
                onChange={ e => setDataInicio( e.target.value ) }
                required
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="sequencia">Data fim <code>*</code></label>
              <input
                type="date"
                className="form-control"
                value={ dataFim }
                min={ new Date().toISOString().split("T")[0] }
                onChange={ e => setDataFim( e.target.value ) }
                required
              />
            </FormGroup>
          </Col>
        </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={ clearInput }>Limpar</Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  ciclos: state.ciclo.ciclos,
  index: state.ciclo.index
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateCycleRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateCycle);
