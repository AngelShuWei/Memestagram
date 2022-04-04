import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDelete, updateUsersPost } from '../store/post';
import EditPostForm from './OnePostPage/EditPostPage';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();

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
      <ul className='ullinkfix'>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div>
        {userPosts.map(post =>
          <div key={post.id}>
            {/* TODO */}
            {/* <Link> */}
            <NavLink to={`/post/${post.id}`}><img  src={post?.image_url} alt="pic" style={{ width: "200px" }} /></NavLink>
            <button onClick={() => dispatch(postDelete(post.id))}>Delete</button>
            <button>Update</button>

            {/* </Link> */}
          </div>
        )}
      </div>
    </>
  );
}
export default User;
