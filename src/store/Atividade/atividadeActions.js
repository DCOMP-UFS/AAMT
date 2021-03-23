export const ActionTypes = {
  GET_RESPONSABILITY_ACTIVITIES_REQUEST: "GET_RESPONSABILITY_ACTIVITIES_REQUEST",
  SET_ATIVIDADES: "SET_ATIVIDADES",
  SET_EQUIPES: "SET_EQUIPES",
  SET_INDEX: "SET_INDEX",
  SET_INDEX_EQUIPE: "SET_INDEX_EQUIPE",
  SET_INDEX_MEMBRO: "SET_INDEX_MEMBRO",
  TOGGLE_LADO: "TOGGLE_LADO",
  LIMPAR_EQUIPE: "LIMPAR_EQUIPE",
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

export const limparEquipe = indexEquipe => {
  return {
    type: ActionTypes.LIMPAR_EQUIPE,
    payload: {
      indexEquipe
    }
  }
}
