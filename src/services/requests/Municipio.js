import api, { headerAuthorization } from '../../services/api';

export const listUsersRequest = municipio_id => {
  return api.get(`/municipios/${ municipio_id }/usuarios`, {
    ...headerAuthorization()
  });
}

export const listRequest = () => {
  return api.get('/municipios', {
    ...headerAuthorization()
  });
}

export const getCityByStateRequest = estado_id => {
  return api.get(`/municipios/${ estado_id }/estados`, {
    ...headerAuthorization()
  });
}

export const getCityByIdRequest = id => {
  return api.get(`/municipios/${ id }`, {
    ...headerAuthorization()
  });
}

export const getCityByRegionalHealthRequest = data => {
  const {regionalSaude_id, vinculado, municipioAtivo} = data
  let url = `/municipios/${ regionalSaude_id }/regionaisSaude`

  if(vinculado == true || vinculado == false){
    url = url+`?vinculado=${ vinculado }`
    if(municipioAtivo == true || municipioAtivo == false)
      url = url+`&municipioAtivo=${ municipioAtivo }`
  }
  else if(municipioAtivo == true || municipioAtivo == false)
    url = url+`?municipioAtivo=${ municipioAtivo }`
  
  return api.get(url, {
    ...headerAuthorization()
  });
}

export const createCityRequest = data => {
  const { codigo, nome, regionalSaude_id } = data;

  return api.post('municipios', {
    codigo,
    nome,
    regionalSaude_id
  },
  {
    ...headerAuthorization()
  });
}

export const updateRequest = data => {
  const { id, ...body } = data;

  // Pegando somente o que o body contém.
  const attr = Object.entries(body);

  return api.put(`/municipios/${ id }`, { ...attr[0][1] }, {
    ...headerAuthorization()
  });
}

export const transferCityRegionalRequest = data => {
  const { municipio_id, regional_id } = data

  return api.put(`/municipios/${ municipio_id }/regionalSaude/${ regional_id }`, { }, {
    ...headerAuthorization()
  });
}
