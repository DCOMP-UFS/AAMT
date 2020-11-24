import { IoIosPaper } from 'react-icons/io';
import { FaUsers, FaCity, FaSyncAlt } from 'react-icons/fa';

import { ActionTypes } from '../actions/sidebarCoordGeral';

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
    createCategory( "Ações" ),
    createLink( 1, "Ciclos", false, FaSyncAlt, "/cg/ciclos/consultar" ),
    // createNav( 1, "Ciclos", false, FaSyncAlt, [
    //   createSubmenu( 1, false, "Acompanhar", "/cg/ciclos/" ),
    //   createSubmenu( 2, false, "Planejar", "/cg/ciclos/consultar" ),
    // ]),
    createNav( 2, "Atividades", false, IoIosPaper, [
      createSubmenu( 1, false, "Consultar", "/cg/atividades/" ),
      createSubmenu( 2, false, "Cadastrar", "/cg/atividades/cadastrar" ),
    ]),
    createCategory( "Cadastros Básicos" ),
    createLink( 3, "Usuários", false, FaUsers, "/cg/usuarios" ),
    // createLink( 5, "Regionais de Saúde", false, FaBuilding, "/cg/regionaisSaude"),
    createLink( 4, "Municípios", false, FaCity, "/cg/municipios"),
  ]
}

export default function sidebarCoordGeral(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR_COORD_GERAL: {
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

    default: {
      return state;
    }
  }
}
