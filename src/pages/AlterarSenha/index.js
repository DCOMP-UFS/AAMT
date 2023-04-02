import React, { useState, useEffect } from 'react';

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
import { validarTokenAlteracaoSenhaRequest, alterarSenhaRequest, alterarSenhaReset } from '../../store/Usuario/usuarioActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

const LoginScreen = ( { isTokenRecuperacaoSenhaValid, ...props } ) => {
  const [ token ] = useState( props.match.params.token )
  const [ senha, setSenha ]         = useState( "" );
  const [ confirmSenha, setConfirmSenha ] = useState( "" );
  const [ flLoading, setFlLoading ] = useState( false )


  useEffect(() => {
    //verificar se o token de validação presente na url ainda é valido
    //a requisição após ser feita, atualiza o state "isTokenRecuperacaoSenhaValid"
    //para "true" caso seja valida e "false" caso contrario
    props.validarTokenAlteracaoSenhaRequest( token )
  }, [ ]);

   useEffect(() => {
    setFlLoading(false)
    if(props.senhaAlterada){
      props.showNotifyToast( "Senha foi alterada com sucesso!", "success" )
      props.alterarSenhaReset()
      setTimeout(() => { window.location = window.location.origin.toString() }, 1000)
    }
    else{
      props.alterarSenhaReset()
    }
  }, [props.senhaAlterada]); 

  
  async function handleSubmit( e ) {
    e.preventDefault();

    if( senha != confirmSenha ){
      props.showNotifyToast( 'A nova senha e sua confirmação estão diferentes', "warning" );
    }
    else{
      setFlLoading(true)
      props.alterarSenhaRequest( senha, token );
    }
    
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
            <label htmlFor="senha">Informe sua nova senha <code>*</code></label>
            <input
            value={senha }
            id="senha"
            name="senha"
            type="password"
            className="form-control"
            onChange={ e => setSenha( e.target.value ) }
            disabled={!isTokenRecuperacaoSenhaValid}
            required />
          </FormGroup>

          <FormGroup className="form-dark mb-0">
            <label htmlFor="confirmSenha">Confirmação da nova senha <code>*</code></label>
            <input
              value={ confirmSenha }
              id="confirmSenha"
              name="confirmSenha"
              type="password"
              className="form-control"
              onChange={ e => setConfirmSenha( e.target.value ) }
              disabled={!isTokenRecuperacaoSenhaValid}
              required />
          </FormGroup>

          <ButtonLogin style={{marginTop:"25px"}} type="submit" disabled={ flLoading || !isTokenRecuperacaoSenhaValid }>
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
                    Alterando...
                  </>
                ) :
                "Alterar Senha"
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
  isTokenRecuperacaoSenhaValid: state.usuario.isTokenRecuperacaoSenhaValid,
  senhaAlterada: state.usuario.senhaAlterada
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( { 
    clearToast, 
    validarTokenAlteracaoSenhaRequest, 
    alterarSenhaRequest, 
    alterarSenhaReset,
    showNotifyToast 
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LoginScreen );

