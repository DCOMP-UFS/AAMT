import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosReturnRight } from 'react-icons/io';
import { menus, categorias, itens as itensMenu } from '../../config/menus';
import { perfil as tipoPerfilEnum } from '../../config/enumerate';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ACTIONS
import { setMenuSidebar } from '../../store/Sidebar/sidebarActions';

import './style.css';

const Sidebar = ( { menu, roles, usuario, navToggle, ...props } ) => {
  useEffect( () => {
    props.setMenuSidebar( getMenusPermitidos( menus, roles ) );
  }, [] );

  /**
   * Esta função consulta todos os menus permitidos de acordo com as permissões
   * @param {array} menus 
   * @param {array} roles permissões que o usuário tem
   * @returns array
   */
  const getMenusPermitidos = ( menus, roles ) => {
    const perfil        = usuario.atuacoes[ 0 ].tipoPerfil;

    //Caso o usuario logado seja laboratoria, será exibida uma pagina de amostra
    //especifica, caso contrario será exibida a pagina padrão para o supervisor
    if(perfil == 5)
      menus.visualizar_amostra = [itensMenu.amostraLab]
    else
      menus.visualizar_amostra = [itensMenu.amostra]

    let menusPermitidos = roles.map( role => menus[ role ] );
    let listaMenus      = [];
    let relatorios      = [];

    if( perfil == tipoPerfilEnum.coordenadorGeral.id )
      menusPermitidos.unshift( menus[ "dashboard_regional" ] );
    else if( perfil == tipoPerfilEnum.laboratorista.id )
      menusPermitidos.unshift( menus[ "dashboard_laboratorio" ] );
    else
      menusPermitidos.unshift( menus[ "dashboard_municipal" ] );

    menusPermitidos.forEach( itens => {
      if( itens ) {
        const roleMenu = itens.filter( item => {
          if( item.slug.startsWith( 'rlt_' ) ) {
            relatorios.push( item );

            return false;
          } else {
            const contem = listaMenus.findIndex( res => res.slug == item.slug );
    
            return contem == -1 ? true : false;
          }
        } );
  
        listaMenus = [ ...listaMenus, ...roleMenu ];
      }
    } );

    if( relatorios.length > 0 ) {
      let menuRelatorio = itensMenu.relatorio;

      menuRelatorio.submenu = relatorios;
      listaMenus.push( menuRelatorio );
    }

    let data = [];
    categorias.forEach( cat => {
      let m = listaMenus.filter( r => r.categoria == cat.slug );

      if( m.length > 0 ) {
        data.push( cat );

        data = [ ...data, ...m ];
      }
    } );

    return data;
  };

  return (
    <nav className={ navToggle ? "sidebar" : "sidebar sidebar-collapse"}>
      <ul className="nav-sidebar">
        {
          menu.map(( nav, index ) => {

            switch( nav.type ) {
              case "category":
                return (
                  <li key={ `cat-${ index }` } className="nav-item nav-category">
                    { nav.description }
                  </li>
                )
              case "nav":
                return (
                  <li key={ nav.slug } className={ nav.active ? "nav-item active" : "nav-item" }>
                    <button
                      href={ nav.link }
                      className="nav-link"
                      data-toggle="collapse"
                      data-target={ "#sidebar-" + index }
                      aria-expanded="false"
                    >
                      <span className="menu-icon"><nav.icon className="icon-sm" /></span>
                      <span className="menu-text">{ nav.description }</span>
                      <IoIosArrowDown className="menu-arrow ml-2" />
                    </button>
                    <div id={ "sidebar-" + index } className={ nav.active ? "container-sub-menu collapse show" : "container-sub-menu collapse" }>
                      <ul className="nav flex-column sub-menu">
                        {
                          nav.submenu.map( subNav => (
                            <li key={ subNav.slug } className={ subNav.active ? "nav-item active" : "nav-item" }>
                              <a className="nav-link" href={ subNav.url }>
                                <IoIosReturnRight className="icon" />
                                { subNav.description }
                              </a>
                            </li>
                          ) )
                        }
                      </ul>
                    </div>
                  </li>
                )
              case "link":
                return (
                  <li key={ nav.slug } className={ nav.active ? "nav-item active" : "nav-item" }>
                    <a href={ nav.url } className="nav-link">
                      <span className="menu-icon"><nav.icon className="icon-sm" /></span>
                      <span className="menu-text">{ nav.description }</span>
                    </a>
                  </li>
                )
              default: return ( <li key={ index } /> )
            }
          } )
        }
      </ul>
    </nav>
  );
}

const mapStateToProps = state => ( {
  menu: state.sidebar.menu,
  navToggle: state.appConfig.navToggle,
  usuario: state.appConfig.usuario,
  roles: state.appConfig.usuario.permissoes
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( { setMenuSidebar }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Sidebar );
