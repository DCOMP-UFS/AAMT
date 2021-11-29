export const ActionTypes = {
  CHANGE_SIDEBAR_LAB: "CHANGE_SIDEBAR_LAB",
};

export const changeSidebar = ( index, subIndex ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR_LAB,
    payload: {
      index,
      subIndex
    }
  }
}
