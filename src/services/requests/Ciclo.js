import api, { headerAuthorization } from '../api';

export const getCycleRequest = data => {
  const { id } = data;
  return api.get(`/ciclos/${ id }`, {
    ...headerAuthorization()
  });
}

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

export const updateCycleRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/ciclos/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const destroyCycleRequest = data => {
  const { id } = data;
  return api.delete(`/ciclos/${ id }`, {
    ...headerAuthorization()
  });
}
