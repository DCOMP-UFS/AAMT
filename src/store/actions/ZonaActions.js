export const ActionTypes = {
  GET_ZONE_BY_CITY_REQUEST: "GET_ZONE_BY_CITY_REQUEST",
  GET_ZONE_BY_CITY_SUCCESS: "GET_ZONE_BY_CITY_SUCCESS",
  GET_ZONE_BY_ID_REQUEST: "GET_ZONE_BY_ID_REQUEST",
  GET_ZONE_BY_ID_SUCCESS: "GET_ZONE_BY_ID_SUCCESS",
  GET_ZONE_BY_LOCALITY_REQUEST: "GET_ZONE_BY_LOCALITY_REQUEST",
  GET_ZONE_BY_LOCALITY_SUCCESS: "GET_ZONE_BY_LOCALITY_SUCCESS",
  CREATE_ZONE_REQUEST: "CREATE_ZONE_REQUEST",
  CREATE_ZONE_SUCCESS: "CREATE_ZONE_SUCCESS",
  UPDATE_ZONE_REQUEST: "UPDATE_ZONE_REQUEST",
  UPDATE_ZONE_SUCCESS: "UPDATE_ZONE_SUCCESS",
  CLEAR_CREATE_ZONE: "CLEAR_CREATE_ZONE",
  CLEAR_UPDATE_ZONE: "CLEAR_UPDATE_ZONE"
}

export const getZoneByCityRequest = municipio_id => {
  return {
    type: ActionTypes.GET_ZONE_BY_CITY_REQUEST,
    payload: {
      municipio_id
    }
  }
}

export const getZoneByCity = zonas => {
  return {
    type: ActionTypes.GET_ZONE_BY_CITY_SUCCESS,
    payload: {
      zonas
    }
  }
}

export const getZoneByIdRequest = id => {
  return {
    type: ActionTypes.GET_ZONE_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getZoneById = zona => {
  return {
    type: ActionTypes.GET_ZONE_BY_ID_SUCCESS,
    payload: {
      zona
    }
  }
}

export const getZoneByLocalityRequest = localidade_id => {
  return {
    type: ActionTypes.GET_ZONE_BY_LOCALITY_REQUEST,
    payload: {
      localidade_id
    }
  }
}

export const getZoneByLocality = zonas => {
  return {
    type: ActionTypes.GET_ZONE_BY_LOCALITY_SUCCESS,
    payload: {
      zonas
    }
  }
}

export const createZoneRequest = ( localidade_id ) => {
  return {
    type: ActionTypes.CREATE_ZONE_REQUEST,
    payload: {
      localidade_id
    }
  }
}

export const createZone = zona => {
  return {
    type: ActionTypes.CREATE_ZONE_SUCCESS,
    payload: {
      zona
    }
  }
}

export const updateZoneRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_ZONE_REQUEST,
    payload: { id, body }
  }
}

export const updateZone = zona => {
  return {
    type: ActionTypes.UPDATE_ZONE_SUCCESS,
    payload: {
      zona
    }
  }
}

export const clearCreate = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_ZONE
  }
}

export const clearUpdate = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_ZONE
  }
}
