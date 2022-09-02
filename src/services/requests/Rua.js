import api, { headerAuthorization } from '../../services/api';

export const getStreetByLocalityRequest = data => {
  const { localidade_id } = data;
  return api.get(`/ruas/${ localidade_id }/localidades`, {
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
 * Retornar dois booleanos: sameCEP e sameName que indicam se foi encontrado ruas com
 * cep igual ao informado ou com nome e localidade igual ao informados
*/
export const streetExistRequest = data => {
  const { id , nome, cep, localidade_id } = data;

  //Id é um parametro opcional, usado para desconsidera a rua que tem este id
  //O id é passado quando a rua esta tendo seus dados atualizados
  return api.get(`/ruas/existe`, {
    ...headerAuthorization(),
    params:{
      id:id , 
      nome:nome, 
      cep:cep, 
      localidade_id:localidade_id 
    }
  });
}
