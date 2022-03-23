export const ActionTypes = {
  GET_LABORATORIOS_REQUEST  : "GET_LABORATORIOS_REQUEST",
  GET_LABORATORY_REQUEST    : "GET_LABORATORY_REQUEST",
  SET_LABORATORIOS          : "SET_LABORATORIOS",
  SET_LABORATORY            : "SET_LABORATORY",
  CREATE_LABORATORY_REQUEST : "CREATE_LABORATORY_REQUEST",
  CREATE_LABORATORY_SUCCESS : "CREATE_LABORATORY_SUCCESS",
  UPDATE_LABORATORY_REQUEST : "UPDATE_LABORATORY_REQUEST",
  UPDATE_LABORATORY_SUCCESS : "UPDATE_LABORATORY_SUCCESS",
  SET_UPDATED               : "SET_UPDATED"
}

/**
 * Action vinculada a um saga que aguarda a requisição de consultar
 * laboratórios
 *
 * @param {*} supervisor_id
 */
export const getLaboratoriosRequest = municipio_id => {
  return {
    type: ActionTypes.GET_LABORATORIOS_REQUEST,
    payload: {
      municipio_id
    }
  }
}

/**
 * Retorna o laboratório do laboratorista
 * @param {*} userId
 * @returns lab
 */
export const getLaboratoryRequest = () => {
  return{
    type: ActionTypes.GET_LABORATORY_REQUEST,
    payload:{ }
  }
}

/**
 * Recebe um array de laboratórios e salva no reduce nw_laboratorio.laboratorios
 *
 * @param {*} laboratorios
 * @returns
 */
export const setLaboratorios = laboratorios => {
  return {
    type: ActionTypes.SET_LABORATORIOS,
    payload: {
      laboratorios
    }
  }
}

/**
 * Recebe um laboratório e salva no reduce nw_laboratorio.laboratorio
 *
 * @param {*} laboratorio
 * @returns
 */
 export const setLaboratory = laboratorio => {
  return {
    type: ActionTypes.SET_LABORATORY,
    payload: {
      laboratorio
    }
  }
}

/**
 * Solicita ao sagas a inclusão de um novo laboratório
 * @param {Model} laboratorio modelo de dados Laboratório
 * @returns {Object}
 */
export const createLaboratoryRequest = laboratorio =>{
  return {
    type    : ActionTypes.CREATE_LABORATORY_REQUEST,
    payload : {
      laboratorio
    }
  }
}

export const createLaboratory = data =>{
  return{
    type: ActionTypes.CREATE_LABORATORY_SUCCESS,
    payload:{
      data
    }
  }
}

/**
 * Solicita ao sagas a atualização do laboratório
 * @param {Model} laboratorio modelo de dados Laboratorio
 * @returns {Object}
 */
export const updateLaboratoryRequest = laboratorio =>{
  return {
    type:ActionTypes.UPDATE_LABORATORY_REQUEST,
    payload:{
      laboratorio
    }
  }
}

export const updateLaboratory = data =>{
  return{
    type: ActionTypes.UPDATE_LABORATORY_SUCCESS,
    payload: {
      data
    }
  }
}

/**
 * Solicita ao reducer a alteração da vairável updated
 * @param {boolean} data 
 * @returns {Object}
 */
export const setUpdated = data =>{
  return {
    type    : ActionTypes.SET_UPDATED,
    payload : {
      data
    }
  }
}
