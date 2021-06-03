export const ActionTypes = {
  GET_CICLO_ABERTO_REQUEST: "GET_CICLO_ABERTO_REQUEST",
  SET_CICLO: "SET_CICLO"
}

/**
 * Consulta na API qual o ciclo em aberto na regional.
 *
 * @param int regional_id
 * @returns
 */
export const getCicloAbertoRequest = regionalSaude_id => {
  return {
    type: ActionTypes.GET_CICLO_ABERTO_REQUEST,
    payload: {
      regionalSaude_id
    }
  }
}

/**
 * Set um valor na variavel ciclo no reduce nw_ciclo
 *
 * @param {*} ciclo
 * @returns
 */
export const setCiclo = ciclo => {
  return {
    type: ActionTypes.SET_CICLO,
    payload: {
      ciclo
    }
  }
}
