import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='narbar-inside-main-div'>
        <div className='everything-inside'>

          <div className='navbar-h2'>
            <h2 className='memestagram'>
              Memestagram
            </h2>
          </div>

          <div className='navbar-search'>

          </div>

          <div className='navbar-things'>

          </div>

        </div>
      </div>
      {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;
