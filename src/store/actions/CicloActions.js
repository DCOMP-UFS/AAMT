export const ActionTypes = {
  GET_CYCLES_FOR_YEAR_REQUEST: "GET_CYCLES_FOR_YEAR_REQUEST",
  GET_CYCLES_FOR_YEAR_SUCCESS: "GET_CYCLES_FOR_YEAR_SUCCESS",
  GET_CYCLES_REQUEST: "GET_CYCLES_REQUEST",
  GET_CYCLES_SUCCESS: "GET_CYCLES_SUCCESS",
  GET_ALLOWED_CYCLES_REQUEST: "GET_ALLOWED_CYCLES_REQUEST",
  GET_ALLOWED_CYCLES_SUCCESS: "GET_ALLOWED_CYCLES_SUCCESS",
  CREATE_CYCLE_REQUEST: "CREATE_CYCLE_REQUEST",
  CREATE_CYCLE_SUCCESS: "CREATE_CYCLE_REQUEST"
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
