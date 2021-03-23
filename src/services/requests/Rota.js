import api, { headerAuthorization } from '../../services/api';

export const getRouteRequest = data => {
  const { usuario_id, dia } = data;
  return api.get(`/rotas/${ usuario_id }/usuarios/${ dia }/data`, {
    ...headerAuthorization()
  });
}

export const isStartedRequest = data => {
  const { trabalhoDiario_id } = data;
  return api.get(`/rotas/check/${ trabalhoDiario_id }/trabalhoDiario`, {
    ...headerAuthorization()
  });
}

export const startRouteRequest = data => {
  const { trabalhoDiario_id, horaInicio } = data;

  return api.post('rotas/iniciar', { trabalhoDiario_id, horaInicio },
  {
    ...headerAuthorization()
  });
}

export const closeRouteRequest = data => {
  const { trabalhoDiario_id, horaFim, vistorias } = data;

  return api.post('rotas/finalizar', { trabalhoDiario_id, horaFim, vistorias },
  {
    ...headerAuthorization()
  });
}

export const planejarRotaRequest = data => {
  const { rota } = data;

  return api.post('rotas/planejamento', { ...rota },
  {
    ...headerAuthorization()
  });
}
