export const ActionTypes = {
  GET_CYCLE_REQUEST: "GET_CYCLE_REQUEST",
  GET_CYCLE_SUCCESS: "GET_CYCLE_SUCCESS",
  GET_CYCLES_FOR_YEAR_REQUEST: "GET_CYCLES_FOR_YEAR_REQUEST",
  GET_CYCLES_FOR_YEAR_SUCCESS: "GET_CYCLES_FOR_YEAR_SUCCESS",
  GET_CYCLES_REQUEST: "GET_CYCLES_REQUEST",
  GET_CYCLES_SUCCESS: "GET_CYCLES_SUCCESS",
  GET_ALLOWED_CYCLES_REQUEST: "GET_ALLOWED_CYCLES_REQUEST",
  GET_ALLOWED_CYCLES_SUCCESS: "GET_ALLOWED_CYCLES_SUCCESS",
  CREATE_CYCLE_REQUEST: "CREATE_CYCLE_REQUEST",
  CREATE_CYCLE_SUCCESS: "CREATE_CYCLE_REQUEST",
  UPDATE_CYCLE_REQUEST: "UPDATE_CYCLE_REQUEST",
  UPDATE_CYCLE_SUCCESS: "UPDATE_CYCLE_SUCCESS",
  DESTROY_CYCLE_REQUEST: "DESTROY_CYCLE_REQUEST",
  DESTROY_CYCLE_SUCCESS: "DESTROY_CYCLE_SUCCESS",
  SET_INDEX_ARRAY: "SET_INDEX_ARRAY",
  CHANGE_FL_ADD_ACTIVE: "CHANGE_FL_ADD_ACTIVE",
  CHANGE_FL_UPDATE: "CHANGE_FL_UPDATE",
  CHANGE_FL_DESTROYED: "CHANGE_FL_DESTROYED"
}

export const getCycleRequest = id => {
  return {
    type: ActionTypes.GET_CYCLE_REQUEST,
    payload: {
      id
    }
  }
}

export const getCycle = ciclo => {
  return {
    type: ActionTypes.GET_CYCLE_SUCCESS,
    payload: {
      ciclo
    }
  }
}

export const getCyclesForYearRequest = (regionalSaude_id, ano) => {
  return {
    type: ActionTypes.GET_CYCLES_FOR_YEAR_REQUEST,
    payload: {
      regionalSaude_id,
      ano
    }
  }
}

export const getCyclesForYear = ciclos => {
  return {
    type: ActionTypes.GET_CYCLES_FOR_YEAR_SUCCESS,
    payload: {
      ciclos
    }
  }
}

export const getCyclesRequest = regionalSaude_id => {
  return {
    type: ActionTypes.GET_CYCLES_REQUEST,
    payload: {
      regionalSaude_id
    }
  }
}

export const getCycles = ciclos => {
  return {
    type: ActionTypes.GET_CYCLES_SUCCESS,
    payload: {
      ciclos
    }
  }
}

export const getAllowedCyclesRequest = regionalSaude_id => {
  return {
    type: ActionTypes.GET_ALLOWED_CYCLES_REQUEST,
    payload: {
      regionalSaude_id
    }
  }
}

export const getAllowedCycles = ciclos => {
  return {
    type: ActionTypes.GET_ALLOWED_CYCLES_SUCCESS,
    payload: {
      ciclos
    }
  }
}

export const createCycleRequest = (
  ano,
  sequencia,
  dataInicio,
  dataFim,
  regionalSaude_id,
  atividades
) => {
  return {
    type: ActionTypes.CREATE_CYCLE_REQUEST,
    payload: {
      ano,
      sequencia,
      dataInicio,
      dataFim,
      regionalSaude_id,
      atividades
    }
  }
}

export const updateCycleRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_CYCLE_REQUEST,
    payload: {
      id,
      body
    }
  }
}

export const updateCycle = ciclo => {
  return {
    type: ActionTypes.UPDATE_CYCLE_SUCCESS,
    payload: {
      ciclo
    }
  }
}

export const destroyCycleRequest = id => {
  return {
    type: ActionTypes.DESTROY_CYCLE_REQUEST,
    payload: {
      id
    }
  }
}

export const destroyCycle = id => {
  return {
    type: ActionTypes.DESTROY_CYCLE_SUCCESS,
    payload: {
      id
    }
  }
}

export const setIndexArray = index => {
  return {
    type: ActionTypes.SET_INDEX_ARRAY,
    payload: {
      index
    }
  }
}

export const changeFlAddActive = flag => {
  return {
    type: ActionTypes.CHANGE_FL_ADD_ACTIVE,
    payload: {
      flag
    }
  }
}

export const changeFlUpdate = flag => {
  return {
    type: ActionTypes.CHANGE_FL_UPDATE,
    payload: {
      flag
    }
  }
}

export const changeFlDestroyed = flag => {
  return {
    type: ActionTypes.CHANGE_FL_DESTROYED,
    payload: {
      flag
    }
  }
}
