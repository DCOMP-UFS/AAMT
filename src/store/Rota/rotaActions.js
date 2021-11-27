export const ActionTypes = {
  PLANEJAR_ROTA_REQUEST       : "PLANEJAR_ROTA_REQUEST",
  SET_ROTA_PLANEJADA          : "SET_ROTA_PLANEJADA",
  SET_CARREGANDO_ROTA         : "SET_CARREGANDO_ROTA",
  GET_ROTAS_PLANEJADAS_REQUEST: "GET_ROTAS_PLANEJADAS_REQUEST",
  SET_ROTAS_PLANEJADAS        : "SET_ROTAS_PLANEJADAS",
  IS_FINALIZADO_REQUEST       : "IS_FINALIZADO_REQUEST",
  SET_IS_FINALIZADO           : "SET_IS_FINALIZADO",
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
 * @param {Bollean} fl_rota_planejada
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

/**
 * true - esta ocorrendo uma requisição das rotas planejadas no dia
 * false || undefined - requisição finalizada.
 *
 * @param {Bollean} fl_carregando_rota
 * @returns
 */
export const setCarregandoRota = fl_carregando_rota => {
  return {
    type: ActionTypes.SET_CARREGANDO_ROTA,
    payload: {
      fl_carregando_rota
    }
  }
}

export const getRotasPlanejadasRequest = ( ciclo_id, usuario_id ) => {
  return {
    type: ActionTypes.GET_ROTAS_PLANEJADAS_REQUEST,
    payload: {
      usuario_id,
      ciclo_id
    }
  }
}

export const setRotasPlanejadas = rotas_planejadas => {
  return {
    type: ActionTypes.SET_ROTAS_PLANEJADAS,
    payload: {
      rotas_planejadas
    }
  }
}

/**
 * Solicita ao sagas a validação do trabalho diário
 * @param {integer} trabalhoDiario_id 
 * @returns 
 */
 export const isFinalizadoRequest = trabalhoDiario_id => {
  return {
    type    : ActionTypes.IS_FINALIZADO_REQUEST,
    payload : {
      trabalhoDiario_id
    }
  }
}

/**
 * Solicita ao reduce que altere a variável flTrabalhoDiario
 * @param {boolean} isFinalizado 
 * @returns 
 */
export const setIsFinalizado = isFinalizado => {
  return {
    type    : ActionTypes.SET_IS_FINALIZADO,
    payload : {
      isFinalizado
    }
  }
}