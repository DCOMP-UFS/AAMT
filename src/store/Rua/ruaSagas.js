import { call, put } from 'redux-saga/effects';
import {
  getRuaPorCepRequest
} from '../../services/requests/Utilitarios';

import * as RuaActions from './ruaActions';
import * as AppConfigActions from '../actions/appConfig';

import { Rua } from '../../config/models/index';

/**
 * Sagas para aguarar a consulta a API dos correios.
 * @param {Object} action 
 */
export function* getRuaPorCep( action ) {
  try {
    const { data, status } = yield call( getRuaPorCepRequest, action.payload );

    if( status === 200 ) {
      const rua = new Rua( {
        id  : null,
        nome: data.logradouro,
        cep : action.payload.cep
      } );
      yield put( RuaActions.setRua( rua ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Não foi possível consultar a rua pelo cep: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Não foi possível consultar a rua pelo cep.", "error" ) );
  }
}
