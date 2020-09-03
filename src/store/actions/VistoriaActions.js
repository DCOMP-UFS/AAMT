export const ActionTypes = {
  SET_QUARTEIRAO_SELECT: "SET_QUARTEIRAO_SELECT",
  SET_IMOVEL_SELECTED: "SET_IMOVEL_SELECTED",
  ADD_RECIPIENTE: "ADD_RECIPIENTE",
  REMOVER_RECIPIENTE: "REMOVER_RECIPIENTE",
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
