/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { perfil } from '../../config/enumerate';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateUsuarioRequest, clearUpdateUser } from '../../store/actions/UsuarioActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../styles/global';

function ModalUpdate({ updateUsuarioRequest, municipio_id, updateUser, ...props }) {
  const [ nome, setNome ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ rg, setRg ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ celular, setCelular ] = useState("");
  const [ usuario, setUsuario ] = useState("");
  const [ tipoPerfil, setTipoPerfil ] = useState({});

  const optionPerfil = Object.entries(perfil).map(([key, value]) => {
    const label = key.replace(/^\w/, c => c.toUpperCase());

    return { value: value, label };
  });

  function handleCadastrar( e ) {
    const id = props.usuarios[ props.indexUser ].id;

    updateUsuarioRequest( id, {
      nome,
      cpf,
      rg,
      email,
      celular,
      tipoPerfil: tipoPerfil.value
    });

    props.clearUpdateUser();
  }

  useEffect(() => {
    props.clearUpdateUser();
  }, []);

  useEffect(() => {
    if( updateUser ) {
      $('#modal-update-usuario').modal('hide');
    }
  }, [ updateUser ]);

  useEffect(() => {
    if( props.indexUser >= 0 ) {
      setUser();
    }
  }, [ props.indexUser ]);

  useEffect(() => {
    if( props.indexUser >= 0 ) {
      setUser();
    }
  }, [ props.reloadIndex ]);

  function setUser() {
    const user = props.usuarios[ props.indexUser ];

    let label = Object.entries(perfil)
      .find(([key, value]) => value === user.tipoPerfil )[0];

    label = label.replace(/^\w/, c => c.toUpperCase());

    setNome( user.nome );
    setCpf( user.cpf );
    setRg( user.rg );
    setEmail( user.email );
    setCelular( user.celular ? user.celular : "" );
    setUsuario( user.usuario );
    setTipoPerfil({ value: user.tipoPerfil, label });
  }

  return(
    <Modal id="modal-update-usuario" title="Atualizar Usuário" size='lg'>
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="up_nome">Nome <code>*</code></label>
                <input id="up_nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="up_cpf">CPF <code>*</code></label>
                <input id="up_cpf" value={ cpf } className="form-control" onChange={ e => setCpf(e.target.value) }  required />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="up_rg">RG <code>*</code></label>
                <input id="up_rg" value={ rg } className="form-control" onChange={ e => setRg(e.target.value) }  required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="up_email">E-mail <code>*</code></label>
                <input id="up_email" value={ email } type="email" className="form-control" onChange={ e => setEmail(e.target.value) }  required />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="up_celular">Telefone/Ramal</label>
                <input id="up_celular" value={ celular } className="form-control" onChange={ e => setCelular(e.target.value) } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="up_usuario">Usuário <code>*</code></label>
                <input id="up_usuario" value={ usuario } className="form-control" onChange={ e => setUsuario(e.target.value) } disabled required />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="up_tipoPerfil">Perfil <code>*</code></label>
                <Select
                  value={ tipoPerfil }
                  styles={ selectDefault }
                  options={ optionPerfil }
                  onChange={ e => setTipoPerfil(e) }
                  required />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
          <Button type="submit">Editar</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.usuario.usuario.municipio.id,
  updateUser: state.usuario.updateUser,
  indexUser: state.usuario.indexUser,
  usuarios: state.usuario.usuarios,
  reloadIndex: state.usuario.reloadIndex
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUsuarioRequest, clearUpdateUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdate);
