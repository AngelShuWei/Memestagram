import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import { login } from '../../../store/session';
import './SignupForm.css'



const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const demouser = async(e) =>{
    e.preventDefault();
    dispatch(login('sifuhothing', 'password'));
  }


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <div className='page-container'>
      <div className='form-div-signup-promise'>
        <div className='daddy-form-signup'>
          <div className='middle-form-signup'>


            <div>
              <h1 className='memestagram'>
                Memestagram
              </h1>
              <h2 className='h2-signup'>
                Sign up to see photos and videos from your friends.
              </h2>
            </div>

            <div className='inputs fourth-thing-signup'>
              <div className='something'></div>
              <div style={{ color: '#8E8E8E' }}>Sign up</div>
              <div className='something'></div>
            </div>
            <div className='small-lower-part-of-the-form'>

              <form className='login-form-container' onSubmit={onSignUp}>
                <div className='lower-lower-form-signup'>

                  <div className='inputs'>

                    <input className='input-field'
                      type="text"
                      value={email}
                      onChange={updateEmail}
                      required
                      placeholder='Email'
                    />
                  </div>

                  <div className='inputs'>
                    <input className='input-field'
                      type="text"
                      value={username}
                      onChange={updateUsername}
                      required
                      placeholder='Username'

                    />
                  </div>
                  <div className='inputs'>
                    <input className='input-field'
                      type="password"
                      value={password}
                      onChange={updatePassword}
                      required
                      placeholder='Password'

                    />
                  </div>
                  <div className='inputs'>
                    <input className='input-field'
                      type="password"
                      value={confirmPassword}
                      onChange={updateconfirmPassword}
                      required
                      placeholder='Confirm Password'

                    />
                  </div>
                  <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  <div className='inputs'>

                    <button className='login-button' type="submit">Sign Up</button>
                  </div>
                </div>


              </form>
            </div>

          </div>

          <div className='small-container-login'>
            <p>Already have an account? <NavLink exact to={'/login'}><span className='signup-span'>Log in</span></NavLink></p>
            <p>Time is money am I right? <span onClick={demouser} className='demo-span'>Demo User</span></p>

          </div>
        </div>


      </div>


    </div>
  );
};

export default SignUpForm;
