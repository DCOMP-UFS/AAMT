import api, { headerAuthorization } from '../../services/api';

export const getMosquitosRequest = () => {
  return api.get(`/mosquitos`, {
    ...headerAuthorization()
  });
}
