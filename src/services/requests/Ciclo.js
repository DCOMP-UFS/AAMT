import api, { headerAuthorization } from '../../services/api';

export const getCyclesForYearRequest = data => {
  const { regionalSaude_id, ano } = data;
  return api.get(`/ciclos/${ ano }/${ regionalSaude_id }/regionaisSaude`, {
    ...headerAuthorization()
  });
}

export const getCyclesRequest = data => {
  const { regionalSaude_id } = data;
  return api.get(`/ciclos/${ regionalSaude_id }/regionaisSaude`, {
    ...headerAuthorization()
  });
}

export const getAllowedCyclesRequest = data => {
  const { regionalSaude_id } = data;
  return api.get(`/ciclos/allowedCycles/${ regionalSaude_id }/regionaisSaude`, {
    ...headerAuthorization()
  });
}

export const createCycleRequest = data => {
  const {
    ano,
    sequencia,
    dataInicio,
    dataFim,
    regionalSaude_id,
    atividades
  } = data;

  return api.post(`/ciclos/`, {
    ano,
    sequencia,
    dataInicio,
    dataFim,
    regionalSaude_id,
    atividades
  },
  {
    ...headerAuthorization()
  });
}
