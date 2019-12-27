export const ActionTypes = {
  SET_VISTORIA_IMOVEL: "SET_VISTORIA_IMOVEL",
  SET_IMOVEL_SELECT: "SET_IMOVEL_SELECT",
  HANDLE_QUARTEIRAO: "HANDLE_QUARTEIRAO",
  ADD_IMOVEL_QUARTEIRAO: "ADD_IMOVEL_QUARTEIRAO",
}

export const setVistoriaImovel = ( index, imovel ) => {
  return {
    type: ActionTypes.SET_VISTORIA_IMOVEL,
    payload: {
      index,
      imovel,
    }
  }
}

export const setImovelSelect = ( imovel ) => {
  return {
    type: ActionTypes.SET_IMOVEL_SELECT,
    payload: {
      imovel,
    }
  }
}

export const handleQuarteirao = ( idQuarteirao, indexQuarteirao ) => {
  return {
    type: ActionTypes.HANDLE_QUARTEIRAO,
    payload: {
      idQuarteirao,
      indexQuarteirao,
    }
  }
}

export const addImovelQuarteirao = ( indexQuarteirao, imovel ) => {
  return {
    type: ActionTypes.ADD_IMOVEL_QUARTEIRAO,
    payload: {
      indexQuarteirao,
      imovel,
    }
  }
}
