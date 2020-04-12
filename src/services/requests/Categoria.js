import api, { headerAuthorization } from '../api';

export const listRequest = () => {
  return api.get('/categorias', {
    ...headerAuthorization()
  });
}
