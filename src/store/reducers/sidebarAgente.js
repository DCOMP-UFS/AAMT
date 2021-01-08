import { FaRoute, FaClipboardCheck, FaChartPie } from 'react-icons/fa';

import { ActionTypes } from '../actions/sidebarAgente';

const location = window.location.origin.toString();

// function createNav( id, description, active, icon, submenu ){
//   return { id, description, type: "nav", active, icon, submenu }
// }

// function createSubmenu( id, active, description, url ) {
//   return { id, active, description, url: location + url }
// }

function createCategory( description ) {
  return { description, type: "category" }
}

function createLink( id, description, active, icon, url ) {
  return { id, description, type: "link", active, icon, url: location + url, submenu: [] }
}

const INITIAL_STATE = {
  // Menu ativo currenteNav: [ menu, submenu ]
  currentNav: [ 1, 0 ],
  menu: [
    createCategory( "Operacional" ),
    createLink( 1, "Rota", true, FaRoute, "/agente/home"),
    createLink( 2, "Vistorias", false, FaClipboardCheck, "/agente/vistoria"),
    createLink( 3, "Relatórios", false, FaChartPie, "/agente/relatorio/boletim_diario")
    // createLink( 2, "Rotas de Trabalho", false, FaMapSigns, "/sup/rotas"),
    // createCategory( "Recursos de Interface" ),
    // createNav( 8, "Elementos Básicos", false, IoIosCode, [
    //   createSubmenu( 1, false, "Botões", "/elementos/botoes" ),
    //   createSubmenu( 2, false, "Tipografia", "/elementos/tipografia" ),
    // ]),
    // createLink( 9, "Formulários", false, IoIosCheckboxOutline, "/elementos/formulario" )
  ]
}

export default function sidebarAgente(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR_AGENTE: {
      const { id, subId } = action.payload;
      let currentNav = state.currentNav;
      let menu = state.menu;

      menu[ currentNav[ 0 ] ].active = false;

      const index = menu.map( m => m.id ).indexOf( id );
      menu[ index ].active = true;

      let indexSup = 0;
      if( menu[ index ].type === 'nav' ) {
        if( menu[ currentNav[ 0 ] ].type === 'nav' )
          menu[ currentNav[ 0 ] ].submenu[ currentNav[ 1 ] ].active = false;

        indexSup = menu[ index ].submenu.map( sub => sub.id ).indexOf( subId );
        menu[index].submenu[ indexSup ].active = true;
      }

      currentNav = [ index, indexSup ];

      return {
        ...state,
        currentNav,
        menu
      }
    }

    default: {
      return state;
    }
  }
}
