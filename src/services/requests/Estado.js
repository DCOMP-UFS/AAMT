import api, { headerAuthorization } from '../../services/api';

export const GetStatesByRegionRequest = regiao_id => {
  return api.get(`/estados/${ regiao_id }/regioes`, {
    ...headerAuthorization()
  });
}

export const getStateById = id => {
  return api.get(`/estados/${ id }`, {
    ...headerAuthorization()
  });
}
