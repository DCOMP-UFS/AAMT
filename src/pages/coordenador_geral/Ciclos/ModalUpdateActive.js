/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { abrangencia as abrangenciaEnum }  from '../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getMethodologiesRequest } from '../../../store/actions/MetodologiaActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalUpdateActive({ atividade, updateAtividade, metodologias, ...props }) {
  const [ objetivoAtividade, setObjetivoAtividade ] = useState("");
  const [ flTodosImoveis, setFlTodosImoveis ] = useState({ value: false, label: "Não" });
  const [ abrangencia, setAbrangencia ] = useState({});
  const [ metodologia, setMetodologia ] = useState({});
  const [ optionMetodologia, setOptionMetodologia ] = useState([]);
  const [ objetivo, setObjetivo ] = useState({});
  const [ optionObjetivo, setoptionObjetivo ] = useState([]);
  const [ optionflTodosImoveis ] = useState([
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ]);
  const optionAbrangencia = Object.entries(abrangenciaEnum).map(([key, value]) => {
    return { value: value.id, label: value.label };
  });

  useEffect(() => {
    props.getMethodologiesRequest();
  }, []);

  useEffect(() => {
    if( atividade ) {
      setObjetivoAtividade( atividade.objetivoAtividade );
      setFlTodosImoveis( atividade.selectFlTodosImoveis );
      setAbrangencia( atividade.selectAbrangencia );
      setMetodologia( atividade.selectMetodologia );
    }
  }, [ atividade ]);

  useEffect(() => {
    const option = metodologias.map( (m, index) => (
      { value: m.id, label: m.sigla, index }
    ));

    setOptionMetodologia( option );
  }, [ metodologias ]);

  useEffect(() => {
    if( atividade )
      setObjetivo( atividade.selectObjetivo );

    if( Object.entries(metodologia).length > 0 ) {
      const option = metodologias[ metodologia.index ].objetivos.map( atv => (
        { value: atv.id, label: atv.descricao }
      ));

      setoptionObjetivo( option );
    }
  }, [ metodologia ]);

  function clearInput() {
    setObjetivoAtividade("");
    setFlTodosImoveis({ value: false, label: "Não" });
    setAbrangencia({});
    setMetodologia({});
    setObjetivo({});
  }

  function handleSubmit( e ) {
    e.preventDefault();

    updateAtividade({
      objetivoAtividade,
      flTodosImoveis: flTodosImoveis.value,
      abrangencia: abrangencia.value,
      metodologia_id: metodologia.value,
      objetivo_id: objetivo.value,

      selectFlTodosImoveis: flTodosImoveis,
      selectAbrangencia: abrangencia,
      selectMetodologia: metodologia,
      selectObjetivo: objetivo
    });

    clearInput();
  }

  return(
    <Modal id="modal-editar-atividade" title="Cadastrar Atividade" size="lg">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="objetivoAtividade">Objetivo da atividade <code>*</code></label>
                <textarea
                  id="objetivoAtividade"
                  value={ objetivoAtividade }
                  className="form-control"
                  onChange={ e => setObjetivoAtividade( e.target.value ) }
                  rows="5"
                  required
                ></textarea>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="metodologia">Metodologia <code>*</code></label>
                <Select
                  id="metodologia"
                  value={ metodologia }
                  options={ optionMetodologia }
                  onChange={ e => setMetodologia(e) }
                  styles={ selectDefault }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
            <FormGroup>
                <label htmlFor="objetivo">Objetivo <code>*</code></label>
                <Select
                  id="objetivo"
                  value={ objetivo }
                  options={ optionObjetivo }
                  onChange={ e => setObjetivo(e) }
                  styles={ selectDefault }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="flTodosImoveis">Realizar a atividade em todos os imóveis? <code>*</code></label>
                <Select
                  id="flTodosImoveis"
                  value={ flTodosImoveis }
                  options={ optionflTodosImoveis }
                  onChange={ e => setFlTodosImoveis(e) }
                  styles={ selectDefault }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="abrangencia">Abrangência <code>*</code></label>
                <Select
                  id="abrangencia"
                  value={ abrangencia }
                  options={ optionAbrangencia }
                  onChange={ e => setAbrangencia(e) }
                  styles={ selectDefault }
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
  metodologias: state.metodologia.metodologias
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getMethodologiesRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateActive);
