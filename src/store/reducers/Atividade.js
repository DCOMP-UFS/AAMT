import { ActionTypes } from '../actions/AtividadeActions';

const INITIAL_STATE = {
  atividade: {},
  atividades: [],
  index: -1,
  created: null,
  updated: null,
  reload: false
}

export default function Atividade(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITIES_OF_CITY_SUCCESS: {
      return {
        ...state,
        atividades: action.payload.atividades
      }
    }

    case ActionTypes.GET_ACTIVITIES_BY_CITY_SUCCESS: {
      return {
        ...state,
        atividades: action.payload.atividades
      }
    }

    case ActionTypes.CREATE_ACTIVE_SUCCESS: {
      let atividades = state.atividades;

      const atividade = action.payload.atividade;

      atividades = [atividade, ...atividades];

      return {
        ...state,
        atividades,
        created: true
      }
    }

    default:
      return { ...state }
  }
}
