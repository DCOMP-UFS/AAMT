import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Sidebar, Logo, ButtonLogin, PointBar, Background } from './styles';
import { FormGroup } from '../../styles/global';
import iconLogo from '../../assets/icon_mark.png';

class login extends Component {
  state = {
    usuario: "",
    senha: "",
    conectado: false,
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Container>
        <Sidebar>
          <Logo>
            <img src={ iconLogo } alt="AAMT"/>
            <PointBar />
          </Logo>

          <form action="">
            <FormGroup className="form-dark">
              <label htmlFor="usuario">Usuário <code>*</code></label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                className="form-control"
                onChange={ this.handleInputChange.bind(this) } />
            </FormGroup>

            <FormGroup className="form-dark mb-0">
              <label htmlFor="senha">Senha <code>*</code></label>
              <input
                id="senha"
                name="senha"
                type="password"
                className="form-control"
                onChange={ this.handleInputChange.bind(this) } />
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

            <ButtonLogin type="submit">Entrar</ButtonLogin>
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

const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(login);
