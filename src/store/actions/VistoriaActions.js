export const ActionTypes = {
  SET_QUARTEIRAO_SELECT: "SET_QUARTEIRAO_SELECT",
  SET_IMOVEL_SELECTED: "SET_IMOVEL_SELECTED",
  ADD_RECIPIENTE: "ADD_RECIPIENTE",
  ATUALIZAR_RECIPIENTE: "ATUALIZAR_RECIPIENTE",
  REMOVER_RECIPIENTE: "REMOVER_RECIPIENTE",
  ALTERAR_UPDATEDINDEX: "ALTERAR_UPDATEDINDEX",
  CONSULTAR_VISTORIAS_REQUEST: "CONSULTAR_VISTORIAS_REQUEST",
  CONSULTAR_VISTORIAS_SUCCESS: "CONSULTAR_VISTORIAS_SUCCESS",
  SET_RECIPIENT: "SET_RECIPIENT",
  SET_SEQUENCE_INSPECTION: "SET_SEQUENCE_INSPECTION",
  SET_IMMOBILE: "SET_IMMOBILE"
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

export const addRecipiente = ( recipiente, qtdRepeticao ) => {
  return {
    type: ActionTypes.ADD_RECIPIENTE,
    payload: {
      recipiente,
      qtdRepeticao
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
