export const ActionTypes = {
  VISTORIA_SET_IMOVEL: "VISTORIA_SET_IMOVEL",
  HANDLE_QUARTEIRAO: "HANDLE_QUARTEIRAO",
};

export const setVistoriaImovel = ( index, imovel ) => {
  return {
    type: ActionTypes.VISTORIA_SET_IMOVEL,
    payload: {
      index,
      imovel,
    }
  };
}

export const handleQuarteirao = ( idQuarteirao, indexQuarteirao ) => {
  return {
    type: ActionTypes.HANDLE_QUARTEIRAO,
    payload: {
      idQuarteirao,
      indexQuarteirao,
    }
  };
}
