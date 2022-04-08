import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'
import { getAllPostFollowed } from '../../../store/followedPosts';
import { allUserPosts } from '../../../store/post';
const imgs = ['https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png', 'https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png', 'https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png', 'https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png']

const LoginForm = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [imgNum, setImgNum] = useState(0)


  useEffect(() => {

    const interval = setInterval(() => {
      setImgNum(e => {
        if (e + 1 === 4) {
          e = 0
          return e
        } else {

          return e + 1
        }
      })
    }, 3000)

    return () => clearInterval(interval)

  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }

  };

  const demouser = async(e) =>{
    e.preventDefault();
    dispatch(login('demo', 'password'));
  }


  const updateEmail = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <div className='page-container'>
      <div className='main-container-login'>
        <div className='img-form-and-allthegoodstuff'>

          <div className='backgroundimgkindofstuff'>
            <img src={imgs[imgNum]}></img>
          </div>
          <div className='form-div-i-promise'>
            <div className='daddy-form-allthestuff'>
              <div className='middle-form-mehstuff'>


                <div>
                  <h1 className='memestagram'>
                    Memestagram
                  </h1>
                </div>
                <div className='small-lower-part-of-the-form'>

                  <form className='login-form-container' onSubmit={onLogin}>
                    <div className='lower-lower-form'>

                      <div className='inputs'>

                        <input className='input-field'
                          type="text"
                          value={credential}
                          onChange={updateEmail}
                          // required
                          placeholder='Username or Email'
                        />
                      </div>

                      <div className='inputs'>
                        <input className='input-field'
                          type="password"
                          value={password}
                          onChange={updatePassword}
                          // required
                          placeholder='Password'

                        />
                      </div>
                      <div className='inputs'>

                        <button className='login-button' type="submit">Log In</button>
                      </div>

                      <div className='inputs fourth-thing'>
                        <div className='something'></div>
                        <div style={{ color: '#8E8E8E' }}>Chilling?</div>
                        <div className='something'></div>
                      </div>
                    </div>
                  </form>
                  <ul>
                    {errors.map((error, idx) => <p key={idx}>{error}</p>)}
                  </ul>
                </div>

              </div>

              <div className='small-container-login'>
                <p>Don't have an account? <NavLink exact to={'/signup'}><span className='signup-span'>Sign up</span></NavLink></p>
                <p>Time is money am I right? <span onClick={demouser} className='demo-span'>Demo User</span></p>

              </div>
            </div>


          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginForm;
