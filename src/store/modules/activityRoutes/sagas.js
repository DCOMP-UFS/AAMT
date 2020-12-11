import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import getToken from '../../../utils/getToken';

import api from '../../../services/api';
import { getRouteSuccess, saveRoute, endActivity } from './actions';

export function* getRoute({ payload }) {
  try {
    const { user_id, date } = payload;

    const token = yield getToken();

    console.log('Entrou no saga');

    const response = yield call(
      api.get,
      `/rotas/${user_id}/usuarios/${date}/data`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(getRouteSuccess(response.data));
  } catch (err) {
    Alert.alert('Ih', 'Deu merda');
  }
}

export function* startRoute({ payload }) {
  try {
    const { activity_id, start_hour } = payload;

    console.log(activity_id);
    console.log(start_hour);

    const token = yield getToken();

    const response = yield call(
      api.post,
      '/rotas/iniciar',
      { trabalhoDiario_id: activity_id, horaInicio: start_hour },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(saveRoute(start_hour, response.data));

    Alert.alert(
      'Trabalho diário iniciado com sucesso!',
      'Tenha um bom dia de trabalho!'
    );
  } catch (err) {
    console.log(err);
  }
}

export function* endRoute({ payload }) {
  try {
    const { activity_id, end_hour, inspections } = payload;

    console.log(JSON.stringify(inspections));

    const token = yield getToken();

    const response = yield call(
      api.post,
      '/rotas/finalizar',
      {
        trabalhoDiario_id: activity_id,
        horaFim: end_hour,
        vistorias: inspections,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    Alert.alert('Parabéns!', 'O trabalho diário foi finalizado com sucesso!');
  } catch (err) {
    Alert.alert(
      'Houve um problema',
      'Algo deu errado ao finalizar o trabalho diário'
    );
    console.log(err);
  }
}

export default all([
  takeLatest('@activity/GET_ROUTE_REQUEST', getRoute),
  takeLatest('@activity/START_ROUTE', startRoute),
  takeLatest('@activity/END_ROUTE', endRoute),
]);
