import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postImgLikes, deletingImgLike } from '../store/imglikes';
import { createCommentThunk, commentDelete, updateUserComment } from '../store/comments';
import './UserList.css'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("")

  const realUserId = useSelector(state => state.session.user.id);

  const dispatch = useDispatch();


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

  const allImgLikes = useSelector(state => Object.values(state.likes))


  // let userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));


  // let createLike;

  // if (userLike.length === 0) {
  //   createLike = (
  //     <>
  //       <i key={post?.id} onClick={(e) => handleClick(e, post.id)} className={`fa-regular fa-heart littleHearts`}></i>
  //     </>
  //   )
  // }
  const handleClick = (e, postId) => {
    e.preventDefault();

    const userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));

    if (userLike.length) {

      dispatch(deletingImgLike(userLike[0].id))
    } else {
      dispatch(postImgLikes(realUserId, postId))
    }

  }
  const comments = useSelector(state => Object.values(state.comments));


  const handleSubmit = async (e, postId) => {
    e.preventDefault();

    const data = await dispatch(createCommentThunk(text, realUserId, postId))
    setText("");
  }


  const something = followedPosts?.map(followedPost => (
    <div className='userFeedIndivBigDiv' key={followedPost.id}>
      <div className='comments-top-part'>
        <div className='ikilistuff'>
          <img className='poriflePostUserPic' src={`${followedPost?.user?.profile_pic}`}></img>
          <p>{followedPost?.user?.username}</p>
        </div>
        <i className={`fa-solid fa-ellipsis thinggylil ${realUserId === followedPost?.user_id ? 'clickbale' : 'notclicklabel'}`}></i>
      </div>
      <img className={'indivImgFeed'} src={followedPost.image_url}></img>

      <div className={'heart-likes'}>



        {allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length === 0 ? (
          <i onClick={(e) => handleClick(e, followedPost.id)} className={`fa-regular fa-heart littleHearts`}></i>
        ) : (

          <i onClick={(e) => handleClick(e, followedPost.id)} className={`fa-solid fa-heart redthingy littleHearts`}></i>
        )
        }
        <p>{allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length} {allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length <= 1 ? 'like' : 'likes'}</p>
      </div>
      <div className='img-thingy-usernameEdit'>
        <p><span className='username-inthecomments'>{followedPost.user?.username}</span> <span className='texts-inthecomments'>{followedPost?.caption}</span></p>
      </div>
      {
        comments.filter(some => some?.post_id === followedPost.id).length >= 2 &&
        <div className='viewAllCommentsThingy'>
          View all {comments.filter(some => some?.post_id === followedPost.id).length} comments
        </div>
      }
      <div className='comment-box'>

      {comments.filter(some => some?.post_id === followedPost.id).length >= 1 &&
      <div className='username-comment-thingy'>
        {comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length-1]?.user?.username}
      </div>
      }

      {comments.filter(some => some?.post_id === followedPost.id).length >= 1 &&
      <div className='username-comment-thingy commentText'>

         {comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length-1]?.text}
      </div>
      }
      </div>

      <div className='add-a-comment-forma'>
        <div className='somestuff'>

          <svg aria-label="Emoji" className="_8-yf5 " style={{ 'cursor': 'pointer' }} color="#8e8e8e" fill="#8e8e8e" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>

          <form onSubmit={handleSubmit}>
            <textarea className='input-caption22' placeholder='Add a comment...'
              type="textarea"
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />

          </form>
        </div>
        <button className='share-submit-form-post' onClick={(e) => handleSubmit(e, followedPost.id)} type='submit' >Post</button>
      </div>
    </div>

  )
  )





  return (
    <div className='userlistdemo'>
      <ul>{userComponents}</ul>

      {
        something
      }

    </div >

  );
}

export default UsersList;
