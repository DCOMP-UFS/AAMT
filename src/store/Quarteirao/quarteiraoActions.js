export const ActionTypes = {
  GET_QUARTEIROES_MUNICIPIO_REQUEST: "GET_QUARTEIROES_MUNICIPIO_REQUEST",
  SET_QUARTEIROES: "SET_QUARTEIROES",
  GET_LADOS_QUARTEIRAO: "GET_LADOS_QUARTEIRAO",
  SET_LADOS: "SET_LADOS",
}

/**
 * Aciona o sagas para consultar os quarteiroes de um município na API
 *
 * @param integer municipio_id
 * @returns
 */
export const getQuarteiroesMunicipioRequest = municipio_id => {
  return {
    type: ActionTypes.GET_QUARTEIROES_MUNICIPIO_REQUEST,
    payload: {
      municipio_id
    }
  }
}

/**
 * Altera a lista de quarteirões do reduce quarteirao
 *
 * @param array imoveis
 * @returns
 */
export const setQuarteiroes = quarteiroes => {
  return {
    type: ActionTypes.SET_QUARTEIROES,
    payload: {
      quarteiroes
    }
  }
}

/**
 * Aciona o sagas para consultar os lados de um quarteirao
 *
 * @param integer quarteirao_id
 * @returns
 */
 export const getLadosQuarteiraoRequest = quarteirao_id => {
  return {
    type: ActionTypes.GET_LADOS_QUARTEIRAO,
    payload: {
      quarteirao_id
    }
  }
}

/**
 * Altera a lista de lados do reduce quarteirao
 *
 * @param array lados
 * @returns
 */
 export const setLados = lados => {
  return {
    type: ActionTypes.SET_LADOS,
    payload: {
      lados
    }
  }
}
