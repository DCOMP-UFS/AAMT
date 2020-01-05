export const ActionTypes = {
  NAV_TOGGLE_LAB: "NAV_TOGGLE_LAB",
  NAV_TOGGLE: "NAV_TOGGLE",
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
