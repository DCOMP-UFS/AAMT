export const ActionTypes = {
  AUTHENTICATE_REQUEST: "AUTHENTICATE_REQUEST",
  AUTHENTICATE_SUCCESS: "AUTHENTICATE_SUCCESS",
  AUTHENTICATE_FAILURE: "AUTHENTICATE_FAILURE",
  CLOSE_POPUP: "CLOSE_POPUP",
  OPEN_POPUP: "OPEN_POPUP",
  CLEAR_TOAST: "CLEAR_TOAST",
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

export const authenticateFailure = user => {
  return {
    type: ActionTypes.AUTHENTICATE_FAILURE,
    payload: {}
  }
}

export const clearToast = () => {
  return { type: ActionTypes.CLEAR_TOAST };
};
