import React, { Component } from 'react';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import { FaRegEnvelope, FaRegBell } from 'react-icons/fa';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ACTIONS
import { navToggle } from '../../store/actions/appConfig';

import './style.css';

class Header extends Component{
  render () {
    return (
      <nav className="header fixed-top">
        <div className="header-logo">
          <a href="localhost:3000/" className="text-white brand font-weight-bold">
            <mark className="rounded text-white bg-info p-1">AAMT</mark>
          </a>
        </div>

        <div className="header-body">
          <div className="container-search">
            <button className="toggler toggle-collapse" onClick={ this.props.navToggle } >
              <IoIosMenu />
            </button>

            <form className="h-100">
              <div className="search-field">
                <div className="content-prepend"><IoIosSearch className="icon-search" /></div>
                <input type="text" className="border-0 bg-transparent" placeholder="Procurar consulta" />
              </div>
            </form>
          </div>

          <div>
            <ul className="navbar list-header" ref={this.container}>
              <li>
                <button className="nav-link"><FaRegEnvelope className="icon-sm"/></button>
              </li>
              <li className="navbar-item dropdown">
                <button className="nav-link"><FaRegBell className="icon-sm"/></button>
              </li>

              <li className="navbar-item dropdown">
                <button className="toggler toggle-sidebar-left" onClick={ this.props.navToggle } >
                  <IoIosMenu />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ navToggle }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
