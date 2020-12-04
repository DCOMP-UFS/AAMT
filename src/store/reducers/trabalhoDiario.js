import { ActionTypes } from '../actions/trabalhoDiario';

const INITIAL_STATE = {
  // trabalhoDiario: {
  //   id: -1,
  //   dataInicio: "",
  //   dataFim: ""
  // },

  trabalhosDiario: []
};

export default function trabalhoDiario(state = INITIAL_STATE, action) {
  switch( action.type ) {
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

    case ActionTypes.GET_TRABALHO_DIARIO:
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

    default:
      return state;
  }
}
