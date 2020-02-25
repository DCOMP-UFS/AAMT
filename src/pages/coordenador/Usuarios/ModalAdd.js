/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { perfil } from '../../../config/enumerate';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createUsuarioRequest, clearCreateUser } from '../../../store/actions/UsuarioActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAdd({ createUsuarioRequest, municipio, createUser, ...props }) {
  const [ nome, setNome ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ rg, setRg ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ celular, setCelular ] = useState("");
  const [ usuario, setUsuario ] = useState("");
  const [ senha, setSenha ] = useState("");
  const [ tipoPerfil, setTipoPerfil ] = useState({});

  const optionPerfil = Object.entries(perfil)
    .filter( ([ key, value ]) => {
      if( value.id > 1 )
        return true;
      else
        return false
    })
    .map(([key, value]) => {
      return { value: value.id, label: value.label };
    });

  useEffect(() => {
    props.clearCreateUser();
  }, []);

  useEffect(() => {
    if( createUser ) {
      $('#modal-novo-usuario').modal('hide');
      setNome("");
      setCpf("");
      setRg("");
      setEmail("");
      setCelular("");
      setUsuario("");
      setSenha("");
      setTipoPerfil({});
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

    createUsuarioRequest(
      nome,
      cpf,
      rg,
      email,
      celular,
      usuario,
      senha,
      tipoPerfil.value,
      null,
      municipio.id
    );
  }

  return(
    <Modal
      id="modal-novo-usuario"
      title={<span>Cadastrar Usuário <mark className="bg-info text-white">{municipio.nome}</mark></span>}
      size='lg'
    >
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
                  onChange={ e => setTipoPerfil(e) }
                  required />
                {/* <input id="tipoPerfil" className="form-control" onChange={ e => setTipoPerfil(e.target.value) }  /> */}
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
  municipio: state.appConfig.usuario.municipio,
  createUser: state.usuario.createUser,
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUsuarioRequest,
    clearCreateUser
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
