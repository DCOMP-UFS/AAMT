import produce from 'immer';

const INITIAL_STATE = {
  trabalhoDiario_id: undefined,
  horaFim: undefined,
  sequenciaVistoria: 0,
  sequenciaRecipiente: 0,
  vistorias: [],
};

export default function inspections(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@inspections/ADD_INSPECTION': {
      return produce(state, draft => {
        draft.vistorias.push(action.payload.inspection);
        draft.sequenciaVistoria++;
      });
    }
    case '@inspections/ADD_RECIPIENT': {
      return produce(state, draft => {
        const inspectionIndex = draft.vistorias.findIndex(
          p => p.imovel.id === action.payload.property_id
        );
        draft.vistorias[inspectionIndex].recipientes.push(
          action.payload.recipient
        );
        draft.sequenciaRecipiente++;
      });
    }
    case '@activity/END_ROUTE':
      return produce(state, draft => {
        draft.trabalhoDiario_id = undefined;
        draft.horaFim = undefined;
        draft.sequenciaVistoria = 0;
        draft.sequenciaRecipiente = 0;
        draft.vistorias = [];
      });
    // case '@inspections/EDIT_INSPECTION': {
    //   return produce(state, draft => {
    //     draft.vistorias[action.payload.index] = action.payload.inspection;
    //   });
    // }
    case '@inspections/REMOVE_RECIPIENT': {
      return produce(state, draft => {});
    }
    default:
      return state;
  }
}
