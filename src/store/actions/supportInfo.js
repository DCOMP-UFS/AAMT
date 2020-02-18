export const ActionTypes = {
  SET_VISTORIA_IMOVEL: "SET_VISTORIA_IMOVEL",
  SET_IMOVEL_SELECT: "SET_IMOVEL_SELECT",
  HANDLE_QUARTEIRAO: "HANDLE_QUARTEIRAO",
  ADD_IMOVEL_QUARTEIRAO: "ADD_IMOVEL_QUARTEIRAO",
  ADD_RECIPIENTE: "ADD_RECIPIENTE",
  ADD_INSPECAO: "ADD_INSPECAO",
  ADD_UNIDADE: "ADD_UNIDADE",
  CHANGE_TABLE_SELECTED: "CHANGE_TABLE_SELECTED",
  CHANGE_IMOVEL_SELECT: "CHANGE_IMOVEL_SELECT"
}

export const setVistoriaImovel = ( index, imovel ) => {
  return {
    type: ActionTypes.SET_VISTORIA_IMOVEL,
    payload: {
      index,
      imovel,
    }
  }
}

export const setImovelSelect = ( imovel ) => {
  return {
    type: ActionTypes.SET_IMOVEL_SELECT,
    payload: {
      imovel,
    }
  }
}

export const handleQuarteirao = ( idQuarteirao, indexQuarteirao ) => {
  return {
    type: ActionTypes.HANDLE_QUARTEIRAO,
    payload: {
      idQuarteirao,
      indexQuarteirao,
    }
  }
}

export const addImovelQuarteirao = ( indexQuarteirao, imovel ) => {
  return {
    type: ActionTypes.ADD_IMOVEL_QUARTEIRAO,
    payload: {
      indexQuarteirao,
      imovel,
    }
  }
}

export const addInspecao = ( idRecipiente, tipoRecipiente, fl_eliminado, fl_tratado, fl_foco, unidade ) => {
  return {
    type: ActionTypes.ADD_INSPECAO,
    payload: {
      idRecipiente,
      tipoRecipiente,
      fl_eliminado,
      fl_tratado,
      fl_foco,
      unidade,
    },
  }
}

export const addUnidade = ( idUnidade, tipoColetor, situacao ) => {
  return {
    type: ActionTypes.ADD_UNIDADE,
    payload: {
      idUnidade,
      tipoColetor,
      situacao
    }
  }
}

export const changeTableSelected = (id, selected) => {
  return {
    type: ActionTypes.CHANGE_TABLE_SELECTED,
    payload: {
      id,
      selected
    }
  }
}

export const changeImovelSelect = (
  id,
  lado_id,
  lado_numero,
  logradouro,
  imovel_numero,
  sequencia,
  responsavel,
  complemento,
  tipoImovel
) => {
  return {
    type: ActionTypes.CHANGE_IMOVEL_SELECT,
    payload: {
      id,
      numero: imovel_numero,
      sequencia,
      responsavel,
      complemento,
      tipoImovel,
      lado: {
        id: lado_id,
        numero: lado_numero,
        logradouro
      }
    }
  }
}

