import produce from 'immer';

const INITIAL_STATE = {
  form: undefined,
  indexes: {
    blockIndex: -1,
    streetIndex: -1,
    propertyIndex: -1,
    recipientIndex: -1,
  },
  type: '',
  recipientForm: undefined,
};

export default function inspectionForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@inspectionform/LOAD_INSPECTION_FORM': {
      return produce(state, draft => {
        draft.type = 'insert';
        draft.indexes.propertyIndex = action.payload.propertyIndex;
        draft.form = {
          situacaoVistoria: '',
          pendencia: '',
          horaEntrada: '',
          recipientes: [],
          justificativa: '',
        };
      });
    }
    case '@inspectionform/LOAD_INSPECTION_EDIT_FORM': {
      return produce(state, draft => {
        draft.type = 'edit';
        draft.indexes.propertyIndex = action.payload.propertyIndex;
        draft.form = action.payload.inspection;
      });
    }
    case '@inspectionform/SAVE_STATUS_FORM': {
      return produce(state, draft => {
        draft.form.situacaoVistoria = action.payload.status;
        draft.form.pendencia = action.payload.pendency;
        draft.form.horaEntrada = action.payload.startHour;
        draft.form.justificativa = action.payload.justification;
      });
    }
    case '@inspectionform/CHANGE_BLOCK_INDEX': {
      return produce(state, draft => {
        draft.indexes.blockIndex = action.payload.blockIndex;
      });
    }
    case '@inspectionform/CHANGE_STREET_INDEX': {
      return produce(state, draft => {
        draft.indexes.streetIndex = action.payload.streetIndex;
      });
    }
    case '@inspectionform/CHANGE_PROPERTY_INDEX': {
      return produce(state, draft => {
        draft.indexes.propertyIndex = action.payload.propertyIndex;
      });
    }
    case '@inspectionform/CHANGE_RECIPIENT_INDEX': {
      return produce(state, draft => {
        draft.indexes.recipientIndex = action.payload.recipientIndex;
      });
    }
    case '@inspectionform/LOAD_RECIPIENT_FORM': {
      return produce(state, draft => {
        draft.indexes.recipientIndex = action.payload.recipientIndex;
        draft.recipientForm = {
          fl_comFoco: undefined,
          tipoRecipiente: '',
          fl_tratado: undefined,
          fl_eliminado: undefined,
          sequencia: '',
          tratamento: {
            quantidade: 0,
            tecnica: 0,
          },
          amostras: [],
          idUnidade: '',
        };
      });
    }
    case '@inspectionform/ADD_RECIPIENT_TO_FORM': {
      return produce(state, draft => {
        draft.form.recipientes.push(action.payload.recipient);
      });
    }
    case '@inspectionform/EDIT_RECIPIENT': {
      return produce(state, draft => {
        const { recipient, recipientIndex } = action.payload;
        draft.form.recipientes[recipientIndex] = recipient;
      });
    }
    case '@inspectionform/DELETE_RECIPIENT': {
      return produce(state, draft => {
        const { recipientSequence } = action.payload;
        draft.form.recipientes = draft.form.recipientes.filter(
          p => p.sequencia !== recipientSequence
        );
      });
    }
    default:
      return state;
  }
}
