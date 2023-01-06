import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as service from '../../services/requests/Atividade';
import * as AtividadeActions from './atividadeActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getResponsabilityActivities( action ) {
  try {
    const { data, status } = yield call( service.getResponsabilityActivitiesRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.setActivities( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividades, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividades, favor verifique a conexão", "error" ) );
  }
}

export function* getRotaEquipe( action ) {
  try {
    const { data, status } = yield call( service.getRotaEquipeRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.setRotaEquipe( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar a rota da equipe: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rota da equipe, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rota da equipe, favor verifique a conexão", "error" ) );
  }
}

export function* getActivitiesOfCity(action) {
  try {
    const { data, status } = yield call( service.getActivitiesOfCityRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.getActivitiesOfCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividades, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividades, favor verifique a conexão", "error" ) );
  }
}

export function* getActivitieById( action ) {
  try {
    const { data, status } = yield call( service.getActivitieByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.getActivitieById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar atividade: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividade, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividade, favor verifique a conexão", "error" ) );
  }
}

export function* getActivitiesByCity( action ) {
  try {
    const { data, status } = yield call( service.getActivitiesByCityRequest, action.payload );
    if( status === 200 ) {
      yield put( AtividadeActions.getActivitiesByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividades, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividades, favor verifique a conexão", "error" ) );
  }
}

export function* getLocations( action ) {
  try {
    const { data, status } = yield call( service.getLocationsRequest, action.payload );
    if( status === 200 ) {
      yield put( AtividadeActions.getLocations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar locais: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar locais, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar locais, favor verifique a conexão", "error" ) );
  }
}

export function* createActive( action ) {
  try {
    const { data, status } = yield call( service.createActiveRequest, action.payload );

    if( status === 201 ) {
      yield put( AtividadeActions.createActive( data ) );
      yield put( AppConfigActions.showNotifyToast( "Atividade criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar atividade: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar atividade, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar atividade, favor verifique a conexão", "error" ) );
  }
}

export function* planActivity( action ) {
  try {
    const { status } = yield call( service.planActivityRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.planActivitySuccess() );
      
    }else {
      yield put( AtividadeActions.planActivityFail() );
      yield put( AppConfigActions.showNotifyToast( "Falha ao salvar planejamento: " + status, "error" ) );
    }
  } catch (err) {
    yield put( AtividadeActions.planActivityFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao salvar planejamento, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao salvar planejamento, favor verifique a conexão", "error" ) );
  }
}

export function* finishActivity( action ) {
  try {
    const { status} = yield call(service.finishActivityRequest , action.payload);

    if( status === 200 ) {
      yield put( AtividadeActions.finishActivitySuccess() );
      yield put( AppConfigActions.showNotifyToast( "Atividade encerrada com sucesso", "success" ) );
    }
    else {
      yield put( AtividadeActions.finishActivityFail());
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir ciclo: " + status, "error" ) );
    }
  } catch (err) {

    yield put( AtividadeActions.finishActivityFail());

    if(err.response){
      const { finishDenied } = err.response.data

      if(finishDenied)
        yield put( AppConfigActions.showNotifyToast( "Erro ao encerrar a atividade, hoje existe ao menos um trabalho diario que não foi finalizado", "error" ) );
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Error ao encerrar a atividade, entre em contato com o suporte", "error" ) );
      }   
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao encerrar a atividade, favor verifique a conexão", "error" ) );
  }
}

function* watchGetResponsabilityActivities() {
  yield takeLatest( AtividadeActions.ActionTypes.GET_RESPONSABILITY_ACTIVITIES_REQUEST, getResponsabilityActivities );
}

function* watchGetRotaEquipe() {
  yield takeLatest( AtividadeActions.ActionTypes.GET_ROTA_EQUIPE_REQUEST, getRotaEquipe );
}

function* watchGetActivitiesOfCity() {
  yield takeLatest( AtividadeActions.ActionTypes.GET_ACTIVITIES_OF_CITY_REQUEST, getActivitiesOfCity );
}

function* watchGetActivitieById() {
  yield takeLatest( AtividadeActions.ActionTypes.GET_ACTIVITIE_BY_ID_REQUEST, getActivitieById );
}

function* watchGetActivitiesByCity() {
  yield takeLatest( AtividadeActions.ActionTypes.GET_ACTIVITIES_BY_CITY_REQUEST, getActivitiesByCity );
}

function* watchGetLocations() {
  yield takeLatest( AtividadeActions.ActionTypes.GET_LOCATIONS_REQUEST, getLocations );
}

function* watchCreateActive() {
  yield takeLatest( AtividadeActions.ActionTypes.CREATE_ACTIVE_REQUEST, createActive );
}

function* watchPlanActivity() {
  yield takeLatest( AtividadeActions.ActionTypes.PLAN_ACTIVITY_REQUEST, planActivity );
}

function* watchFinishActivity() {
  yield takeLatest( AtividadeActions.ActionTypes.FINISH_ACTIVITY_REQUEST, finishActivity );
}

export function* atividadeSaga() {
  yield all( [
    watchGetResponsabilityActivities(),
    watchGetRotaEquipe(),
    watchGetActivitiesOfCity(),
    watchGetActivitieById(),
    watchGetActivitiesByCity(),
    watchGetLocations(),
    watchCreateActive(),
    watchPlanActivity(),
    watchFinishActivity()
  ] );
}