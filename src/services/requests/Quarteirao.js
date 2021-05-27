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
  const { numero, localidade_id, zona_id, lados } = data;

  return api.post(`/quarteiroes/`, {
    numero,
    localidade_id,
    zona_id,
    lados
  },
  {
    ...headerAuthorization()
  });
}

export const getLadosQuarteiraoRequest = data => {
  const { quarteirao_id } = data;
  return api.get(`/quarteiroes/lados/${ quarteirao_id }`, {
    ...headerAuthorization()
  });
}
