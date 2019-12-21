export const ActionTypes = {
  CHANGE_SIDEBAR: "CHANGE_SIDEBAR"
};

export const changeSidebar = ( index, subIndex ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR,
    payload: {
      index,
      subIndex
    }
  };
}
