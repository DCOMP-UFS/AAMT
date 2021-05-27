export const ActionTypes = {
  GET_IMOVEIS_MUNICIPIO_REQUEST: "GET_IMOVEIS_MUNICIPIO_REQUEST",
  SET_IMOVEIS: "SET_IMOVEIS",
  SET_IMOVEL: "SET_IMOVEL",
  ADD_IMOVEL_REQUEST: "ADD_IMOVEL_REQUEST",
  EDITAR_IMOVEL_REQUEST: "EDITAR_IMOVEL_REQUEST",
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
 * Aciona o sagas para inserir um novo imóvel
 *
 * @param class imovel: {
 *  id,
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
export const editarImovelRequest = imovel => {
  console.log( imovel );
  return {
    type: ActionTypes.EDITAR_IMOVEL_REQUEST,
    payload: {
      imovel
    }
  }
}
