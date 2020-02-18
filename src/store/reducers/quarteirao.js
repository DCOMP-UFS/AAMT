import { ActionTypes } from '../actions/QuarteiraoActions';

const INITIAL_STATE = {
  quarteirao: {},
  quarteiroes: [],
  created: null,
  updated: null
}

export default function quarteirao(state = INITIAL_STATE, action){
  switch( action.type ) {
    case ActionTypes.GET_BLOCK_BY_CITY_SUCCESS: {
      return {
        ...state,
        quarteiroes: action.payload.quarteiroes
      }
    }

    case ActionTypes.GET_BY_ID_SUCCESS: {
      return {
        ...state,
        quarteirao: action.payload.quarteirao
      }
    }

    case ActionTypes.CREATE_CITY_BLOCK_SUCCESS: {
      let quarteiroes = state.quarteiroes;

      const quarteirao = action.payload.quarteirao;

      quarteiroes = [quarteirao, ...quarteiroes];

      return {
        ...state,
        quarteiroes,
        created: true
      }
    }

    case ActionTypes.ADD_HOUSE_SUCCESS: {
      let quarteirao = state.quarteirao;
      const imovel = action.payload.imovel;

      const lados = quarteirao.lados.map( l => {
        if( imovel.lado_id === l.id ) {
          l.imoveis = [ ...l.imoveis, imovel ]
        }

        return( l );
      });

      quarteirao.lados = lados;

      return {
        ...state,
        quarteirao,
        updated: true
      }
    }

    case ActionTypes.DELETE_HOUSE_SUCCESS: {
      let quarteirao = state.quarteirao;
      const { imovel_id, lado_id } = action.payload;

      const lados = quarteirao.lados.map( l => {
        if( lado_id === l.id ) {
          const imoveis = l.imoveis.filter( i => i.id !== imovel_id );

          l.imoveis = imoveis;
        }

        return( l );
      });

      quarteirao.lados = lados;

      return {
        ...state,
        quarteirao,
        updated: !state.updated
      }
    }

    case ActionTypes.UPDATE_HOUSE_SUCCESS: {
      let quarteirao = state.quarteirao;
      const imovel = action.payload.imovel;

      const indexLado = quarteirao.lados.findIndex( l => l.id === imovel.lado_id );
      const index = quarteirao.lados[indexLado].imoveis.findIndex( i => i.id === imovel.id );
      quarteirao.lados[indexLado].imoveis[ index ] = imovel;

      return {
        ...state,
        quarteirao,
        updated: !state.updated
      }
    }

    case ActionTypes.CLEAR_CREATE_CITY_BLOCK: {
      return {
        ...state,
        created: null
      }
    }

    case ActionTypes.CLEAR_UPDATE_CITY_BLOCK: {
      return {
        ...state,
        created: null
      }
    }

    default:
      return state;
  }
}
