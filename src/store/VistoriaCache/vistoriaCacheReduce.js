import { ActionTypes } from './vistoriaCacheActions';

const INITIAL_STATE = {
  vistorias: [],
  sequenciaVistoria: 1,
  handleSave: false,
  showNotStarted: false,
  reload: false,
  
  //armazena o index da vistoria que será editada
  vistoriaIndexEdit: -1
}

export default function VistoriaCache(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LIMPAR_VISTORIAS: {

      let vistorias = state.vistorias;
      const trabalhoDiario_id = action.payload.trabalhoDiario_id

      let vist = []
      if(trabalhoDiario_id){
        //Remove do cache todas as vistoria do trabalho recem-finalizado
        vist = vistorias.filter((vistoria) => vistoria.trabalhoDiario_id != trabalhoDiario_id)
      }

      return {
        ...state,
        vistorias: vist
      }
    }

    case ActionTypes.RESETAR_SHOWNOTSTARTED: {
      return {
        ...state,
        showNotStarted: false
      }
    }

    case ActionTypes.ROTA_NAO_INICIADA: {
      return {
        ...state,
        showNotStarted: true
      }
    }

    case ActionTypes.RESET_HANDLE_SAVE: {
      return {
        ...state,
        handleSave: false
      }
    }

    case ActionTypes.UPDATE_INSPECTION: {
      let vistorias = state.vistorias;
      vistorias[ action.payload.int_indexInspection ] = action.payload.class_inspection;

      return {
        ...state,
        vistorias,
        handleSave: true
      }
    }

    case ActionTypes.ADD_VISTORIA: {
      return {
        ...state,
        vistorias: [ ...state.vistorias, action.payload.vistoria ],
        handleSave: true
      }
    }

    case ActionTypes.DELETAR_VISTORIA: {
      let vistorias = state.vistorias,
          rowSelected = action.payload.rowSelected,
          trabalhoDiario_id = action.payload.trabalhoDiario_id

      rowSelected.forEach( row => {
        var indexCache = findIndexCache(vistorias,row.dataIndex,trabalhoDiario_id)
        vistorias[ indexCache ].delete = true;
      });

      vistorias = vistorias.filter( v => v.delete ? false : true );

      return {
        ...state,
        vistorias,
        reload: !state.reload
      }
    }

    case ActionTypes.SET_VISTORIA_INDEX_EDIT: {
      return {
        ...state,
        vistoriaIndexEdit: action.payload.vistoriaIndexEdit
      }
    }

    default:
      return state;
  }
}

/*
 Ao longo da aplicação, precisamos coletar da vistoriaCahe apenas as vistorias feitas pelo Usuario Logado.
 Para fazer essa filtragem, são pegos apenas as vistorias cujo o id trabalho diario é igual ao trabalho diario do usuario logado

 A tabela de vistoria exibida em (/vistoria) usa a lista de vistoria filtrada, logo o index de cada linha da tabela referencia à lista filtrada,
 e não à lista original

 Chega um momento que precisamos encontrar o index de uma vistoria em relação a lista original, o que é justamente o que esta função faz

 PARAMETROS
  vistoriasCache     : é a lista original guardado no cache
  indexFiltrado      : é o index da vistoria que desejamos encontrar em relação a lista filtrada
  trabalhoDiario_id  : é o id do trabalho diario do usuario logado, utilizado como o filtro

 RETORNO:
  indexCache: é o index da vistoria que desejamos encontrar em relação a lista original do cache

*/
function findIndexCache(vistoriasCache, indexFiltrado, trabalhoDiario_id){

  var indexComparador = 0

  for(var indexCache = 0 ; indexCache <  vistoriasCache.length; indexCache++){
    if(vistoriasCache[indexCache].trabalhoDiario_id == trabalhoDiario_id){ 
      if(indexComparador == indexFiltrado) 
        return indexCache

        indexComparador++
    }
  }
  //Nunca deveria chegar aqui
  return null
}