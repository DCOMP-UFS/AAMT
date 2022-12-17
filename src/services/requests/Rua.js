import api, { headerAuthorization } from '../../services/api';

export const getStreetByCityRequest = data => {
  const { municipio_id } = data;
  return api.get(`/ruas/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const createStreetRequest = data => {
  const { nome, cep, localidade_id } = data;

  return api.post(`/ruas/`, {
    nome,
    cep,
    localidade_id
  },
  {
    ...headerAuthorization()
  });
}

export const updateStreetRequest = data => {
  const { id, ...body } = data;
  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/ruas/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const deleteStreetRequest = data => {
  const { id } = data;

  return api.delete(`/ruas/${ id }`,
    {
      ...headerAuthorization()
    }
  );
}

/**
 * Usado como verificação antes que uma rua seja criada ou alterada
 * Retornar um booleano: sameCEP (indica se ja existe uma rua com cep informado)
 * cep igual ao informado ou com nome e municipio igual ao informados
*/
export const streetExistRequest = data => {
  const { id ,cep } = data;

  //Id é um parametro opcional, usado para desconsidera a rua que tem este id
  //O id é passado quando a rua esta tendo seus dados atualizados
  return api.get(`/ruas/existe`, {
    ...headerAuthorization(),
    params:{
      id:id , 
      cep:cep, 
    }
  });
}
