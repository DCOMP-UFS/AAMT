export const ActionTypes = {
  GET_BOLETIM_SEMANAL_REQUEST: "GET_BOLETIM_SEMANAL_REQUEST",
  SET_BOLETIM_SEMANAL: "SET_BOLETIM_SEMANAL",
  GET_BOLETIM_DIARIO_EQUIPE_REQUEST: "GET_BOLETIM_DIARIO_EQUIPE_REQUEST",
  SET_BOLETIM_DIARIO_EQUIPE: "SET_BOLETIM_DIARIO_EQUIPE",
  GET_BOLETIM_ATIVIDADE_EQUIPE_REQUEST: "GET_BOLETIM_ATIVIDADE_EQUIPE_REQUEST",
  SET_BOLETIM_ATIVIDADE_EQUIPE: "SET_BOLETIM_ATIVIDADE_EQUIPE"
}

/**
 * Aciona o sagas para consultar os dados do boletim diário
 * de uma determinada equipe e um determinado dia
 *
 * @returns void
 */
export const getBoletimDiarioEquipeRequest = ( equipe_id, data ) => {
  return {
    type: ActionTypes.GET_BOLETIM_DIARIO_EQUIPE_REQUEST,
    payload: {
      equipe_id,
      data
    }
  }
}

/**
 * Seta os dados de um boletim diário da equipe no reduce.
 *
 * @param Object data
 * @returns
 */
 export const setBoletimDiarioEquipe = data => {
  return {
    type: ActionTypes.SET_BOLETIM_DIARIO_EQUIPE,
    payload: {
      data
    }
  }
}


/**
 * Aciona o sagas para consultar os dados do boletim diário
 * de uma determinada semana
 *
 * @returns void
 */
export const getBoletimSemanalRequest = ( semana, atividade_id, ano ) => {
  return {
    type: ActionTypes.GET_BOLETIM_SEMANAL_REQUEST,
    payload: {
      semana,
      atividade_id,
      ano
    }
  }
}

/**
 * Seta os dados de um boletim diário no reduce.
 *
 * @param class data
 * @returns
 */
export const setBoletimSemanal = data => {
  return {
    type: ActionTypes.SET_BOLETIM_SEMANAL,
    payload: {
      data
    }
  }
}

/**
 * Aciona o sagas para consultar os dados do boletim
 * da atividade de uma determinada equipe
 *
 * @returns void
 */
 export const getBoletimAtividadeEquipeRequest = ( equipe_id ) => {
  return {
    type: ActionTypes.GET_BOLETIM_ATIVIDADE_EQUIPE_REQUEST,
    payload: {
      equipe_id,
    }
  }
}

/**
 * Seta os dados de um boletim da atividade por equipe no reduce.
 *
 * @param Object data
 * @returns
 */
 export const setBoletimAtividadeEquipe = data => {
  return {
    type: ActionTypes.SET_BOLETIM_ATIVIDADE_EQUIPE,
    payload: {
      data
    }
  }
}
