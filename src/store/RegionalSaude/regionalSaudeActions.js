export const ActionTypes = {
  GET_REGIONAL_HEALTH_BY_ID_REQUEST   : "GET_REGIONAL_HEALTH_BY_ID_REQUEST",
  GET_REGIONAL_HEALTH_BY_ID_SUCCESS   : "GET_REGIONAL_HEALTH_BY_ID_SUCCESS",
  GET_REGIONAL_HEALTH_BY_STATE_REQUEST: "GET_REGIONAL_HEALTH_BY_STATE_REQUEST",
  GET_REGIONAL_HEALTH_BY_STATE_SUCCESS: "GET_REGIONAL_HEALTH_BY_STATE_SUCCESS",
  CREATE_REGIONAL_HEALTH_REQUEST      : "CREATE_REGIONAL_HEALTH_REQUEST",
  CREATE_REGIONAL_HEALTH_SUCCESS      : "CREATE_REGIONAL_HEALTH_SUCCESS",
  CREATE_REGIONAL_HEALTH_FAIL         : "CREATE_REGIONAL_HEALTH_FAIL",
  CLEAR_CREATED_REGIONAL_HEALTH       : "CLEAR_CREATED_REGIONAL_HEALTH",
  UPDATE_REGIONAL_HEALTH_REQUEST      : "UPDATE_REGIONAL_HEALTH_REQUEST",
  UPDATE_REGIONAL_HEALTH_SUCCESS      : "UPDATE_REGIONAL_HEALTH_SUCCESS",
  UPDATE_REGIONAL_HEALTH_FAIL         : "UPDATE_REGIONAL_HEALTH_FAIL",
  UPDATE_REGIONAL_HEALTH_RESET        : "UPDATE_REGIONAL_HEALTH_RESET"

}

export const getRegionalHealthByIdRequest = ( id ) => {
  return {
    type: ActionTypes.GET_REGIONAL_HEALTH_BY_ID_REQUEST,
    payload: {
      id
    }
  }
}

export const getRegionalHealthByIdSuccess = ( regional ) => {
  return {
    type: ActionTypes.GET_REGIONAL_HEALTH_BY_ID_SUCCESS,
    payload: {
      regional
    }
  }
}

//Ativo pode receber true,false ou null.
//Caso não seja passado o parametro ativo, ele receberá null por padrão, que
//significa que será buscado as regionais ativas e inativas
export const getRegionalHealthByStateRequest = ( estado_id, ativo = null) => {
  return {
    type: ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_REQUEST,
    payload: {
      estado_id,
      ativo
    }
  }
}

export const getRegionalHealthByStateSuccess = regionaisSaude => {
  return {
    type: ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_SUCCESS,
    payload: {
      regionaisSaude
    }
  }
}

/**
 * 
 * @param {Nome da regional} nome 
 * @param {Endereço da central da regional} endereco 
 * @param {Estado em que a regional fica} estado_id 
 * @returns 
 */
export const createRegionalHealthRequest = (nome, endereco, estado_id) => {
  return {
    type: ActionTypes.CREATE_REGIONAL_HEALTH_REQUEST,
    payload: {
      nome, 
      endereco, 
      estado_id
    }
  }
}

export const createRegionalHealthSuccess = (regional) => {
  return {
    type: ActionTypes.CREATE_REGIONAL_HEALTH_SUCCESS,
    payload: {
      regional
    }
  }
}

export const createRegionalHealthFail = () => {
  return {
    type: ActionTypes.CREATE_REGIONAL_HEALTH_FAIL,
  }
}

export const clearCreatedRegional = () => {
  return {
    type: ActionTypes.CLEAR_CREATED_REGIONAL_HEALTH
  }
}

//Body contem os atributos "nome", "endereco" e "ativo"
export const updateRegionalHealthRequest = ( id, body ) => {
  return {
    type: ActionTypes.UPDATE_REGIONAL_HEALTH_REQUEST,
    payload: {
      id,
      body,
    }
  }
}

export const updateRegionalHealthSuccess =  () => {
  return {
    type: ActionTypes.UPDATE_REGIONAL_HEALTH_SUCCESS,
  }
}

export const updateRegionalHealthFail =  () => {
  return {
    type: ActionTypes.UPDATE_REGIONAL_HEALTH_FAIL,
  }
}

export const updateRegionalHealthReset =  () => {
  return {
    type: ActionTypes.UPDATE_REGIONAL_HEALTH_RESET,
  }
}
