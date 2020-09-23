export const ActionTypes = {
  GET_ROUTE_REQUEST: "GET_ROUTE_REQUEST",
  GET_ROUTE_SUCCESS: "GET_ROUTE_SUCCESS",
  CHECK_ROTA_INICIADA_REQUEST: "CHECK_ROTA_INICIADA_REQUEST",
  CHECK_ROTA_INICIADA_SUCCESS: "CHECK_ROTA_INICIADA_SUCCESS",
  INICIAR_ROTA_REQUEST: "INICIAR_ROTA_REQUEST",
  ENCERRAR_ROTA_REQUEST: "ENCERRAR_ROTA_REQUEST",
  SALVAR_ROTA: "SALVAR_ROTA",
  RESETAR_OPENMODAL: "RESETAR_OPENMODAL",
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

export const closeRouteRequest = ( trabalhoDiario_id, horaFim, vistorias ) => {
  return {
    type: ActionTypes.ENCERRAR_ROTA_REQUEST,
    payload: {
      trabalhoDiario_id,
      horaFim,
      vistorias
    }
  }
}
