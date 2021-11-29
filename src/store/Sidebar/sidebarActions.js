export const ActionTypes = {
  CHANGE_SIDEBAR: "CHANGE_SIDEBAR",
};

export const changeSidebar = ( id, subId ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR,
    payload: {
      id,
      subId
    }
  }
}
