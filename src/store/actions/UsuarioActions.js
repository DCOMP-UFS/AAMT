export const ActionTypes = {
  AUTHENTICATE_REQUEST: "AUTHENTICATE_REQUEST",
  AUTHENTICATE_SUCCESS: "AUTHENTICATE_SUCCESS",
  AUTHENTICATE_FAILURE: "AUTHENTICATE_FAILURE",
  CLOSE_POPUP: "CLOSE_POPUP",
  OPEN_POPUP: "OPEN_POPUP",
  CLEAR_TOAST: "CLEAR_TOAST",
  GET_USUARIOS_REQUEST: "GET_USUARIOS_REQUEST",
  GET_USUARIOS_SUCCESS: "GET_USUARIOS_SUCCESS",
  GET_USUARIOS_FAILURE: "GET_USUARIOS_FAILURE"
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

export const getUsuariosRequest = () => {
  return {
    type: ActionTypes.GET_USUARIOS_REQUEST
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
