import api, { headerAuthorization } from '../../services/api';

export const getLaboratoriosRequest = data => {
  const { municipio_id } = data;
  return api.get(`/laboratorios/${ municipio_id }`, {
    ...headerAuthorization()
  });
}

export const createLaboratoryRequest = data => {
  const { cnpj, nome, endereco, tipo, municipio } = data;
  return api.post(`/laboratorios/${cnpj}/cnpj/${nome}/nome/${endereco}/endereco/${ tipo}/tipo_laboratorio/${municipio}/municipios`, {
    cnpj,
    endereco,
    nome,
    tipo,
    municipio
  },
  { 
    ...headerAuthorization()
  });
}


export const setLaboratoryRequest = data =>{
  const {cnpj_id, cnpj, nome, endereco, tipo, created_at, municipio } = data;
  console.log(created_at)
  return api.put(`/laboratorios/${cnpj_id}/cnpj_id/${cnpj}/cnpj/${nome}/nome/${endereco}/endereco/${ tipo}/tipo_laboratorio/${created_at}/created_at/${municipio}/municipios`, {
    cnpj_id,
    cnpj,
    endereco,
    nome,
    tipo,
    created_at,
    municipio
  },
  { 
    ...headerAuthorization()
  });
}