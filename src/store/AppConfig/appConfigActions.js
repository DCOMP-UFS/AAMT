export const ActionTypes = {
  NAV_TOGGLE_LAB: "NAV_TOGGLE_LAB",
  NAV_TOGGLE: "NAV_TOGGLE",
  SET_TOKEN: "SET_TOKEN",
  SHOW_NOTIFY_TOAST: "SHOW_NOTIFY_TOAST",
  CLEAR_TOAST: "CLEAR_TOAST",
  AUTHENTICATE_REQUEST: "AUTHENTICATE_REQUEST",
  AUTHENTICATE_SUCCESS: "AUTHENTICATE_SUCCESS",
  SIGN_OUT: "SIGN_OUT",
  SET_ACABOU_DE_LOGAR: "SET_ACABOU_DE_LOGAR"
};

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

export const signOut = () => {
  return {
    type: ActionTypes.SIGN_OUT,
    payload: {}
  }
}

export const navToggleLab = () => {
  return {
    type: ActionTypes.NAV_TOGGLE_LAB,
  }
}

export const navToggle = () => {
  return {
    type: ActionTypes.NAV_TOGGLE,
  }
}

export const setToken = token => {
  return {
    type: ActionTypes.SET_TOKEN,
    payload: {
      token,
    }
  }
}

export const clearToast = () => {
  return { type: ActionTypes.CLEAR_TOAST };
};

export const showNotifyToast = ( message, type ) => {
  return {
    type: ActionTypes.SHOW_NOTIFY_TOAST,
    payload: {
      message,
      type
    }
  }
}

export const setAcabouDeLogar = acabouDeLogar => {
  return {
    type: ActionTypes.SET_ACABOU_DE_LOGAR,
    payload: {
      acabouDeLogar,
    }
  }
}
