export const ActionTypes = {
  GET_IMOVEIS_MUNICIPIO_REQUEST: "GET_IMOVEIS_MUNICIPIO_REQUEST",
  SET_IMOVEIS: "SET_IMOVEIS",
  SET_IMOVEL: "SET_IMOVEL",
  ADD_IMOVEL_REQUEST: "ADD_IMOVEL_REQUEST",
  ADD_IMOVEL_REDUCE: "ADD_IMOVEL_REDUCE",
  EDITAR_IMOVEL_REQUEST: "EDITAR_IMOVEL_REQUEST",
  SET_IMOVEIS_UPDATED: "SET_IMOVEIS_UPDATED",
  CREATE_HOUSE_REQUEST: "CREATE_HOUSE_REQUEST",
  CREATE_HOUSE_SUCCESS: "CREATE_HOUSE_SUCCESS",
  SET_CREATED_TRUE: "SET_CREATED_TRUE",
  CLEAR_CREATE_HOUSE: "CLEAR_CREATE_HOUSE",
  SET_UPDATED_TRUE: "SET_UPDATED_TRUE",
  CLEAR_UPDATE_HOUSE: "CLEAR_UPDATE_HOUSE",
  DELETAR_IMOVEL_REQUEST: "DELETAR_IMOVEL_REQUEST",
  SET_IMOVEIS_POR_IMOVEL_ID: "SET_IMOVEIS_POR_IMOVEL_ID",
}

/**
 * Aciona o sagas para excluir um imóvel
 * @param {Integer} imovel_id 
 * @returns Object
 */
export const deletarImovelRequest = imovel_id => {
  console.log(imovel_id);
  return {
    type: ActionTypes.DELETAR_IMOVEL_REQUEST,
    payload: {
      imovel_id
    }
  }
}

/**
 * Aciona o sagas para consultar os imóveis na API
 *
 * @returns
 */
export const getImoveisMunicipioRequest = municipio_id => {
  return {
    type: ActionTypes.GET_IMOVEIS_MUNICIPIO_REQUEST,
    payload: {
      municipio_id
    }
  }
}

/**
 * Altera a lista de imóveis do reduce imovel
 *
 * @param array imoveis
 * @returns
 */
export const setImoveis = imoveis => {
  return {
    type: ActionTypes.SET_IMOVEIS,
    payload: {
      imoveis
    }
  }
}

/**
 * Altera a lista de imóveis do reduce imovel
 *
 * @param array imoveis
 * @returns
 */
export const setImoveisByImovelId = imovel_id => {
  return {
    type: ActionTypes.SET_IMOVEIS_POR_IMOVEL_ID,
    payload: {
      imovel_id
    }
  }
}

/**
 * Altera a váriavel imovel do reduce imovel
 *
 * @param array imoveis
 * @returns
 */
export const setImovel = imovel => {
  return {
    type: ActionTypes.SET_IMOVEL,
    payload: {
      imovel
    }
  }
}

/**
 * Aciona o sagas para inserir um novo imóvel
 *
 * @param class imovel: {
 *  numero,
 *  sequencia,
 *  responsavel,
 *  complemento,
 *  tipoImovel,
 *  lado_id,
 *  lng,
 *  lat,
 * }
 * @returns
 */
export const addImovelRequest = imovel => {
  return {
    type: ActionTypes.ADD_IMOVEL_REQUEST,
    payload: {
      imovel
    }
  }
}

/**
 * Aciona o sagas para alterar um novo imóvel
 *
 * @param Model imovel
 * @returns
 */
export const editarImovelRequest = imovel => {
  return {
    type: ActionTypes.EDITAR_IMOVEL_REQUEST,
    payload: {
      imovel
    }
  }
}

export const setImoveisUpdated = imovel => {
  return {
    type: ActionTypes.SET_IMOVEIS_UPDATED,
    payload: {
      imovel
    }
  }
}

export const createHouseRequest = (
  numero,
  sequencia,
  responsavel,
  complemento,
  tipoImovel,
  lado_id
) => {
  return {
    type: ActionTypes.CREATE_HOUSE_REQUEST,
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

export const createHouse = imovel => {
  return {
    type: ActionTypes.CREATE_HOUSE_REQUEST,
    payload: {
      imovel
    }
  }
}

export const addImovelReduce = imovel => {
  return {
    type: ActionTypes.ADD_IMOVEL_REDUCE,
    payload: {
      imovel
    }
  }
}

export const setCreatedTrue = () => {
  return {
    type: ActionTypes.SET_CREATED_TRUE
  }
}

export const clearCreate = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_HOUSE
  }
}

export const setUpdatedTrue = () => {
  return {
    type: ActionTypes.SET_UPDATED_TRUE
  }
}

export const clearUpdate = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_HOUSE
  }
}
