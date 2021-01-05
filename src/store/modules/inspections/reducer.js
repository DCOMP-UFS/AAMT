import produce from 'immer';

const INITIAL_STATE = {
  trabalhoDiario_id: undefined,
  horaFim: undefined,
  sequenciaVistoria: 1,
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
    case '@inspections/EDIT_INSPECTION': {
      return produce(state, draft => {
        const inspectionIndex = draft.vistorias.findIndex(
          p => p.imovel.id === action.payload.property_id
        );
        draft.vistorias[inspectionIndex].situacaoVistoria =
          action.payload.inspection.situacaoVistoria;
        draft.vistorias[inspectionIndex].pendencia =
          action.payload.inspection.pendencia;
        if (action.payload.inspection.pendencia !== null) {
          draft.vistorias[inspectionIndex].recipientes = [];
        }
      });
    }
    case '@inspections/EDIT_RECIPIENT': {
      return produce(state, draft => {
        const inspectionIndex = draft.vistorias.findIndex(
          p => p.imovel.id === action.payload.property_id
        );
        const recipientIndex = draft.vistorias[
          inspectionIndex
        ].recipientes.findIndex(
          p => p.sequencia === action.payload.recipientSequence
        );
        draft.vistorias[inspectionIndex].recipientes[recipientIndex] =
          action.payload.recipient;
      });
    }
    case '@inspections/REMOVE_RECIPIENT': {
      return produce(state, draft => {
        const propertyIndex = action.payload.propertyIndex;
        const recipientSequence = action.payload.recipientSequence;

        draft.vistorias[propertyIndex].recipientes = state.vistorias[
          propertyIndex
        ].recipientes.filter(item => item.sequencia !== recipientSequence);
      });
    }
    // case '@activity/EDIT_PROPERTY': {
    //   return produce(state, draft => {
    //     const inspectionIndex = draft.vistorias.findIndex(
    //       p => p.imovel.id === action.payload.property_id
    //     );
    //     if (inspectionIndex > 0) {
    //       const { property } = action.payload;
    //       const currentProperty = draft.vistorias[inspectionIndex];
    //       currentProperty.numero = property.number;
    //       currentProperty.sequencia = property.sequence;
    //       currentProperty.responsável = property.responsible;
    //       currentProperty.complemento = property.complement;
    //       currentProperty.tipoImovel = property.propertyType;
    //     }
    //   });
    // }
    default:
      return state;
  }
}
