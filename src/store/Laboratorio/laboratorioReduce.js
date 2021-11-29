import { ActionTypes } from './laboratorioActions';

const INITIAL_STATE = {
  laboratorios: [],
  reload: false
}

export default function Laboratorio(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.GET_LABS_BY_CITY_SUCCESS: {
      return {
          ...state,
          laboratorios: action.payload.laboratorios
      }
    }
    
    case ActionTypes.SET_LABORATORIOS:{
      return {
        ...state,
        laboratorios: action.payload.laboratorios,
        reload: !state.reload
      };
    }

    case ActionTypes.CREATE_LABORATORY_SUCCESS:{
      let laboratorios = state.laboratorios
      const laboratorio = {
        cnpj: action.payload.data.cnpj, 
        nome: action.payload.data.nome, 
        endereco: action.payload.data.endereco, 
        tipo_laboratorio: action.payload.data.tipo_laboratorio,
        created_at: action.payload.data.created_at,
        updated_at: action.payload.data.updated_at
        }
      laboratorios = [laboratorio, ...laboratorios]
      return{
        ...state,
        laboratorios,
        created: true
      }
    }
    
    case ActionTypes.UPDATE_LABORATORY_SUCCESS:{
      let laboratorios = state.laboratorios
      const values = action.payload.data.values
      const id = action.payload.data.cnpj_id
      var index = laboratorios.findIndex(l => l.cnpj == id)
      const laboratorio = {
        cnpj: values.cnpj,
        nome: values.nome,
        endereco: values.endereco,
        tipo_laboratorio: values.tipo_laboratorio,
        created_at: values.created_at,
        updated_at: new Date()
      }
     
      laboratorios[index] = laboratorio;
      laboratorios = [...laboratorios]
      return{
        ...state,
        laboratorios,
        updated: true,
      }
    }

    default:
      return {...state};
  }
}
