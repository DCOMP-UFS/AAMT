import produce from 'immer';

const INITIAL_STATE = {
  isStarted: false,
  start_hour: undefined,
  loading: false,
  dailyActivity: undefined,
  routes: undefined,
};

export default function currentActivity(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@activity/GET_ROUTE_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@activity/GET_ROUTE_SUCCESS':
      return produce(state, draft => {
        draft.dailyActivity = action.payload.data;
        draft.routes = action.payload.data.rota;
        draft.loading = false;
      });
    case '@activity/GET_ROUTE_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@activity/START_ROUTE':
      return produce(state, draft => {
        draft.isStarted = true;
      });
    case '@activity/END_ROUTE':
      return produce(state, draft => {
        draft.isStarted = false;
        draft.start_hour = undefined;
        draft.dailyActivity = undefined;
        draft.routes = undefined;
        draft.loading = false;
      });
    case '@activity/EDIT_PROPERTY': {
      return produce(state, draft => {
        const {
          property_id,
          blockIndex,
          streetIndex,
          propertyIndex,
          property,
        } = action.payload;
        draft.routes[blockIndex].lados[streetIndex].imoveis[
          propertyIndex
        ].numero = property.number;
        draft.routes[blockIndex].lados[streetIndex].imoveis[
          propertyIndex
        ].sequencia = property.sequence;
        draft.routes[blockIndex].lados[streetIndex].imoveis[
          propertyIndex
        ].responsavel = action.payload.property.responsible;
        draft.routes[blockIndex].lados[streetIndex].imoveis[
          propertyIndex
        ].complemento = property.complement;
        draft.routes[blockIndex].lados[streetIndex].imoveis[
          propertyIndex
        ].tipoImovel = property.propertyType;
      });
    }
    case '@activity/SAVE_ROUTE':
      return produce(state, draft => {
        draft.isStarted = true;
        draft.routes = action.payload.routes;
        draft.start_hour = action.payload.start_hour;
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.isStarted = false;
        draft.start_hour = undefined;
        draft.dailyActivity = undefined;
        draft.routes = undefined;
        draft.loading = false;
      });
    default:
      return state;
  }
}
