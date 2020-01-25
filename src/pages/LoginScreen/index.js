import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { perfil } from '../../config/enumerate';

import { Container, Sidebar, Logo, ButtonLogin, Background } from './styles';
import { FormGroup, Separator } from '../../styles/global';
import iconLogo from '../../assets/icon_mark.png';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { authenticateRequest, clearToast } from '../../store/actions/UsuarioActions';

function LoginScreen( props ) {
  const [ usuario, setUsuario ] = useState("");
  const [ senha, setSenha ] = useState("");
  const [ conectado, setConectado ] = useState(false);

  const redirectUser = tipoPerfil => {
    switch( tipoPerfil ) {
      case perfil.laboratorialista: {
        window.location = window.location.origin.toString() + "/lab/home";
        break;
      }

      case perfil.coordenador: {
        window.location = window.location.origin.toString() + "/trabalho_diario/iniciar";
        break;
      }

      default: {
        window.location = window.location.origin.toString();
        break;
      }
    }
  }

  async function handleSubmit( e ) {
    e.preventDefault();

    props.authenticateRequest( usuario, senha, redirectUser );
  }

  function notify() {
    toast(props.usuario.toast.message, {
      type: props.usuario.toast.type,
      onClose: props.clearToast()
    });
  }

  return (
    <Container>
      <Sidebar>
        <Logo>
          <img src={ iconLogo } alt="AAMT"/>
          <Separator sizeBorder="3px"/>
        </Logo>

        <form onSubmit={ handleSubmit} >
          <FormGroup className="form-dark">
            <label htmlFor="usuario">Usuário <code>*</code></label>
            <input
            value={ usuario }
            id="usuario"
            name="usuario"
            type="text"
            className="form-control"
            onChange={ e => setUsuario( e.target.value ) }
            required />
          </FormGroup>

          <FormGroup className="form-dark mb-0">
            <label htmlFor="senha">Senha <code>*</code></label>
            <input
              value={ senha }
              id="senha"
              name="senha"
              type="password"
              className="form-control"
              onChange={ e => setSenha( e.target.value ) }
              required />
          </FormGroup>

          <FormGroup className="form-dark">
            <FormControlLabel
              name="conectado"
              value="end"
              control={ <Checkbox checked={ conectado } color="primary" /> }
              label="Manter-me conectado"
              labelPlacement="end"
              onChange={ e => setConectado( e.target.checked ) } />
          </FormGroup>

          <ButtonLogin type="submit" >Entrar</ButtonLogin>
        </form>
      </Sidebar>
      <Background>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </Background>

      <ToastContainer />
      {props.usuario.toast.message && notify()}
    </Container>
  );
}

const mapStateToProps = state => ({
  usuario: state.usuario,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticateRequest, clearToast }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

