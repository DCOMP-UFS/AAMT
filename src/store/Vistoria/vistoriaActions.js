export const ActionTypes = {
  SET_IMOVEL: "SET_IMOVEL",
  SET_QUARTEIRAO_SELECT: "SET_QUARTEIRAO_SELECT",
  SET_IMOVEL_SELECTED: "SET_IMOVEL_SELECTED",
  ADD_RECIPIENTE: "ADD_RECIPIENTE",
  ATUALIZAR_RECIPIENTE: "ATUALIZAR_RECIPIENTE",
  REMOVER_RECIPIENTE: "REMOVER_RECIPIENTE",
  DUPLICAR_RECIPIENTE: "DUPLICAR_RECIPIENTE",
  ALTERAR_UPDATEDINDEX: "ALTERAR_UPDATEDINDEX",
  ALTERAR_DUPLICATORINDEX: "ALTERAR_DUPLICATORINDEX",
  CONSULTAR_VISTORIAS_REQUEST: "CONSULTAR_VISTORIAS_REQUEST",
  CONSULTAR_VISTORIAS_SUCCESS: "CONSULTAR_VISTORIAS_SUCCESS",
  SET_RECIPIENT: "SET_RECIPIENT",
  SET_SEQUENCE_INSPECTION: "SET_SEQUENCE_INSPECTION",
  SET_IMMOBILE: "SET_IMMOBILE",
  GET_INSPECTS_BY_DAILY_WORK_REQUEST: "GET_INSPECTS_BY_DAILY_WORK_REQUEST",
  GET_NEW_INSPECT_STATUS_REQUEST: "GET_NEW_INSPECT_STATUS_REQUEST",
  GET_NEW_INSPECT_STATUS_SUCCESS: "GET_NEW_INSPECT_STATUS_SUCCESS",
  GET_NEW_INSPECT_STATUS_FAIL: "GET_NEW_INSPECT_STATUS_FAIL",
  NEW_INSPECT_STATUS_RESET: "NEW_INSPECT_STATUS_RESET",
  LIMPAR_STATUS_NOVA_VISTORIA: "LIMPAR_STATUS_NOVA_VISTORIA"
}

export const setImovel = imovel => {
  return {
    type    : ActionTypes.SET_IMOVEL,
    payload : {
      imovel
    }
  }
}

export const setImmobile = class_immobile => {
  return {
    type: ActionTypes.SET_IMMOBILE,
    payload: {
      class_immobile
    }
  }
}

export const setSequenceInspection = int_sequence => {
  return {
    type: ActionTypes.SET_SEQUENCE_INSPECTION,
    payload: {
      int_sequence
    }
  }
}

export const setRecipient = array_recipient => {
  return {
    type: ActionTypes.SET_RECIPIENT,
    payload: {
      array_recipient
    }
  }
}

export const changeUpdatedIndex = index => {
  return {
    type: ActionTypes.ALTERAR_UPDATEDINDEX,
    payload: {
      index
    }
  }
}

export const changeDuplicatorIndex = index => {
  return {
    type: ActionTypes.ALTERAR_DUPLICATORINDEX,
    payload: {
      index
    }
  }
}

export const setQuarteiraoSelect = option => {
  return {
    type: ActionTypes.SET_QUARTEIRAO_SELECT,
    payload: {
      option
    }
  }
}

export const setImovelSelected = imovel => {
  return {
    type: ActionTypes.SET_IMOVEL_SELECTED,
    payload: {
      imovel
    }
  }
}

export const atualizarRecipiente = ( index, recipiente ) => {
  return {
    type: ActionTypes.ATUALIZAR_RECIPIENTE,
    payload: {
      index,
      recipiente
    }
  }
}

export const addRecipiente = recipiente => {
  return {
    type: ActionTypes.ADD_RECIPIENTE,
    payload: {
      recipiente
    }
  }
}

export const removerRecipiente = index => {
  return {
    type: ActionTypes.REMOVER_RECIPIENTE,
    payload: {
      index
    }
  }
}

export const duplicateRecipient = ( index, numberCopies ) => {
  return {
    type: ActionTypes.DUPLICAR_RECIPIENTE,
    payload: {
      index,
      numberCopies
    }
  }
}

export const getInspectsRequest = usuario_id => {
  return {
    type: ActionTypes.CONSULTAR_VISTORIAS_REQUEST,
    payload: {
      usuario_id
    }
  }
}

export const getInspects = vistorias => {
  return {
    type: ActionTypes.CONSULTAR_VISTORIAS_SUCCESS,
    payload: {
      vistorias
    }
  }
}

export const getInspectsByDailyWorkRequest = trabalho_diario_id => {
  return {
    type: ActionTypes.GET_INSPECTS_BY_DAILY_WORK_REQUEST,
    payload: {
      trabalho_diario_id
    }
  }
}

export const getInspectsByDailyWork = vistorias => {
  return {
    type: ActionTypes.CONSULTAR_VISTORIAS_SUCCESS,
    payload: {
      vistorias
    }
  }
}

export const getNewInspectStatusRequest = (trabalho_diario_id, imovel_id) => {
  return {
    type: ActionTypes.GET_NEW_INSPECT_STATUS_REQUEST,
    payload: {
      trabalho_diario_id,
      imovel_id
    }
  }
}

export const getNewInspectStatusSuccess = (statusNovaVistoria) => {
  return {
    type: ActionTypes.GET_NEW_INSPECT_STATUS_SUCCESS,
    payload: {
      statusNovaVistoria
    }
  }
}

export const getNewInspectStatusFail = () => {
  return {
    type: ActionTypes.GET_NEW_INSPECT_STATUS_FAIL,
  }
}

export const newInspectStatusReset = () => {
  return {
    type: ActionTypes.NEW_INSPECT_STATUS_RESET,
  }
}

export const limparStatusNovaVistoria = () => {
  return {
    type: ActionTypes.LIMPAR_STATUS_NOVA_VISTORIA
  }
}
