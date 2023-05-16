import api, { headerAuthorization } from '../../services/api';

/**
 * Consulta a API os quarteirões de um município
 * @param {Object} data 
 * @returns {Promisse}
 */
export const getQuarteiroesPorMunicipioRequest = data => {
  const { municipio_id, ativo } = data;
  const where = ativo === true ? '?ativo=1' : ativo === false ? '?ativo=0' : '';
  return api.get( `/quarteiroes/${ municipio_id }/municipios${ where }`, {
    ...headerAuthorization()
  } );
}

export const getQuarteiroesPorMunicipioSemZonaRequest = data => {
  const { municipio_id } = data;
  return api.get( `/quarteiroes/semZona/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  } );
}

/**
 * Solicita a API add um quarteirão
 * @param {Object} data 
 * @returns {Promisse}
 */
export const addQuarteiraoRequest = data => {
  const { numero, sequencia, localidade_id, zona_id, lados } = data;

  return api.post( `/quarteiroes/`, {
    numero,
    sequencia,
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
    sequencia     : quarteirao.sequencia,
    zona_id       : quarteirao.zona_id, 
    ativo         : quarteirao.ativo ? 1 : 0, 
    quarteirao_id : quarteirao.quarteirao_id, 
    lados         : quarteirao.lados,
    localidade_id : quarteirao.localidade_id
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
  const { excluirLadoId, addImovelLadoId, isUltimoLado } = data;
  const body = {
    addImovelLadoId,
    isUltimoLado
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


export const inserirQuarteiraoEmZona = data => {
  const { id, zona_id } = data;
  return api.put( `/quarteiroes/${ id }/zona/${ zona_id }`, {}, {
    ...headerAuthorization()
  } );
}

export const removerQuarteiraoEmZona = data => {
  const { id } = data;
  return api.put( `/quarteiroes/${ id }/removerDaZona`, {}, {
    ...headerAuthorization()
  } );
}