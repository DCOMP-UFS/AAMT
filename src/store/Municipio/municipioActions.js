export const ActionTypes = {
  GET_MUNICIPIOS_REQUEST: "GET_MUNICIPIOS_REQUEST",
  GET_MUNICIPIOS_SUCCESS: "GET_MUNICIPIOS_SUCCESS",
  GET_CITY_BY_ID_REQUEST: "GET_CITY_BY_ID_REQUEST",
  GET_CITY_BY_ID_SUCCESS: "GET_CITY_BY_ID_SUCCESS",
  GET_CITY_BY_REGIONAL_HEALTH_REQUEST: "GET_CITY_BY_REGIONAL_HEALTH_REQUEST",
  GET_CITY_BY_REGIONAL_HEALTH_SUCCESS: "GET_CITY_BY_REGIONAL_HEALTH_SUCCESS",
  CREATE_CITY_REQUEST: "CREATE_CITY_REQUEST",
  CREATE_CITY_SUCCESS: "CREATE_CITY_SUCCESS",
  CREATE_CITY_FAIL: "CREATE_CITY_FAIL",
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

export const getCityByRegionalHealthRequest = regionalSaude_id => {
  return {
    type: ActionTypes.GET_CITY_BY_REGIONAL_HEALTH_REQUEST,
    payload: {
      regionalSaude_id
    }
  }
}

export const getCityByRegionalHealth = municipios => {
  return {
    type: ActionTypes.GET_CITY_BY_REGIONAL_HEALTH_SUCCESS,
    payload: {
      municipios
    }
  }
}

export const createCityRequest = ( codigo, nome, regionalSaude_id ) => {
  return {
    type: ActionTypes.CREATE_CITY_REQUEST,
    payload: {
      codigo,
      nome,
      regionalSaude_id
    }
  }
}

export const createCitySuccess = municipio => {
  return {
    type: ActionTypes.CREATE_CITY_SUCCESS,
    payload: {
      municipio
    }
  }
}

export const createCityFail = () => {
  return {
    type: ActionTypes.CREATE_CITY_FAIL,
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
