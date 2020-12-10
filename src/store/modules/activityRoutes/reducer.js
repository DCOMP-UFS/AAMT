import produce from 'immer';

const INITIAL_STATE = {
  isStarted: false,
  start_hour: undefined,
  dailyActivity: undefined,
  routes: undefined,
  loading: false,
};

export default function activityRoutes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@activity/GET_ROUTE_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@activity/GET_ROUTE_SUCCESS':
      return produce(state, draft => {
        draft.dailyActivity = action.payload.data.trabalhoDiario;
        draft.routes = action.payload.data.rota;
        draft.loading = false;
      });
    case '@activity/START_ROUTE':
      return produce(state, draft => {
        draft.isStarted = true;
      });
    case '@activity/END_ROUTE':
      return produce(state, draft => {
        // draft.isStarted = false;
        // draft.dailyActivity = undefined;
        // draft.routes = undefined;
        // draft.start_hour = undefined;
      });
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
