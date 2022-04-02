import api, { headerAuthorization } from '../../services/api';

/**
 * Consulta a lista de imóveis de um município
 * @returns
 */
export const getImoveisRequest = data => {
  const { municipio_id } = data;

  return api.get(`/imoveis/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

/**
 * Deleta um imóvel
 * @param {Integer} imovel_id 
 * @returns 
 */
export const deletarImovelRequest = imovel_id => {
  return api.delete(`imoveis/${ imovel_id }`, {
    ...headerAuthorization()
  });
}

export const createHouseRequest = data => {
  const { numero, sequencia, responsavel, complemento, tipoImovel, lado_id, lng, lat } = data;

  return api.post('/imoveis/', {
      numero,
      sequencia,
      responsavel,
      complemento,
      tipoImovel,
      lado_id,
      lng,
      lat
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

  return api.put(`/imoveis/${ id }`, body, {
    ...headerAuthorization()
  });
}
