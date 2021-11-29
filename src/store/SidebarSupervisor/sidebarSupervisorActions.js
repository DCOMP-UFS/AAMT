export const ActionTypes = {
  CHANGE_SIDEBAR_SUPERVISOR: "CHANGE_SIDEBAR_SUPERVISOR",
};

export const changeSidebar = ( id, subId ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR_SUPERVISOR,
    payload: {
      id,
      subId
    }
  }
}
