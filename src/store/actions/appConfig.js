export const ActionTypes = {
  NAV_TOGGLE_LAB: "NAV_TOGGLE_LAB",
  NAV_TOGGLE: "NAV_TOGGLE",
  SET_TOKEN: "SET_TOKEN",
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
