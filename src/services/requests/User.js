import api from '../../services/api';

export const authenticateRequest = data => {
  const { usuario, senha } = data;

  return api.post('/auth/authenticate', {
    usuario,
    senha
  });
}
