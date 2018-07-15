import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from './img/couch@2x.svg'

class Header extends React.Component {
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" activeClassName="active" exact to='/'>
            <h2 className="d-flex align-items-center"><img className="mr-3" src={ logo } alt="" width="40" />{this.props.headerdata.title }</h2>
          </NavLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink activeClassName="active" exact className='nav-link' to='/'>
                  Shop
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink activeClassName="active" className='nav-link' to='/admin'>
                  Admin
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <p className="mt-5 text-center lead">{this.props.headerdata.desc }</p>
      </div>
      );
  }
}
export default Header;
