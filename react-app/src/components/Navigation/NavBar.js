import './Navbar.css'
import { homeIcon } from '../Styles';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../Authorization/LogoutButton';
import PostFormPage from '../PostFormPage/PostFormPage';
import { logout } from '../../store/session';


const NavBar = () => {
  const [modalOn, setModalOn] = useState(false)
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id)
  const [showMenu, setShowMenu] = useState(false)
  const [filterData, setFilter] = useState([]);
  const [search, setSearch] = useState('');


  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)

  const users = useSelector(state => Object.values(state.session));
  users.pop();

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

  const handleFilter = (e) => {
    const search = e.target.value


    const newFilter = users.filter((val) => {
      return val?.username.toLowerCase().includes(search?.toLowerCase());
    })


    setSearch(search)

    if (search === '') {
      setFilter([]);
    } else {
      setFilter(newFilter);
    }

  }

  const handleClickSearch = (e) => {

    setSearch(e);

    setFilter([]);
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

            <div className='navbar-search' >
              <input className='search-navbar'
                type='search'
                placeholder='Search'
                onChange={handleFilter}
                value={search}
                onClick={(e) => setSearch('')}
              />
              <i className="fa-solid fa-magnifying-glass fa-sm icon-search-glass"></i>
              <div onMouseLeave={(e) => setFilter([])} className={filterData?.length == 0 ? 'search-name-container' : 'search-name-container-clickled'}>
                {filterData?.slice(0, 10).map((value, key) => {
                  return <NavLink key={key} exact to={`/users/${value.id}`}><div className='dataItem' onClick={(e) => handleClickSearch(value.username)} key={key}>{
                    <div className='thingythingy'>
                      <img className='profilepicIntheSearchBar' src={value.profile_pic} ></img>
                      <div>
                        <p className='asdadsa'>{value.username}</p>
                        <p className='biothingy'>{value.profile_bio}</p>
                      </div>
                    </div>}

                  </div>

                  </NavLink>
                })}
              </div>
            </div>

            <div className='navbar-things'>
              <div className='home-icon' onClick={() => history.push('/')}>{ homeIcon }</div>
              {/* <i className="fa-solid fa-house" onClick={() => history.push('/')}></i> */}
              <i className="fa-regular fa-paper-plane"></i>
              <i className="fa-regular fa-square-plus" onClick={handleModal}></i>
              <i className="fa-regular fa-compass" onClick={() => history.push(`/explore`)}></i>
              <i className="fa-regular fa-heart"></i>
              <button className="prof-btn" onClick={openMenu}>
                <div className='profile-icon-btn'><i className="fa-solid fa-circle-question" /></div>
              </button  >
              {showMenu && (
                <div className="profile-dropdown">
                  <div className="prof-btn-username">{user.username}</div>
                  {/* <div className='profile-dropdown-contents'> */}
                  <div className="profile-btn-container-with-icon" onClick={() => history.push(`/users/${userId}`)}>
                    <i className="fa-regular fa-circle-user"></i>
                    Profile
                  </div>

                  <div className="about-site-creators-container" onClick={() => history.push(`/about`)}>
                    <i className="fa-solid fa-users"></i>
                    About the Site Creators!
                  </div>

                  <div className="logout-btn-container" onClick={logoutUser}>
                    Log Out
                  </div>
                </div>
                // </div>
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
      </nav>


      {modalOn && <PostFormPage closeModal={setModalOn} />}
    </div>
  );
}

export default NavBar;
