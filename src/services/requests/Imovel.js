import api, { headerAuthorization } from '../../services/api';

export const createHouseRequest = data => {
  const { numero, sequencia, responsavel, complemento, tipoImovel, lado_id } = data;

  return api.post('/imoveis/', {
    numero,
    sequencia,
    responsavel,
    complemento,
    tipoImovel,
    lado_id
    },
    {
      ...headerAuthorization()
    }
  );
}

export const deleteHouseRequest = data => {
  const { id } = data;

  return api.delete(`/imoveis/${ id }`,
    {
      ...headerAuthorization()
    }
  );
}

export const updateHouseRequest = data => {
  const { id, ...body } = data;
  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/imoveis/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}
