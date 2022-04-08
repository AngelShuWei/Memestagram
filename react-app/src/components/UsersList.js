import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postImgLikes, deletingImgLike } from '../store/imglikes';
import { createCommentThunk, commentDelete, updateUserComment } from '../store/comments';
import './UserList.css'
import { getAllPostFollowed } from '../store/followedPosts';
import Picker from 'emoji-picker-react';
import happyFace from './IconPics/ig-happy-face.png';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("")
  const [showPicker, setShowPicker] = useState(false);

  const realUserId = useSelector(state => state.session.user.id);

  const dispatch = useDispatch();


  const emojiClick = (e, emojiObject) => {
    setText(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };



  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
      dispatch(getAllPostFollowed());
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
        <p>{allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length} {allImgLikes.filter(like => (+realUserId === like?.user_id && followedPost.id === like?.post_id)).length <= 1 ? 'like' : 'likes'}</p>
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
        <NavLink exact to={`/users/${comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length-1]?.user?.id}`}>{comments.filter(some => some?.post_id === followedPost.id)[comments.filter(some => some?.post_id === followedPost.id).length-1]?.user?.username}</NavLink>
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
          <div className="adding-emoji-comment-container">
            <img
              className="adding-emoji-comment-post"
              src={happyFace}
              onClick={() => setShowPicker(val => !val)} />
            {showPicker && <Picker
              pickerStyle={{
                position: "absolute",
                width: '100%'
               }}
              onEmojiClick={emojiClick} />}
          </div>
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
    <div className='userlistdemo'>
      <ul>{userComponents}</ul>

      {
        something
      }

    </div >


  );
}

export default UsersList;
