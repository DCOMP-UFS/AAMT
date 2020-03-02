export const ActionTypes = {
  GET_ACTIVITIES_OF_CITY_REQUEST: "GET_ACTIVITIES_OF_CITY_REQUEST",
  GET_ACTIVITIES_OF_CITY_SUCCESS: "GET_ACTIVITIES_OF_CITY_SUCCESS",
  GET_ACTIVITIES_BY_CITY_REQUEST: "GET_ACTIVITIES_BY_CITY_REQUEST",
  GET_ACTIVITIES_BY_CITY_SUCCESS: "GET_ACTIVITIES_BY_CITY_SUCCESS",
  CREATE_ACTIVE_REQUEST: "CREATE_ACTIVE_REQUEST",
  CREATE_ACTIVE_SUCCESS: "CREATE_ACTIVE_SUCCESS"
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

