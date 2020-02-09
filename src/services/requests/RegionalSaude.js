import api, { headerAuthorization } from '../../services/api';

export const getRegionalHealthByStateRequest = estado_id => {
  return api.get(`/regionaisSaude/${ estado_id }/estados`, {
    ...headerAuthorization()
  });
}

export const getRegionalById = id => {
  return api.get(`/regionaisSaude/${ id }`, {
    ...headerAuthorization()
  });
}
