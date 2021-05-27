import BorderAllIcon from '@material-ui/icons/BorderAll';
import { FaMapSigns, FaVial } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';

import { ActionTypes } from '../actions/sidebarSupervisor';

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
    createCategory( "Ações" ),
    createLink( 2, "Rotas de Trabalho", false, FaMapSigns, "/sup/planejar_rota"),
    createLink( 3, "Amostras", false, FaVial, "/sup/amostras"),
    createCategory( "Cadastros Básicos" ),
    createLink( 4, "Imóveis", false, IoIosHome, "/sup/imoveis"),
    createLink( 1, "Quarteirões", false, BorderAllIcon, "/sup/quarteiroes"),
    // createCategory( "Recursos de Interface" ),
    // createNav( 8, "Elementos Básicos", false, IoIosCode, [
    //   createSubmenu( 1, false, "Botões", "/elementos/botoes" ),
    //   createSubmenu( 2, false, "Tipografia", "/elementos/tipografia" ),
    // ]),
    // createLink( 9, "Formulários", false, IoIosCheckboxOutline, "/elementos/formulario" )
  ]
}

export default function sidebarSupervisor(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR_SUPERVISOR: {
      const { id, subId } = action.payload;
      let currentNav = state.currentNav;
      let menu = state.menu;
      menu[currentNav[0]].active = false;

      const index = menu.map( m => m.id ).indexOf( id );
      menu[index].active = true;

      let indexSup = 0;
      if( menu[ index ].type === 'nav' ) {
        menu[currentNav[0]].submenu[currentNav[1]].active = false;
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

    case ActionTypes.NAV_TOGGLE: {

      return {
        ...state,
        navToggle: !state.navToggle,
      }
    }

    default: {
      return state;
    }
  }
}