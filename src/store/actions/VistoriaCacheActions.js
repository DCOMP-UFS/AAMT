export const ActionTypes = {
  SALVAR_ROTA: "SALVAR_ROTA",
  ADD_VISTORIA: "ADD_VISTORIA",
  RESET_HANDLE_SAVE: "RESET_HANDLE_SAVE"
}

export const saveRoute = rota => {
  return {
    type: ActionTypes.SALVAR_ROTA,
    payload: {
      rota
    }
  }
}

export const addVistoria = vistoria => {
  return {
    type: ActionTypes.ADD_VISTORIA,
    payload: {
      vistoria
    }
  }
}

export const resetHandleSave = () => {
  return {
    type: ActionTypes.RESET_HANDLE_SAVE
  }
}
