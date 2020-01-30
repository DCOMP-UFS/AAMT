import api, { headerAuthorization } from '../../services/api';

export const listRequest = () => {
  return api.get('/localidades', {
    ...headerAuthorization()
  });
}

export const createLocationRequest = data => {
  const { codigo, nome } = data;

  return api.post(`/localidades/2/categorias/2/municipios`, {
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
