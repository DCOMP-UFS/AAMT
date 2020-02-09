import api, { headerAuthorization } from '../../services/api';

export const listUsersRequest = municipio_id => {
  return api.get(`/municipios/${ municipio_id }/usuarios`, {
    ...headerAuthorization()
  });
}

export const listRequest = () => {
  return api.get('/municipios', {
    ...headerAuthorization()
  });
}

export const getCityByIdRequest = id => {
  return api.get(`/municipios/${ id }`, {
    ...headerAuthorization()
  });
}

export const getCityByRegionalHealthRequest = regionalSaude_id => {
  return api.get(`/municipios/${ regionalSaude_id }/regionaisSaude`, {
    ...headerAuthorization()
  });
}


export const createCityRequest = data => {
  const { codigo, nome, regionalSaude_id } = data;

  return api.post('municipios', {
    codigo,
    nome,
    regionalSaude_id
  },
  {
    ...headerAuthorization()
  });
}

export const updateRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/municipios/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}
