export const ActionTypes = {
  ADD_VISTORIA: "ADD_VISTORIA",
  RESET_HANDLE_SAVE: "RESET_HANDLE_SAVE",
  ROTA_NAO_INICIADA: "ROTA_NAO_INICIADA",
  RESETAR_SHOWNOTSTARTED: "RESETAR_SHOWNOTSTARTED",
  LIMPAR_VISTORIAS: "LIMPAR_VISTORIAS",
  DELETAR_VISTORIA: "DELETAR_VISTORIA",
  UPDATE_INSPECTION: "UPDATE_INSPECTION",
  SET_VISTORIA_INDEX_EDIT: "SET_VISTORIA_INDEX_EDIT"
}

export const clearInspection = (trabalhoDiario_id) => {
  return {
    type: ActionTypes.LIMPAR_VISTORIAS,
    payload: {
      trabalhoDiario_id
    }
  }
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

export const updateInspection = ( class_inspection, int_indexInspection ) => {
  return {
    type: ActionTypes.UPDATE_INSPECTION,
    payload: {
      class_inspection,
      int_indexInspection
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

export const deletarVistoria = (rowSelected,trabalhoDiario_id) => {
  return {
    type: ActionTypes.DELETAR_VISTORIA,
    payload: {
      rowSelected,
      trabalhoDiario_id
    }
  }
}

export const setVistoriaIndexEdit = vistoriaIndexEdit => {
  return {
    type: ActionTypes.SET_VISTORIA_INDEX_EDIT,
    payload: {
      vistoriaIndexEdit
    }
  }
}
