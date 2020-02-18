export const ActionTypes = {
  GET_STREET_BY_LOCALITY_REQUEST: "GET_STREET_BY_LOCALITY_REQUEST",
  GET_STREET_BY_LOCALITY_SUCCESS: "GET_STREET_BY_LOCALITY_SUCCESS",
  CREATE_STREET_REQUEST: "CREATE_STREET_REQUEST",
  CREATE_STREET_SUCCESS: "CREATE_STREET_SUCCESS",
  CHANGE_STREET_SELECT: "CHANGE_STREET_SELECT",
  UPDATE_STREET_REQUEST: "UPDATE_STREET_REQUEST",
  UPDATE_STREET_SUCCESS: "UPDATE_STREET_SUCCESS",
  DELETE_STREET_REQUEST: "DELETE_STREET_REQUEST",
  DELETE_STREET_SUCCESS: "DELETE_STREET_SUCCESS"
}

export const getStreetByLocalityRequest = localidade_id => {
  return {
    type: ActionTypes.GET_STREET_BY_LOCALITY_REQUEST,
    payload: {
      localidade_id
    }
  }
}

export const getStreetByLocality = ruas => {
  return {
    type: ActionTypes.GET_STREET_BY_LOCALITY_SUCCESS,
    payload: {
      ruas
    }
  }
}

export const createStreetRequest = ( nome, cep, localidade_id ) => {
  return {
    type: ActionTypes.CREATE_STREET_REQUEST,
    payload: {
      nome,
      cep,
      localidade_id
    }
  }
}

export const updateStreetRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_STREET_REQUEST,
    payload: {
      id,
      body
    }
  }
}

export const deleteStreetRequest = ( id, index ) => {
  return {
    type: ActionTypes.DELETE_STREET_REQUEST,
    payload: {
      id,
      index
    }
  }
}

export const deleteStreet = ( index ) => {
  return {
    type: ActionTypes.DELETE_STREET_SUCCESS,
    payload: {
      index
    }
  }
}

export const updateStreet = rua => {
  return {
    type: ActionTypes.UPDATE_STREET_SUCCESS,
    payload: {
      rua
    }
  }
}

export const createStreet = rua => {
  return {
    type: ActionTypes.CREATE_STREET_SUCCESS,
    payload: {
      rua
    }
  }
}

export const changeStreetSelect = index => {
  return {
    type: ActionTypes.CHANGE_STREET_SELECT,
    payload: {
      index
    }
  }
}
