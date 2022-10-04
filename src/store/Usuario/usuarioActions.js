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
  UPDATE_USUARIO_FAILURE: "UPDATE_USUARIO_FAILURE"
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

export const getUsersByRegionalRequest = (regionalSaude_id, incluirLaboratoristas = false) => {
  return {
    type: ActionTypes.GET_USERS_BY_REGIONAL_REQUEST,
    payload: {
      regionalSaude_id,
      incluirLaboratoristas
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

export const getUsersByCityRequest = (municipio_id, incluirLaboratoristas = false) => {
  return {
    type: ActionTypes.GET_USERS_BY_CITY_REQUEST,
    payload: {
      municipio_id,
      incluirLaboratoristas
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

export const createUsuarioRequest = ( nome, cpf, rg, email, celular, usuario, senha, tipoPerfil, regionalSaude_id, municipio_id, laboratorio_id ) => {
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
      municipio_id,
      laboratorio_id
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

export const updateUsuarioFailure = () => {
  return {
    type: ActionTypes.UPDATE_USUARIO_FAILURE
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
