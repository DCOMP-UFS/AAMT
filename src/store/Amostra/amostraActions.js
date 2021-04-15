export const ActionTypes = {
  GET_AMOSTRAS_REQUEST: "GET_AMOSTRAS_REQUEST",
  SET_AMOSTRAS: "SET_AMOSTRAS",
  ENVIAR_AMOSTRAS_REQUEST: "ENVIAR_AMOSTRAS_REQUEST"
}

/**
 *
 * @param {*} supervisor_id
 */
export const getAmostrasRequest = supervisor_id => {
  return {
    type: ActionTypes.GET_AMOSTRAS_REQUEST,
    payload: {
      supervisor_id
    }
  }
}

/**
 * Action vinculada a um saga que aguarda a atualização das amostras.
 *
 * @param {*} laboratorio_id
 */
 export const enviarAmostrasRequest = ( laboratorio_id, amostras ) => {
  return {
    type: ActionTypes.ENVIAR_AMOSTRAS_REQUEST,
    payload: {
      laboratorio_id,
      amostras
    }
  }
}

/**
 *
 * @param {*} amostras
 * @returns
 */
export const setAmostras = amostras => {
  return {
    type: ActionTypes.SET_AMOSTRAS,
    payload: {
      amostras
    }
  }
}
