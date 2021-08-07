export const ActionTypes = {
  SET_APELIDO_EQUIPE_REQUEST: "SET_APELIDO_EQUIPE_REQUEST",
  GET_MEMBROS_REQUEST: "GET_MEMBROS_REQUEST",
  SET_MEMBROS: "SET_MEMBROS"
}

/**
 * Altera o apelido de uma equipe
 * 
 * @param {integer} equipe_id 
 * @param {string} apelido 
 * @returns 
 */
export const setApelidoEquipeRequest = ( equipe_id, apelido ) => {
  return {
    type: ActionTypes.SET_APELIDO_EQUIPE_REQUEST,
    payload: {
      equipe_id,
      apelido
    }
  }
}

/**
 * Consulta os membros de uma equipe
 * 
 * @param {integer} equipe_id 
 * @returns void
 */
export const getMembrosRequest = equipe_id => {
  return {
    type: ActionTypes.GET_MEMBROS_REQUEST,
    payload: {
      equipe_id
    }
  }
}

/**
 * Altera a variável membros no reduce de nw_equipe
 * 
 * @param {array} membros 
 * @returns 
 */
export const setMembros = membros => {
  return {
    type: ActionTypes.SET_MEMBROS,
    payload: {
      membros
    }
  }
}