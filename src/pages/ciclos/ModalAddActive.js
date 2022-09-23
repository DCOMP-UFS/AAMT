/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { abrangencia as abrangenciaEnum }  from '../../config/enumerate';
import LoadginGif from '../../assets/loading.gif';
import SelectWrap from '../../components/SelectWrap'

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getMethodologiesRequest } from '../../store/Metodologia/metodologiaActions';
import { changeFlAddActive } from '../../store/Ciclo/cicloActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

// VALIDATIONS FUNCTIONS
import { isBlank } from '../../config/function';

function ModalAddActive({ addAtividade, metodologias, isOpen, handleClose, ...props }) {
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
  const [ flLoading, setFlLoading ] = useState( false );
  const [ isValidObjetivoAtividade, setIsValidObjetivoAtividade ] = useState(true);

  useEffect(() => {
    if(isOpen){
      clearInput()
    }
    handleClose()
  }, [isOpen]);

  useEffect(() => {
    props.getMethodologiesRequest();
  }, []);

  useEffect(() => {
    const option = metodologias.map( (m, index) => (
      { value: m.id, label: m.sigla, index }
    ));

    setOptionMetodologia( option );
  }, [ metodologias ]);

  useEffect(() => {
    setObjetivo({});

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
    setIsValidObjetivoAtividade( true )
  }

  useEffect(() => {
    if( props.flAddActive ) {
      setFlLoading( false );
      props.changeFlAddActive( null );
    }
  }, [ props.flAddActive ]);

  function handleSubmit( e ) {
    e.preventDefault();
    if(isBlank(objetivoAtividade))
      setIsValidObjetivoAtividade( false )
    else{
      setFlLoading( true );
      setIsValidObjetivoAtividade( true )
       addAtividade({
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
    }
  }

  return(
    <Modal id="modal-novo-atividade" title="Cadastrar Atividade" size="lg">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <p className="text-description">
            Atenção! Os campos com <code>*</code> são obrigatórios
          </p>
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
                {
                  !isValidObjetivoAtividade ?
                    <span class="form-label-invalid">Objetivo da atividade inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="metodologia">Metodologia <code>*</code></label>
                <SelectWrap
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
                <SelectWrap
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
                <SelectWrap
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
                <SelectWrap
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
              <Button type="submit" disabled={ flLoading } >
                {
                  flLoading ?
                    (
                      <>
                        <img
                          src={ LoadginGif }
                          width="25"
                          style={{ marginRight: 10 }}
                          alt="Carregando"
                        />
                        Salvando...
                      </>
                    ) :
                    "Salvar"
                }
              </Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  metodologias: state.metodologia.metodologias,
  flAddActive: state.ciclo.flAddActive
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getMethodologiesRequest,
    changeFlAddActive
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddActive);
