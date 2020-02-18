export const ActionTypes = {
  CREATE_HOUSE_REQUEST: "CREATE_HOUSE_REQUEST",
  CREATE_HOUSE_SUCCESS: "CREATE_HOUSE_SUCCESS",
  SET_CREATED_TRUE: "SET_CREATED_TRUE",
  CLEAR_CREATE_HOUSE: "CLEAR_CREATE_HOUSE",
  SET_UPDATED_TRUE: "SET_UPDATED_TRUE",
  CLEAR_UPDATE_HOUSE: "CLEAR_UPDATE_HOUSE"
}

export const createHouseRequest = (
  numero,
  sequencia,
  responsavel,
  complemento,
  tipoImovel,
  lado_id
) => {
  return {
    type: ActionTypes.CREATE_HOUSE_REQUEST,
    payload: {
      numero,
      sequencia,
      responsavel,
      complemento,
      tipoImovel,
      lado_id
    }
  }
}

export const createHouse = imovel => {
  return {
    type: ActionTypes.CREATE_HOUSE_REQUEST,
    payload: {
      imovel
    }
  }
}

export const setCreatedTrue = () => {
  return {
    type: ActionTypes.SET_CREATED_TRUE
  }
}

export const clearCreate = () => {
  return {
    type: ActionTypes.CLEAR_CREATE_HOUSE
  }
}

export const setUpdatedTrue = () => {
  return {
    type: ActionTypes.SET_UPDATED_TRUE
  }
}

export const clearUpdate = () => {
  return {
    type: ActionTypes.CLEAR_UPDATE_HOUSE
  }
}



