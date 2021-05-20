import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import {
  startRouteRequest,
  startRouteSuccess,
  startRouteFailure,
} from './actions';

export function* startRoute({ payload }) {
  try {
    const { route, daily_work_id, start_hour } = payload;

    const response = yield call(api.post, '/rotas/iniciar', {
      trabalhoDiario_id: daily_work_id,
      horaInicio: start_hour,
    });

    yield put(startRouteSuccess(route, start_hour, daily_work_id));

    Alert.alert(
      'Trabalho diário iniciado com sucesso!',
      'Tenha um bom dia de trabalho!'
    );
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

export default all([takeLatest('@routes/START_ROUTE_REQUEST', startRoute)]);
