/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { getLocationByIdRequest, updateLocationRequest } from '../../store/actions/LocalidadeActions';
import { getMunicipiosRequest } from '../../store/actions/MunicipioActions';
import { getCategoryRequest } from '../../store/actions/CategoriaActions';

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { ContainerFixed } from '../../styles/util';

function EditarLocalidades({ localidade, getLocationByIdRequest, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ categoria, setCategoria ] = useState({});
  const [ municipio, setMunicipio ] = useState({});
  const [ ativo, setAtivo ] = useState({});
  const [ optionCategoria, setOptionCategoria ] = useState([]);
  const [ optionMunicipio, setOptionMunicipio ] = useState([]);
  const [ optionAtivo ] = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);

  useEffect(() => {
    props.changeSidebar(5, 0);
    getLocationByIdRequest( id );
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
    if( Object.entries( localidade ).length > 0 ) {
      setCodigo( localidade.codigo );
      setNome( localidade.nome );
      setCategoria( { value: localidade.categoria.id, label: localidade.categoria.nome } );
      setAtivo( { value: localidade.ativo, label: localidade.ativo ? 'Sim' : 'Não' } );
      setMunicipio( { value: localidade.municipio.id, label: localidade.municipio.nome } );
    }
  }, [ localidade ]);

  function handleSubmit( e ) {
    e.preventDefault();

    props.updateLocationRequest( id, {
      codigo,
      nome,
      categoria_id: categoria.value,
      municipio_id: municipio.value,
      ativo: ativo.value
    });
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Localidade: <mark className="bg-info text-white" >{ localidade.nome }</mark></h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>
            <Row>
              <Col sm='6'>
                <form onSubmit={ handleSubmit } >
                  <h4 className="title">Informações da localidade</h4>
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
                        <label htmlFor="ativo">Ativo <code>*</code></label>
                        <Select
                          id="ativo"
                          value={ ativo }
                          options={ optionAtivo }
                          styles={ selectDefault }
                          onChange={ e => setAtivo(e) }
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label>País <code>*</code></label>
                        <Select
                          styles={ selectDefault }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Estado <code>*</code></label>
                        <Select
                          styles={ selectDefault }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label htmlFor="municipio">Regional de saúde <code>*</code></label>
                        <Select
                          styles={ selectDefault }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
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

                  <ContainerFixed>
                    <ButtonSave
                      title="Salvar"
                      className="bg-info text-white"
                      type="submit" />
                  </ContainerFixed>
                </form>
              </Col>

              <Col sm='6'>
                <h4 className="title">Zonas</h4>
              </Col>
            </Row>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  localidade: state.localidade.localidade,
  municipios: state.municipio.municipios,
  categorias: state.categoria.categorias
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar,
    getLocationByIdRequest,
    getMunicipiosRequest,
    getCategoryRequest,
    updateLocationRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarLocalidades);
