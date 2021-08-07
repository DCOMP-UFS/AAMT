import api, { headerAuthorization } from '../../services/api';

/**
 * Consulta na API do back-end aamt o relatório semanal
 */
export const getBoletimSemanalRequest = data => {
  const { semana, atividade_id, ano } = data;
  return api.get(`/relatorios/semanal?atividade_id=${ atividade_id }&ano=${ ano }&semana=${ semana }`, {
    ...headerAuthorization()
  });
}

/**
 * Consulta na API do back-end aamt o relatório diário da equipe
 */
export const getBoletimDiarioEquipeRequest = args => {
  const { equipe_id, data } = args;
  return api.get(`/relatorios/equipe/${ equipe_id }?tipoRelatorio=diario&data=${ data }`, {
    ...headerAuthorization()
  });
}
