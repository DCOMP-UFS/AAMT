import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { perfil } from '../../config/enumerate';

import { Container, Sidebar, Logo, ButtonLogin, Background } from './styles';
import { FormGroup, Separator } from '../../styles/global';
import iconLogo from '../../assets/icon_mark.png';
import LoadginGif from '../../assets/loading.gif';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { clearToast, authenticateRequest, setAcabouDeLogar } from '../../store/AppConfig/appConfigActions';

const LoginScreen = ( props ) => {
  const [ usuario, setUsuario ]     = useState( "" );
  const [ senha, setSenha ]         = useState( "" );
  const [ conectado, setConectado ] = useState( false );
  const [ flLoading, setFlLoading ] = useState( false )

  /**
   * Função de call back em caso de login success
   * @param {array} atuacoes 
   */
  const redirectUser = atuacoes => {
    const atuacao = atuacoes[0];
    switch( atuacao.tipoPerfil ) {
      case perfil.coordenadorGeral.id: {
        window.location = window.location.origin.toString() + "/dash/regional";
        break;
      }

      case perfil.coordenador.id: {
        window.location = window.location.origin.toString() + "/dash/municipio";
        break;
      }

      case perfil.supervisor.id: {
        window.location = window.location.origin.toString() + "/dash/municipio";
        break;
      }

      case perfil.agente.id: {
        window.location = window.location.origin.toString() + "/dash/municipio";
        break;
      }

      case perfil.laboratorista.id: {
        window.location = window.location.origin.toString() + "/dash/laboratorio";
        break;
      }

      default: {
        window.location = window.location.origin.toString();
        break;
      }
    }
  }

  useEffect(() => {
    setFlLoading(false)
    props.setAcabouDeLogar(null)
  }, [props.acabouDeLogar]);

  /**
   * Submit de login
   * @param {Element} e Element oque acionou a função
   */
  async function handleSubmit( e ) {
    e.preventDefault();
    setFlLoading(true)
    props.authenticateRequest( usuario, senha, redirectUser );
  }

  function notify() {
    toast( props.toast.message, {
      type: props.toast.type,
      onClose: props.clearToast()
    } );
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

          <ButtonLogin type="submit" disabled={ flLoading }>
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
                    Entrando...
                  </>
                ) :
                "Entrar"
            }
          </ButtonLogin>
        </form>
      </Sidebar>
      <Background>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </Background>

      <ToastContainer />
      {props.toast.message && notify()}
    </Container>
  );
}

const mapStateToProps = state => ( {
  toast: state.appConfig.toast,
  acabouDeLogar  :state.appConfig.acabouDeLogar,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( { authenticateRequest, clearToast, setAcabouDeLogar }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LoginScreen );

