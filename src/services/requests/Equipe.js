import api, { headerAuthorization } from '../../services/api';

export const getActivitiesSupRequest = data => {
  const { id } = data;
  return api.get(`/equipes/sup/${ id }/`, {
    ...headerAuthorization()
  });
}

export const getTeamsSupRequest = data => {
  const { atividade_id } = data;
  return api.get(`/equipes/${ atividade_id }/atividades`, {
    ...headerAuthorization()
  });
}

export const getPlanningRequest = data => {
  const { supervisor_id } = data;
  return api.get(`/rotas/planejamento/${ supervisor_id }/usuarios`, {
    ...headerAuthorization()
  });
}

export const savePlainRequest = data => {
  const { supervisor_id, planejamento } = data;

  return api.post('rotas/planejamento', { supervisor_id, planejamento },
  {
    ...headerAuthorization()
  });
}

/**
 * Consulta na API os membros de uma equipe
 * 
 * @param {Object} data 
 * @returns 
 */
export const getMembrosRequest = data => {
  const { equipe_id } = data;
  return api.get(`/equipes/membros/${ equipe_id }`, {
    ...headerAuthorization()
  });
}