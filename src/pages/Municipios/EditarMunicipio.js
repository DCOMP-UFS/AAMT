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
import { updateCityRequest, getCityByIdRequest } from '../../store/actions/MunicipioActions';

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { ContainerFixed } from '../../styles/util';

function EditarMunicipio({ municipio, updateCityRequest, getCityByIdRequest, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ ativo, setAtivo ] = useState({});

  const optionAtivo = [ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ];

  useEffect(() => {
    props.changeSidebar(4, 0);
    getCityByIdRequest( id );
  }, []);

  useEffect(() => {
    if( Object.entries( municipio ).length > 0 ) {

      setCodigo( municipio.codigo );
      setNome( municipio.nome );
      setAtivo( { value: municipio.ativo, label: municipio.ativo ? 'Sim' : 'Não' } );
    }
  }, [ municipio ]);

  function handleSubmit( e ) {
    e.preventDefault();

    updateCityRequest( id, {
      codigo,
      nome,
      ativo: ativo.value
    });
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Município: <mark className="bg-info text-white" >{ municipio.nome }</mark></h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>
            <Row>
              <Col sm='6'>
                <form onSubmit={ handleSubmit }>
                <h4 className="title">Informações do município</h4>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="pais">Páis <code>*</code></label>
                        <Select
                          // value={ tipoPerfil }
                          styles={ selectDefault }
                          // options={ optionPerfil }
                          // onChange={ e => setTipoPerfil(e) }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="rigiao">Região <code>*</code></label>
                        <Select
                           // value={ tipoPerfil }
                           styles={ selectDefault }
                           // options={ optionPerfil }
                           // onChange={ e => setTipoPerfil(e) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="estado">Estado <code>*</code></label>
                        <Select
                          // value={ tipoPerfil }
                          styles={ selectDefault }
                          // options={ optionPerfil }
                          // onChange={ e => setTipoPerfil(e) }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="regionalSaude">Regional de saúde <code>*</code></label>
                        <Select
                           // value={ tipoPerfil }
                           styles={ selectDefault }
                           // options={ optionPerfil }
                           // onChange={ e => setTipoPerfil(e) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label htmlFor="up_codigo">Código <code>*</code></label>
                        <input id="up_codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } required />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label htmlFor="up_ativo">Ativo <code>*</code></label>
                        <Select
                          value={ ativo }
                          styles={ selectDefault }
                          options={ optionAtivo }
                          onChange={ e => setAtivo(e) }
                          required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="up_nome">Nome <code>*</code></label>
                        <input id="up_nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
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
                <h4 className="title">Bairro/Localidade</h4>
              </Col>
            </Row>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  municipio: state.municipio.municipio
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    updateCityRequest,
    getCityByIdRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarMunicipio);
