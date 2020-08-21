import { ActionTypes } from '../actions/DefinirRotaCacheActions';

const INITIAL_STATE = {
  data: "",
  flConsultado: false,
  planejamento: []
}

export default function Atividade(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LIMPAR_CACHE_PLANEJAMENTO: {
      return {
        ...state,
        data: INITIAL_STATE.data,
        flConsultado: INITIAL_STATE.flConsultado,
        planejamento: INITIAL_STATE.planejamento
      }
    }

    case ActionTypes.SALVAR_ROTAS: {
      const { planejamento: plain } = action.payload;
      let planejamento = state.planejamento;

      if( !planejamento[0] ) {
        planejamento[0] = plain;
      } else {
        planejamento.forEach(( p, index ) => {
          if( p.idEquipe === plain.idEquipe )
            planejamento[ index ] = plain;
        });
      }

      return {
        ...state,
        planejamento
      }
    }

    case ActionTypes.CONSULTAR_PLANEJAMENTO_SUCCESS: {
      return {
        ...state,
        data: new Date().toLocaleDateString('en-US'),
        flConsultado: true,
        planejamento: action.payload.planejamento
      }
    }

    default:
      return state;
  }
}
