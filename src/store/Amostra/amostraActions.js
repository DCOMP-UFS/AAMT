export const ActionTypes = {
  GET_AMOSTRAS_REQUEST: "GET_AMOSTRAS_REQUEST",
  GET_AMOSTRAS_BY_LAB: "GET_AMOSTRAS_BY_LAB",
  SET_AMOSTRAS: "SET_AMOSTRAS",
  ENVIAR_AMOSTRAS_REQUEST: "ENVIAR_AMOSTRAS_REQUEST",
  REGISTRAR_EXAME_REQUEST: "REGISTRAR_EXAME_REQUEST",
  SET_AMOSTRA: "SET_AMOSTRA"
}

/**
 * 
 * @param {*} laboratorio_cnpj
 * @returns 
 */
export const getAmostrasByLab = laboratorio_id => {
  return{
    type: ActionTypes.GET_AMOSTRAS_BY_LAB,
    payload: {
      laboratorio_id
    }
  }
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

/**
 *
 * @param {*} amostras
 * @returns
 */
export const registrarExameRequest = exame => {
  return {
    type: ActionTypes.REGISTRAR_EXAME_REQUEST,
    payload: {
      exame
    }
  }
}

/**
 *
 * @param {*} amostra
 * @returns
 */
 export const setAmostra = amostra => {
  return {
    type: ActionTypes.SET_AMOSTRA,
    payload: {
      amostra
    }
  }
}
