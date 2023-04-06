import { takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Usuario';
import * as UsuarioActions from './usuarioActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* authenticate(action) {
  try {
    const { data, status } = yield call( servico.authenticateRequest, action.payload );
    const { redirectUser } = action.payload;

    if( status === 200 ) {
      const { token, user, status, mensage } = data;

      if( status === "error" ) {
        yield put( AppConfigActions.showNotifyToast( mensage, "error" ) );
      } else {
        yield put( AppConfigActions.setAcabouDeLogar( true ) );
        redirectUser( user.atuacoes );
        yield put( AppConfigActions.authenticate( user ) );
        yield put( AppConfigActions.setToken( token ) );
      }

    }
  } catch (err) {
    yield put( AppConfigActions.setAcabouDeLogar( false ) );
    if(err.response){
      const { status } = err.response.data

      if(status === "error")
        yield put( AppConfigActions.showNotifyToast( "Usuário ou senha inválidos", "error" ) );
      
      else if(status === "unexpected error"){
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Falha no login, entre em contato com o suporte", "error" ) );
      }
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Falha no login, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getUsuarios(action) {
  try {
    const { data, status } = yield call( servico.getUsuariosPorMunicipios, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsuarios( data ) );
    }else {
      yield put( UsuarioActions.getUsuariosFailure() );
    }

  } catch (err) {
    yield put( UsuarioActions.getUsuariosFailure() );

    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getUsersByRegional( action ) {
  try {
    const { data, status } = yield call( servico.getUsersByRegionalRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsersByRegional( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha consultar os usuários: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getUsuarioById(action) {
  try {
    const { data, status } = yield call( servico.getUsuarioByIdRequest, action.payload.id );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsuarioById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha consultar o usuário: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuário, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getUsersByCity(action) {
  try {
    const { data, status } = yield call( servico.getUsersByCityRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsersByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha consultar os usuários: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* createUsuario( action ) {
  try {
    const { data, status } = yield call( servico.createUsuarioRequest, action.payload );

    if( status === 201 ) {
      yield put( UsuarioActions.createUsuario( data ) );
      yield put( AppConfigActions.showNotifyToast( "Usuário criado com sucesso", "success" ) );
    }else {
      yield put( UsuarioActions.createUsuarioFailure() );
    }
  } catch (err) {
    yield put( UsuarioActions.createUsuarioFailure() )

    if(err.response){
      const { sameCpf, sameUsuario, sameEmail} = err.response.data

      if(sameCpf || sameUsuario || sameEmail){
        var repetidos = ""
        if(sameCpf) repetidos = repetidos+"CPF " 
        if(sameUsuario) repetidos = repetidos+"Usuario "
        if(sameEmail) repetidos = repetidos+"Email "

        yield put( AppConfigActions.showNotifyToast("Erro ao criar Usuário, já existe(m) funcionário(s) com este(s): "+repetidos, "error" ) );
      }
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro ao criar Usuário, entre em contato com o suporte", "error" ) );
      }
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao cria Usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* updateUsuario( action ) {
  try {
    const { data, status } = yield call( servico.updateRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.updateUsuario( data ) );
      yield put( AppConfigActions.showNotifyToast( "Usuário(s) alterado com sucesso", "success" ) );
    } else {
      yield put( UsuarioActions.updateUsuarioFailure() )
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar informações do usuário: " + status, "error" ) );
    }
  } catch (err) {
    yield put( UsuarioActions.updateUsuarioFailure() )

    if(err.response){
      const { sameCpf, sameEmail, sameUsuario} = err.response.data

      if(sameCpf || sameEmail || sameUsuario){
        var repetidos = ""
        if(sameCpf) repetidos = repetidos+"CPF " 
        if(sameEmail) repetidos = repetidos+"Email "
        if(sameUsuario) repetidos = repetidos+"Usuario "

        yield put( AppConfigActions.showNotifyToast("Erro ao atualizar Usuário, já existe(m) funcionário(s) com este(s): "+repetidos, "error" ) );
      }
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar Usuário, entre em contato com o suporte", "error" ) );
      }
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar Usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* recuperarSenha( action ) {
  try {
    const { status } = yield call( servico.recoverPasswordRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.recuperarSenhaSuccess() );
      yield put( AppConfigActions.showNotifyToast( "Link de recuperação foi enviado para seu email", "success" ) );
    } else {
      yield put( UsuarioActions.recuperarSenhaFail() )
      yield put( AppConfigActions.showNotifyToast( "Falha na recuperação de senha: " + status, "error" ) );
    }
  } catch (err) {
    yield put( UsuarioActions.recuperarSenhaFail() )

    if(err.response){
      const { userNotFound } = err.response.data

      if(userNotFound){
        yield put( AppConfigActions.showNotifyToast("Não foi encontrado usuário cadastrado com este email ", "error" ) );
      }
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro na recuperação de senha do usuário, entre em contato com o suporte", "error" ) );
      }
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro na recuperação de senha do usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* validarTokenAlteracaoSenha( action ) {
  try {
    const { status } = yield call( servico.validateTokenRecoverUserPassword, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.validarTokenAlteracaoSenhaSuccess() );
    } else {
      yield put( UsuarioActions.validarTokenAlteracaoSenhaFail() )
      yield put( AppConfigActions.showNotifyToast( "Erro ao verificar validade do link: " + status, "error" ) );
    }
  } catch (err) {
    yield put( UsuarioActions.validarTokenAlteracaoSenhaFail() )

    if(err.response){
      const { tokenValido } = err.response.data

      if( tokenValido == false ){
        yield put( AppConfigActions.showNotifyToast("Este link não é mais válido, por favor informe seu email novamente na pagina 'Esqueceu Senha'", "error" ) );
      }
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro ao verificar validade do link, entre em contato com o suporte", "error" ) );
      }
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao verificar validade do link, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* alterarSenha( action ) {
  try {
    const { status } = yield call( servico.alteratePassword, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.alterarSenhaSuccess() );
    } else {
      yield put( UsuarioActions.alterarSenhaFail() )
      yield put( AppConfigActions.showNotifyToast( "Erro ao alterar senha: " + status, "error" ) );
    }
  } catch (err) {
    yield put( UsuarioActions.alterarSenhaFail() )

    if(err.response){
      const { tokenValido } = err.response.data

      if( tokenValido == false ){
        yield put( AppConfigActions.showNotifyToast("Este link não é mais válido, por favor informe seu email novamente na pagina 'Esqueceu Senha'", "error" ) );
      }
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro na alteração de senha, entre em contato com o suporte", "error" ) );
      }
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro na alteração de senha, favor verifique sua conexão com a internet", "error" ) );
  }
}

function* watchAuthenticate() {
  yield takeLatest( AppConfigActions.ActionTypes.AUTHENTICATE_REQUEST, authenticate );
}

function* watchGetUsuarios() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USUARIOS_REQUEST, getUsuarios );
}

function* watchGetUsersByRegional() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USERS_BY_REGIONAL_REQUEST, getUsersByRegional );
}

function* watchGetUsuarioById() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USUARIO_BY_ID_REQUEST, getUsuarioById );
}

function* watchGetUsersByCity() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USERS_BY_CITY_REQUEST, getUsersByCity );
}

function* watchCreateUsuario() {
  yield takeLatest( UsuarioActions.ActionTypes.CREATE_USUARIO_REQUEST, createUsuario );
}

function* watchUpdateUsuario() {
  yield takeLatest( UsuarioActions.ActionTypes.UPDATE_USUARIO_REQUEST, updateUsuario );
}

function* watchUpdateEveryUsuario() {
  yield takeEvery( UsuarioActions.ActionTypes.UPDATE_ALL_USUARIO_REQUEST, updateUsuario );
}

function* watchRecuperarSenhaUsuario() {
  yield takeLatest( UsuarioActions.ActionTypes.RECUPERAR_SENHA_REQUEST, recuperarSenha );
}

function* watchValidarTokenAlteracaoSenha() {
  yield takeLatest( UsuarioActions.ActionTypes.VALIDAR_TOKEN_ALTERACAO_SENHA_REQUEST, validarTokenAlteracaoSenha );
}

function* watchAlterarSenhaUsuario() {
  yield takeLatest( UsuarioActions.ActionTypes.ALTERAR_SENHA_REQUEST, alterarSenha );
}

export function* usuarioSaga() {
  yield all( [
    watchAuthenticate(),
    watchGetUsuarios(),
    watchGetUsersByRegional(),
    watchGetUsuarioById(),
    watchGetUsersByCity(),
    watchCreateUsuario(),
    watchUpdateUsuario(),
    watchUpdateEveryUsuario(),
    watchRecuperarSenhaUsuario(),
    watchValidarTokenAlteracaoSenha(),
    watchAlterarSenhaUsuario()
  ] );
}