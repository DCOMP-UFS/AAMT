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
          p => p.imovel_id === action.payload.property_id
        );
        draft.vistorias[inspectionIndex].recipientes.push(
          action.payload.recipient
        );
        draft.sequenciaRecipiente++;
      });
    }
    default:
      return state;
  }
}
