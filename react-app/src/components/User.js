import './User.css'
import followingIcon from '../assets/following-icon-transparent.png'
import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDelete, updateUsersPost } from '../store/post';
import EditPostForm from './OnePostPage/EditPostPage';
import { postImgLikes, deletingImgLike } from '../store/imglikes';
import { createFollower, deleteFollower } from '../store/followers';
import { postsImg } from './Styles'
import { getAllUserFollowed } from '../store/userFollowed';
import { getAllUserFollowers } from '../store/userFollower';
function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const realUserId = useSelector(state => state.session.user.id);
  const followedArray = useSelector(state => Object.values(state.userSpecificFollowed))
  const followersArray = useSelector(state => Object.values(state.userSpecificFollower))
  const userPosts = useSelector(state => Object.values(state.posts).filter(post => {
    return post.user_id === +userId;
  }))
  const allImgLikes = useSelector(state => Object.values(state.likes))


  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getAllUserFollowed(+userId));
    dispatch(getAllUserFollowers(+userId));
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [dispatch,userId]);




  if (!user) {
    return null;
  }


  const handleFollowClick = (e) => {
    e.preventDefault()


    dispatch(getAllUserFollowers(userId));
    dispatch(getAllUserFollowed(userId))
    dispatch(createFollower(userId));
  }


  const followedYes = followedArray.filter(follower => follower.id === +userId)


  return (
    <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div className='prof-info-left'>
            <img style={{ width: "150px", height: "150px", 'borderRadius': '100px' }} src={user?.profile_pic}></img>
          </div>
          <div className='profile-info-right'>
            <div className='prof-username'>
              {user.username}
              {+userId !== realUserId && <button className='follow-prof-btn' onClick={(e) => handleFollowClick(e)}>{followedYes.length ? <div className="followed-prof-btn">
                <img src={followingIcon} />
              </div> : 'Follow'}</button>}
            </div>
            <div className='prof-stats'>
              <div><span className='prof-posts-num'>{userPosts.length}</span> posts</div>
              <div><span className='prof-followers-num'>{followersArray.length}</span> followers</div>
              <div><span className='prof-following-num'>{followedArray.length}</span> following</div>
            </div>
            <div className='prof-name'>{user.name}</div>
            <div className='prof-bio'>{user.profile_bio}</div>
          </div>
        </div>
        <div className='prof-posts-line'></div>
        <div className='prof-posts-img'>{postsImg} POSTS</div>
        <div className='prof-posts-container'>
          {userPosts.reverse().map(post =>
            <div className='prof-post-container' key={post?.id}>
              <NavLink to={`/post/${post.id}`}><img src={post?.image_url} alt="pic" style={{ width: "293px", height: "293px" }} /></NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default User;
