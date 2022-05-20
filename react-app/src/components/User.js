import './User.css'
import profilePicIcon from '../assets/Profile-Pic.png'
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
import { allChannels, channelDelete } from '../store/livechatting';
// import { allPostComments } from '../store/comments';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [hoveredOver, setHoveredOver] = useState(false)
  const realUserId = useSelector(state => state.session.user.id);
  const allImgLikes = useSelector(state => Object.values(state.likes))
  const followedArray = useSelector(state => Object.values(state.userSpecificFollowed))
  const followersArray = useSelector(state => Object.values(state.userSpecificFollower))
  const userPosts = useSelector(state => Object.values(state.posts).filter(post => {
    return post.user_id === +userId;
  }))
  const channels = useSelector(state => Object.values(state.livechat)).filter(el => el?.user1_id === +realUserId);
  const followed = useSelector(state => state.followed);

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
  }, [dispatch, userId]);



  useEffect(() => {
    dispatch(getAllUserFollowers(userId));
    dispatch(getAllUserFollowed(userId));
    dispatch(allChannels());
  }, [dispatch, followed])




  if (!user) {
    return null;
  }

  const followedYes = followersArray.filter(follower => follower.id === +realUserId)

  const handleFollowClick = (e) => {
    e.preventDefault()

    dispatch(createFollower(+userId));

    let channel = channels.find(el => el?.user2_id === +userId)

    if(followedYes.length){
      if(channel){
        dispatch(channelDelete(channel?.id))
      }

    }

  }


  return (
    <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div className='prof-info-left'>
            <img style={{ width: "150px", height: "150px", 'borderRadius': '100px' }} src={user?.profile_pic || profilePicIcon}></img>
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
              <NavLink to={`/post/${post.id}`}><img className='prof-post-imgs' src={post?.image_url} alt="pic" /></NavLink>
              <NavLink to={`/post/${post.id}`}><div className='overlay'>
                <div className='prof-post-hover'>
                  <div className='prof-likes'>
                    <i className="fa-solid fa-heart laka"></i>
                    <div className='prof-likes-count laka'>{post.image_likes.length}</div>
                  </div>
                  <div className='prof-comments'>
                    <i className="fa-solid fa-comment laka"></i>
                    <div className='prof-comments-count laka'>{post.comments.length}</div>
                  </div>
                </div>
              </div></NavLink>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default User;
