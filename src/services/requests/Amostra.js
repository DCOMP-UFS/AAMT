import api, { headerAuthorization } from '../../services/api';

export const getAmostrasRequest = data => {
  const { supervisor_id } = data;
  return api.get(`/amostras/${ supervisor_id }`, {
    ...headerAuthorization()
  });
}

export const enviarAmostrasRequest = data => {
  const { laboratorio_id, amostras } = data;
  return api.post(`/amostras/enviar`, {
    amostras,
    laboratorio_id
  }, {
    ...headerAuthorization()
  });
}

export const registrarExameRequest = data => {
  const { exame } = data;
  return api.post(`/amostras/examinar`, exame, {
    ...headerAuthorization()
  });
}
