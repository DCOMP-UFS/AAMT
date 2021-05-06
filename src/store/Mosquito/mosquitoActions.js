export const ActionTypes = {
  GET_MOSQUITOS_REQUEST: "GET_MOSQUITOS_REQUEST",
  SET_MOSQUITOS: "SET_MOSQUITOS",
}

/**
 * Aciona o sagas para consultar os mosquitos à API
 *
 * @returns void
 */
export const getMosquitosRequest = () => {
  return {
    type: ActionTypes.GET_MOSQUITOS_REQUEST
  }
}

/**
 * Seta um array de mosquitos a variável mosquitos do reduce.
 *
 * @param array mosquitos
 * @returns
 */
export const setMosquitos = mosquitos => {
  return {
    type: ActionTypes.SET_MOSQUITOS,
    payload: {
      mosquitos
    }
  }
}
