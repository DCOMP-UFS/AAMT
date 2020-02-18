import api, { headerAuthorization } from '../../services/api';

export const getStreetByLocalityRequest = data => {
  const { localidade_id } = data;
  return api.get(`/ruas/${ localidade_id }/localidades`, {
    ...headerAuthorization()
  });
}

export const createStreetRequest = data => {
  const { nome, cep, localidade_id } = data;

  return api.post(`/ruas/`, {
    nome,
    cep,
    localidade_id
  },
  {
    ...headerAuthorization()
  });
}

export const updateStreetRequest = data => {
  const { id, ...body } = data;
  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/ruas/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const deleteStreetRequest = data => {
  const { id } = data;

  return api.delete(`/ruas/${ id }`,
    {
      ...headerAuthorization()
    }
  );
}
