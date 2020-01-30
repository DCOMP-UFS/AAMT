import { IoIosCode, IoIosCheckboxOutline, IoIosPaper } from 'react-icons/io';
import { FaTasks, FaUsers } from 'react-icons/fa';

import { ActionTypes } from '../actions/sidebar';

const location = window.location.origin.toString();

function createNav( description, active, icon, submenu ){
  return { description, type: "nav", active, icon, submenu }
}

function createSubmenu( active, description, url ) {
  return { active, description, url: location + url }
}

function createCategory( description ) {
  return { description, type: "category" }
}

function createLink( description, active, icon, url ) {
  return { description, type: "link", active, icon, url: location + url, submenu: [] }
}

const INITIAL_STATE = {
  // Menu ativo currenteNav: [ menu, submenu ]
  currentNav: [ 1, 0 ],
  menu: [
    createCategory( "Operacional" ),
    createNav( "Trabalho Diário", true, FaTasks, [
      createSubmenu( true, "Iniciar", "/trabalho_diario/iniciar" ),
      createSubmenu( false, "Realizar Vistoria", "/trabalho_diario/vistoria/lista" ),
    ]),
    createCategory( "Administrativo" ),
    createNav( "Atividades", false, IoIosPaper, [ createSubmenu( false, "Cadastrar", "/atividades/cadastrar" ) ]),
    createLink( "Usuários", false, FaUsers, "/usuarios" ),
    createNav( "Municípios", false, IoIosPaper, [ createSubmenu( false, "Consultar", "/municipios" ) ]),
    createCategory( "Recursos de Interface" ),
    createNav( "Elementos Básicos", false, IoIosCode, [
      createSubmenu( false, "Botões", "/elementos/botoes" ),
      createSubmenu( false, "Tipografia", "/elementos/tipografia" ),
    ]),
    createLink( "Formulários", false, IoIosCheckboxOutline, "/elementos/formulario" )
  ]
}

export default function sidebar(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR: {
      const { index, subIndex } = action.payload;
      let currentNav = state.currentNav;
      let menu = state.menu;

      menu[currentNav[0]].active = false;

      if(
        menu[currentNav[0]].type !== "category" &&
        menu[currentNav[0]].submenu.length > 0
      ) {
        menu[currentNav[0]].submenu[currentNav[1]].active = false;
      }

      menu[index].active = true;

      if(
        menu[index].type !== "category" &&
        menu[index].submenu.length > 0
      ) {
        menu[index].submenu[subIndex].active = true;
      }

      currentNav = [ index, subIndex ];

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
