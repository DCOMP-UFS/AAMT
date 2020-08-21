export const ActionTypes = {
  GET_ACTIVITIES_SUPERVISED_REQUEST: "GET_ACTIVITIES_SUPERVISED_REQUEST",
  GET_ACTIVITIES_SUPERVISED_SUCCESS: "GET_ACTIVITIES_SUPERVISED_SUCCESS",
  GET_TEAMS_SUP_REQUEST: "GET_TEAMS_SUP_REQUEST",
  GET_TEAMS_SUP_SUCCESS: "GET_TEAMS_SUP_SUCCESS",
  ADD_PLANEJAMENTO: "ADD_PLANEJAMENTO",
  ADD_ROTA: "ADD_ROTA",
  REMOVER_ROTA: "REMOVER_ROTA",
  ALTERAR_USUARIO_ROTA: "ALTERAR_USUARIO_ROTA",
  ADD_LADO_A_ROTA: "ADD_LADO_A_ROTA",
  REMOVE_LADO_A_ROTA: "REMOVE_LADO_A_ROTA",
  CARREGAR_PLANEJAMENTO_CACHE: "CARREGAR_PLANEJAMENTO_CACHE",
  ARMAZENAR_PLANEJAMENTO_REQUEST: "ARMAZENAR_PLANEJAMENTO_REQUEST",
  ARMAZENAR_PLANEJAMENTO_SUCCESS: "ARMAZENAR_PLANEJAMENTO_SUCCESS",
}

export const getActivitiesSupRequest = id => {
  return {
    type: ActionTypes.GET_ACTIVITIES_SUPERVISED_REQUEST,
    payload: {
      id
    }
  }
}

export const getActivitiesSup = atividades => {
  return {
    type: ActionTypes.GET_ACTIVITIES_SUPERVISED_SUCCESS,
    payload: {
      atividades
    }
  }
}

export const addPlanejamento = equipe => {
  return {
    type: ActionTypes.ADD_PLANEJAMENTO,
    payload: {
      equipe
    }
  }
}

export const getTeamsSupRequest = atividade_id => {
  return {
    type: ActionTypes.GET_TEAMS_SUP_REQUEST,
    payload: {
      atividade_id
    }
  }
}

export const getTeamsSup = equipes => {
  return {
    type: ActionTypes.GET_TEAMS_SUP_SUCCESS,
    payload: {
      equipes
    }
  }
}

export const addRoute = () => {
  return {
    type: ActionTypes.ADD_ROTA
  }
}

export const removeRoute = index => {
  return {
    type: ActionTypes.REMOVER_ROTA,
    payload: {
      index
    }
  }
}

export const changeRouteUser = ( usuario_id, index) => {
  return {
    type: ActionTypes.ALTERAR_USUARIO_ROTA,
    payload: {
      usuario_id,
      index
    }
  }
}

export const addSideRoute = ( quarteiraoIndex, ladoIndex, rotaIndex ) => {
  return {
    type: ActionTypes.ADD_LADO_A_ROTA,
    payload: {
      quarteiraoIndex,
      ladoIndex,
      rotaIndex
    }
  }
}

export const removeSideRoute = ( quarteiraoIndex, ladoIndex, rotaIndex ) => {
  return {
    type: ActionTypes.REMOVE_LADO_A_ROTA,
    payload: {
      quarteiraoIndex,
      ladoIndex,
      rotaIndex
    }
  }
}

export const loadPlanning = planejamento => {
  return {
    type: ActionTypes.CARREGAR_PLANEJAMENTO_CACHE,
    payload: {
      planejamento
    }
  }
}

export const savePlainRequest = ( supervisor_id, planejamento ) => {
  return {
    type: ActionTypes.ARMAZENAR_PLANEJAMENTO_REQUEST,
    payload: {
      supervisor_id,
      planejamento
    }
  }
}

export const savePlain = planejamento => {
  return {
    type: ActionTypes.ARMAZENAR_PLANEJAMENTO_SUCCESS,
    payload: {
      planejamento
    }
  }
}
