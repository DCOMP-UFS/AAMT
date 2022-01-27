export const ActionTypes = {
  GET_USUARIOS_REQUEST: "GET_USUARIOS_REQUEST",
  GET_USUARIOS_SUCCESS: "GET_USUARIOS_SUCCESS",
  GET_USUARIOS_FAILURE: "GET_USUARIOS_FAILURE",
  GET_USUARIO_BY_ID_REQUEST: "GET_USUARIO_BY_ID_REQUEST",
  GET_USUARIO_BY_ID_SUCCESS: "GET_USUARIO_BY_ID_SUCCESS",
  GET_USERS_BY_REGIONAL_REQUEST: "GET_USERS_BY_REGIONAL_REQUEST",
  GET_USERS_BY_REGIONAL_SUCCESS: "GET_USERS_BY_REGIONAL_SUCCESS",
  GET_USERS_BY_CITY_REQUEST: "GET_USERS_BY_CITY_REQUEST",
  CREATE_USUARIO_REQUEST: "CREATE_USUARIO_REQUEST",
  CREATE_USUARIO_SUCCESS: "CREATE_USUARIO_SUCCESS",
  CREATE_USUARIO_FAILURE: "CREATE_USUARIO_FAILURE",
  CLEAR_CREATE_USER: "CLEAR_CREATE_USER",
  UPDATE_USUARIO_REQUEST: "UPDATE_USUARIO_REQUEST",
  UPDATE_ALL_USUARIO_REQUEST: "UPDATE_ALL_USUARIO_REQUEST",
  UPDATE_USUARIO_SUCCESS: "UPDATE_USUARIO_SUCCESS",
  CLEAR_UPDATE_USER: "CLEAR_UPDATE_USER",
  CHANGE_USER_EDIT_INDEX: "CHANGE_USER_EDIT_INDEX",
  VALIDAR_CPF_REQUEST: "VALIDAR_CPF_REQUEST",
  SET_CPF_VALIDO: "SET_CPF_VALIDO",
}

/**
 * Aciona o sagas a validação do CPF
 * @param {string} cpf 
 * @returns {Object}
 */
export const validarCpfRequest = ( cpf, usuario_id = undefined ) => {
  return {
    type: ActionTypes.VALIDAR_CPF_REQUEST,
    payload: {
      cpf,
      usuario_id
    }
  }
}

/**
 * Aciona o reduce para alterar a variável cpfValido
 * @param {boolean} valido 
 * @returns {Object}
 */
export const setCpfValido = valido => {
  return {
    type: ActionTypes.SET_CPF_VALIDO,
    payload: {
      valido,
    }
  }
}

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

export const getUsuarioByIdRequest = id => {
  return {
    type: ActionTypes.GET_USUARIO_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getUsuarioById = usuario => {
  return {
    type: ActionTypes.GET_USUARIO_BY_ID_SUCCESS,
    payload: {
      usuario
    }
  }
}

export const getUsersByRegionalRequest = regionalSaude_id => {
  return {
    type: ActionTypes.GET_USERS_BY_REGIONAL_REQUEST,
    payload: {
      regionalSaude_id
    }
  }
}

export const getUsersByRegional = usuarios => {
  return {
    type: ActionTypes.GET_USERS_BY_REGIONAL_SUCCESS,
    payload: {
      usuarios
    }
  }
}

export const getUsersByCityRequest = municipio_id => {
  return {
    type: ActionTypes.GET_USERS_BY_CITY_REQUEST,
    payload: {
      municipio_id
    }
  }
}

export const getUsersByCity = usuarios => {
  return {
    type: ActionTypes.GET_USUARIOS_SUCCESS,
    payload: {
      usuarios
    }
  }
}

export const createUsuarioRequest = ( nome, cpf, rg, email, celular, usuario, senha, tipoPerfil, regionalSaude_id, municipio_id ) => {
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
      regionalSaude_id,
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

export const updateUsuario = usuario => {
  return {
    type: ActionTypes.UPDATE_USUARIO_SUCCESS,
    payload: {
      usuario
    }
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
