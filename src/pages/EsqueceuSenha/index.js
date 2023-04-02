import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

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
import { clearToast } from '../../store/AppConfig/appConfigActions';
import { recuperarSenhaRequest, recuperarSenhaReset } from '../../store/Usuario/usuarioActions';

const EsqueceuSenha = ( props ) => {
  const [ email, setEmail ]         = useState( "" );
  const [ flLoading, setFlLoading ] = useState( false )

  useEffect(() => {
    setFlLoading(false)
    props.recuperarSenhaReset()
  }, [props.recuperarSenha]);

  async function handleSubmit( e ) {
    e.preventDefault();
    setFlLoading(true)
    props.recuperarSenhaRequest( email )
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
            <label htmlFor="email">Informe seu email<code>*</code></label>
            <input
            value={ email }
            id="email"
            name="email"
            type="email"
            className="form-control"
            onChange={ e => setEmail( e.target.value ) }
            required />
          </FormGroup>

          <FormGroup className="form-dark">
            {
              flLoading
              ? <Link to={'/'} onClick={ (event) => event.preventDefault() }> Retornar para tela de login? </Link>
              : <Link to={'/'}> Retornar para tela de login? </Link>
            }
            
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
                    Carregando...
                  </>
                ) :
                "Recuperar Senha"
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
  recuperarSenha: state.usuario.recuperarSenha,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( { clearToast, recuperarSenhaRequest, recuperarSenhaReset  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( EsqueceuSenha );

