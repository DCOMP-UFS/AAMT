export const ActionTypes = {
  AUTHENTICATE_REQUEST: "AUTHENTICATE_REQUEST",
  AUTHENTICATE_SUCCESS: "AUTHENTICATE_SUCCESS",
  AUTHENTICATE_FAILURE: "AUTHENTICATE_FAILURE",
  CLOSE_POPUP: "CLOSE_POPUP",
  OPEN_POPUP: "OPEN_POPUP",
  CLEAR_TOAST: "CLEAR_TOAST",
  GET_USUARIOS_REQUEST: "GET_USUARIOS_REQUEST",
  GET_USUARIOS_SUCCESS: "GET_USUARIOS_SUCCESS",
  GET_USUARIOS_FAILURE: "GET_USUARIOS_FAILURE",
  CREATE_USUARIO_REQUEST: "CREATE_USUARIO_REQUEST",
  CREATE_USUARIO_SUCCESS: "CREATE_USUARIO_SUCCESS",
  CREATE_USUARIO_FAILURE: "CREATE_USUARIO_FAILURE",
  CLEAR_CREATE_USER: "CLEAR_CREATE_USER",
  UPDATE_USUARIO_REQUEST: "UPDATE_USUARIO_REQUEST",
  UPDATE_ALL_USUARIO_REQUEST: "UPDATE_ALL_USUARIO_REQUEST",
  UPDATE_USUARIO_SUCCESS: "UPDATE_USUARIO_SUCCESS",
  UPDATE_USUARIO_FAILURE: "UPDATE_USUARIO_FAILURE",
  CLEAR_UPDATE_USER: "CLEAR_UPDATE_USER",
  CHANGE_USER_EDIT_INDEX: "CHANGE_USER_EDIT_INDEX"
}

export const authenticateRequest = (usuario, senha, redirectUser) => {
  return {
    type: ActionTypes.AUTHENTICATE_REQUEST,
    payload: {
      usuario,
      senha,
      redirectUser
    }
  }
}

export const authenticate = user => {
  return {
    type: ActionTypes.AUTHENTICATE_SUCCESS,
    payload: {
      user,
    }
  }
}

export const authenticateFailure = () => {
  return {
    type: ActionTypes.AUTHENTICATE_FAILURE
  }
}

export const clearToast = () => {
  return { type: ActionTypes.CLEAR_TOAST };
};

export const getUsuariosRequest = municipio_id => {
  return {
    type: ActionTypes.GET_USUARIOS_REQUEST,
    payload: {
      municipio_id
    }
  }
}

export const getUsuarios = usuarios => {
  return {
    type: ActionTypes.GET_USUARIOS_SUCCESS,
    payload: {
      usuarios,
    }
  }
}

export const getUsuariosFailure = () => {
  return {
    type: ActionTypes.GET_USUARIOS_FAILURE
  }
}

export const createUsuarioRequest = ( nome, cpf, rg, email, celular, usuario, senha, tipoPerfil, municipio_id ) => {
  return {
    type: ActionTypes.CREATE_USUARIO_REQUEST,
    payload: {
      nome,
      cpf,
      rg,
      email,
      celular,
      usuario,
      senha,
      tipoPerfil,
      municipio_id
    }
  }
}

export const createUsuario = usuario => {
  return {
    type: ActionTypes.CREATE_USUARIO_SUCCESS,
    payload: {
      usuario
    }
  }
}

export const createUsuarioFailure = () => {
  return {
    type: ActionTypes.CREATE_USUARIO_FAILURE
  }
}

export const clearCreateUser = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_USER
  }
}

export const updateUsuarioRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_USUARIO_REQUEST,
    payload: { id, body }
  }
}

export const updateAllUsuarioRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_ALL_USUARIO_REQUEST,
    payload: { id, body }
  }
}

export const updateUsuario = () => {
  return {
    type: ActionTypes.UPDATE_USUARIO_SUCCESS
  }
}

export const updateUsuarioFailure = () => {
  return {
    type: ActionTypes.UPDATE_USUARIO_FAILURE
  }
}

export const clearUpdateUser = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_USER
  }
}

export const changeUserEditIndex = index => {
  return {
    type: ActionTypes.CHANGE_USER_EDIT_INDEX,
    payload: {
      index
    }
  }
}
