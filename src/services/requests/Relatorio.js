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
