import produce from 'immer';

const INITIAL_STATE = {
  currentRouteIndex: -1,
  totalInspections: 0,
  recipientSequence: 1,
  sampleSequence: 0,
  loadingStartRoute: false,
  routes: [],
  inspections: [],
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
    case '@routes/ADD_SAMPLE':
      return produce(state, draft => {
        draft.sampleSequence = state.sampleSequence + 1;
      });
    case '@routes/ADD_RECIPIENT':
      return produce(state, draft => {
        draft.sampleSequence = 0;
        draft.recipientSequence = state.recipientSequence + 1;
      });
    case '@routes/ADD_INSPECTION':
      return produce(state, draft => {
        const { inspection, address } = action.payload;
        const index = state.currentRouteIndex;
        draft.routes[index].rota[address.blockIndex].lados[
          address.streetIndex
        ].imoveis[address.propertyIndex]['inspection'] = inspection;
        draft.sampleSequence = 0;
        draft.recipientSequence = 1;
        totalInspections = state.totalInspections + 1;
      });
    case '@routes/FINISH_DAILY_WORK':
      return produce(state, draft => {
        const { inspections } = action.payload;
        draft.inspections = inspections;
      });
    case '@routes/FINISH_DAILY_WORK_SUCCESS':
      return produce(state, draft => {
        const { current_route_index } = action.payload;
        console.log('ola');
        // draft.inspections = [];
        // draft.sampleSequence = 0;
        // draft.recipientSequence = 1;
        // draft.routes.splice(current_route_index, 1);
      });
    case '@routes/EDIT_PROPERTY':
      return produce(state, draft => {
        const {
          blockIndex,
          streetIndex,
          propertyIndex,
          property,
        } = action.payload;
        const { currentRouteIndex } = state;
        draft.routes[currentRouteIndex].rota[blockIndex].lados[
          streetIndex
        ].imoveis[propertyIndex].numero = property.number;
        draft.routes[currentRouteIndex].rota[blockIndex].lados[
          streetIndex
        ].imoveis[propertyIndex].complemento = property.complement;
        draft.routes[currentRouteIndex].rota[blockIndex].lados[
          streetIndex
        ].imoveis[propertyIndex].tipoImovel = property.propertyType;
        draft.routes[currentRouteIndex].rota[blockIndex].lados[
          streetIndex
        ].imoveis[propertyIndex].responsavel = property.responsible;
        draft.routes[currentRouteIndex].rota[blockIndex].lados[
          streetIndex
        ].imoveis[propertyIndex].sequencia = property.sequence;
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.currentRouteIndex = -1;
      });

    default:
      return state;
  }
}
