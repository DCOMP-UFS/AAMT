export const ActionTypes = {
  GET_RESPONSABILITY_ACTIVITIES_REQUEST: "GET_RESPONSABILITY_ACTIVITIES_REQUEST",
  SET_ATIVIDADES: "SET_ATIVIDADES",
  SET_EQUIPES: "SET_EQUIPES",
  SET_INDEX: "SET_INDEX",
  SET_INDEX_EQUIPE: "SET_INDEX_EQUIPE",
  SET_INDEX_MEMBRO: "SET_INDEX_MEMBRO",
  TOGGLE_LADO: "TOGGLE_LADO",
  GET_ROTA_EQUIPE_REQUEST: "GET_ROTA_EQUIPE_REQUEST",
  SET_ROTA_EQUIPE: "SET_ROTA_EQUIPE",
  SET_FL_LOADING: "SET_FL_LOADING",
  CHECAR_ROTA: "CHECAR_ROTA",
}

export const getResponsabilityActivitiesRequest = (usuario_id, ciclo_id) => {
  return {
    type: ActionTypes.GET_RESPONSABILITY_ACTIVITIES_REQUEST,
    payload: {
      usuario_id,
      ciclo_id
    }
  }
}

export const setActivities = activities => {
  return {
    type: ActionTypes.SET_ATIVIDADES,
    payload: {
      activities
    }
  }
}

export const setEquipes = equipes => {
  return {
    type: ActionTypes.SET_EQUIPES,
    payload: {
      equipes
    }
  }
}

export const setIndexAtividade = index => {
  return {
    type: ActionTypes.SET_INDEX,
    payload: {
      index
    }
  }
}

export const setIndexEquipe = index => {
  return {
    type: ActionTypes.SET_INDEX_EQUIPE,
    payload: {
      index
    }
  }
}

export const setIndexMembro = index => {
  return {
    type: ActionTypes.SET_INDEX_MEMBRO,
    payload: {
      index
    }
  }
}

export const toggleLado = ( indexQuarteirao, indexLado ) => {
  return {
    type: ActionTypes.TOGGLE_LADO,
    payload: {
      indexQuarteirao,
      indexLado
    }
  }
}

export const getRotaEquipeRequest = equipe_id => {
  return {
    type: ActionTypes.GET_ROTA_EQUIPE_REQUEST,
    payload: {
      equipe_id
    }
  }
}

export const setRotaEquipe = quarteiroes => {
  return {
    type: ActionTypes.SET_ROTA_EQUIPE,
    payload: {
      quarteiroes
    }
  }
}

export const setFl_loading = fl_loading => {
  return {
    type: ActionTypes.SET_FL_LOADING,
    payload: {
      fl_loading
    }
  }
}

/**
 * Esta função tem o objetivo de mapear o array rota_equipe e verificar
 * se o usuário selecionado (indexMembro) é o mesmo usuário já planejado
 * nos lados vindo do banco de dados.
 */
export const checarRota = () => {
  return {
    type: ActionTypes.CHECAR_ROTA,
  }
}
