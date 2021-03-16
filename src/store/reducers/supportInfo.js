import { ActionTypes } from '../actions/supportInfo';

// ENUMERATE
import { tipoImovel } from '../../config/enumerate';

// OBJETOS
const createImovel = (idImovel, numero, sequencia, tipoImovel, complemento, responsavel, long, lat) => {
  return { idImovel, numero, sequencia, tipoImovel, complemento, responsavel, long, lat }
}

const createRecipiente = ( idRecipiente, tipoRecipiente, fl_eliminado, fl_tratado, fl_foco ) => {
  return { idRecipiente, tipoRecipiente, fl_eliminado, fl_tratado, fl_foco, unidade: [] }
}

const createUnidade = ( idUnidade, tipoColetor, situacao ) => {
  return { idUnidade, tipoColetor, situacao };
}

const INITIAL_STATE = {
  form_vistoria: {
    findImovel: {
      idQuarteirao: -1,
      indexQuarteirao: -1,
      selectImovel: false,
    },

    imovel: {
      index: -1,
      idImovel: -1,
      numero: -1,
      sequencia: -1,
      tipoImovel: "",
      complemento: "",
      responsavel: "",
      long: null,
      lat: null,
    },

    numRecipiente: 2,
    recipienteInspecionado: [],
  },
  quarteirao: [],
  tableSelection: {},
  imovelSelect: {}
};

export default function supportInfo(state = INITIAL_STATE, action) {
  switch( action.type ){
    case ActionTypes.SET_VISTORIA_IMOVEL: {
      let form_vistoria = state.form_vistoria;

      let imovel = createImovel(
        action.payload.imovel.idImovel,
        action.payload.imovel.numero,
        action.payload.imovel.sequencia,
        action.payload.imovel.tipoImovel,
        action.payload.imovel.complemento,
        action.payload.imovel.responsavel,
        action.payload.imovel.long,
        action.payload.imovel.lat
      );

      imovel = {
        index: action.payload.index,
        ...imovel,
      }
      form_vistoria.imovel = imovel;

      form_vistoria.findImovel.selectImovel = true;

      return {
        ...state,
        form_vistoria
      }
    }

    case ActionTypes.SET_IMOVEL_SELECT: {
      let form_vistoria = state.form_vistoria;

      let imovel = createImovel(
        action.payload.imovel.idImovel,
        parseInt( action.payload.imovel.numero ),
        parseInt( action.payload.imovel.sequencia ),
        action.payload.imovel.tipoImovel,
        action.payload.imovel.complemento,
        action.payload.imovel.responsavel,
        action.payload.imovel.long,
        action.payload.imovel.lat
      );

      imovel = {
        index: form_vistoria.imovel.index,
        ...imovel,
      }
      form_vistoria.imovel = imovel;

      form_vistoria.findImovel.selectImovel = true;

      return {
        ...state,
        form_vistoria
      }
    }

    case ActionTypes.HANDLE_QUARTEIRAO: {

      let form_vistoria = state.form_vistoria;

      form_vistoria.findImovel.idQuarteirao = action.payload.idQuarteirao;
      form_vistoria.findImovel.indexQuarteirao = action.payload.indexQuarteirao;

      return {
        ...state,
        form_vistoria: form_vistoria
      }
    }

    case ActionTypes.ADD_IMOVEL_QUARTEIRAO: {
      const indexQuarteirao = action.payload.indexQuarteirao;
      const imovel = action.payload.imovel;

      let quarteirao = state.quarteirao;
      quarteirao[indexQuarteirao].imovel.push(imovel);

      let form_vistoria = state.form_vistoria;

      form_vistoria.findImovel.idQuarteirao = quarteirao[indexQuarteirao].idQuarteirao;
      form_vistoria.findImovel.indexQuarteirao = indexQuarteirao;

      return {
        ...state,
        quarteirao,
        form_vistoria
      }
    }

    case ActionTypes.ADD_INSPECAO: {
      const idRecipiente = action.payload.idRecipiente;
      const tipoRecipiente = action.payload.tipoRecipiente;
      const fl_eliminado = action.payload.fl_eliminado;
      const fl_tratado = action.payload.fl_tratado;
      const fl_foco = action.payload.fl_foco;
      const unidade = action.payload.unidade;

      const recipiente = createRecipiente( idRecipiente, tipoRecipiente, fl_eliminado, fl_tratado, fl_foco, unidade );

      let form_vistoria = state.form_vistoria;
      form_vistoria.recipienteInspecionado.push( recipiente );
      form_vistoria.numRecipiente++;

      return {
        ...state,
        form_vistoria
      }
    }

    case ActionTypes.ADD_UNIDADE: {
      const idUnidade = action.payload.idUnidade;
      const tipoColetor = action.payload.tipoColetor;
      const situacao = action.payload.situacao;
      let form_vistoria = state.form_vistoria;

      const unidade = createUnidade( idUnidade, tipoColetor, situacao );

      const lastRecipiente = form_vistoria.recipienteInspecionado.length - 1;

      let listUnidade = form_vistoria.recipienteInspecionado[ lastRecipiente ].unidade;
      listUnidade.push(unidade);

      form_vistoria.recipienteInspecionado[ lastRecipiente ].unidade = listUnidade;

      return {
        ...state,
        form_vistoria,
      }
    }

    case ActionTypes.CHANGE_TABLE_SELECTED: {
      let tableSelection = state.tableSelection;
      const id = action.payload.id;
      const selected = action.payload.selected;

      tableSelection[id] = selected;
      return {
        ...state,
        tableSelection
      }
    }

    case ActionTypes.CHANGE_IMOVEL_SELECT: {
      const imovelSelect = action.payload;

      return {
        ...state,
        imovelSelect
      }
    }

    default: {
      return state;
    }
  }
}
