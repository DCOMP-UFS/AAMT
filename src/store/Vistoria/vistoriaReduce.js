import { ActionTypes } from './vistoriaActions';

const INITIAL_STATE = {
  imovel: {
    complemento: "",
    createdAt: "",
    dataIndex: undefined,
    id: undefined,
    lado_id: undefined,
    lat: "",
    lng: "",
    numero: undefined,
    quarteirao: undefined,
    responsavel: "",
    rua: "",
    sequencia: null,
    tipoImovel: undefined,
    updatedAt: "",
  }
}

export default function Vistoria(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_IMOVEL:
      return {
        ...state,
        imovel: action.payload.imovel
      };
    default:
      return {...state};
  }
}
