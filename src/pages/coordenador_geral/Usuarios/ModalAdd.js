/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { perfil } from '../../../config/enumerate';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createUsuarioRequest, clearCreateUser } from '../../../store/actions/UsuarioActions';
import { getNationsRequest } from '../../../store/Pais/paisActions';
import { GetRegionsByNationRequest } from '../../../store/Regiao/regiaoActions';
import { GetStatesByRegionRequest } from '../../../store/Estado/estadoActions';
import { getRegionalHealthByStateRequest } from '../../../store/actions/RegionalSaudeActions';
import { getCityByRegionalHealthRequest } from '../../../store/Municipio/municipioActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAdd({ createUsuarioRequest, createUser, ...props }) {
  const [ nome, setNome ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ rg, setRg ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ celular, setCelular ] = useState("");
  const [ usuario, setUsuario ] = useState("");
  const [ senha, setSenha ] = useState("");
  const [ tipoPerfil, setTipoPerfil ] = useState({});
  const [ pais, setPais ] = useState({ value: 30, label: 'Brasil' });
  const [ optionPais, setOptionPais ] = useState([]);
  const [ regiao, setRegiao ] = useState({});
  const [ optionRegiao, setOptionRegiao ] = useState([]);
  const [ estado, setEstado ] = useState({});
  const [ optionEstado, setOptionEstado ] = useState([]);
  const [ regionalSaude, setRegionalSaude ] = useState({});
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState([]);
  const [ municipio, setMunicipio ] = useState({});
  const [ optionMunicipio, setOptionMunicipio ] = useState([]);
  const [ flMunicipio, setFlMunicipio] = useState( true );
  const [ flLoading, setFlLoading ] = useState( false );

  const optionPerfil = Object.entries(perfil).map(([key, value]) => {
    return { value: value.id, label: value.label };
  });

  useEffect(() => {
    props.getNationsRequest();
  }, []);

  useEffect(() => {
    const options = props.paises.map(( p ) => ({ value: p.id, label: p.nome }));

    setOptionPais( options );
  }, [ props.paises ]);

  useEffect(() => {
    if( Object.entries(pais).length > 0 ) {
      props.GetRegionsByNationRequest( pais.value );
      setRegiao({});
      setEstado({});
      setOptionEstado([]);
      setRegionalSaude({});
      setOptionRegionalSaude([]);
      setMunicipio({});
      setOptionMunicipio([]);
    }
  }, [ pais ]);

  useEffect(() => {
    const options = props.regioes.map(( r ) => ({ value: r.id, label: r.nome }));

    setOptionRegiao( options );
  }, [ props.regioes ]);

  useEffect(() => {
    if( Object.entries(regiao).length > 0 ) {
      props.GetStatesByRegionRequest( regiao.value );
      setEstado({});
      setRegionalSaude({});
      setOptionRegionalSaude([]);
      setMunicipio({});
      setOptionMunicipio([]);
    }
  }, [ regiao ]);

  useEffect(() => {
    const options = props.estados.map(( e ) => ({ value: e.id, label: e.nome }));

    setOptionEstado( options );
  }, [ props.estados ]);

  useEffect(() => {
    if( Object.entries(estado).length > 0 ) {
      props.getRegionalHealthByStateRequest( estado.value );
      setRegionalSaude({});
      setMunicipio({});
      setOptionMunicipio([]);
    }
  }, [ estado ]);

  useEffect(() => {
    const options = props.regionaisSaude.map(( r ) => ({ value: r.id, label: r.nome }));

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ]);

  useEffect(() => {
    if( Object.entries(regionalSaude).length > 0 ) {
      props.getCityByRegionalHealthRequest( regionalSaude.value );
      setMunicipio({});
    }
  }, [ regionalSaude ]);

  useEffect(() => {
    const options = props.municipiosList.map(( m ) => ({ value: m.id, label: m.nome }));

    setOptionMunicipio( options );
  }, [ props.municipiosList ]);

  useEffect(() => {
    if( createUser ) {
      $('#modal-novo-usuario').modal('hide');
      setFlLoading( false );
      props.clearCreateUser();
      clearInput();
    }
  }, [ createUser ]);

  function clearInput() {
    setNome("");
    setCpf("");
    setRg("");
    setEmail("");
    setCelular("");
    setUsuario("");
    setSenha("");
    setTipoPerfil({});
  }

  function handleCadastrar( e ) {
    e.preventDefault();
    setFlLoading( true );

    createUsuarioRequest(
      nome,
      cpf,
      rg,
      email,
      celular,
      usuario,
      senha,
      tipoPerfil.value,
      regionalSaude.value,
      municipio.value
    );
  }

  return(
    <Modal id="modal-novo-usuario" title="Cadastrar Usuário" size='lg'>
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
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
                <label htmlFor="celular">Telefone/Ramal</label>
                <input id="celular" value={ celular } className="form-control" onChange={ e => setCelular(e.target.value) } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="usuario">Usuário <code>*</code></label>
                <input id="usuario" value={ usuario } className="form-control" onChange={ e => setUsuario(e.target.value) }  required />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="senha">Senha <code>*</code></label>
                <input id="senha" value={ senha } type="password" className="form-control" onChange={ e => setSenha(e.target.value) }  required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                <Select
                  value={ tipoPerfil }
                  styles={ selectDefault }
                  options={ optionPerfil }
                  onChange={ e => {
                    setTipoPerfil(e)
                    if( e.value === 1 )
                      setFlMunicipio(false);
                    else
                      setFlMunicipio(true);

                  }}
                  required />
                {/* <input id="tipoPerfil" className="form-control" onChange={ e => setTipoPerfil(e.target.value) }  /> */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="pais">Páis <code>*</code></label>
                <Select
                  id="pais"
                  value={ pais }
                  styles={ selectDefault }
                  options={ optionPais }
                  onChange={ e => setPais(e) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="regiao">Região <code>*</code></label>
                <Select
                  id="regiao"
                  value={ regiao }
                  styles={ selectDefault }
                  options={ optionRegiao }
                  onChange={ e => setRegiao(e) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="estado">Estado <code>*</code></label>
                <Select
                  id="estado"
                  value={ estado }
                  styles={ selectDefault }
                  options={ optionEstado }
                  onChange={ e => setEstado(e) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="regionalSaude">Regional de saúde <code>*</code></label>
                <Select
                  id="regionalSaude"
                  value={ regionalSaude }
                  styles={ selectDefault }
                  options={ optionRegionalSaude }
                  onChange={ e => setRegionalSaude(e) }
                  required
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
                  isDisabled={ !flMunicipio }
                  required={ flMunicipio }
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
              <Button type="submit" loading={ flLoading } disabled={ flLoading } >
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
  createUser: state.usuario.createUser,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  municipiosList: state.municipio.municipiosList
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUsuarioRequest,
    clearCreateUser,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest,
    getCityByRegionalHealthRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
