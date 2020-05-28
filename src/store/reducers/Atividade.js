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

      let locais = state.locais;
      action.payload.locaisSelecionados
        .forEach(
          l => locais[ l.dataIndex ] = {
            ...locais[ l.dataIndex ],
            flEstrato: true,
            flEquipe: false,
            dataIndex: l.dataIndex
          }
        );

      return {
        ...state,
        locais,
        estratos,
        reload: !state.reload
      }
    }

    case ActionTypes.ADD_EQUIPE: {
      let equipes = state.equipes
      const equipe = {
        membros: action.payload.membros,
        supervisor: action.payload.supervisor,
        locais: action.payload.locais
      }

      equipes = [...equipes, equipe];

      let locais = state.locais;
      action.payload.locais
        .forEach(
          l => locais[ l.dataIndex ] = { ...locais[ l.dataIndex ], flEquipe: true }
        );

      return {
        ...state,
        equipes,
        locais,
        reload: !state.reload
      }
    }

    case ActionTypes.REMOVE_ESTRATO: {
      let estratos = state.estratos;
      let locais = state.locais;
      let equipes = state.equipes;

      // Setando localidade como não utilizada por estrato e equipe
      const l = estratos[ action.payload.index ].locais;
      l.forEach( loc => {
        locais[ loc.dataIndex ] = { ...locais[ loc.dataIndex ], flEstrato: false, flEquipe: false }
      });

      // Removendo localidades das equipes
      equipes = equipes
        .map( e => {
          l.forEach( loc => {
            e.locais = e.locais.filter( eLoc => loc.id !== eLoc.id );
          });

          return e;
        })
        .filter( e => e.locais.length > 0 );

      // Deletando estrato
      estratos.splice( action.payload.index, 1 );

      return {
        ...state,
        locais,
        estratos,
        equipes,
        reload: !state.reload
      }
    }


    case ActionTypes.REMOVE_EQUIPE: {
      const index = action.payload.index;
      let equipes = state.equipes;
      const lEquipe = equipes[ index ].locais;

      let locais = state.locais;
      lEquipe.forEach( l => {
        locais[ l.dataIndex ] = { ...locais[ l.dataIndex ], flEquipe: false }
      });

      equipes.splice( index, 1 );

      return {
        ...state,
        equipes,
        locais,
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
