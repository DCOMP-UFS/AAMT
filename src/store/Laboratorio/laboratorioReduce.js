import { ActionTypes } from './laboratorioActions';

const INITIAL_STATE = {
  laboratorio         : null,
  laboratorios: [],
  reload      : false,
  created     : false,
  updated     : false
}

export default function Laboratorio( state = INITIAL_STATE, action ) {
  switch( action.type ) {    
    case ActionTypes.SET_LABORATORY: {
      return{
        ...state,
        laboratorio: action.payload.laboratorio,
        reload     : !state.reload
      };
    }

    case ActionTypes.SET_LABORATORIOS: {
      return {
        ...state,
        laboratorios: action.payload.laboratorios,
        reload      : !state.reload
      };
    }

    case ActionTypes.CREATE_LABORATORY_SUCCESS: {
      let laboratorios  = state.laboratorios
      const laboratorio = {
        id              : action.payload.data.id,
        cnpj            : action.payload.data.cnpj, 
        nome            : action.payload.data.nome, 
        endereco        : action.payload.data.endereco, 
        tipoLaboratorio : action.payload.data.tipoLaboratorio,
        ativo           : action.payload.data.ativo,
        createdAt       : action.payload.data.createdAt,
        updatedAt       : action.payload.data.updatedAt
      }
      laboratorios = [ laboratorio, ...laboratorios ];
      return{
        ...state,
        laboratorios,
        created: true
      }
    }
    
    case ActionTypes.UPDATE_LABORATORY_SUCCESS: {
      let laboratorios  = state.laboratorios;
      const id        = action.payload.data.id;
      var index         = laboratorios.findIndex( l => l.id === id );
      const laboratorio = {
        id              : action.payload.data.id,
        cnpj            : action.payload.data.cnpj,
        nome            : action.payload.data.nome,
        endereco        : action.payload.data.endereco,
        tipoLaboratorio : action.payload.data.tipoLaboratorio,
        ativo           : action.payload.data.ativo,
        createdAt       : action.payload.data.createdAt,
        createdAt       : action.payload.data.createdAt,
        updatedAt       : action.payload.data.updatedAt
      }
     
      laboratorios[ index ] = laboratorio;
      laboratorios          = [ ...laboratorios ]
      return{
        ...state,
        laboratorios,
        reload: true,
      }
    }

    case ActionTypes.SET_UPDATED: {
      return{
        ...state,
        updated: action.payload.data,
      }
    }

    default:
      return {...state};
  }
}
