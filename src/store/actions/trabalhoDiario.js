export const ActionTypes = {
  ADD_TRABALHO_DIARIO: "ADD_TRABALHO_DIARIO",
  GET_TRABALHO_DIARIO: "GET_TRABALHO_DIARIO",
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
