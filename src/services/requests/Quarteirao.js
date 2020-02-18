import api, { headerAuthorization } from '../../services/api';

export const getBlockByCityRequest = data => {
  const { municipio_id } = data;
  return api.get(`/quarteiroes/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const getByIdRequest = data => {
  const { id } = data;
  return api.get(`/quarteiroes/${ id }`, {
    ...headerAuthorization()
  });
}

export const createCityBlockRequest = data => {
  const { numero, zona_id, lados } = data;

  return api.post(`/quarteiroes/`, {
    numero,
    zona_id,
    lados
  },
  {
    ...headerAuthorization()
  });
}
