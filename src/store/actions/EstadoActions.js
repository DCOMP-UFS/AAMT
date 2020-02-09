export const ActionTypes = {
  GET_STATES_BY_REGION_REQUEST: "GET_STATES_BY_REGION_REQUEST",
  GET_STATES_BY_REGION_SUCCESS: "GET_STATES_BY_REGION_SUCCESS",
}

export const GetStatesByRegionRequest = regiao_id => {
  return {
    type: ActionTypes.GET_STATES_BY_REGION_REQUEST,
    payload: {
      regiao_id
    }
  }
}

export const GetStatesByRegion = estados => {
  return {
    type: ActionTypes.GET_STATES_BY_REGION_SUCCESS,
    payload: {
      estados
    }
  }
}
