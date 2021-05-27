import { ActionTypes } from './imovelActions';

const INITIAL_STATE = {
  imovel: {},
  imoveis: [],
  reload: false
}

export default function Imovel( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_IMOVEIS:
      return {
        ...state,
        imoveis: action.payload.imoveis,
        reload: !state.reload
      };

    case ActionTypes.SET_IMOVEL:
      return {
        ...state,
        imovel: action.payload.imovel,
        reload: !state.reload
      };

    default:
      return { ...state };
  }
}
