import api, { headerAuthorization } from '../../services/api';

export const getZoneByCityRequest = municipio_id => {
  return api.get(`/zonas/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const getZoneByLocalityRequest = data => {
  const { localidade_id } = data;
  return api.get(`/zonas/${ localidade_id }/localidades`, {
    ...headerAuthorization()
  });
}

export const createZoneRequest = data => {
  const { localidade_id, municipio_id } = data;

  return api.post(`/zonas/${ municipio_id }/municipios`, {
    localidade_id
  },
  {
    ...headerAuthorization()
  });
}

export const updateRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/zonas/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const getZoneByIdRequest = data => {
  const { id } = data;

  return api.get(`/zonas/${ id }`, {
    ...headerAuthorization()
  });
}
