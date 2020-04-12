import api, { headerAuthorization } from '../api';

export const getNationsRequest = () => {
  return api.get('/paises/', {
    ...headerAuthorization()
  });
}

export const getNationById = id => {
  return api.get(`/paises/${ id }`, {
    ...headerAuthorization()
  });
}

