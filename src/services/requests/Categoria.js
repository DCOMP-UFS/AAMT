import api, { headerAuthorization } from '../../services/api';

export const listRequest = () => {
  return api.get('/categorias', {
    ...headerAuthorization()
  });
}
