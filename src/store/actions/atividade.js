export const ActionTypes = {
  TOGGLE_ATIVIDADE_ATIVA: "TOGGLE_ATIVIDADE_ATIVA",
};

export const toggleAtividadeAtiva = (atividadeAtiva) => {
  return {
    type: ActionTypes.TOGGLE_ATIVIDADE_ATIVA,
    payload: {
      atividadeAtiva
    }
  };
};