import api, { headerAuthorization } from '../../services/api';

/**
 * Consulta a API os quarteirões de um município
 * @param {Object} data 
 * @returns {Promisse}
 */
export const getQuarteiroesPorMunicipioRequest = data => {
  const { municipio_id } = data;
  return api.get( `/quarteiroes/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  } );
}

/**
 * Solicita a API add um quarteirão
 * @param {Object} data 
 * @returns {Promisse}
 */
export const addQuarteiraoRequest = data => {
  const { numero, localidade_id, zona_id, lados } = data;

  return api.post( `/quarteiroes/`, {
    numero,
    localidade_id,
    zona_id,
    lados
  },
  {
    ...headerAuthorization()
  } );
}

export const getLadosQuarteiraoRequest = data => {
  const { quarteirao_id } = data;
  return api.get(`/quarteiroes/lados/${ quarteirao_id }`, {
    ...headerAuthorization()
  });
}

/**
 * Editar quarteirão request
 * @param {Object} data 
 * @returns {Promise} response
 */
export const setQuarteiraoRequest = data => {
  const { quarteirao }  = data;
  const body            = { 
    numero        : quarteirao.numero, 
    zona_id       : quarteirao.zona_id, 
    ativo         : quarteirao.ativo ? 1 : 0, 
    quarteirao_id : quarteirao.quarteirao_id, 
    lados         : quarteirao.lados
  };

  return api.put(`/quarteiroes/${ quarteirao.id }`, body, {
    ...headerAuthorization()
  });
}

/**
 * Excluir lado do quarteirão request
 * @param {Object} data 
 * @returns {Promise} response
 */
export const excluirLadoRequest = data => {
  const { excluirLadoId, addImovelLadoId } = data;
  const body = {
    addImovelLadoId
  };

  return api.post( `/quarteiroes/excluirLado/${ excluirLadoId }`, body, {
    ...headerAuthorization()
  } );
}

/**
 * Consultar quarteirão por ID request
 * @param {Object} data 
 * @returns {Promise} response
 */
export const getQuarteiraoPorIdRequest = data => {
  const { id } = data;
  return api.get(`/quarteiroes/${ id }`, {
    ...headerAuthorization()
  });
}