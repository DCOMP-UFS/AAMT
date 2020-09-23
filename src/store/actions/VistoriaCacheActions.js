export const ActionTypes = {
  ADD_VISTORIA: "ADD_VISTORIA",
  RESET_HANDLE_SAVE: "RESET_HANDLE_SAVE",
  ROTA_NAO_INICIADA: "ROTA_NAO_INICIADA",
  RESETAR_SHOWNOTSTARTED: "RESETAR_SHOWNOTSTARTED"
}

export const resetShowNotStarted = () => {
  return {
    type: ActionTypes.RESETAR_SHOWNOTSTARTED
  }
}

export const routeNotStarted = () => {
  return {
    type: ActionTypes.ROTA_NAO_INICIADA
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
