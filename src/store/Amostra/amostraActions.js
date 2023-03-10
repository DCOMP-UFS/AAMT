export const ActionTypes = {
  GET_AMOSTRAS_REQUEST: "GET_AMOSTRAS_REQUEST",
  GET_AMOSTRAS_REQUEST_FAIL: "GET_AMOSTRAS_REQUEST_FAIL",
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
  SET_AMOSTRA: "SET_AMOSTRA",
  BUSCANDO_AMOSTRA: "BUSCANDO_AMOSTRA",
  SET_INDEX_EXAMINAR_AMOSTRA: "SET_INDEX_EXAMINAR_AMOSTRA",
  SET_INDEX_ID_AMOSTRAS_ENCAMINHADAS: "SET_INDEX_ID_AMOSTRAS_ENCAMINHADAS"
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
export const getAmostrasRequest = ( supervisor_id, ciclo_id ) => {
  return {
    type: ActionTypes.GET_AMOSTRAS_REQUEST,
    payload: {
      supervisor_id,
      ciclo_id
    }
  }
}

export const getAmostrasRequestFail = ( ) => {
  return {
    type: ActionTypes.GET_AMOSTRAS_REQUEST_FAIL,
  }
}

export const buscandoAmostras = ( ) => {
  return {
    type: ActionTypes.BUSCANDO_AMOSTRA,
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

export const encaminharAmostrasSuccess = (amostrasEncaminhadas) => {
  return {
    type: ActionTypes.ENCAMINHAR_AMOSTRAS_SUCCESS,
    payload: {
      amostrasEncaminhadas
    }
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

export const registrarExameSuccess = (amostraExaminada) => {
  return {
    type: ActionTypes.REGISTRAR_EXAME_SUCCESS,
    payload: {
      amostraExaminada
    }
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

export const setIndexExaminarAmostra = indexExaminarAmostra => {
  return {
    type: ActionTypes.SET_INDEX_EXAMINAR_AMOSTRA,
    payload: {
      indexExaminarAmostra
    }
  }
}

export const setIndexIdAmostrasEncaminhadas = indexIdAmostrasEncaminhadas => {
  return {
    type: ActionTypes.SET_INDEX_ID_AMOSTRAS_ENCAMINHADAS,
    payload: {
      indexIdAmostrasEncaminhadas
    }
  }
}
