import { ActionTypes } from '../actions/supportInfo';
import { tipoRecipiente, tipoColetor, situacaoUnidade } from '../../config/enumerate';

const createQuarteirao = (idQuarteirao, arrayImovel) => {
  return { idQuarteirao, imovel: arrayImovel }
}

const createImovel = (idImovel, numero, complemento, responsavel, long, lat) => {
  return { idImovel, numero, complemento, responsavel, long, lat }
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
        createImovel( 2, 3, "DCOMP", "Vitaly", -10.922438, -37.103766),
        createImovel( 6, 7, "DCOMP Antigo", "Vitaly", -10.923907, -37.101415),
      ]
    ),
    createQuarteirao(
      2,
      [
        createImovel( 3, 4, "BICEN", "Gia", -10.926382, -37.100958),
      ]
    ),
    createQuarteirao(
      3,
      [
        createImovel( 4, 5, "RESUN", "Stefano", -10.926356, -37.102154),
      ]
    ),
    createQuarteirao(
      4,
      [
        createImovel( 5, 6, "Softeam", "Marlene", -10.922522, -37.103957),
      ]
    ),
  ]
};

export default function supportInfo(state = INITIAL_STATE, action) {
  switch( action.type ){
    case ActionTypes.VISTORIA_SET_IMOVEL:
    {
      let form_vistoria = state.form_vistoria;
      form_vistoria.imovel.index = action.payload.index;

      const imovel = createImovel(
        action.payload.imovel.idImovel,
        action.payload.imovel.numero,
        action.payload.imovel.complemento,
        action.payload.imovel.responsavel,
        action.payload.imovel.long,
        action.payload.imovel.lat
      );

      form_vistoria.imovel.idImovel = action.payload.imovel.idImovel;
      form_vistoria.imovel = imovel;

      return {
        ...state,
        form_vistoria: form_vistoria
      }
    }

    case ActionTypes.HANDLE_QUARTEIRAO:
    {

      let form_vistoria = state.form_vistoria;

      form_vistoria.findImovel.idQuarteirao = action.payload.idQuarteirao;
      form_vistoria.findImovel.indexQuarteirao = action.payload.indexQuarteirao;

      return {
        ...state,
        form_vistoria: form_vistoria
      }
    }

    default:
    {
      return state;
    }
  }
}
