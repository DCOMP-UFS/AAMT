export const ActionTypes = {
  PLANEJAR_ROTA_REQUEST       : "PLANEJAR_ROTA_REQUEST",
  SET_ROTA_PLANEJADA          : "SET_ROTA_PLANEJADA",
  SET_CARREGANDO_ROTA         : "SET_CARREGANDO_ROTA",
  GET_ROTAS_PLANEJADAS_REQUEST: "GET_ROTAS_PLANEJADAS_REQUEST",
  SET_ROTAS_PLANEJADAS        : "SET_ROTAS_PLANEJADAS",
  IS_FINALIZADO_REQUEST       : "IS_FINALIZADO_REQUEST",
  SET_IS_FINALIZADO           : "SET_IS_FINALIZADO",
  GET_ROUTE_REQUEST: "GET_ROUTE_REQUEST",
  GET_ROUTE_SUCCESS: "GET_ROUTE_SUCCESS",
  CHECK_ROTA_INICIADA_REQUEST: "CHECK_ROTA_INICIADA_REQUEST",
  CHECK_ROTA_INICIADA_SUCCESS: "CHECK_ROTA_INICIADA_SUCCESS",
  INICIAR_ROTA_REQUEST: "INICIAR_ROTA_REQUEST",
  ENCERRAR_ROTA_REQUEST: "ENCERRAR_ROTA_REQUEST",
  SALVAR_ROTA: "SALVAR_ROTA",
  RESETAR_OPENMODAL: "RESETAR_OPENMODAL",
  SET_AUX_FINALIZADO: "SET_AUX_FINALIZADO,",
  SET_ROTA_INICIADA: "SET_ROTA_INICIADA"
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

export const resetOpenModal = () => {
  return {
    type: ActionTypes.RESETAR_OPENMODAL
  }
}

export const saveRoute = ( rota, horaInicio ) => {
  return {
    type: ActionTypes.SALVAR_ROTA,
    payload: {
      rota,
      horaInicio
    }
  }
}

export const getRouteRequest = ( usuario_id, dia ) => {
  return {
    type: ActionTypes.GET_ROUTE_REQUEST,
    payload: {
      usuario_id,
      dia
    }
  }
}

export const getRoute = data => {
  return {
    type: ActionTypes.GET_ROUTE_SUCCESS,
    payload: {
      data
    }
  }
}

export const isStartedRequest = trabalhoDiario_id => {
  return {
    type: ActionTypes.CHECK_ROTA_INICIADA_REQUEST,
    payload: {
      trabalhoDiario_id
    }
  }
}

export const isStarted = fl_iniciada => {
  return {
    type: ActionTypes.CHECK_ROTA_INICIADA_SUCCESS,
    payload: {
      fl_iniciada
    }
  }
}

export const startRouteRequest = ( trabalhoDiario_id, horaInicio ) => {
  return {
    type: ActionTypes.INICIAR_ROTA_REQUEST,
    payload: {
      trabalhoDiario_id,
      horaInicio
    }
  }
}

export const closeRouteRequest = ( usuario_id, trabalhoDiario_id, horaFim, vistorias ) => {
  return {
    type: ActionTypes.ENCERRAR_ROTA_REQUEST,
    payload: {
      usuario_id,
      trabalhoDiario_id,
      horaFim,
      vistorias
    }
  }
}

/**
 * Solicita ao reduce que altere a variável auxFinalizado
 * auxFinalizado é um estado auxiliar para quando o trabalho
 * diario for finalizado, com o intuito de não interferir como
 * a variavel isFinalizado 
 * @param {boolean} AuxFinalizado 
 * @returns 
 */
export const setAuxFinalizado = auxFinalizado => {
  return {
    type    : ActionTypes.SET_AUX_FINALIZADO,
    payload : {
      auxFinalizado
    }
  }
}

/**
 * Após a requisição para iniciar uma rota, essa action
 * é chamada para indica ser o processo foi bem sucedido
 * ou não.
 * 
 * Ela recebe um boolean ' rotaIniciada' que pode receber 3 valores:
 * 
 * true  - Requisição foi bem sucedisa
 * false - Requisição não ocorreu ou houve alguma falha.
 * undefined || null - Estado padrão, significa que nenhum requisição foi feita
 *
 * @param {Bollean} fl_carregando_rota
 * @returns
 */
export const setRotaIniciada = rotaIniciada => {
  return {
    type    : ActionTypes.SET_ROTA_INICIADA,
    payload : {
      rotaIniciada
    }
  }
}