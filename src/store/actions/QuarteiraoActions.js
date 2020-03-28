export const ActionTypes = {
  GET_BLOCK_BY_CITY_REQUEST: "GET_BLOCK_BY_CITY_REQUEST",
  GET_BLOCK_BY_CITY_SUCCESS: "GET_BLOCK_BY_CITY_SUCCESS",
  GET_BY_ID_REQUEST: "GET_BY_ID_REQUEST",
  GET_BY_ID_SUCCESS: "GET_BY_ID_SUCCESS",
  CREATE_CITY_BLOCK_REQUEST: "CREATE_CITY_BLOCK_REQUEST",
  CREATE_CITY_BLOCK_SUCCESS: "CREATE_CITY_BLOCK_SUCCESS",
  CLEAR_CREATE_CITY_BLOCK: "CLEAR_CREATE_CITY_BLOCK",
  CLEAR_UPDATE_CITY_BLOCK: "CLEAR_UPDATE_CITY_BLOCK",
  ADD_HOUSE_REQUEST: "ADD_HOUSE_REQUEST",
  ADD_HOUSE_SUCCESS: "ADD_HOUSE_SUCCESS",
  DELETE_HOUSE_REQUEST: "DELETE_HOUSE_REQUEST",
  DELETE_HOUSE_SUCCESS: "DELETE_HOUSE_SUCCESS",
  UPDATE_HOUSE_REQUEST: "UPDATE_HOUSE_REQUEST",
  UPDATE_HOUSE_SUCCESS: "UPDATE_HOUSE_SUCCESS"
}

export const getBlockByCityRequest = municipio_id => {
  return {
    type: ActionTypes.GET_BLOCK_BY_CITY_REQUEST,
    payload: {
      municipio_id
    }
  }
}

export const getBlockByCity = quarteiroes => {
  return {
    type: ActionTypes.GET_BLOCK_BY_CITY_SUCCESS,
    payload: {
      quarteiroes
    }
  }
}

export const getByIdRequest = id => {
  return {
    type: ActionTypes.GET_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getById = quarteirao => {
  return {
    type: ActionTypes.GET_BY_ID_SUCCESS,
    payload: {
      quarteirao
    }
  }
}

export const createCityBlockRequest = ( numero, localidade_id, zona_id, lados ) => {
  return {
    type: ActionTypes.CREATE_CITY_BLOCK_REQUEST,
    payload: {
      numero,
      localidade_id,
      zona_id,
      lados
    }
  }
}

export const createCityBlock = quarteirao => {
  return {
    type: ActionTypes.CREATE_CITY_BLOCK_SUCCESS,
    payload: {
      quarteirao
    }
  }
}

export const addHouseRequest = (
  numero,
  sequencia,
  responsavel,
  complemento,
  tipoImovel,
  lado_id
) => {
  return {
    type: ActionTypes.ADD_HOUSE_REQUEST,
    payload: {
      numero,
      sequencia,
      responsavel,
      complemento,
      tipoImovel,
      lado_id
    }
  }
}

export const addHouse = imovel => {
  return {
    type: ActionTypes.ADD_HOUSE_SUCCESS,
    payload: {
      imovel
    }
  }
}

export const deleteHouseRequest = ( id, lado_id ) => {
  return {
    type: ActionTypes.DELETE_HOUSE_REQUEST,
    payload: {
      id,
      lado_id
    }
  }
}

export const deleteHouse = ( imovel_id, lado_id ) => {
  return {
    type: ActionTypes.DELETE_HOUSE_SUCCESS,
    payload: {
      imovel_id,
      lado_id
    }
  }
}

export const updateHouseRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_HOUSE_REQUEST,
    payload: {
      id,
      body
    }
  }
}

export const updateHouse = imovel => {
  return {
    type: ActionTypes.UPDATE_HOUSE_SUCCESS,
    payload: {
      imovel
    }
  }
}

export const clearUpdated = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_CITY_BLOCK
  }
}

export const clearCreate = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_CITY_BLOCK
  }
}
