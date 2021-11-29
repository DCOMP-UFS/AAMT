import { ActionTypes } from './trabalhoDiarioActions';

const INITIAL_STATE = {
  trabalhos: [],
  trabalhosDiario: []
}

export default function Atividade( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_TRABALHOS:
      return {
        ...state,
        trabalhos: action.payload.trabalhos
      };

    case ActionTypes.GET_BY_USER: {
      return {
        ...state,
        trabalhosDiario: action.payload.dailyJobs
      }
    }

    case ActionTypes.ADD_TRABALHO_DIARIO:
      return {
        ...state,
        trabalhosDiario: state.trabalhosDiario.push( action.payload.trabalhoDiario )
      }

    case ActionTypes.GET_TRABALHO_DIARIO: {
      // Simulando consulta na API
      const trabalhosDiario = [{
          id: 1,
          dataInicio: "2019-11-29 10:47:00",
          dataFim: "",
          vistorias: []
        },
        {
          id: 2,
          dataInicio: "2019-11-29 10:47:00",
          dataFim: "",
          vistorias: []
        }
      ];

      return { ...state,  trabalhosDiario: trabalhosDiario }
    }

    case ActionTypes.GET_DAILY_WORK_BY_ID: {
      return {
        ...state,
        trabalhoDiario: action.payload.dailyJob
      }
    }

    default:
      return { ...state };
  }
}
