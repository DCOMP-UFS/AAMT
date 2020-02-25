import { IoIosPaper } from 'react-icons/io';
import { FaTasks, FaUsers, FaMapSigns, FaVials } from 'react-icons/fa';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';

import { ActionTypes } from '../actions/sidebar';

const location = window.location.origin.toString();

function createNav( id, description, active, icon, submenu ){
  return { id, description, type: "nav", active, icon, submenu }
}

function createSubmenu( id, active, description, url ) {
  return { id, active, description, url: location + url }
}

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
    // createCategory( "Operacional" ),
    // createNav( 1, "Trabalho Diário", true, FaTasks, [
    //   createSubmenu( 1, true, "Iniciar", "/trabalho_diario/iniciar" ),
    //   // createSubmenu( 2, false, "Realizar Vistoria", "/trabalho_diario/vistoria/lista" ),
    // ]),
    createCategory( "Administrativo" ),
    createNav( 1, "Atividades", false, IoIosPaper, [
      createSubmenu( 1, false, "Consultar", "/coord/atividades/" ),
      createSubmenu( 2, false, "Cadastrar", "/coord/atividades/cadastrar" ),
    ]),
    createLink( 2, "Usuários", false, FaUsers, "/coord/usuarios" ),
    createCategory( "Região" ),
    createLink( 3, "Bairro/Localidade", false, FaMapSigns, "/coord/localidades"),
    createLink( 4, "Zonas", false, ViewCompactIcon, "/coord/zonas"),
    createLink( 5, "Laboratórios", false, FaVials, "/coord/laboratorios"),
    // createLink( 7, "Quarteirão", false, BorderAllIcon, "/quarteiroes"),
    // createCategory( "Recursos de Interface" ),
    // createNav( 8, "Elementos Básicos", false, IoIosCode, [
    //   createSubmenu( 1, false, "Botões", "/elementos/botoes" ),
    //   createSubmenu( 2, false, "Tipografia", "/elementos/tipografia" ),
    // ]),
    // createLink( 9, "Formulários", false, IoIosCheckboxOutline, "/elementos/formulario" )
  ]
}

export default function sidebar(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR: {
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
