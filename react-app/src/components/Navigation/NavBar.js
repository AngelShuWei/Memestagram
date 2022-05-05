import './Navbar.css'
import { homeIcon } from '../Styles';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import LogoutButton from '../Authorization/LogoutButton';
import PostFormPage from '../PostFormPage/PostFormPage';


const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id)
  const user = useSelector((state) => state.session.user)
  const userImg = useSelector((state) => state.session.user.profile_pic)
  const users = useSelector(state => Object.values(state.session));
  users.pop();

  const [modalOn, setModalOn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [filterData, setFilter] = useState([]);
  const [search, setSearch] = useState('');

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
              <div onMouseLeave={(e) => setFilter([])} className={filterData?.length == 0 ? 'search-name-container' : 'search-name-container-clickled'}>
                {filterData?.slice(0, 10).map((value, key) => {
                  return <NavLink key={key} exact to={`/users/${value.id}`}><div className='dataItem' onClick={(e) => handleClickSearch(value.username)} key={key}>{
                    <div className='thingythingy'>
                      <img className='profilepicIntheSearchBar' src={value.profile_pic} ></img>
                      <div>
                        <p className='asdadsa'>{value.username}</p>
                        <p className='biothingy'>{value.name}</p>
                      </div>
                    </div>}

                  </div>

                  </NavLink>
                })}
              </div>
            </div>
              {/* <i className="fa-solid fa-magnifying-glass fa-sm icon-search-glass"></i> */}

            <div className='navbar-things'>
              <div className='home-icon' onClick={() => history.push('/')}>{ homeIcon }</div>
              {/* <i className="fa-solid fa-house" onClick={() => history.push('/')}></i> */}
              <i className="fa-regular fa-paper-plane" onClick={() => history.push(`/message`)}></i>
              <i className="fa-regular fa-square-plus" onClick={handleModal}></i>
              <i className="fa-regular fa-compass" onClick={() => history.push(`/explore`)}></i>
              {/* <i className="fa-regular fa-heart"></i> */}
              <button className="prof-btn" onClick={openMenu}>
                  {user && userImg ? <img className="navbar-prof-pic-btn"src={userImg} style={{height:'22px'}}/>:  <i className="fa-regular fa-circle-user"></i>}
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
              Home[](../../../../../../../../../external/jkEH93rJAlNe6fErFb2OU0-uRHNS2G1xCddvtJhqKms/?width=678&height=643/https/media.discordapp.net/attachments/900341135136923649/903118218531590144/IMG-20201231-WA0002.jpg)
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
