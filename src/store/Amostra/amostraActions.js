export const ActionTypes = {
  GET_AMOSTRAS_REQUEST: "GET_AMOSTRAS_REQUEST",
  GET_AMOSTRAS_BY_LAB: "GET_AMOSTRAS_BY_LAB",
  SET_AMOSTRAS: "SET_AMOSTRAS",
  ENCAMINHAR_AMOSTRAS_REQUEST: "ENCAMINHAR_AMOSTRAS_REQUEST",
  ENCAMINHAR_AMOSTRAS_SUCCESS: "ENCAMINHAR_AMOSTRAS_SUCCESS",
  ENCAMINHAR_AMOSTRAS_FAIL: "ENCAMINHAR_AMOSTRAS_FAIL",
  ENCAMINHAR_AMOSTRAS_RESET: "ENCAMINHAR_AMOSTRAS_RESET",
  REGISTRAR_EXAME_REQUEST: "REGISTRAR_EXAME_REQUEST",
  REGISTRAR_EXAME_SUCCESS: "REGISTRAR_EXAME_SUCCESS",
  REGISTRAR_EXAME_FAIL: "REGISTRAR_EXAME_FAIL",
  REGISTRAR_EXAME_RESET: "REGISTRAR_EXAME_RESET",
  SET_AMOSTRA: "SET_AMOSTRA"
}

/**
 * 
 * @param {*} laboratorio_id
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
 export const encaminharAmostrasRequest = ( laboratorio_id, amostras ) => {
  return {
    type: ActionTypes.ENCAMINHAR_AMOSTRAS_REQUEST,
    payload: {
      laboratorio_id,
      amostras
    }
  }
}

export const encaminharAmostrasSuccess = () => {
  return {
    type: ActionTypes.ENCAMINHAR_AMOSTRAS_SUCCESS,
  }
}

export const encaminharAmostrasFail = () => {
  return {
    type: ActionTypes.ENCAMINHAR_AMOSTRAS_FAIL,
  }
}

export const encaminharAmostrasReset = () => {
  return {
    type: ActionTypes.ENCAMINHAR_AMOSTRAS_RESET,
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

export const registrarExameSuccess = () => {
  return {
    type: ActionTypes.REGISTRAR_EXAME_SUCCESS,
  }
}

export const registrarExameFail = () => {
  return {
    type: ActionTypes.REGISTRAR_EXAME_FAIL,
  }
}

export const registrarExameReset = () => {
  return {
    type: ActionTypes.REGISTRAR_EXAME_RESET,
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
