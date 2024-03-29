import './UserList.css'
import profilePicIcon from '../assets/Profile-Pic.png'
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postImgLikes, deletingImgLike } from '../store/imglikes';
import { createCommentThunk, commentDelete, updateUserComment } from '../store/comments';
import { getAllPostFollowed } from '../store/followedPosts';
import { logout } from '../store/session';

function UsersList() {
  const dispatch = useDispatch();
  const history = useHistory();
  //
  const realUserId = useSelector(state => state.session.user.id);
  const currentUser = useSelector(state => state.session.user);
  const comments = useSelector(state => Object.values(state.comments));
  const allImgLikes = useSelector(state => Object.values(state.likes))
  const followedPosts = useSelector(state => Object.values(state.followedPosts));

  const [users, setUsers] = useState([]);
  const [text, setText] = useState("")
  console.log(users)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
      dispatch(getAllPostFollowed());
    }
    fetchData();
  }, []);

  const handleClick = (e, postId) => {
    e.preventDefault();
    const userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));

    if (userLike.length) {

      dispatch(deletingImgLike(userLike[0].id))
    } else {
      dispatch(postImgLikes(realUserId, postId))
    }
  }

  const handleSubmit = async (e, postId) => {
    e.preventDefault();

    const data = await dispatch(createCommentThunk(text, realUserId, postId))
    setText("");
  }

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  // const shuffledArray =  function shuffleArray(user) {
  //   for (let i = user.length - 1; i> 0; i--){
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [user[i], user[j]] = [user[j], user[i]];
  //   }
  // }

  const followedUserPosts = followedPosts?.map(followedPost => (
    <div className='userFeedIndivBigDiv' key={followedPost.id}>
      <div className='comments-top-part'>
        <div className='ikilistuff'>
          <NavLink exact to={`/users/${followedPost?.user?.id}`}><img className='poriflePostUserPic' src={`${followedPost?.user?.profile_pic}`}></img></NavLink>
          <NavLink exact to={`/users/${followedPost?.user?.id}`}><p>{followedPost?.user?.username}</p></NavLink>
        </div>
        <i className={`fa-solid fa-ellipsis thinggylil ${realUserId === followedPost?.user_id ? 'clickbale' : 'notclicklabel'}`}></i>
      </div>
      <NavLink exact to={`/post/${followedPost?.id}`}><img className={'indivImgFeed'} src={followedPost.image_url}></img></NavLink>

      <div className={'heart-likes'}>
        {allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length === 0 ? (
          <i onClick={(e) => handleClick(e, followedPost.id)} className={`fa-regular fa-heart littleHearts`}></i>
        ) : (
          <i onClick={(e) => handleClick(e, followedPost.id)} className={`fa-solid fa-heart redthingy littleHearts`}></i>
        )
        }
        <div className='home-post-likes'>{allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length} {allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length <= 1 ? 'like' : 'likes'}</div>
      </div>
      <div className='img-thingy-usernameEdit'>
        <p><span className='username-inthecomments'><NavLink exact to={`/users/${followedPost?.user?.id}`}>{followedPost.user?.username}</NavLink></span> <span className='texts-inthecomments'>{followedPost?.caption}</span></p>
      </div>
      {
        comments.filter(some => some?.post_id === followedPost.id).length >= 2 &&
        <div className='viewAllCommentsThingy'>
          <NavLink exact to={`/post/${followedPost?.id}`}>View all {comments.filter(some => some?.post_id === followedPost.id).length} comments</NavLink>
        </div>
      }
      <div className='comment-box'>

        {comments.filter(some => some?.post_id === followedPost.id).length >= 1 &&
          <div className='username-comment-thingy'>
            <NavLink exact to={`/users/${comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length - 1]?.user?.id}`}>{comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length - 1]?.user?.username}</NavLink>
          </div>
        }

        {comments.filter(some => some?.post_id === followedPost.id).length >= 1 &&
          <div className='username-comment-thingy commentText'>
            {comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length - 1]?.text}
          </div>
        }
      </div>

      <div className='add-a-comment-forma'>
        <div className='somestuff'>
          <div>
            <form onSubmit={handleSubmit}>
              <textarea className='input-caption22' placeholder='Add a comment...'
                type="textarea"
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          </div>
        </div>
        <button className='share-submit-form-post' onClick={(e) => handleSubmit(e, followedPost.id)} type='submit' >Post</button>
      </div>
    </div>
  )
  )
  return (
    <div className='home-container'>
      <div className='home-left-c'>{
        followedUserPosts.length > 0 ? followedUserPosts :
          <div style={{marginTop:"20px"}}>
            <h2 style={{textAlign:"center", marginBottom:"10px", color:"black"}}>You are currently not following anyone</h2>
            <img style={{width:"450px"}} src='https://media.discordapp.net/attachments/959639042385936404/970445024573661254/unknown.png'></img>
          </div>
      }</div>
      <div className='home-c'></div>

      <div className='home-right-c'>
        <div className='home-right-c-user'>
          <img className='poriflePostUserPic' id='user' src={currentUser?.profile_pic || profilePicIcon}></img>
          <div className='home-right-c-user-r'>
            <NavLink to={`/users/${realUserId}`}><div className='sug-username'>{`${currentUser?.username}`}</div></NavLink>
            <div className='home-name'>{`${currentUser?.name}`}</div>
          </div>
          <div className='switch' onClick={logoutUser}>Switch</div>
        </div>
        <div className='home-bottom-c'>
          <div className='suggestions'>Suggestions For You</div>

          <div className='suggestions-lists'>
            {users.slice(0, 5).map(user => (
              <div className='suggestions-list' key={user.id}>
                <NavLink to={`/users/${user.id}`}><img className='poriflePostUserPic' src={user.profile_pic || profilePicIcon}></img></NavLink>
                <div className='sug-user-info'>
                  <NavLink to={`/users/${user.id}`}><div className='sug-username'>{user.username}</div></NavLink>
                  <div className='sug-name'>{user.name}</div>
                </div>
                <NavLink className='follow' to={`/users/${user.id}`}><div className='follow'>Follow</div></NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
