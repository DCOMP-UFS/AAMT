export const ActionTypes = {
  NAV_TOGGLE_LAB: "NAV_TOGGLE_LAB",
  NAV_TOGGLE: "NAV_TOGGLE",
  SET_TOKEN: "SET_TOKEN",
  SHOW_NOTIFY_TOAST: "SHOW_NOTIFY_TOAST",
  CLEAR_TOAST: "CLEAR_TOAST"
};


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
