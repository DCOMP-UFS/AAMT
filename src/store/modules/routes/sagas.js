import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import {
  startRouteRequest,
  startRouteSuccess,
  startRouteFailure,
  finishDailyWorkSuccess,
} from './actions';

export function* startRoute({ payload }) {
  try {
    const { route, daily_work_id, start_hour } = payload;

    const response = yield call(api.post, '/rotas/iniciar', {
      trabalhoDiario_id: daily_work_id,
      horaInicio: start_hour,
    });

    yield put(startRouteSuccess(route, start_hour, daily_work_id));
  } catch (err) {
    if (err.response.status === 400) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível iniciar o trabalho diário'
      );
    }
    yield put(startRouteFailure());
  }
}

export function* endRoute({ payload }) {
  try {
    const { inspections, end_hour, daily_work_id, current_route_index } =
      payload;

    // const response = yield call(api.post, '/rotas/finalizar', {
    //   trabalhoDiario_id: daily_work_id,
    //   horaFim: end_hour,
    //   vistorias: inspections,
    // });

    yield put(finishDailyWorkSuccess(current_route_index));

    Alert.alert(
      'Operação concluída com sucesso!',
      'O trabalho diário foi finalizado e armazenado na base de dados'
    );
  } catch (err) {
    if (err.response.status === 400) {
      Alert.alert(
        'Houve um problema',
        'Não foi possível finalizar o trabalho diário'
      );
    }
  }
}

export default all([
  takeLatest('@routes/START_ROUTE_REQUEST', startRoute),
  takeLatest('@routes/FINISH_DAILY_WORK', endRoute),
]);
