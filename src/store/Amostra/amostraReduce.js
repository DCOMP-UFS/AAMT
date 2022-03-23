import { ActionTypes } from './amostraActions';

const INITIAL_STATE = {
  amostra: {},
  amostras: [],
  reload: false
}

export default function Amostra(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_AMOSTRAS:
      return {
        ...state,
        amostras: action.payload.amostras,
        reload: !state.reload
      };

    case ActionTypes.SET_AMOSTRA:
      return {
        ...state,
        amostra: action.payload.amostra
      };

    case ActionTypes.SET_AMOSTRAS_ENVIADAS:
      var index;
      let amostras = action.payload.amostras.data
      amostras.forEach( ( amostra, i ) => {
        index = state.amostras.findIndex( a => a.id === amostra.id );
        state.amostras[ index ] = amostra;
      });
      state.amostras          = [ ...state.amostras ]
      return{
        ...state,
        amostras: state.amostras,
        reload: true,
      }

    default:
      return {...state};
  }
}
