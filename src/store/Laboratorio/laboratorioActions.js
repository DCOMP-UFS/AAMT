export const ActionTypes = {
  GET_LABORATORIOS_REQUEST: "GET_LABORATORIOS_REQUEST",
  SET_LABORATORIOS: "SET_LABORATORIOS",
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
