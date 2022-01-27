import api, { headerAuthorization } from '../../services/api';

export const authenticateRequest = data => {
  const { usuario, senha } = data;

  return api.post('/auth/authenticate', {
    usuario,
    senha
  });
}

export const createUsuarioRequest = data => {
  const { nome, cpf, rg, email, celular, usuario, senha, tipoPerfil, regionalSaude_id, municipio_id } = data;

  let local_id = null;
  switch (tipoPerfil) {
    case 1:
      local_id = regionalSaude_id;
      break;

    default:
      local_id = municipio_id
      break;
  }

  return api.post(`/usuarios/`, {
    nome,
    cpf,
    rg,
    email,
    celular,
    usuario,
    senha,
    atuacoes: [
      {
        tipoPerfil: tipoPerfil,
        local_id
      }
    ]
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

export const getUsersByRegionalRequest = data => {
  const { regionalSaude_id } = data;
  return api.get(`/usuarios/${ regionalSaude_id }/regionaisSaude`, {
    ...headerAuthorization()
  });
}

export const getUsersByCityRequest = data => {
  const { municipio_id } = data;
  return api.get(`/usuarios/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const getUsuarioByIdRequest = id => {
  return api.get(`/usuarios/${ id }`, {
    ...headerAuthorization()
  });
}

/**
 * Solicita valiação do CPF
 * @param {Object} data 
 * @returns {Object}
 */
export const validarCpfRequest = data => {
  const { cpf, usuario_id } = data;
  return api.post(
    `/usuarios/validarCpf`, 
    {
      cpf,
      usuario_id
    },
    {
      ...headerAuthorization()
    }
  );
}
