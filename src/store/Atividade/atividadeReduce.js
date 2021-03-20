import { ActionTypes } from './atividadeActions';

const INITIAL_STATE = {
  atividades: [],
  indexAtividade: -1,
  indexEquipe: -1,
  indexMembro: -1,
  equipes: [],
  reload: false
}

export default function Vistoria(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ATIVIDADES:
      return {
        ...state,
        atividades: action.payload.activities,
        reload: !state.reload
      };

    case ActionTypes.SET_EQUIPES:
      return {
        ...state,
        equipes: action.payload.equipes
      };

    case ActionTypes.SET_INDEX:
      return {
        ...state,
        indexAtividade: action.payload.index
      };

    case ActionTypes.SET_INDEX_EQUIPE:
      return {
        ...state,
        indexEquipe: action.payload.index
      };

  case ActionTypes.SET_INDEX_MEMBRO:
    return {
      ...state,
      indexMembro: action.payload.index
    };

  case ActionTypes.TOGGLE_LADO: {
    let equipes           = state.equipes;
    const indexEquipe     = state.indexEquipe,
          indexQuarteirao = action.payload.indexQuarteirao,
          indexLado       = action.payload.indexLado,
          selected        = equipes[ indexEquipe ].quarteiroes[ indexQuarteirao ].lados[ indexLado ].selected;

    equipes[ indexEquipe ].quarteiroes[ indexQuarteirao ].lados[ indexLado ].selected = !selected;

    return {
      ...state,
      equipes,
      reload: !state.reload
    };
  }

    default:
      return {...state};
  }
}
