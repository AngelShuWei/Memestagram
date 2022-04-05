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
import EditPostForm from './components/OnePostPage/EditPostPage';
import OnePostPage from './components/OnePostPage/OnePostPage';
import { allPostComments } from './store/comments';
import EditCommentPage from './components/OnePostPage/EditCommentPage';
import { allImgLikes } from './store/imglikes';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);

      dispatch(allUserPosts());
      dispatch(allPostComments());
      dispatch(allImgLikes());
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
        <ProtectedRoute path='/post/:postId/edit' exact={true}>
          <EditPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/post/:postId' exact={true}>
          <OnePostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/comment/:commentId/edit' exact={true}>
          <EditCommentPage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>Home </h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
