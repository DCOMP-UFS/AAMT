import { ActionTypes } from './ruaActions';
import { Rua } from '../../config/models/index';

const INITIAL_STATE = {
  rua: new Rua()
}

export default function Quarteirao( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_RUA:
      return {
        ...state,
        rua: action.payload.rua
      };

    default:
      return { ...state };
  }
}
