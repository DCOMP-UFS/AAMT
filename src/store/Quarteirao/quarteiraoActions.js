export const ActionTypes = {
  GET_QUARTEIROES_MUNICIPIO_REQUEST           : "GET_QUARTEIROES_MUNICIPIO_REQUEST",
  GET_QUARTEIROES_LOCALIDADE_REQUEST          : "GET_QUARTEIROES_LOCALIDADE_REQUEST",
  GET_QUARTEIROES_MUNICIPIO_SEM_ZONA_REQUEST  : "GET_QUARTEIROES_MUNICIPIO_SEM_ZONA_REQUEST",
  SET_QUARTEIROES                             : "SET_QUARTEIROES",
  GET_LADOS_QUARTEIRAO                        : "GET_LADOS_QUARTEIRAO",
  SET_LADOS                                   : "SET_LADOS",
  SET_IMOVEL_EDITAR                           : "SET_IMOVEL_EDITAR",
  EDITAR_QUARTEIRAO_REQUEST                   : "EDITAR_QUARTEIRAO_REQUEST",
  SET_UPDATED                                 : "SET_UPDATED",
  SET_CREATED                                 : "SET_CREATED",
  EXCLUIR_LADO_REDUCE                         : "EXCLUIR_LADO_REDUCE",
  EXCLUIR_LADO_REQUEST                        : "EXCLUIR_LADO_REQUEST",
  GET_QUARTEIRAO_POR_ID                       : "GET_QUARTEIRAO_POR_ID",
  SET_QUARTEIRAO                              : "SET_QUARTEIRAO",
  EXCLUIR_IMOVEL_REQUEST                      : "EXCLUIR_IMOVEL_REQUEST",
  EXCLUIR_IMOVEL_REDUCE                       : "EXCLUIR_IMOVEL_REDUCE",
  GET_QUARTEIROES_POR_MUNICIPIO_REQUEST       : "GET_QUARTEIROES_POR_MUNICIPIO_REQUEST",
  ADD_QUARTEIRAO_REQUEST                      : "ADD_QUARTEIRAO_REQUEST",
  ADD_QUARTEIRAO_SUCCESS                      : "ADD_QUARTEIRAO_SUCCESS",
  INSERIR_QUARTEIRAO_ZONA_REQUEST             : "INSERIR_QUARTEIRAO_ZONA_REQUEST",
  INSERIR_QUARTEIRAO_ZONA_SUCCESS             : "INSERIR_QUARTEIRAO_ZONA_SUCCESS",
  INSERIR_QUARTEIRAO_ZONA_FAIL                : "INSERIR_QUARTEIRAO_ZONA_FAIL",
  INSERIR_QUARTEIRAO_ZONA_RESET               : "INSERIR_QUARTEIRAO_ZONA_RESET",
  REMOVER_QUARTEIRAO_ZONA_REQUEST             : "REMOVER_QUARTEIRAO_ZONA_REQUEST",
  REMOVER_QUARTEIRAO_ZONA_SUCCESS             : "REMOVER_QUARTEIRAO_ZONA_SUCCESS",
  REMOVER_QUARTEIRAO_ZONA_FAIL                : "REMOVER_QUARTEIRAO_ZONA_FAIL",
  REMOVER_QUARTEIRAO_ZONA_RESET               : "REMOVER_QUARTEIRAO_ZONA_RESET"
}

/**
 * Solicita ao sagas para consultar os quarteirões de um município
 * @param {integer} municipio_id id do município
 * @returns void
 */
export const getQuarteiroesPorMunicipioRequest = municipio_id => {
  return {
    type: ActionTypes.GET_QUARTEIROES_POR_MUNICIPIO_REQUEST,
    payload: {
      municipio_id
    }
  }
}

/**
 * Solicita alteração do state quarteiroes do reduce
 * @param {array} quarteiroes 
 * @returns 
 */
export const setQuarteiroes = quarteiroes => {
  return {
    type: ActionTypes.SET_QUARTEIROES,
    payload: {
      quarteiroes
    }
  }
}

/**
 * Solicita ao sagas add o quarteirão
 * @param {Model} quarteirao modelo de dados quarteirão
 * @returns void
 */
export const addQuarteiraoRequest = quarteirao => {
  return {
    type: ActionTypes.ADD_QUARTEIRAO_REQUEST,
    payload: {
      quarteirao
    }
  }
}

/**
 * Solicita ao reduce add o quarteirão ao array de quarteirões
 * @param {Model} quarteirao modelo de dados quarteirão
 * @returns void
 */
export const addQuarteiraoSuccess = quarteirao => {
  return {
    type: ActionTypes.ADD_QUARTEIRAO_SUCCESS,
    payload: {
      quarteirao
    }
  }
}

/**
 * Aciona o sagas para consultar os quarteiroes de um município na API
 *
 * @param integer municipio_id
 * @returns
 */
export const getQuarteiroesMunicipioRequest = ( municipio_id, ativo = undefined ) => {
  return {
    type: ActionTypes.GET_QUARTEIROES_MUNICIPIO_REQUEST,
    payload: {
      municipio_id,
      ativo
    }
  }
}

export const getQuarteiroesLocalidadeRequest = ( localidade_id, ativo = undefined ) => {
  return {
    type: ActionTypes.GET_QUARTEIROES_LOCALIDADE_REQUEST,
    payload: {
      localidade_id,
      ativo
    }
  }
}

/**
 * Aciona o sagas para consultar os quarteiroes de um município na API
 *
 * @param integer municipio_id
 * @returns
 */
export const getQuarteiroesMunicipioSemZonaRequest = ( municipio_id ) => {
  return {
    type: ActionTypes.GET_QUARTEIROES_MUNICIPIO_SEM_ZONA_REQUEST,
    payload: {
      municipio_id
    }
  }
}

/**
 * Aciona o sagas para consultar os lados de um quarteirao
 *
 * @param integer quarteirao_id
 * @returns
 */
 export const getLadosQuarteiraoRequest = quarteirao_id => {
  return {
    type: ActionTypes.GET_LADOS_QUARTEIRAO,
    payload: {
      quarteirao_id
    }
  }
}

/**
 * Altera a lista de lados do reduce quarteirao
 *
 * @param array lados
 * @returns
 */
 export const setLados = lados => {
  return {
    type: ActionTypes.SET_LADOS,
    payload: {
      lados
    }
  }
}

/**
 * Seta o imóvel do reduce para ser editado pelo modal de Imóvel, componente
 * do quarteirão
 * 
 * @param {Model} imovel 
 */
export const setImovelEditar = imovel => {
  return {
    type: ActionTypes.SET_IMOVEL_EDITAR,
    payload: {
      imovel
    }
  }
}

/**
 * Aciona saga de atualização de um quarteirão
 * 
 * @param {Model} quarteirao modelo de dados quarteirao
 * @returns 
 */
 export const setQuarteiraoRequest = quarteirao => {
  return {
    type: ActionTypes.EDITAR_QUARTEIRAO_REQUEST,
    payload: {
      quarteirao
    }
  }
}

/**
 * Atualiza a variável updated no reduce de quarteirão
 * 
 * @param {bollean} updated
 * @returns 
 */
export const setUpdated = updated => {
  return {
    type    : ActionTypes.SET_UPDATED,
    payload : {
      updated
    }
  }
}

/**
 * Atualiza a variável updated no reduce de quarteirão
 * 
 * @param {bollean} updated
 * @returns 
 */
export const setCreated = created => {
  return {
    type    : ActionTypes.SET_CREATED,
    payload : {
      created
    }
  }
}

/**
 * Remove um lado do quarteirão request
 * 
 * @param {bollean} updated
 * @returns 
 */
export const excluirLadoRequest = ( excluirLadoId, addImovelLadoId, isUltimoLado ) => {
  return {
    type    : ActionTypes.EXCLUIR_LADO_REQUEST,
    payload : {
      excluirLadoId,
      addImovelLadoId,
      isUltimoLado
    }
  }
}

/**
 * Remove um lado do quarteirão no reduce
 * 
 * @param {bollean} updated
 * @returns 
 */
export const excluirLadoReduce = ( excluirLadoId, addImovelLadoId ) => {
  return {
    type    : ActionTypes.EXCLUIR_LADO_REDUCE,
    payload : {
      excluirLadoId,
      addImovelLadoId
    }
  }
}

/**
 * Solicita ao sagas a consulta do quarteirão por ID
 * 
 * @param {*} id 
 * @returns 
 */
export const getQuarteiraoPorIdRequest = id => {
  return {
    type: ActionTypes.GET_QUARTEIRAO_POR_ID,
    payload: {
      id
    }
  }
}

/**
 * Altera o quarteirão do reduce
 * 
 * @param {Object} quarteirao 
 * @returns 
 */
export const setQuarteirao = quarteirao => {
  return {
    type: ActionTypes.SET_QUARTEIRAO,
    payload: {
      quarteirao
    }
  }
}

/**
 * Solicita saga de excluir imóvel
 * @param {integer} id 
 * @param {integer} lado_id 
 * @returns void 
 */
export const excluirImovelRequest = ( id, lado_id ) => {
  return {
    type: ActionTypes.EXCLUIR_IMOVEL_REQUEST,
    payload: {
      id,
      lado_id
    }
  }
}

/**
 * Aciona a remoção do imóvel no reduce
 * @param {integer} id 
 * @param {integer} lado_id 
 * @returns void 
 */
export const excluirImovelReduce = ( imovel_id, lado_id ) => {
  return {
    type: ActionTypes.EXCLUIR_IMOVEL_REDUCE,
    payload: {
      imovel_id,
      lado_id
    }
  }
}

export const inserirQuarteiraoEmZonaRequest = ( id, zona_id, updatedZone=false ) => {
  return {
    type: ActionTypes.INSERIR_QUARTEIRAO_ZONA_REQUEST,
    payload: {
      id,
      zona_id,
      updatedZone
    }
  }
}

export const inserirQuarteiraoEmZonaSuccess = (updatedZone) => {
  return {
    type: ActionTypes.INSERIR_QUARTEIRAO_ZONA_SUCCESS,
    payload: {
      updatedZone
    }
  }
}

export const inserirQuarteiraoEmZonaFail = (updatedZone) => {
  return {
    type: ActionTypes.INSERIR_QUARTEIRAO_ZONA_FAIL,
    payload: {
      updatedZone
    }
  }
}

export const inserirQuarteiraoEmZonaReset = (updatedZone) => {
  return {
    type: ActionTypes.INSERIR_QUARTEIRAO_ZONA_RESET,
    payload: {
      updatedZone
    }
  }
}

export const removerQuarteiraoEmZonaRequest = ( id ) => {
  return {
    type: ActionTypes.REMOVER_QUARTEIRAO_ZONA_REQUEST,
    payload: {
      id,
    }
  }
}

export const removerQuarteiraoEmZonaSuccess = () => {
  return {
    type: ActionTypes.REMOVER_QUARTEIRAO_ZONA_SUCCESS,
  }
}

export const removerQuarteiraoEmZonaFail = () => {
  return {
    type: ActionTypes.REMOVER_QUARTEIRAO_ZONA_FAIL,
  }
}

export const removerQuarteiraoEmZonaReset = () => {
  return {
    type: ActionTypes.REMOVER_QUARTEIRAO_ZONA_RESET
  }
}