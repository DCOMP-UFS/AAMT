export const ActionTypes = {
  GET_MUNICIPIOS_REQUEST: "GET_MUNICIPIOS_REQUEST",
  GET_MUNICIPIOS_BY_STATE_REQUEST: "GET_MUNICIPIOS_BY_STATE_REQUEST",
  GET_MUNICIPIOS_SUCCESS: "GET_MUNICIPIOS_SUCCESS",
  GET_CITY_BY_ID_REQUEST: "GET_CITY_BY_ID_REQUEST",
  GET_CITY_BY_ID_SUCCESS: "GET_CITY_BY_ID_SUCCESS",
  GET_CITY_BY_REGIONAL_HEALTH_REQUEST: "GET_CITY_BY_REGIONAL_HEALTH_REQUEST",
  GET_CITY_BY_REGIONAL_HEALTH_SUCCESS: "GET_CITY_BY_REGIONAL_HEALTH_SUCCESS",
  GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_REQUEST: "GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_REQUEST",
  GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_SUCCESS: "GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_SUCCESS",
  GET_OLD_CITY_FROM_REGIONAL_HEALTH_REQUEST: "GET_OLD_CITY_FROM_REGIONAL_HEALTH_REQUEST",
  GET_OLD_CITY_FROM_REGIONAL_HEALTH_SUCCESS: "GET_OLD_CITY_FROM_REGIONAL_HEALTH_SUCCESS",
  CREATE_CITY_REQUEST: "CREATE_CITY_REQUEST",
  CREATE_CITY_SUCCESS: "CREATE_CITY_SUCCESS",
  CREATE_CITY_FAIL: "CREATE_CITY_FAIL",
  CLEAR_CREATE_CITY: "CLEAR_CREATE_CITY",
  UPDATE_CITY_REQUEST: "UPDATE_CITY_REQUEST",
  UPDATE_CITY_SUCCESS: "UPDATE_CITY_SUCCESS",
  UPDATE_CITY_FAIL: "UPDATE_CITY_FAIL",
  CLEAR_UPDATE_CITY: "CLEAR_UPDATE_CITY",
  CHANGE_CITY_EDIT_INDEX: "CHANGE_CITY_EDIT_INDEX",
  TRANSFER_CITY_REGIONAL_REQUEST: "TRANSFER_CITY_REGIONAL_REQUEST",
  TRANSFER_CITY_REGIONAL_SUCCESS: "TRANSFER_CITY_REGIONAL_SUCCESS",
  TRANSFER_CITY_REGIONAL_FAIL: "TRANSFER_CITY_REGIONAL_FAIL",
  TRANSFER_CITY_REGIONAL_RESET: "TRANSFER_CITY_REGIONAL_RESET",
  REBIND_CITY_REGIONAL_REQUEST: "REBIND_CITY_REGIONAL_REQUEST",
  REBIND_CITY_REGIONAL_SUCCESS: "REBIND_CITY_REGIONAL_SUCCESS",
  REBIND_CITY_REGIONAL_FAIL: "REBIND_CITY_REGIONAL_FAIL",
  REBIND_CITY_REGIONAL_RESET: "REBIND_CITY_REGIONAL_RESET",
}

export const getMunicipiosRequest = () => {
  return {
    type: ActionTypes.GET_MUNICIPIOS_REQUEST
  }
}

export const getMunicipiosByStateRequest = ( estado_id ) => {
  return {
    type: ActionTypes.GET_MUNICIPIOS_BY_STATE_REQUEST,
    payload: {
      estado_id
    }
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

//Vinculado pode receber true, false ou null
//  True  - é o valor padrão e irá retornas todos os municipios que estão atualmente vinculados à regional
//  False - significa que será retonado todos os municipios que ja fizeram parte da regional, mas não mais
//  Null  - significa que será retonados todos os muncipios que pertecem ou ja perteceram à trgonal
//MunicipioAtivo pode receber true, false ou null
// True - é o valor padrão e irá retornar apenas os munícipios ativos da regional
// False - irá retornar apenas os muncipios inativos da regional
// Null  - irá retornar tantos os municipios ativos como inativos
export const getCityByRegionalHealthRequest = (regionalSaude_id, vinculado = true, municipioAtivo = true) => {
  return {
    type: ActionTypes.GET_CITY_BY_REGIONAL_HEALTH_REQUEST,
    payload: {
      regionalSaude_id,
      vinculado,
      municipioAtivo,
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

export const getActualCityFromRegionalHealthRequest = (regionalSaude_id) => {
  return {
    type: ActionTypes.GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_REQUEST,
    payload: {
      regionalSaude_id,
      vinculado: true
    }
  }
}

export const getActualCityFromRegionalHealthSuccess = municipios => {
  return {
    type: ActionTypes.GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_SUCCESS,
    payload: {
      municipios
    }
  }
}

export const getOldCityFromRegionalHealthRequest = (regionalSaude_id) => {
  return {
    type: ActionTypes.GET_OLD_CITY_FROM_REGIONAL_HEALTH_REQUEST,
    payload: {
      regionalSaude_id,
      vinculado: false
    }
  }
}

export const getOldCityFromRegionalHealthSuccess = municipios => {
  return {
    type: ActionTypes.GET_OLD_CITY_FROM_REGIONAL_HEALTH_SUCCESS,
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

export const updateCityFail = () => {
  return {
    type: ActionTypes.UPDATE_CITY_FAIL,
  }
}

export const clearUpdateCity = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_CITY
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

export const transferMunicipioRegionalRequest = ( municipio_id, regional_id ) => {
  return {
    type: ActionTypes.TRANSFER_CITY_REGIONAL_REQUEST,
    payload: {
      municipio_id,
      regional_id
    }
  }
}

export const transferMunicipioRegionalSuccess = () => {
  return {
    type: ActionTypes.TRANSFER_CITY_REGIONAL_SUCCESS
  }
}

export const transferMunicipioRegionalFail = () => {
  return {
    type: ActionTypes.TRANSFER_CITY_REGIONAL_FAIL
  }
}

export const transferMunicipioRegionalReset = () => {
  return {
    type: ActionTypes.TRANSFER_CITY_REGIONAL_RESET
  }
}

export const rebindMunicipioRegionalRequest = ( municipio_id, regional_id ) => {
  return {
    type: ActionTypes.REBIND_CITY_REGIONAL_REQUEST,
    payload: {
      municipio_id,
      regional_id
    }
  }
}

export const rebindMunicipioRegionalSuccess = () => {
  return {
    type: ActionTypes.REBIND_CITY_REGIONAL_SUCCESS
  }
}

export const rebindMunicipioRegionalFail = () => {
  return {
    type: ActionTypes.REBIND_CITY_REGIONAL_FAIL
  }
}

export const rebindMunicipioRegionalReset = () => {
  return {
    type: ActionTypes.REBIND_CITY_REGIONAL_RESET
  }
}
