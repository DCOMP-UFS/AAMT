import api, { headerAuthorization } from '../../services/api';

export const getUsuarios = municipio_id => {
  return api.get(`/municipios/${ municipio_id }/usuarios`, {
    ...headerAuthorization()
  });
}
