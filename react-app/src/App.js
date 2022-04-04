import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/Authorization/LoginForm/LoginForm';
import SignUpForm from './components/Authorization/SignupForm/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/Authorization/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { allUserPosts } from './store/post';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);

      dispatch(allUserPosts());
    })();
  }, [dispatch]);

  const user = useSelector(state => state.session.user)


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {
        user ? <NavBar /> : undefined
      }
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          {/* <h1>Home </h1> */}
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
