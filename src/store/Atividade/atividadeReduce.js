import { ActionTypes } from './atividadeActions';

const INITIAL_STATE = {
  atividades: [],
  indexAtividade: -1,
  indexEquipe: -1,
  indexMembro: -1,
  equipes: [],
  // Lista de quarteirões com as situações dos lados
  rota_equipe: [],
  reload: false,
  fl_loading: false
}

export default function Atividade(state = INITIAL_STATE, action) {
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

    case ActionTypes.SET_ROTA_EQUIPE:
      let rota_equipe = action.payload.quarteiroes;
      const equipes = state.equipes,
            indexEquipe = state.indexEquipe,
            indexMembro = state.indexMembro;

      rota_equipe = rota_equipe.map( quarteirao => {
        let q = quarteirao;

        q.lados = q.lados.map( lado => {
          let l = lado;

          if( indexEquipe > -1 && indexMembro > -1 && lado.situacao === 4 ) {
            if( equipes[ indexEquipe ].membros[ indexMembro ].usuario_id === lado.usuario_id )
              l.selected = true;
          }

          return l;
        });

        return q;
      });

      return {
        ...state,
        rota_equipe
      };

    case ActionTypes.SET_INDEX:
      return {
        ...state,
        indexAtividade: action.payload.index
      };

    case ActionTypes.SET_FL_LOADING:
      return {
        ...state,
        fl_loading: action.payload.fl_loading
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
      let rota_equipe       = state.rota_equipe;
      const indexQuarteirao = action.payload.indexQuarteirao,
            indexLado       = action.payload.indexLado,
            selected        = rota_equipe[ indexQuarteirao ].lados[ indexLado ].selected;

      rota_equipe[ indexQuarteirao ].lados[ indexLado ].selected = !selected;

      return {
        ...state,
        rota_equipe,
        reload: !state.reload
      };
    }

    case ActionTypes.CHECAR_ROTA: {
      let rota_equipe = state.rota_equipe;
      const equipes = state.equipes,
            indexEquipe = state.indexEquipe,
            indexMembro = state.indexMembro;

      rota_equipe = rota_equipe.map( quarteirao => {
        let q = quarteirao;

        q.lados = q.lados.map( lado => {
          let l = lado;

          if( indexEquipe > -1 && indexMembro > -1 && lado.situacao === 4 ) {
            if( equipes[ indexEquipe ].membros[ indexMembro ].usuario_id === lado.usuario_id ) {
              l.selected = true;
            } else {
              l.selected = false;
            }
          }

          return l;
        });

        return q;
      });

      return {
        ...state,
        rota_equipe
      }
    }

    default:
      return {...state};
  }
}
