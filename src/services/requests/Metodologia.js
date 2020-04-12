import api, { headerAuthorization } from '../api';

export const getMethodologiesRequest = () => {
  return api.get('/metodologias', {
    ...headerAuthorization()
  });
}
