export const ActionTypes = {
  GET_MUNICIPIOS_REQUEST: "GET_MUNICIPIOS_REQUEST",
  GET_MUNICIPIOS_SUCCESS: "GET_MUNICIPIOS_SUCCESS",
  GET_CITY_BY_ID_REQUEST: "GET_CITY_BY_ID_REQUEST",
  GET_CITY_BY_ID_SUCCESS: "GET_CITY_BY_ID_SUCCESS",
  CREATE_CITY_REQUEST: "CREATE_CITY_REQUEST",
  CREATE_CITY_SUCCESS: "CREATE_CITY_SUCCESS",
  CLEAR_CREATE_CITY: "CLEAR_CREATE_CITY",
  UPDATE_CITY_REQUEST: "UPDATE_CITY_REQUEST",
  UPDATE_CITY_SUCCESS: "UPDATE_CITY_SUCCESS",
  CHANGE_CITY_EDIT_INDEX: "CHANGE_CITY_EDIT_INDEX",
  CLEAR_UPDATE_CITY: "CLEAR_UPDATE_CITY"
}

export const getMunicipiosRequest = () => {
  return {
    type: ActionTypes.GET_MUNICIPIOS_REQUEST
  }
}

export const getMunicipios = municipios => {
  return {
    type: ActionTypes.GET_MUNICIPIOS_SUCCESS,
    payload: {
      municipios
    }
  }
}

export const getCityByIdRequest = id => {
  return {
    type: ActionTypes.GET_CITY_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getCityById = municipio => {
  return {
    type: ActionTypes.GET_CITY_BY_ID_SUCCESS,
    payload: {
      municipio
    }
  }
}

export const createCity = municipio => {
  return {
    type: ActionTypes.CREATE_CITY_SUCCESS,
    payload: {
      municipio
    }
  }
}

export const createCityRequest = ( codigo, nome ) => {
  return {
    type: ActionTypes.CREATE_CITY_REQUEST,
    payload: {
      codigo,
      nome
    }
  }
}

export const clearCreateCity = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_CITY
  }
}

export const updateCityRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_CITY_REQUEST,
    payload: { id, body }
  }
}

export const updateCity = municipio => {
  return {
    type: ActionTypes.UPDATE_CITY_SUCCESS,
    payload: {
      municipio
    }
  }
}

export const changeCityEditIndex = index => {
  return {
    type: ActionTypes.CHANGE_CITY_EDIT_INDEX,
    payload: {
      index
    }
  }
}

export const clearUpdateCity = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_CITY
  }
}
