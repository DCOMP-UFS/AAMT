import { ActionTypes } from './quarteiraoActions';
import { Imovel } from '../../config/models/index';

const INITIAL_STATE = {
  quarteiroes : [],
  quarteirao  : {},
  lados       : [],
  reload      : false,
  imovel      : new Imovel(),
  updated     : false,
  created     : false,
  insertedZone: null,
  removedZone:  null,
  updatedZone:  null
}

export default function Quarteirao( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.ADD_QUARTEIRAO_SUCCESS: {
      let quarteiroes = state.quarteiroes;

      const quarteirao = action.payload.quarteirao;

      quarteiroes = [ quarteirao, ...quarteiroes ];

      return {
        ...state,
        quarteiroes,
        created: true
      }
    }

    case ActionTypes.SET_QUARTEIROES:
      return {
        ...state,
        quarteiroes: action.payload.quarteiroes,
        reload: !state.reload
      };

    case ActionTypes.SET_LADOS:
      return {
        ...state,
        lados: action.payload.lados,
        reload: !state.reload
      };

    case ActionTypes.SET_IMOVEL_EDITAR:
      return {
        ...state,
        imovel: action.payload.imovel
      };

    case ActionTypes.SET_UPDATED:
      return {
        ...state,
        updated: action.payload.updated
      };

    case ActionTypes.SET_CREATED:
      return {
        ...state,
        created: action.payload.created
      };

    case ActionTypes.EXCLUIR_LADO_REDUCE: {
      let quarteirao        = state.quarteirao;
      const excluirLadoId   = action.payload.excluirLadoId;
      const addImovelLadoId = action.payload.addImovelLadoId;
      const excluirIndex    = quarteirao.lados.findIndex( l => l.id == excluirLadoId );
      const addIndex        = quarteirao.lados.findIndex( l => l.id == addImovelLadoId );

      //Significa que não houve transferencia de imoveis
      //do lado excluido para outro lado ainda existente
      if(addImovelLadoId == -1)
        quarteirao.lados.splice( excluirIndex, 1 )
      else{
        if( excluirIndex != -1 ) {
          quarteirao.lados[ addIndex ].imoveis = [ 
            ...quarteirao.lados[ addIndex ].imoveis,
            ...quarteirao.lados[ excluirIndex ].imoveis,
          ];
          
          quarteirao.lados.splice( excluirIndex, 1 );
        }
      }

      return {
        ...state,
        quarteirao,
        reload: !state.reload
      };
    }

    case ActionTypes.SET_QUARTEIRAO:
      return {
        ...state,
        quarteirao: action.payload.quarteirao,
        reload: !state.reload
      };
    
    case ActionTypes.EXCLUIR_IMOVEL_REDUCE: {
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
    case ActionTypes.INSERIR_QUARTEIRAO_ZONA_SUCCESS: {

      const updatedZone = action.payload.updatedZone;
      if(updatedZone)
        return {...state,updatedZone:true}
      else
        return {...state,insertedZone:true}
    }

    case ActionTypes.INSERIR_QUARTEIRAO_ZONA_FAIL: {
      const updatedZone = action.payload.updatedZone;
      if(updatedZone)
        return {...state,updatedZone:false}
      else
        return {...state,insertedZone:false}
    }

    case ActionTypes.INSERIR_QUARTEIRAO_ZONA_RESET: {
      const updatedZone = action.payload.updatedZone;
      if(updatedZone)
        return {...state,updatedZone:null}
      else
        return {...state,insertedZone:null}
    }

    case ActionTypes.REMOVER_QUARTEIRAO_ZONA_SUCCESS: {
      return {
        ...state,
        removedZone:true
      }
    }

    case ActionTypes.REMOVER_QUARTEIRAO_ZONA_FAIL: {
      return {
        ...state,
        removedZone:false
      }
    }

    case ActionTypes.REMOVER_QUARTEIRAO_ZONA_RESET: {
      return {
        ...state,
        removedZone:null
      }
    }

    default:
      return { ...state };
  }
}
