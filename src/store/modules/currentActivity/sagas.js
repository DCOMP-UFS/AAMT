import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import {
  getRouteSuccess,
  getRouteFailure,
  saveRoute,
  endActivity,
} from './actions';

export function* getRoute({ payload }) {
  try {
    const { user_id, date } = payload;

    const response = yield call(
      api.get,
      `/rotas/${user_id}/usuarios/${date}/data`
    );

    if (response.data.trabalhoDiario) {
      yield put(getRouteSuccess(response.data));
    } else {
      yield put(getRouteFailure());
    }
  } catch (err) {
    Alert.alert(
      'Houve um problema',
      'Não foi possível buscar atividades disponíveis para hoje'
    );
    yield put(getRouteFailure());
  }
}

export function* startRoute({ payload }) {
  try {
    const { activity_id, start_hour } = payload;

    const response = yield call(api.post, '/rotas/iniciar', {
      trabalhoDiario_id: activity_id,
      horaInicio: start_hour,
    });

    yield put(saveRoute(start_hour, response.data));

    Alert.alert(
      'Trabalho diário iniciado com sucesso!',
      'Tenha um bom dia de trabalho!'
    );
  } catch (err) {
    Alert.alert(
      'Ocorreu um erro',
      'Não foi possível iniciar o trabalho diário'
    );
  }
}

export function* endRoute({ payload }) {
  try {
    const { activity_id, end_hour, inspections } = payload;

    const response = yield call(api.post, '/rotas/finalizar', {
      trabalhoDiario_id: activity_id,
      horaFim: end_hour,
      vistorias: inspections,
    });

    console.log(response.data);
    Alert.alert('Parabéns!', 'O trabalho diário foi finalizado com sucesso!');
  } catch (err) {
    Alert.alert(
      'Houve um problema',
      'Algo deu errado ao finalizar o trabalho diário'
    );
  }
}

export default all([
  takeLatest('@activity/GET_ROUTE_REQUEST', getRoute),
  takeLatest('@activity/START_ROUTE', startRoute),
  takeLatest('@activity/END_ROUTE', endRoute),
]);
