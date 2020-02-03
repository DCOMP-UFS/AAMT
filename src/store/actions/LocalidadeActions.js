export const ActionTypes = {
  GET_LOCATION_REQUEST: "GET_LOCATION_REQUEST",
  GET_LOCATION_SUCCESS: "GET_LOCATION_SUCCESS",
  GET_LOCATION_BY_ID_REQUEST: "GET_LOCATION_BY_ID_REQUEST",
  GET_LOCATION_BY_ID_SUCCESS: "GET_LOCATION_BY_ID_SUCCESS",
  GET_LOCATION_BY_CITY_REQUEST: "GET_LOCATION_BY_CITY_REQUEST",
  GET_LOCATION_BY_CITY_SUCCESS: "GET_LOCATION_BY_CITY_SUCCESS",
  CREATE_LOCATION_REQUEST: "CREATE_LOCATION_REQUEST",
  CREATE_LOCATION_SUCCESS: "CREATE_LOCATION_SUCCESS",
  CLEAR_CREATE_LOCATION: "CLEAR_CREATE_LOCATION",
  UPDATE_LOCATION_REQUEST: "UPDATE_LOCATION_REQUEST",
  UPDATE_LOCATION_SUCCESS: "UPDATE_LOCATION_SUCCESS",
  CHANGE_LOCATION_EDIT_INDEX: "CHANGE_LOCATION_EDIT_INDEX",
  CLEAR_UPDATE_LOCATION: "CLEAR_UPDATE_LOCATION"
}

export const getLocationRequest = () => {
  return {
    type: ActionTypes.GET_LOCATION_REQUEST
  }
}

export const getLocations = localidades => {
  return {
    type: ActionTypes.GET_LOCATION_SUCCESS,
    payload: {
      localidades
    }
  }
}

export const getLocationByIdRequest = id => {
  return {
    type: ActionTypes.GET_LOCATION_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getLocationById = localidade => {
  return {
    type: ActionTypes.GET_LOCATION_BY_ID_SUCCESS,
    payload: {
      localidade
    }
  }
}

export const getLocationByCityRequest = municipio_id => {
  return {
    type: ActionTypes.GET_LOCATION_BY_CITY_REQUEST,
    payload: {
      municipio_id
    }
  }
}

export const getLocationByCity = localidades => {
  return {
    type: ActionTypes.GET_LOCATION_BY_CITY_SUCCESS,
    payload: {
      localidades
    }
  }
}

export const createLocationRequest = ( codigo, nome, categoria, municipio ) => {
  return {
    type: ActionTypes.CREATE_LOCATION_REQUEST,
    payload: {
      codigo,
      nome,
      categoria,
      municipio
    }
  }
}

export const createLocation = localidade => {
  return {
    type: ActionTypes.CREATE_LOCATION_SUCCESS,
    payload: {
      localidade
    }
  }
}

export const clearCreate = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_LOCATION
  }
}

export const updateLocationRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_LOCATION_REQUEST,
    payload: { id, body }
  }
}

export const updateLocation = localidade => {
  return {
    type: ActionTypes.UPDATE_LOCATION_SUCCESS,
    payload: {
      localidade
    }
  }
}

export const changeIndex = index => {
  return {
    type: ActionTypes.CHANGE_LOCATION_EDIT_INDEX,
    payload: {
      index
    }
  }
}

export const clearUpdate = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_LOCATION
  }
}
