import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDelete } from '../store/post';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const userPosts = useSelector(state => Object.values(state.posts).filter(post => {
    //+ is cheat way for parseInt
    return post.user_id === +userId;
  }))

  // const deletePost = (e) => {
  //   e.preventDefault()
  // }

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

  return (
    <>
      <ul>
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
              <img src={post?.image_url} alt="pic" style={{width:"200px"}}/>
              <button onClick={() => dispatch(postDelete(post.id))}>Delete</button>
            {/* </Link> */}
          </div>
        )}
      </div>
    </>
  );
}
export default User;
