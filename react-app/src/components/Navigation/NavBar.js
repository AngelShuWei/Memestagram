import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../Authorization/LogoutButton';
import PostFormPage from '../PostFormPage/PostFormPage';
import './Navbar.css'
import { logout } from '../../store/session';


const NavBar = () => {
  const [modalOn, setModalOn] = useState(false)
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id)
  const [showMenu, setShowMenu] = useState(false)

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };


  // useEffect(() => {
  //   document.addEventListener("click", () => {
  //     setModalOn(false)
  //   })
  //   return () => document.removeEventListener("click", () => {setModalOn(false)})
  // }, [])
  //.

  const handleModal = (e) => {
    e.preventDefault();
    setModalOn((open) => !open);
  }

  return (
    <div>
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
              <i className="fa-solid fa-magnifying-glass fa-sm icon-search-glass"></i>

            </div>

            <div className='navbar-things'>
              <i className="fa-solid fa-house" onClick={() => history.push('/')}></i>
              <i className="fa-regular fa-paper-plane"></i>
              <i className="fa-regular fa-square-plus" onClick={handleModal}></i>
              <i className="fa-regular fa-compass" onClick={() => history.push(`/explore`)}></i>
              <i className="fa-regular fa-heart"></i>
              <button className="prof-btn" onClick={openMenu}>
              <i className="fa-solid fa-circle-question" />
              </button  >
                 {showMenu && (
                  <ul className="profile-dropdown">
                  <ul>{user.username}</ul>
                  <ul>
                  <button className="profile-btn" onClick={logoutUser}>Log Out</button>
                  <button className="profile-btn" onClick={() => history.push(`/users/${userId}`)}>Profile</button>
                  </ul>
                  </ul>
              )}
              {/* <i className="fa-solid fa-circle-question"></i> */}
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
          </li>
        </ul> */}
        <LogoutButton />
      </nav>


        {modalOn && <PostFormPage closeModal={setModalOn} />}
    </div>
  );
}

export default NavBar;
