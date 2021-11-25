import { viacep_api } from '../../services/api';

/**
 * Consulta API dos correrios pelo nome da rua pelo cep
 * 
 * @param {Object} data 
 * @returns 
 */
export const getRuaPorCepRequest = data => {
  const { cep } = data;
  
  return viacep_api.get( `/${ cep }/json/` );
}