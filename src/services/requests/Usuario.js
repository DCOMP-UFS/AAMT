import api, { headerAuthorization } from '../../services/api';

export const authenticateRequest = data => {
  const { usuario, senha } = data;

  return api.post('/auth/authenticate', {
    usuario,
    senha
  });
}

export const createUsuarioRequest = data => {
  const { nome, cpf, rg, email, celular, usuario, senha, tipoPerfil, municipio_id } = data;

  return api.post(`/usuarios/${ municipio_id }/municipios`, {
    nome,
    cpf,
    rg,
    email,
    celular,
    usuario,
    senha,
    tipoPerfil
  },
  {
    ...headerAuthorization()
  });
}

export const updateRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/usuarios/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const getUsuariosPorMunicipios = municipio_id => {
  return api.get(`/usuarios/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const getUsuarioByIdRequest = id => {
  return api.get(`/usuarios/${ id }`, {
    ...headerAuthorization()
  });
}
