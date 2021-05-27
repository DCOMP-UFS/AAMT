import produce from 'immer';

const INITIAL_STATE = {
  currentDailyWork: -1,
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
        draft.currentDailyWork = action.payload.daily_work_id;
      });
    case '@routes/START_ROUTE_FAILURE':
      return produce(state, draft => {
        draft.loadingStartRoute = false;
      });
    case '@routes/REMOVE_FINISHED_ROUTE':
      return produce(state, draft => {
        console.tron.log('Opa, deletou hein!!!!');
        draft.routes = state.routes.filter(
          p => p.trabalhoDiario.id !== action.payload.daily_work_id
        );
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.currentDailyWork = -1;
      });
    default:
      return state;
  }
}
