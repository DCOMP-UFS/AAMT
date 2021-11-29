export const ActionTypes = {
  GET_TRABALHOS_USUARIO_REQUEST: "GET_TRABALHOS_USUARIO_REQUEST",
  SET_TRABALHOS: "SET_TRABALHOS"
}

/**
 * Consulta na API qual o ciclo em aberto na regional.
 *
 * @param int regional_id
 * @returns
 */
export const getTrabalhosUsuarioRequest = user_id => {
  return {
    type: ActionTypes.GET_TRABALHOS_USUARIO_REQUEST,
    payload: {
      user_id
    }
  }
}

/**
 * Set um valor na variavel ciclo no reduce ciclo
 *
 * @param {*} ciclo
 * @returns
 */
export const setTrabalhos = trabalhos => {
  return {
    type: ActionTypes.SET_TRABALHOS,
    payload: {
      trabalhos
    }
  }
}
