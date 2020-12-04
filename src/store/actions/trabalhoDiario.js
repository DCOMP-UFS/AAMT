export const ActionTypes = {
  ADD_TRABALHO_DIARIO: "ADD_TRABALHO_DIARIO",
  GET_TRABALHO_DIARIO: "GET_TRABALHO_DIARIO",
  GET_BY_USER_REQUEST: "GET_BY_USER_REQUEST",
  GET_BY_USER: "GET_BY_USER"
};

export const addTrabalhoDiario = ( trabalhoDiario ) => {
  return {
    type: ActionTypes.ADD_TRABALHO_DIARIO,
    payload: {
      trabalhoDiario
    }
  };
}

export const getTrabalhoDiario = () => {
  return {
    type: ActionTypes.GET_TRABALHO_DIARIO
  };
}

export const getByUserRequest = user_id => {
  return {
    type: ActionTypes.GET_BY_USER_REQUEST,
    payload: {
      user_id
    }
  }
}

export const getByUser = dailyJobs => {
  return {
    type: ActionTypes.GET_BY_USER,
    payload: {
      dailyJobs
    }
  }
}
