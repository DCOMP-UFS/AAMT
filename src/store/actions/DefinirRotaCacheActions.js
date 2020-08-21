export const ActionTypes = {
  SALVAR_ROTAS: "SALVAR_ROTAS",
  LIMPAR_CACHE_PLANEJAMENTO: "LIMPAR_CACHE_PLANEJAMENTO",
  CONSULTAR_PLANEJAMENTO_REQUEST: "CONSULTAR_PLANEJAMENTO_REQUEST",
  CONSULTAR_PLANEJAMENTO_SUCCESS: "CONSULTAR_PLANEJAMENTO_SUCCESS"
}

export const saveRoutes = planejamento => {
  return {
    type: ActionTypes.SALVAR_ROTAS,
    payload: {
      planejamento
    }
  }
}

export const getPlanningRequest = supervisor_id => {
  return {
    type: ActionTypes.CONSULTAR_PLANEJAMENTO_REQUEST,
    payload: {
      supervisor_id
    }
  }
}

export const getPlanning = planejamento => {
  return {
    type: ActionTypes.CONSULTAR_PLANEJAMENTO_SUCCESS,
    payload: {
      planejamento
    }
  }
}

export const clearCachePlanning = () => {
  return {
    type: ActionTypes.LIMPAR_CACHE_PLANEJAMENTO
  }
}
