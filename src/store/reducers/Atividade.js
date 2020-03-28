import { ActionTypes } from '../actions/AtividadeActions';

const INITIAL_STATE = {
  atividade: {},
  atividades: [],
  index: -1,
  created: null,
  updated: null,
  reload: false,
  locais: [],
  estratos: [],
  equipes: []
}

export default function Atividade(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITIES_OF_CITY_SUCCESS: {
      return {
        ...state,
        atividades: action.payload.atividades
      }
    }

    case ActionTypes.GET_ACTIVITIE_BY_ID_SUCCESS: {
      return {
        ...state,
        atividade: action.payload.atividade
      }
    }

    case ActionTypes.GET_ACTIVITIES_BY_CITY_SUCCESS: {
      return {
        ...state,
        atividades: action.payload.atividades
      }
    }

    case ActionTypes.GET_LOCATIONS_SUCCESS: {
      return {
        ...state,
        locais: action.payload.locais
      }
    }

    case ActionTypes.ADD_ESTRATO: {
      let estratos = state.estratos
      const estrato = {
        locais: action.payload.locaisSelecionados
      }

      estratos = [...estratos, estrato];

      return {
        ...state,
        locais: action.payload.locais,
        estratos
      }
    }

    case ActionTypes.ADD_EQUIPE: {
      let equipes = state.equipes
      const equipe = {
        membros: action.payload.membros,
        supervisor: action.payload.supervisor
      }

      equipes = [...equipes, equipe];

      return {
        ...state,
        equipes
      }
    }

    case ActionTypes.REMOVE_ESTRATO: {
      let estratos = state.estratos;
      let locais = state.locais;

      const l = estratos[ action.payload.index ].locais;
      locais = [...locais, ...l];

      estratos.splice( action.payload.index, 1 );

      return {
        ...state,
        locais,
        estratos
      }
    }


    case ActionTypes.REMOVE_EQUIPE: {
      let equipes = state.equipes;
      equipes.splice( action.payload.index, 1 );

      return {
        ...state,
        equipes,
        reload: !state.reload
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
