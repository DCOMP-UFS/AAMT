import api, { headerAuthorization } from '../api';

export const listRequest = () => {
  return api.get('/localidades', {
    ...headerAuthorization()
  });
}

export const getLocationByIdRequest = data => {
  const { id } = data;

  return api.get(`/localidades/${ id }`, {
    ...headerAuthorization()
  });
}

export const getLocationByCityRequest = municipio_id => {
  return api.get(`/localidades/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const createLocationRequest = data => {
  const { codigo, nome, categoria: categoria_id, municipio: municipio_id } = data;

  return api.post(`/localidades/${ categoria_id }/categorias/${ municipio_id }/municipios`, {
    nome,
    codigo
  },
  {
    ...headerAuthorization()
  });
}

export const updateRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/localidades/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}
