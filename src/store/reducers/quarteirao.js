// import { ActionTypes } from '../actions/imovel';
const createQuarteirao = (idQuarteirao, arrayImovel) => {
  return { idQuarteirao, imovel: arrayImovel }
}

const createImovel = (idImovel, numero, complemento, responsavel, long, lat) => {
  return { idImovel, numero, complemento, responsavel, long, lat }
}

const INITIAL_STATE = {
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
}

export default function quarteirao(state = INITIAL_STATE, actions){
  switch( actions.type ) {
    default:
      return state;
  }
}
