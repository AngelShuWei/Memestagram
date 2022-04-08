import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function UsersList() {
  const [users, setUsers] = useState([]);



  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const followedPosts = useSelector(state => Object.values(state.followedPosts));




  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    // <div className='userlistdemo'>
    //   <ul>{userComponents}</ul>

    //   {
    //     followedPosts?.map(followedPost => (
    //       <div>
    //         <div className='comments-top-part'>
    //           <div className='ikilistuff'>
    //             <img className='poriflePostUserPic' src={`${postUser[0]?.profile_pic}`}></img>
    //             <p>{postUser[0]?.username}</p>
    //           </div>
    //           <i onClick={handleModal} className={`fa-solid fa-ellipsis thinggylil ${realUserId === post?.user_id ? 'clickbale' : 'notclicklabel'}`}></i>
    //         </div>
    //         <img src={followedPost.image_url}></img>
    //       </div>

    //     )
    //     )
    //   }

    // </div >
    'test'
  );
}

export default UsersList;
