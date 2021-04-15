import api, { headerAuthorization } from '../../services/api';

export const getLaboratoriosRequest = data => {
  const { municipio_id } = data;
  return api.get(`/laboratorios/${ municipio_id }`, {
    ...headerAuthorization()
  });
}
