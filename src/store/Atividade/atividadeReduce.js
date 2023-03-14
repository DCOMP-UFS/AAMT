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
  fl_loading: false,
  atividade: {},
  index: -1,
  created: null,
  updated: null,
  locais: [],
  estratos: [],
  finished: null,
  planned:null,
  getActivitiesOfCity:null,
  searchResponsabilityActivities:false,
}

export default function Atividade(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ATIVIDADES:
      return {
        ...state,
        atividades: action.payload.activities,
        searchResponsabilityActivities: false,
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
        rota_equipe,
        fl_loading: false
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

    case ActionTypes.RESET_TOGGLE_LADO: {
      let rota_equipe       = state.rota_equipe;

      for(var indexQuarteirao = 0; indexQuarteirao < rota_equipe.length; indexQuarteirao++){
        var quarteirao = rota_equipe[ indexQuarteirao ]
        for(var indexLado = 0; indexLado < quarteirao.lados.length; indexLado++){
          rota_equipe[ indexQuarteirao ].lados[ indexLado ].selected = false;
        }
      }
      //rota_equipe[ indexQuarteirao ].lados[ indexLado ].selected = !selected;

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
              //tentar false mais tarde
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

    case ActionTypes.GET_ACTIVITIES_OF_CITY_SUCCESS: {
      return {
        ...state,
        atividades: action.payload.atividades,
        getActivitiesOfCity: true
      }
    }

    case ActionTypes.GET_ACTIVITIES_OF_CITY_FAIL: {
      return {
        ...state,
        getActivitiesOfCity: false
      }
    }

    case ActionTypes.GET_ACTIVITIES_OF_CITY_RESET: {
      return {
        ...state,
        getActivitiesOfCity: null
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
        locais: action.payload.locaisSelecionados,
        flEquipe: false
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
        estrato: action.payload.estrato.map( e => {return {locais: e.locais, dataIndex: e.dataIndex} })
      }

      equipes = [...equipes, equipe];

      let estratos = state.estratos;

      //action.payload.estrato é uma lista com um unico elemento
      //este elemento é o estrato selecionado para a equipe
      action.payload.estrato
        .forEach(
          e => estratos[ e.dataIndex ] = { ...estratos[ e.dataIndex ], flEquipe: true }
        );

      return {
        ...state,
        equipes,
        estratos,
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

      //Remove a equipe que possui o estrato que será deletado
      //O atributo e.estrato[0].dataIndex indica a posição do estrato da equipe em relação a lista de estratos existentes
      equipes = equipes.filter( e =>  e.estrato[0].dataIndex != action.payload.index )
      
      // Deletando estrato
      estratos.splice( action.payload.index, 1 );
      
      //Na linha anterior foi removido um estrato na lista, por isso é necessario atualizar o dataIndex
      //dos estratos das equipes. Lembrando que o dataIndex indica a posição do estrato da equipe em relação
      //a lista dos extratos existentes
      equipes.forEach( (e,index) => {
        if(e.estrato[0].dataIndex > action.payload.index)
          equipes[index].estrato[0].dataIndex -= 1
      })

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
      let estratos = state.estratos
      const lEquipe = equipes[ index ].estrato[0].locais;
      const estrato_equipe = equipes[ index ].estrato[0]

      let locais = state.locais;
      lEquipe.forEach( l => {
        locais[ l.dataIndex ] = { ...locais[ l.dataIndex ], flEquipe: false }
      });

      //libera o estrato da equipe que será deletada para que possa
      //se escolhida por outra equipe
      estratos[estrato_equipe.dataIndex].flEquipe = false

      equipes.splice( index, 1 );

      return {
        ...state,
        estratos,
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

    case ActionTypes.FINISH_ACTIVITY_SUCCESS: {
      return {
        ...state,
        finished: true
      }
    }

    case ActionTypes.FINISH_ACTIVITY_FAIL: {
      return {
        ...state,
        finished: false
      }
    }

    case ActionTypes.FINISH_ACTIVITY_RESET: {
      return {
        ...state,
        finished: null
      }
    }

    case ActionTypes.PLAN_ACTIVITY_SUCCESS: {
      return {
        ...state,
        planned: true
      }
    }

    case ActionTypes.PLAN_ACTIVITY_FAIL: {
      return {
        ...state,
        planned: false
      }
    }

    case ActionTypes.PLAN_ACTIVITY_RESET: {
      return {
        ...state,
        planned: null
      }
    }

    case ActionTypes.SEARCHING_RESPONSABILITY_ACTIVITIES: {
      return {
        ...state,
        searchResponsabilityActivities: true
      }
    }

    case ActionTypes.GET_RESPONSABILITY_ACTIVITIES_FAIL: {
      return {
        ...state,
        searchResponsabilityActivities: false
      }
    }

    default:
      return {...state};
  }
}
