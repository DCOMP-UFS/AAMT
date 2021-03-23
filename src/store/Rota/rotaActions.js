export const ActionTypes = {
  PLANEJAR_ROTA_REQUEST: "PLANEJAR_ROTA_REQUEST",
  SET_ROTA_PLANEJADA: "SET_ROTA_PLANEJADA"
}

/**
 *
 * @param {*} rota: {
 *   "supervisor_id": 3,
 *   "equipe_id": 1,
 *   "usuario_id": 4,
 *   "lados": [ 1, 2, 3, 4 ] // lado_id
 * }
 */
export const planejarRotaRequest = rota => {
  return {
    type: ActionTypes.PLANEJAR_ROTA_REQUEST,
    payload: {
      rota
    }
  }
}

/**
 * true - requisição de planejamento de rota realizada com sucesso
 * false || undefined - falha ou não houve requisição.
 *
 * @param {*} fl_rota_planejada
 * @returns
 */
export const setRotaPlanejada = fl_rota_planejada => {
  return {
    type: ActionTypes.SET_ROTA_PLANEJADA,
    payload: {
      fl_rota_planejada
    }
  }
}
