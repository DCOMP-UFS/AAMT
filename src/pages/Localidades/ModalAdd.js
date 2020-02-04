/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createLocationRequest, clearCreate } from '../../store/actions/LocalidadeActions';
import { getMunicipiosRequest } from '../../store/actions/MunicipioActions';
import { getCategoryRequest } from '../../store/actions/CategoriaActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

function ModalAdd({ createLocationRequest, created, ...props }) {
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ categoria, setCategoria ] = useState({});
  const [ municipio, setMunicipio ] = useState({});
  const [ optionCategoria, setOptionCategoria ] = useState([]);
  const [ optionMunicipio, setOptionMunicipio ] = useState([]);

  function handleCadastrar( e ) {
    e.preventDefault();

    createLocationRequest( codigo, nome, categoria.value, municipio.value );
  }

  useEffect(() => {
    props.clearCreate();
    props.getMunicipiosRequest();
    props.getCategoryRequest();
  }, []);

  useEffect(() => {
    const options = props.municipios.map(( m ) => ({ value: m.id, label: m.nome }));

    setOptionMunicipio( options );
  }, [ props.municipios ]);

  useEffect(() => {
    const options = props.categorias.map(( c ) => ({ value: c.id, label: c.nome }));

    setOptionCategoria( options );
  }, [ props.categorias ]);

  useEffect(() => {
    if( created ) {
      $('#modal-novo-localidade').modal('hide');
      setCodigo(null);
      setNome("");
    }
  }, [ created ]);

  function clearInput() {
    setCodigo(null);
    setNome("");
    setCategoria({});
    setMunicipio({});
  }

  return(
    <Modal id="modal-novo-localidade" title="Cadastrar Localidade" size='lg'>
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="codigo">Código</label>
                <input id="codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="categoria">Categoria <code>*</code></label>
                <Select
                  id="categoria"
                  value={ categoria }
                  styles={ selectDefault }
                  options={ optionCategoria }
                  onChange={ e => setCategoria(e) }
                  required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="nome">Nome <code>*</code></label>
                <input id="nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <label>País <code>*</code></label>
                <Select />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <label>Estado <code>*</code></label>
                <Select />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="municipio">Município <code>*</code></label>
                <Select
                  id="municipio"
                  value={ municipio }
                  styles={ selectDefault }
                  options={ optionMunicipio }
                  onChange={ e => setMunicipio(e) }
                  required />
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
  created: state.localidade.created,
  municipios: state.municipio.municipios,
  categorias: state.categoria.categorias
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createLocationRequest, clearCreate, getMunicipiosRequest, getCategoryRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
