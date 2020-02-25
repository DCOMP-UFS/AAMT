export const ActionTypes = {
  CHANGE_SIDEBAR_COORD_GERAL: "CHANGE_SIDEBAR_COORD_GERAL",
};

export const changeSidebar = ( id, subId ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR_COORD_GERAL,
    payload: {
      id,
      subId
    }
  }
}
