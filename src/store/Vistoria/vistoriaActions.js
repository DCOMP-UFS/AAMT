export const ActionTypes = {
  SET_IMOVEL: "SET_IMOVEL"
}

export const setImovel = imovel => {
  return {
    type: ActionTypes.SET_IMOVEL,
    payload: {
      imovel
    }
  }
}