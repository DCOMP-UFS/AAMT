import api, { headerAuthorization } from '../../services/api';

export const getLaboratoriosRequest = data => {
  const { municipio_id } = data;
  return api.get(`/laboratorios/${ municipio_id }`, {
    ...headerAuthorization()
  });
}

/**
 * Solicita a API a inclusão de um novo laboratório
 * @param {Object} data 
 * @returns {Promise}
 */
export const createLaboratoryRequest = data => {
  const { cnpj, nome, endereco, tipoLaboratorio, municipio_id } = data.laboratorio;
  return api.post( '/laboratorios/', {
    cnpj,
    endereco,
    nome,
    tipoLaboratorio,
    municipio_id
  },
  { 
    ...headerAuthorization()
  } );
}

/**
 * Solicita a API alterar o laboratório
 * @param {Object} data 
 * @returns {Promise}
 */
export const setLaboratoryRequest = data =>{
  const { cnpj, nome, endereco, tipoLaboratorio, municipio_id } = data.laboratorio;
  return api.put( '/laboratorios/', {
    cnpj,
    endereco,
    nome,
    tipoLaboratorio,
    municipio_id
  },
  { 
    ...headerAuthorization()
  } );
}