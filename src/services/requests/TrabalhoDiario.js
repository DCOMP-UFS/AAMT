import api, { headerAuthorization } from '../../services/api';

export const getByUserRequest = data => {
  const { user_id } = data;
  return api.get(`/trabalhoDiario/${ user_id }/usuarios`, {
    ...headerAuthorization()
  });
}
