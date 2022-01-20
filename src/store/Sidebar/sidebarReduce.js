import { FaRoute, FaClipboardCheck, FaChartPie } from 'react-icons/fa';

import { ActionTypes } from './sidebarActions';

const location = window.location.origin.toString();

function createCategory( description ) {
  return { description, type: "category" }
}

function createLink( id, description, active, icon, url ) {
  return { id, description, type: "link", active, icon, url: location + url, submenu: [] }
}

const INITIAL_STATE = {
  currentNav: [ "", "" ], // Slug Nav, Slug SubNav
  menu: []
}

export default function sidebar(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR: {
      const { slug, subSlug } = action.payload;
      let currentNav          = state.currentNav;
      let menu                = state.menu;

      // Procuranto o menu atual
      const currentIndex = menu.findIndex( m => m.slug == currentNav[ 0 ] );

      // Desativando o menu atual
      if( currentIndex != -1 ) {
        menu[ currentIndex ].active = false;

        if( menu[ currentIndex ].type === 'nav' ) {
          const subCurrentIndex = menu[ currentIndex ].submenu.findIndex( sub => sub.slug == currentNav[ 1 ] );

          menu[ currentIndex ].submenu[ subCurrentIndex ].active = false;
        }
      }

      // Buscando o próximo menu
      const nextIndex = menu.findIndex( m => m.slug == slug );

      // Ativiando o próximo menu
      if( nextIndex != -1 ) {
        menu[ nextIndex ].active = true;

        if( menu[ nextIndex ].type === 'nav' ) {
          const indexSup = menu[ nextIndex ].submenu.findIndex( sub => sub.slug == subSlug );

          if( indexSup != -1 )
            menu[ nextIndex ].submenu[ indexSup ].active = true;
        }
      }

      currentNav = [ slug, subSlug ];

      return {
        ...state,
        currentNav,
        menu
      }
    }
    
    case ActionTypes.SET_MENU_SIDEBAR: {
      return {
        ...state,
        menu: action.payload.menus
      }
    }

    default: {
      return state;
    }
  }
}
