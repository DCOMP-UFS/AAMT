export const ActionTypes = {
  GET_REGIONS_BY_NATION_REQUEST: "GET_REGIONS_BY_NATION_REQUEST",
  GET_REGIONS_BY_NATION_SUCCESS: "GET_REGIONS_BY_NATION_SUCCESS",
}

export const GetRegionsByNationRequest = pais_id => {
  return {
    type: ActionTypes.GET_REGIONS_BY_NATION_REQUEST,
    payload: {
      pais_id
    }
  }
}

export const GetRegionsByNation = regioes => {
  return {
    type: ActionTypes.GET_REGIONS_BY_NATION_SUCCESS,
    payload: {
      regioes
    }
  }
}
