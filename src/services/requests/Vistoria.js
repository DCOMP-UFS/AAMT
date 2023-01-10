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

export const getInspectsByTeam = data => {
  const { equipe_id } = data;
  return api.get(`/vistorias/${ equipe_id }/equipe`, {
    ...headerAuthorization()
  });
}

export const getNewInspectStatus = data => {
  const { trabalho_diario_id, imovel_id } = data;
  return api.get(`/vistorias/status/${ trabalho_diario_id }/trabalhos_diarios/${ imovel_id }/imoveis`, {
    ...headerAuthorization()
  });
}
