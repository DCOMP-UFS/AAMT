import api, { headerAuthorization } from '../../services/api';

export const getInspectsRequest = data => {
  const { usuario_id } = data;
  return api.get(`/vistorias/${ usuario_id }/usuarios`, {
    ...headerAuthorization()
  });
}
