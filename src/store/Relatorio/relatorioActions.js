export const ActionTypes = {
  GET_BOLETIM_SEMANAL_REQUEST: "GET_BOLETIM_SEMANAL_REQUEST",
  SET_BOLETIM_SEMANAL: "SET_BOLETIM_SEMANAL",
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
