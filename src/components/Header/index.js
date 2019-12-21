import React, { Component } from 'react';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';

import './style.css';

export default class Header extends Component{
  render () {
    return (
      <nav className="header fixed-top">
        <div className="header-logo">
          <a href="localhost:3000/" className="text-white brand font-weight-bold">
            <mark className="rounded text-white bg-info p-1">AAMT</mark>
          </a>
        </div>

        <div className="header-body">
          <div className="d-flex align-items-center">
            <button className="toggler">
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
                <a className="nav-link" href="../">Link Menu</a>
              </li>
              <li className="navbar-item dropdown">
                <button
                  className="nav-link dropdown-toggle">Dropdown</button>

                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="/#">Ação</a>
                  <a className="dropdown-item" href="/#">Outra ação</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/#">Algo mais aqui</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
