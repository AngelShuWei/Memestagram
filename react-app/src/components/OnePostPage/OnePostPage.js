import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './OnePostPage.css'
import { postDelete } from '../../store/post';
import { createCommentThunk, commentDelete, updateUserComment } from '../../store/comments';
import EditDeletePostModal from './EditDeletePostModal';
import { postImgLikes, deletingImgLike } from '../../store/imglikes';

function OnePostPage() {
  const [modalOn, setModalOn] = useState(false);
  const [commentModalOn, setCommentModalOn] = useState(false);

  const dispatch = useDispatch();
  const { postId } = useParams();

  const [text, setText] = useState("")

  const realUserId = useSelector(state => state.session.user.id);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(createCommentThunk(text, user.id, postId))
    setText("");
  }

  const user = useSelector(state => state.session.user)

  const post = useSelector(state => state.posts[+postId])

  const allComments = useSelector(state => Object.values(state.comments))
  const allImgLikes = useSelector(state => Object.values(state.likes))
  const comments = allComments.filter(comment => comment.post_id === +postId)

  const handleModal = (e) => {
    e.preventDefault();
    setModalOn(true);
  }


  let userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));

  let deleteLike;

  if (userLike.length) {
    deleteLike = (
      <>
        <i key={post?.id} onClick={(e) => handleClick(e, post.id)} className={`fa-solid fa-heart redthingy littleHearts`}></i>
      </>
    )
  }

  let createLike;

  if (userLike.length === 0) {
    createLike = (
      <>
        <i key={post?.id} onClick={(e) => handleClick(e, post.id)} className={`fa-regular fa-heart littleHearts`}></i>
      </>
    )
  }

  const handleClick = (e, postId) => {
    e.preventDefault();

    const userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));

    if (userLike.length) {

      dispatch(deletingImgLike(userLike[0].id))
    } else {
      dispatch(postImgLikes(realUserId, postId))
    }

  }

  const users = useSelector(state => Object.values(state.session))

  const postUser = users?.filter(asas => asas.id === post?.user_id);



  const likesNumber = allImgLikes.filter(like => like?.post_id === post?.id).length;

  return (
    <>
      <div className="main-div-big-one">
        <div className="medium-div-normal-size" >
          <img className="the-image" src={post?.image_url}></img>
          <div className='individual-post-right-side'>

            <div className='comments-top-part'>
              <div className='ikilistuff'>
                <img className='poriflePostUserPic' src={`${postUser[0]?.profile_pic}`}></img>
                <p>{postUser[0]?.username}</p>
              </div>
              <i onClick={handleModal} className="fa-solid fa-ellipsis"></i>
            </div>

            {/* {user?.id == post?.user_id &&
              (<NavLink exact to={`/users/${post?.user_id}`}><button onClick={() => dispatch(postDelete(post?.id))}>Delete Post</button></NavLink>)
            }
            {user?.id == post?.user_id &&

              (<NavLink exact to={`/post/${post?.id}/edit`}><button>Update Caption</button></NavLink>)
            } */}
            <div className='all-comment-section'>
              <div className='comments-section'>
                {comments?.map(comment => (
                  <div key={comment.id} className='comments-section-real-this-time'>
                    <img className='poriflePostUserPic2' src={`${users.filter(user => user.id === comment?.user_id)[0]?.profile_pic}`}></img>
                    <div>
                      <p><span className='username-inthecomments'>{users.filter(user => user.id === comment?.user_id)[0]?.username}</span> <span className='texts-inthecomments'>{comment.text}</span></p>
                      {/* {post?.user_id === user?.id &&
                        (<i onClick={handleModal} className="fa-solid fa-ellipsis commentDeleteUpdate"></i>)

                      } */}
                    </div>
                    {post?.user_id === user?.id || comment?.user_id === user?.id &&
                      <button onClick={() => dispatch(commentDelete(comment?.id))}>Delete Comment</button>
                    }
                    {comment?.user_id === user?.id &&
                      <NavLink exact to={`/comment/${comment?.id}/edit`}><button>Update Comment</button></NavLink>
                    }
                  </div>
                ))}
              </div>
              <div className='galp'>
                {createLike}
                {deleteLike}
                <p>{likesNumber} {likesNumber <= 1 ? 'like' : 'likes'}</p>
              </div>
              <div className='add-a-comment-form'>
                <div className='somestuff'>

                  <svg aria-label="Emoji" className="_8-yf5 " style={{ 'cursor': 'pointer' }} color="#8e8e8e" fill="#8e8e8e" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>

                  <form onSubmit={handleSubmit}>
                    <textarea className='input-caption2' placeholder='Add a comment...'
                      type="textarea"
                      value={text}
                      required
                      onChange={(e) => setText(e.target.value)}
                    />

                  </form>
                </div>
                <button className='share-submit-form-post' onClick={handleSubmit} type='submit' >Post</button>
              </div>

            </div>
          </div>

        </div>


      </div>
      {modalOn && <EditDeletePostModal postId={postId} closeModal={setModalOn} />}
    </>
  )
}

export default OnePostPage;
