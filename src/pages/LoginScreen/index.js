import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { perfil } from '../../config/enumerate';
import api from '../../services/api';

import { Container, Sidebar, Logo, ButtonLogin, Background } from './styles';
import { FormGroup, Separator } from '../../styles/global';
import iconLogo from '../../assets/icon_mark.png';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { authenticate } from '../../store/actions/user';
import { setToken } from '../../store/actions/appConfig';

class LoginScreen extends Component {
  state = {
    usuario: "",
    senha: "",
    conectado: false,
    loginFail: false,
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit( e ) {
    e.preventDefault();

    const usuario = this.state.usuario;
    const senha = this.state.senha;

    try {
      const response = await api.post('/auth/authenticate',{
        usuario,
        senha
      });

      if( response.status === 200 ) {

        const { user, token } = response.data;

        this.props.authenticate( user );
        this.props.setToken( token );

        switch( user.tipoPerfil ) {
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
    } catch (error) {
      const { response } = error;
      // SHOW MSG USUÁRIO OU SENHA INCORRETA
    }
  }

  render() {
    return (
      <Container>
        <Sidebar>
          <Logo>
            <img src={ iconLogo } alt="AAMT"/>
            <Separator sizeBorder="3px"/>
          </Logo>

          <form onSubmit={ this.handleSubmit.bind(this) } >
            <FormGroup className="form-dark">
              <label htmlFor="usuario">Usuário <code>*</code></label>
              <input
                value={ this.state.usuario }
                id="usuario"
                name="usuario"
                type="text"
                className="form-control"
                onChange={ this.handleInputChange.bind(this) }
                required />
            </FormGroup>

            <FormGroup className="form-dark mb-0">
              <label htmlFor="senha">Senha <code>*</code></label>
              <input
                value={ this.state.senha }
                id="senha"
                name="senha"
                type="password"
                className="form-control"
                onChange={ this.handleInputChange.bind(this) }
                required />
            </FormGroup>

            <FormGroup className="form-dark">
              <FormControlLabel
                name="conectado"
                value="end"
                control={ <Checkbox color="primary" /> }
                label="Manter-me conectado"
                labelPlacement="end"
                onChange={ this.handleInputChange.bind(this) } />
            </FormGroup>

            <ButtonLogin type="submit" >Entrar</ButtonLogin>
          </form>
        </Sidebar>
        <Background>
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </Background>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticate, setToken }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

