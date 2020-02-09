export const ActionTypes = {
  GET_REGIONAL_HEALTH_BY_STATE_REQUEST: "GET_REGIONAL_HEALTH_BY_STATE_REQUEST",
  GET_REGIONAL_HEALTH_BY_STATE_SUCCESS: "GET_REGIONAL_HEALTH_BY_STATE_SUCCESS",
}

export const getRegionalHealthByStateRequest = estado_id => {
  return {
    type: ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_REQUEST,
    payload: {
      estado_id
    }
  }
}

export const getRegionalHealthByState = regionaisSaude => {
  return {
    type: ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_SUCCESS,
    payload: {
      regionaisSaude
    }
  }
}
