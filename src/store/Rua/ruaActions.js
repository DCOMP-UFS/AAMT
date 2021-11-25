export const ActionTypes = {
  GET_RUA_POR_CEP_REQUEST: "GET_RUA_POR_CEP_REQUEST",
  SET_RUA: "SET_RUA",
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
 * Altera no state nw_rua.rua uma rua
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