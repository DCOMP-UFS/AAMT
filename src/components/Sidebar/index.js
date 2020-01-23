import React, { Component } from 'react';
import { IoIosArrowDown, IoIosReturnRight } from 'react-icons/io';

// REDUX
import { connect } from 'react-redux';

import './style.css';

class Sidebar extends Component {
  render () {
    const menu = this.props.sidebar.menu;
    const navToggle = this.props.navToggle;

    return (
      <nav className={ navToggle ? "sidebar" : "sidebar sidebar-collapse"}>
        <ul className="nav-sidebar">
          {
            menu.map(( nav, index ) => {

              switch( nav.type ) {
                case "category":
                  return (
                    <li key={ index } className="nav-item nav-category">
                      { nav.description }
                    </li>
                  )

                case "nav":
                  return (
                    <li key={ index } className={ nav.active ? "nav-item active" : "nav-item" }>
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
                            nav.submenu.map( ( subNav, subIndex ) => (
                              <li key={ subIndex } className={ subNav.active ? "nav-item active" : "nav-item" }>
                                <a className="nav-link" href={ subNav.url }>
                                  <IoIosReturnRight className="icon" />
                                  { subNav.description }
                                </a>
                              </li>
                            ))
                          }

                        </ul>

                      </div>
                    </li>
                  )

                case "link":
                  return (
                    <li key={ index } className={ nav.active ? "nav-item active" : "nav-item" }>
                      <a href={ nav.url } className="nav-link">
                        <span className="menu-icon"><nav.icon className="icon-sm" /></span>
                        <span className="menu-text">{ nav.description }</span>
                      </a>
                    </li>
                  )

                default: return ( <li key={ index } /> )
              }

            })
          }
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  sidebar: state.sidebar,
  navToggle: state.appConfig.navToggle,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Sidebar);
