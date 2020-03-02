import api, { headerAuthorization } from '../../services/api';

export const getMethodologiesRequest = () => {
  return api.get('/metodologias', {
    ...headerAuthorization()
  });
}
