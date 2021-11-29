import * as AppConfigActions from '../actions/appConfig';

export const ActionTypes = {
  GET_LABORATORIOS_REQUEST: "GET_LABORATORIOS_REQUEST",
  SET_LABORATORIOS: "SET_LABORATORIOS",
  CREATE_LABORATORY_REQUEST: "CREATE_LABORATORY_REQUEST",
  CREATE_LABORATORY_SUCCESS: "CREATE_LABORATORY_SUCCESS",
  UPDATE_LABORATORY_REQUEST: "UPDATE_LABORATORY_REQUEST",
  UPDATE_LABORATORY_SUCCESS: "UPDATE_LABORATORY_SUCCESS"
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

export const createLaboratoryRequest = (cnpj, nome, endereco, tipo, municipio) =>{
  return{
    type: ActionTypes.CREATE_LABORATORY_REQUEST,
    payload:{
      cnpj,
      nome,
      endereco,
      tipo,
      municipio
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

export const updateLaboratoryRequest = (cnpj_id, cnpj, nome, endereco, tipo, created_at, municipio) =>{
  return {
    type:ActionTypes.UPDATE_LABORATORY_REQUEST,
    payload:{
      cnpj_id,
      cnpj,
      nome,
      endereco,
      tipo,
      created_at,
      municipio
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
