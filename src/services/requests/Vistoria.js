import api, { headerAuthorization } from '../../services/api';

export const getInspectsRequest = data => {
  const { usuario_id } = data;
  return api.get(`/vistorias/${ usuario_id }/usuarios`, {
    ...headerAuthorization()
  });
}

export const getInspectsByDailyWorkRequest = data => {
  const { trabalho_diario_id } = data;
  return api.get(`/vistorias/trabalho/${ trabalho_diario_id }/trabalhos_diarios`, {
    ...headerAuthorization()
  });
}
