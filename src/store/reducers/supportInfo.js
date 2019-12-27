import { ActionTypes } from '../actions/supportInfo';
import { tipoRecipiente, tipoColetor, situacaoUnidade } from '../../config/enumerate';


// ENUMERATE
import { tipoImovel } from '../../config/enumerate';

// OBJETOS
const createQuarteirao = (idQuarteirao, arrayImovel) => {
  return { idQuarteirao, imovel: arrayImovel }
}

const createImovel = (idImovel, numero, sequencia, tipoImovel, complemento, responsavel, long, lat) => {
  return { idImovel, numero, sequencia, tipoImovel, complemento, responsavel, long, lat }
}

const INITIAL_STATE = {
  form_vistoria: {
    findImovel: {
      idQuarteirao: -1,
      indexQuarteirao: -1
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

    amostra: [
      {
        idAmostra: "1.5.1",
        tipoRecipiente: tipoRecipiente[0],
        unidade: [
          {
            idUnidade: "1.5.1.1",
            tipoColetor: tipoColetor[0],
            situacao: situacaoUnidade[0]
          },
        ]
      },
      {
        idAmostra: "1.5.2",
        tipoRecipiente: tipoRecipiente[1],
        unidade: [
          {
            idUnidade: "1.5.2.1",
            tipoColetor: tipoColetor[0],
            situacao: situacaoUnidade[0]
          },
          {
            idUnidade: "1.5.2.2",
            tipoColetor: tipoColetor[0],
            situacao: situacaoUnidade[0]
          },
          {
            idUnidade: "1.5.2.3",
            tipoColetor: tipoColetor[0],
            situacao: situacaoUnidade[0]
          },
        ]
      }
    ]
  },
  quarteirao: [
    createQuarteirao(
      1,
      [
        createImovel( 2, 3, -1, tipoImovel[0], "DCOMP", "Daniel", -10.922438, -37.103766 ),
        createImovel( 6, 3, 1, tipoImovel[1], "DCOMP Antigo", "Daniel", -10.923907, -37.101415 ),
        createImovel( 7, 10, -1, tipoImovel[0], "Didática I", "UFS", -10.925682, -37.103215 ),
        createImovel( 8, 11, -1, tipoImovel[0], "Didática II", "UFS", -10.925229, -37.103233 ),
        createImovel( 9, 12, -1, tipoImovel[0], "Didática III", "UFS", -10.924725, -37.103224 ),
        createImovel( 10, 13, -1, tipoImovel[0], "Didática IV", "UFS", -10.924297, -37.103268 ),
        createImovel( 11, 14, -1, tipoImovel[0], "Didática V", "UFS", -10.925015, -37.104049 ),
        createImovel( 12, 15, -1, tipoImovel[0], "Didática VI", "UFS", -10.925696, -37.103947 ),
        createImovel( 13, 16, -1, tipoImovel[0], "Didática VII", "UFS", -10.929331, -37.102639 ),
        createImovel( 14, 17, -1, tipoImovel[0], "Departamento de Engenharia Mecânica", "DEMEC/UFS", -10.922793, -37.104079 ),
        createImovel( 15, 18, -1, tipoImovel[0], "Departamento de Morfologia", "DMO/UFS", -10.922247, -37.102072 ),
        createImovel( 16, 19, -1, tipoImovel[0], "Departamento de Fisiologia", "DFS/UFS", -10.922691, -37.102023 ),
      ]
    ),
    createQuarteirao(
      2,
      [
        createImovel( 3, 4, -1, tipoImovel[3], "BICEN", "Gia", -10.926382, -37.100958),
      ]
    ),
    createQuarteirao(
      3,
      [
        createImovel( 4, 5, -1, tipoImovel[3], "RESUN", "Stefano", -10.926356, -37.102154),
      ]
    ),
    createQuarteirao(
      4,
      [
        createImovel( 5, 6, -1, tipoImovel[2], "Softeam", "Marlene", -10.922522, -37.103957),
      ]
    ),
  ]
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

      return {
        ...state,
        form_vistoria: form_vistoria
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

      return {
        ...state,
        form_vistoria: form_vistoria
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

    default: {
      return state;
    }
  }
}
