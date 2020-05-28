import api, { headerAuthorization } from '../../services/api';

export const getActivitiesOfCityRequest = data => {
  const { regionalSaude_id } = data;
  return api.get(`/atividades/${ regionalSaude_id }/regionaisSaude`, {
    ...headerAuthorization()
  });
}

export const getActivitieByIdRequest = data => {
  const { id } = data;
  return api.get(`/atividades/${ id }`, {
    ...headerAuthorization()
  });
}

export const getActivitiesByCityRequest = data => {
  const { ciclo_id, municipio_id } = data;

  return api.get(`/atividades/${ ciclo_id }/ciclos/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const getLocationsRequest = data => {
  const { abrangencia, municipio_id } = data;
  return api.get(`/atividades/locais/${ abrangencia }/abrangencia/${ municipio_id }/municipios`, {
    ...headerAuthorization()
  });
}

export const createActiveRequest = data => {
  const {
    objetivoAtividade,
    flTodosImoveis,
    responsabilidade,
    ciclo_id,
    municipio_id,
    metodologia_id,
    objetivo_id,
    abrangencia
  } = data;

  return api.post(`/atividades/`, {
    objetivoAtividade,
    flTodosImoveis,
    responsabilidade,
    ciclo_id,
    municipio_id,
    metodologia_id,
    objetivo_id,
    abrangencia
  },
  {
    ...headerAuthorization()
  });
}

export const planActivityRequest = data => {
  const { id, estratos, equipes, abrangencia_id } = data;

  return api.post(`/atividades/planejar/${ id }`, {
    estratos,
    equipes,
    abrangencia_id
  },
  {
    ...headerAuthorization()
  });
}
