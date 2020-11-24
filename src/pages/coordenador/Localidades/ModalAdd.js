/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createLocationRequest, clearCreate } from '../../../store/actions/LocalidadeActions';
import { getCategoryRequest } from '../../../store/actions/CategoriaActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAdd({ municipio, created, ...props }) {
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ categoria, setCategoria ] = useState({});
  const [ optionCategoria, setOptionCategoria ] = useState([]);

  function handleCadastrar( e ) {
    e.preventDefault();
    props.createLocationRequest( codigo, nome, categoria.value, municipio.id );
  }

  useEffect(() => {
    props.clearCreate();
    props.getCategoryRequest();
  }, []);

  useEffect(() => {
    const options = props.categorias.map(( c ) => ({ value: c.id, label: c.nome }));

    setOptionCategoria( options );
  }, [ props.categorias ]);

  useEffect(() => {
    if( created ) {
      $('#modal-novo-localidade').modal('hide');
      setCodigo(null);
      setNome("");
      props.clearCreate();
      clearInput();
    }
  }, [ created ]);

  function clearInput() {
    setCodigo(null);
    setNome("");
    setCategoria({});
  }

  return(
    <Modal id="modal-novo-localidade" title="Cadastrar Localidade" size='lg'>
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col className="mb-3">
              <h4 className="title">Município { municipio.nome }</h4>
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="codigo">Código da localidade/bairro</label>
                <input id="codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="categoria">Categoria da localidade<code>*</code></label>
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
  municipio: state.appConfig.usuario.municipio,
  categorias: state.categoria.categorias
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createLocationRequest, clearCreate, getCategoryRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
