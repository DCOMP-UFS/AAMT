import produce from 'immer';

const INITIAL_STATE = {
  currentRouteIndex: -1,
  loadingStartRoute: false,
  routes: [],
};

export default function routes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@routes/START_ROUTE_REQUEST':
      return produce(state, draft => {
        // draft.loadingStartRoute = true;
      });
    case '@routes/START_ROUTE_SUCCESS':
      return produce(state, draft => {
        const route = action.payload.route;
        route.trabalhoDiario.horaInicio = action.payload.start_hour;
        draft.routes.push(route);
        const index = draft.routes.findIndex(
          p => p.trabalhoDiario.id === action.payload.daily_work_id
        );
        console.tron.log(index);
        if (index >= 0) {
          draft.currentRouteIndex = index;
        }
      });
    case '@routes/START_ROUTE_FAILURE':
      return produce(state, draft => {
        draft.loadingStartRoute = false;
      });
    case '@routes/REMOVE_FINISHED_ROUTE':
      return produce(state, draft => {
        draft.routes = state.routes.filter(
          p => p.trabalhoDiario.id !== action.payload.daily_work_id
        );
        draft.currentRouteIndex = -1;
      });
    case '@routes/SET_CURRENT_ROUTE':
      return produce(state, draft => {
        draft.currentRouteIndex = action.payload.route_index;
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.currentRouteIndex = -1;
      });
    default:
      return state;
  }
}
