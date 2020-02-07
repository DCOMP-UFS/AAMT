/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import { perfil } from '../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { updateUsuarioRequest, getUsuarioByIdRequest } from '../../store/actions/UsuarioActions';
import { getMunicipiosRequest } from '../../store/actions/MunicipioActions';

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { ContainerFixed } from '../../styles/util';

function EditarUsuario({ usuarioUpdate, getUsuarioByIdRequest, updateUsuarioRequest, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ nome, setNome ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ rg, setRg ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ celular, setCelular ] = useState("");
  const [ usuario, setUsuario ] = useState("");
  const [ ativo, setAtivo ] = useState("");
  const [ tipoPerfil, setTipoPerfil ] = useState({});
  const [ municipio, setMunicipio ] = useState({});

  const optionPerfil = Object.entries(perfil).map(([key, value]) => {
    const label = key.replace(/^\w/, c => c.toUpperCase());

    return { value: value, label };
  });
  const [ optionMunicipio, setOptionMunicipio ] = useState([]);
  const [ optionAtivo ] = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);

  useEffect(() => {
    props.changeSidebar(3, 0);
    props.getMunicipiosRequest();
    getUsuarioByIdRequest( id );
  }, []);

  useEffect(() => {
    const options = props.municipios.map(( m ) => ({ value: m.id, label: m.nome }));

    setOptionMunicipio( options );
  }, [ props.municipios ]);

  useEffect(() => {
    if( Object.entries( usuarioUpdate ).length > 0 ) {
      let labelPerfil = Object.entries(perfil)
      .find(([key, value]) => value === usuarioUpdate.tipoPerfil )[0];

      labelPerfil = labelPerfil.replace(/^\w/, c => c.toUpperCase());

      setNome( usuarioUpdate.nome );
      setCpf( usuarioUpdate.cpf );
      setRg( usuarioUpdate.rg );
      setEmail( usuarioUpdate.email );
      setCelular( usuarioUpdate.celular === undefined ? "" : usuarioUpdate.celular );
      setUsuario( usuarioUpdate.usuario );
      setAtivo( { value: usuarioUpdate.ativo, label: usuarioUpdate.ativo ? 'Sim' : 'Não' } );
      setTipoPerfil( { value: usuarioUpdate.tipoPerfil, label: labelPerfil } );
      setMunicipio( { value: usuarioUpdate.municipio.id, label: usuarioUpdate.municipio.nome } );
    }
  }, [ usuarioUpdate ]);

  function handleSubmit( e ) {
    e.preventDefault();

    updateUsuarioRequest( id, {
      nome,
      cpf,
      rg,
      email,
      celular,
      ativo: ativo.value,
      tipoPerfil: tipoPerfil.value,
      municipio_id: municipio.value
    });
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Usuário: <mark className="bg-info text-white" >{ usuarioUpdate.nome }</mark></h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>
            <form onSubmit={ handleSubmit }>
              <Row>
                <Col sm='6'>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="nome">Nome <code>*</code></label>
                        <input id="nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="cpf">CPF <code>*</code></label>
                        <input id="cpf" value={ cpf } className="form-control" onChange={ e => setCpf(e.target.value) }  required />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="rg">RG <code>*</code></label>
                        <input id="rg" value={ rg } className="form-control" onChange={ e => setRg(e.target.value) }  required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="email">E-mail <code>*</code></label>
                        <input id="email" value={ email } type="email" className="form-control" onChange={ e => setEmail(e.target.value) }  required />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="celular">Celular</label>
                        <input
                          id="celular"
                          value={ celular }
                          className="form-control"
                          onChange={ e => setCelular(e.target.value) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="usuario">Usuário <code>*</code></label>
                        <input id="usuario" value={ usuario } className="form-control" onChange={ e => setUsuario(e.target.value) } disabled required />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                        <Select
                          value={ tipoPerfil }
                          styles={ selectDefault }
                          options={ optionPerfil }
                          onChange={ e => setTipoPerfil(e) }
                          required />
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
                </Col>

                <Col sm='6'>
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
                </Col>
              </Row>

              <ContainerFixed>
                <ButtonSave
                  title="Salvar"
                  className="bg-info text-white"
                  type="submit" />
              </ContainerFixed>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  municipios: state.municipio.municipios,
  usuarioUpdate: state.usuario.usuarioUpdate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getMunicipiosRequest,
    updateUsuarioRequest,
    getUsuarioByIdRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarUsuario);
