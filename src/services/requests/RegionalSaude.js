import api, { headerAuthorization } from '../../services/api';

export const getRegionalHealthByStateRequest = data => {
  const {estado_id, ativo} = data
  let url = `/regionaisSaude/${ estado_id }/estados`
  
  if(ativo != null)
    url = url+`?ativo=${ ativo }`

  return api.get(url, {
    ...headerAuthorization()
  });
}

export const getRegionalById = id => {
  return api.get(`/regionaisSaude/${ id }`, {
    ...headerAuthorization()
  });
}

export const getRegionalSituation = id => {
  return api.get(`/regionaisSaude/${ id }/verificarSituacao`, {
    ...headerAuthorization()
  });
}

export const updateRegionalRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);


  return api.put(`/regionaisSaude/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const disableRegionalsRequest = regionais_ids => {

  return api.put(`/regionaisSaude/inativarRegionais`, { regionais_ids }, {
    ...headerAuthorization()
  });
}

export const createRegional = data => {
  const { nome, endereco, estado_id } = data;

  return api.post(`regionaisSaude`, 
  {
    nome, 
    endereco, 
    estado_id
  },
  {
    ...headerAuthorization()
  });
}
