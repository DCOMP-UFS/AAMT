import { ActionTypes } from './rotaActions';

const INITIAL_STATE = {
  fl_rota_planejada: undefined
}

export default function Rota(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ROTA_PLANEJADA:
      return {
        ...state,
        fl_rota_planejada: action.payload.fl_rota_planejada,
      };

    default:
      return {...state};
  }
}
