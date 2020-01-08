import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { auth } from '../../auth';
import { validInputIsEmpty } from '../../config/function';
import { perfil } from '../../config/enumerate';

import { Container, Sidebar, Logo, ButtonLogin, Background } from './styles';
import { FormGroup, Separator } from '../../styles/global';
import iconLogo from '../../assets/icon_mark.png';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { authenticate } from '../../store/actions/user';

class Teste extends Component {
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

  handleSubmit = () => {
    const usuario = this.state.usuario;
    const senha = this.state.senha;
    const conectado = this.state.conectado;
    let fl_valido = true;// true -> válido | false -> inválido

    if( !validInputIsEmpty( "#usuario", usuario ) ) fl_valido = false;
    if( !validInputIsEmpty( "#senha", senha ) ) fl_valido = false;

    if( fl_valido ) {
      const result = auth( usuario, senha, conectado );

      if( result === undefined ) {
        this.setState({ loginFail: false });
      }else {
        this.props.authenticate( result );

        switch( result.perfil ) {
          case perfil[0]: {
            window.location = window.location.origin.toString() + "/lab/home";
            break;
          }

          case perfil[3]: {
            window.location = window.location.origin.toString() + "/trabalho_diario/iniciar";
            break;
          }

          default: {
            window.location = window.location.origin.toString();
            break;
          }
        }

      }
    }
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === "NumpadEnter") {
      this.handleSubmit();
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

          <FormGroup className="form-dark">
            <label htmlFor="usuario">Usuário <code>*</code></label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              className="form-control"
              onChange={ this.handleInputChange.bind(this) }
              onKeyDown={ this.onKeyDown } />
          </FormGroup>

          <FormGroup className="form-dark mb-0">
            <label htmlFor="senha">Senha <code>*</code></label>
            <input
              id="senha"
              name="senha"
              type="password"
              className="form-control"
              onChange={ this.handleInputChange.bind(this) }
              onKeyDown={ this.onKeyDown } />
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

          <ButtonLogin onClick={ this.handleSubmit } >Entrar</ButtonLogin>
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
  bindActionCreators({ authenticate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teste);

