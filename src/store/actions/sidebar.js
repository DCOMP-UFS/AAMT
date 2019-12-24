export const ActionTypes = {
  CHANGE_SIDEBAR: "CHANGE_SIDEBAR",
  NAV_TOGGLE: "NAV_TOGGLE",
};

export const changeSidebar = ( index, subIndex ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR,
    payload: {
      index,
      subIndex
    }
  }
}

export const navToggle = () => {
  return {
    type: ActionTypes.NAV_TOGGLE,
  }
}
