export const ActionTypes = {
  CHANGE_SIDEBAR_AGENTE: "CHANGE_SIDEBAR_AGENTE",
};

export const changeSidebar = ( id, subId ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR_AGENTE,
    payload: {
      id,
      subId
    }
  }
}
