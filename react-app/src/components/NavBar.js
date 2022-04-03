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
          <NavLink to='/' exact={true} activeClassName='active'>
            <h2 className='memestagram'>
              Memestagram
            </h2>
            </NavLink>
          </div>

          <div className='navbar-search'>
            <input className='search-navbar'
            type='search'
            placeholder='Search'
            />
            <i class="fa-solid fa-magnifying-glass fa-sm icon-search-glass"></i>

          </div>

          <div className='navbar-things'>
          <i class="fa-solid fa-house"></i>
          <i class="fa-regular fa-paper-plane"></i>
          <i class="fa-regular fa-square-plus"></i>
          <i class="fa-regular fa-compass"></i>
          <i class="fa-regular fa-heart"></i>
          </div>

        </div>
      </div>
      <ul>
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
      </ul>
    </nav>
  );
}

export default NavBar;
