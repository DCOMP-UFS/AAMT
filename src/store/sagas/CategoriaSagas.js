import { call, put } from 'redux-saga/effects';
import { listRequest } from '../../services/requests/Categoria';

import * as CategoriaActions from '../actions/CategoriaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getCategorys(action) {
  try {
    const { data, status } = yield call( listRequest );

    if( status === 200 ) {
      yield put( CategoriaActions.getCategorys( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as categorias da localidade: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as categorias da localidade, favor verifique a conexão", "error" ) );
  }
}
