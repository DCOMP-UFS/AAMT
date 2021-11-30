export const ActionTypes = {
  GET_IMOVEIS_MUNICIPIO_REQUEST: "GET_IMOVEIS_MUNICIPIO_REQUEST",
  SET_IMOVEIS: "SET_IMOVEIS",
  SET_IMOVEL: "SET_IMOVEL",
  ADD_IMOVEL_REQUEST: "ADD_IMOVEL_REQUEST",
  EDITAR_IMOVEL_REQUEST: "EDITAR_IMOVEL_REQUEST",
  CREATE_HOUSE_REQUEST: "CREATE_HOUSE_REQUEST",
  CREATE_HOUSE_SUCCESS: "CREATE_HOUSE_SUCCESS",
  SET_CREATED_TRUE: "SET_CREATED_TRUE",
  CLEAR_CREATE_HOUSE: "CLEAR_CREATE_HOUSE",
  SET_UPDATED_TRUE: "SET_UPDATED_TRUE",
  CLEAR_UPDATE_HOUSE: "CLEAR_UPDATE_HOUSE"
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
  console.log( imovel );
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
