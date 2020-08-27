export const ActionTypes = {
  SALVAR_ROTA: "SALVAR_ROTA",
}

export const saveRoute = rota => {
  return {
    type: ActionTypes.SALVAR_ROTA,
    payload: {
      rota
    }
  }
}
