import api, { headerAuthorization } from '../api';

export const GetRegionsByNationRequest = pais_id => {
  return api.get(`/regioes/${ pais_id }/paises`, {
    ...headerAuthorization()
  });
}

export const getRegionById = id => {
  return api.get(`/regioes/${ id }`, {
    ...headerAuthorization()
  });
}
