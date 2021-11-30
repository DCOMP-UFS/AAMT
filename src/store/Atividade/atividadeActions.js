export const ActionTypes = {
  GET_RESPONSABILITY_ACTIVITIES_REQUEST : "GET_RESPONSABILITY_ACTIVITIES_REQUEST",
  SET_ATIVIDADES                        : "SET_ATIVIDADES",
  SET_EQUIPES                           : "SET_EQUIPES",
  SET_INDEX                             : "SET_INDEX",
  SET_INDEX_EQUIPE                      : "SET_INDEX_EQUIPE",
  SET_INDEX_MEMBRO                      : "SET_INDEX_MEMBRO",
  TOGGLE_LADO                           : "TOGGLE_LADO",
  GET_ROTA_EQUIPE_REQUEST               : "GET_ROTA_EQUIPE_REQUEST",
  SET_ROTA_EQUIPE                       : "SET_ROTA_EQUIPE",
  SET_FL_LOADING                        : "SET_FL_LOADING",
  CHECAR_ROTA                           : "CHECAR_ROTA",
  GET_ACTIVITIES_OF_CITY_REQUEST        : "GET_ACTIVITIES_OF_CITY_REQUEST",
  GET_ACTIVITIES_OF_CITY_SUCCESS        : "GET_ACTIVITIES_OF_CITY_SUCCESS",
  GET_ACTIVITIE_BY_ID_REQUEST           : "GET_ACTIVITIE_BY_ID_REQUEST",
  GET_ACTIVITIE_BY_ID_SUCCESS           : "GET_ACTIVITIE_BY_ID_SUCCESS",
  GET_ACTIVITIES_BY_CITY_REQUEST        : "GET_ACTIVITIES_BY_CITY_REQUEST",
  GET_ACTIVITIES_BY_CITY_SUCCESS        : "GET_ACTIVITIES_BY_CITY_SUCCESS",
  GET_LOCATIONS_REQUEST                 : "GET_LOCATIONS_REQUEST",
  GET_LOCATIONS_SUCCESS                 : "GET_LOCATIONS_SUCCESS",
  CREATE_ACTIVE_REQUEST                 : "CREATE_ACTIVE_REQUEST",
  CREATE_ACTIVE_SUCCESS                 : "CREATE_ACTIVE_SUCCESS",
  ADD_ESTRATO                           : "ADD_ESTRATO",
  ADD_EQUIPE                            : "ADD_EQUIPE",
  REMOVE_ESTRATO                        : "REMOVE_ESTRATO",
  REMOVE_EQUIPE                         : "REMOVE_EQUIPE",
  PLAN_ACTIVITY_REQUEST                 : "PLAN_ACTIVITY_REQUEST"
}

/**
 * Solicita ao sagas a lista de atividades da responsabilidade do usuário
 * @param {Integer} usuario_id 
 * @param {Integer} ciclo_id 
 * @returns 
 */
export const getResponsabilityActivitiesRequest = ( usuario_id, ciclo_id ) => {
  return {
    type: ActionTypes.GET_RESPONSABILITY_ACTIVITIES_REQUEST,
    payload: {
      usuario_id,
      ciclo_id
    }
  }
}

/**
 * Solicita ao reduce que set as atividades
 * @param {array} activities 
 * @returns 
 */
export const setActivities = activities => {
  return {
    type: ActionTypes.SET_ATIVIDADES,
    payload: {
      activities
    }
  }
}

/**
 * Solicita ao reduce que set as equipes
 * @param {array} equipes 
 * @returns 
 */
export const setEquipes = equipes => {
  return {
    type: ActionTypes.SET_EQUIPES,
    payload: {
      equipes
    }
  }
}

/**
 * Solicita ao reduce que set a variável indexAtividade
 * @param {Integer} index 
 * @returns 
 */
export const setIndexAtividade = index => {
  return {
    type: ActionTypes.SET_INDEX,
    payload: {
      index
    }
  }
}

/**
 * Solicita ao reduce que set a variável indexEquipe
 * @param {Integer} index 
 * @returns 
 */
export const setIndexEquipe = index => {
  return {
    type: ActionTypes.SET_INDEX_EQUIPE,
    payload: {
      index
    }
  }
}

/**
 * Solicita ao reduce que set a variável indexMembro
 * @param {Integer} index 
 * @returns 
 */
export const setIndexMembro = index => {
  return {
    type: ActionTypes.SET_INDEX_MEMBRO,
    payload: {
      index
    }
  }
}

/**
 * Solicita ao reduce que set as variáveis indexQuarteirao e indexLado
 * de acordo com a alternancia do usuário
 * @param {Integer} indexQuarteirao 
 * @param {Integer} indexLado 
 * @returns 
 */
export const toggleLado = ( indexQuarteirao, indexLado ) => {
  return {
    type: ActionTypes.TOGGLE_LADO,
    payload: {
      indexQuarteirao,
      indexLado
    }
  }
}

/**
 * Solicita os quarteirões de uma determinada equipe_id
 * @param {Integer} equipe_id 
 * @returns 
 */
export const getRotaEquipeRequest = equipe_id => {
  return {
    type: ActionTypes.GET_ROTA_EQUIPE_REQUEST,
    payload: {
      equipe_id
    }
  }
}

/**
 * Após requisitar os quarteirões da equipe solicita ao reduce que set
 * os quarteirões na variável quarteiroes
 * @param {array} quarteiroes 
 * @returns 
 */
export const setRotaEquipe = quarteiroes => {
  return {
    type: ActionTypes.SET_ROTA_EQUIPE,
    payload: {
      quarteiroes
    }
  }
}

/**
 * Solicita ao reduce que set o valor da variável fl_loading
 * @param {Boolean} fl_loading 
 * @returns 
 */
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

export const getActivitiesOfCityRequest = regionalSaude_id => {
  return {
    type: ActionTypes.GET_ACTIVITIES_OF_CITY_REQUEST,
    payload: {
      regionalSaude_id
    }
  }
}

export const getActivitiesOfCity = atividades => {
  return {
    type: ActionTypes.GET_ACTIVITIES_OF_CITY_SUCCESS,
    payload: {
      atividades
    }
  }
}

export const getActivitieByIdRequest = id => {
  return {
    type: ActionTypes.GET_ACTIVITIE_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getActivitieById = atividade => {
  return {
    type: ActionTypes.GET_ACTIVITIE_BY_ID_SUCCESS,
    payload: {
      atividade
    }
  }
}

export const getActivitiesByCityRequest = (ciclo_id, municipio_id) => {
  return {
    type: ActionTypes.GET_ACTIVITIES_BY_CITY_REQUEST,
    payload: {
      ciclo_id,
      municipio_id
    }
  }
}

export const getActivitiesByCity = atividades => {
  return {
    type: ActionTypes.GET_ACTIVITIES_BY_CITY_SUCCESS,
    payload: {
      atividades
    }
  }
}

export const getLocationsRequest = (abrangencia, municipio_id) => {
  return {
    type: ActionTypes.GET_LOCATIONS_REQUEST,
    payload: {
      municipio_id,
      abrangencia
    }
  }
}

export const getLocations = locais => {
  return {
    type: ActionTypes.GET_LOCATIONS_SUCCESS,
    payload: {
      locais
    }
  }
}

export const createActiveRequest = (
  objetivoAtividade,
  flTodosImoveis,
  responsabilidade,
  ciclo_id,
  municipio_id,
  metodologia_id,
  objetivo_id,
  abrangencia
) => {
  return {
    type: ActionTypes.CREATE_ACTIVE_REQUEST,
    payload: {
      objetivoAtividade,
      flTodosImoveis,
      responsabilidade,
      ciclo_id,
      municipio_id,
      metodologia_id,
      objetivo_id,
      abrangencia
    }
  }
}

export const createActive = atividade => {
  return {
    type: ActionTypes.CREATE_ACTIVE_SUCCESS,
    payload: {
      atividade
    }
  }
}

export const addEstrato = ( locais, locaisSelecionados ) => {
  return {
    type: ActionTypes.ADD_ESTRATO,
    payload: {
      locais,
      locaisSelecionados
    }
  }
}

export const addEquipe = ( membros, supervisor, locais ) => {
  return {
    type: ActionTypes.ADD_EQUIPE,
    payload: {
      membros,
      supervisor,
      locais
    }
  }
}

export const removeEstrato = index => {
  return {
    type: ActionTypes.REMOVE_ESTRATO,
    payload: {
      index
    }
  }
}

export const removeEquipe = index => {
  return {
    type: ActionTypes.REMOVE_EQUIPE,
    payload: {
      index
    }
  }
}

export const planActivityRequest = (id, estratos, equipes, abrangencia_id) => {
  return {
    type: ActionTypes.PLAN_ACTIVITY_REQUEST,
    payload: {
      id,
      estratos,
      equipes,
      abrangencia_id
    }
  }
}