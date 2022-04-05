import './User.css'
import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDelete, updateUsersPost } from '../store/post';
import EditPostForm from './OnePostPage/EditPostPage';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();

  // const users = useSelector(state => state.session)
  // console.log(users);

  const userPosts = useSelector(state => Object.values(state.posts).filter(post => {
    //+ is cheat way for parseInt
    return post.user_id === +userId;
  }))


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);


  if (!user) {
    return null;
  }

  // onClick={() => dispatch(updateUsersPost(post.id))}

  return (
    <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div className='prof-username'>{user.username}</div>
          <div className='prof-name'>{user.name}</div>
        </div>
        <div className='prof-posts-img'>POSTS</div>
        <div className='prof-posts-container'>
          {userPosts.map(post =>
            <div className='prof-post-container' key={post.id}>
              <NavLink to={`/post/${post.id}`}><img src={post?.image_url} alt="pic" style={{ width: "293px", height: "293px"}} /></NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default User;
