export const ActionTypes = {
  GET_RUA_POR_CEP_REQUEST: "GET_RUA_POR_CEP_REQUEST",
  SET_RUA: "SET_RUA",
  GET_STREET_BY_CITY_REQUEST: "GET_STREET_BY_CITY_REQUEST",
  GET_STREET_BY_CITY_SUCCESS: "GET_STREET_BY_CITY_SUCCESS",
  CREATE_STREET_REQUEST: "CREATE_STREET_REQUEST",
  CREATE_STREET_SUCCESS: "CREATE_STREET_SUCCESS",
  CREATE_STREET_FAIL: "CREATE_STREET_FAIL",
  CLEAR_CREATE_STREET: "CLEAR_CREATE_STREET",
  CHANGE_STREET_SELECT: "CHANGE_STREET_SELECT",
  UPDATE_STREET_REQUEST: "UPDATE_STREET_REQUEST",
  UPDATE_STREET_SUCCESS: "UPDATE_STREET_SUCCESS",
  UPDATE_STREET_FAIL : "UPDATE_STREET_FAIL",
  CLEAR_UPDATE_STREET : "CLEAR_UPDATE_STREET",
  DELETE_STREET_REQUEST: "DELETE_STREET_REQUEST",
  DELETE_STREET_SUCCESS: "DELETE_STREET_SUCCESS",
  STREET_EXIST_REQUEST: "STREET_EXIST_REQUEST",
  STREET_EXIST_SUCCESS: "STREET_EXIST_SUCCESS",
  CLEAR_STREET_EXIST: "CLEAR_STREET_EXIST"
}

/**
 * aciona o saga para solicitar consulta a API dos correios
 * de consultar o nome de uma rua pelo nome
 *
 * @param {string} cep
 * @returns
 */
export const getRuaPorCepRequest = cep => {
  return {
    type: ActionTypes.GET_RUA_POR_CEP_REQUEST,
    payload: {
      cep
    }
  }
}

/**
 * Altera no state rua.rua uma rua
 * @param {Rua} rua 
 * @returns 
 */
export const setRua = rua => {
  return {
    type: ActionTypes.SET_RUA,
    payload: {
      rua
    }
  }
}

export const getStreetByCityRequest = municipio_id => {
  return {
    type: ActionTypes.GET_STREET_BY_CITY_REQUEST,
    payload: {
      municipio_id
    }
  }
}

export const getStreetByCitySuccess = ruas => {
  return {
    type: ActionTypes.GET_STREET_BY_CITY_SUCCESS,
    payload: {
      ruas
    }
  }
}

export const createStreetRequest = ( nome, cep, localidade_id ) => {
  return {
    type: ActionTypes.CREATE_STREET_REQUEST,
    payload: {
      nome,
      cep,
      localidade_id
    }
  }
}

export const updateStreetRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_STREET_REQUEST,
    payload: {
      id,
      body
    }
  }
}

export const deleteStreetRequest = ( id, index ) => {
  return {
    type: ActionTypes.DELETE_STREET_REQUEST,
    payload: {
      id,
      index
    }
  }
}

export const deleteStreet = ( index ) => {
  return {
    type: ActionTypes.DELETE_STREET_SUCCESS,
    payload: {
      index
    }
  }
}

export const updateStreet = rua => {
  return {
    type: ActionTypes.UPDATE_STREET_SUCCESS,
    payload: {
      rua
    }
  }
}

export const updateStreetFail = () => {
  return {
    type: ActionTypes.UPDATE_STREET_FAIL,
  }
}

export const clearUpdate = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_STREET
  }
}

export const createStreet = rua => {
  return {
    type: ActionTypes.CREATE_STREET_SUCCESS,
    payload: {
      rua
    }
  }
}

export const createStreetFail = () => {
  return {
    type: ActionTypes.CREATE_STREET_FAIL,
  }
}

export const clearCreate = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_STREET
  }
}


export const changeStreetSelect = index => {
  return {
    type: ActionTypes.CHANGE_STREET_SELECT,
    payload: {
      index
    }
  }
}

export const streetExistRequest = ( id,cep ) => {
  return {
    type: ActionTypes.STREET_EXIST_REQUEST,
    payload: {
      id,
      cep,
    }
  }
}

export const streetExistSuccess = (data) => {
  return {
    type: ActionTypes.STREET_EXIST_SUCCESS,
    payload: {
      data: data
    }
  }
}

export const clearStreetExist = () => {
  return {
    type: ActionTypes.CLEAR_STREET_EXIST,
  }
}
