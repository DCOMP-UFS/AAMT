export const ActionTypes = {
  GET_ACTIVITIES_OF_CITY_REQUEST: "GET_ACTIVITIES_OF_CITY_REQUEST",
  GET_ACTIVITIES_OF_CITY_SUCCESS: "GET_ACTIVITIES_OF_CITY_SUCCESS",
  GET_ACTIVITIE_BY_ID_REQUEST: "GET_ACTIVITIE_BY_ID_REQUEST",
  GET_ACTIVITIE_BY_ID_SUCCESS: "GET_ACTIVITIE_BY_ID_SUCCESS",
  GET_ACTIVITIES_BY_CITY_REQUEST: "GET_ACTIVITIES_BY_CITY_REQUEST",
  GET_ACTIVITIES_BY_CITY_SUCCESS: "GET_ACTIVITIES_BY_CITY_SUCCESS",
  GET_LOCATIONS_REQUEST: "GET_LOCATIONS_REQUEST",
  GET_LOCATIONS_SUCCESS: "GET_LOCATIONS_SUCCESS",
  CREATE_ACTIVE_REQUEST: "CREATE_ACTIVE_REQUEST",
  CREATE_ACTIVE_SUCCESS: "CREATE_ACTIVE_SUCCESS",
  ADD_ESTRATO: "ADD_ESTRATO",
  ADD_EQUIPE: "ADD_EQUIPE",
  REMOVE_ESTRATO: "REMOVE_ESTRATO",
  REMOVE_EQUIPE: "REMOVE_EQUIPE",
  PLAN_ACTIVITY_REQUEST: "PLAN_ACTIVITY_REQUEST"
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
