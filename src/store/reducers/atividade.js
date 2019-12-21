import { ActionTypes } from '../actions/atividade';

const INITIAL_STATE = {
  atividadeAtiva: 0,
  atividades: [
    {
      id: 1,
      objetivo: "LI+T = Lev. de índice + Tratamento" ,
      local: { id: 1, titulo: "Localidade A", sigla: "Loc.A" },
      periodo: {
        dataInicio: new Date(Date.parse("Nov 18, 2019")).toLocaleString(),
        dataFim: new Date(Date.parse("Nov 25, 2019")).toLocaleString()
      },
      equipe: [
        { id: 1, nome: "Capitão", funcao: "supervisor" },
        { id: 2, nome: "Recruta", funcao: "tecnico" },
        { id: 3, nome: "Kowalski", funcao: "tecnico" },
        { id: 4, nome: "Rico", funcao: "tecnico" },
      ]
    },
    {
      id: 2,
      objetivo: "PPE + TPE = Pesquisa e Tratamento" ,
      local: { id: 2, titulo: "Localidade B", sigla: "Loc.B" },
      periodo: {
        dataInicio: new Date(Date.parse("Nov 18, 2019")).toLocaleString(),
        dataFim: new Date(Date.parse("Nov 25, 2019")).toLocaleString()
      },
      equipe: [
        { id: 1, nome: "Capitão", funcao: "supervisor" },
        { id: 2, nome: "Recruta", funcao: "tecnico" },
        { id: 3, nome: "Kowalski", funcao: "tecnico" },
        { id: 4, nome: "Rico", funcao: "tecnico" },
      ]
    }
  ]
};

export default function atividade(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_ATIVIDADE_ATIVA:
      return {
        ...state,
        atividadeAtiva: action.payload.atividadeAtiva
      }
    default:
      return state;
  }
}
