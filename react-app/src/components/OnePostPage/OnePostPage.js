import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './OnePostPage.css'
import { postDelete } from '../../store/post';
import { createCommentThunk, commentDelete, updateUserComment } from '../../store/comments';
import EditDeletePostModal from './EditDeletePostModal';
import { postImgLikes, deletingImgLike } from '../../store/imglikes';

function OnePostPage() {
  const [modalOn, setModalOn] = useState(false)

  const dispatch = useDispatch();
  const { postId } = useParams();

  const [clicked, setClicked] = useState('solid')

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
    <i key={post?.id} onClick={(e) => handleClick(e, post.id)} className={`fa-solid fa-heart`}></i>
    </>
    )
  }

  let createLike;

  if (userLike.length === 0) {
    createLike = (
      <>
    <i key={post?.id} onClick={(e) => handleClick(e, post.id)} className={`fa-regular fa-heart`}></i>
    </>
    )
  }

  const handleClick = (e, postId) => {
    e.preventDefault();

    const userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));

    if (userLike.length) {

      // setClicked('regular')
      dispatch(deletingImgLike(userLike[0].id))
    } else {
      // setClicked('solid')
      dispatch(postImgLikes(realUserId, postId))
    }

  }

  return (
    <>
      <div className="main-div-big-one">
        <div className="medium-div-normal-size" >
          <img className="the-image" src={post?.image_url}></img>
          <div className='individual-post-right-side'>

            <div className='comments-top-part'>
              <p>{post?.caption}</p>
              <i onClick={handleModal} className="fa-solid fa-ellipsis"></i>
            </div>

            {user?.id == post?.user_id &&
              (<NavLink exact to={`/users/${post?.user_id}`}><button onClick={() => dispatch(postDelete(post?.id))}>Delete Post</button></NavLink>)
            }
            {user?.id == post?.user_id &&

              (<NavLink exact to={`/post/${post?.id}/edit`}><button>Update Caption</button></NavLink>)
            }
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button type='submit'>Add Comment</button>
              </form>
              <div>
                {comments?.map(comment => (
                  <ul key={comment.id}>
                    <li>{comment.text}</li>
                    <button onClick={() => dispatch(commentDelete(comment?.id))}>Delete Comment</button>
                    <NavLink exact to={`/comment/${comment?.id}/edit`}><button>Update Comment</button></NavLink>
                  </ul>
                ))}
              </div>
                  <div>
                  {createLike}
                  {deleteLike}
                  </div>
              <p>{allImgLikes.filter(like => like?.post_id === post?.id).length}</p>
            </div>
          </div>

        </div>


      </div>
      {modalOn && <EditDeletePostModal postId={postId} closeModal={setModalOn} />}
    </>
  )
}

export default OnePostPage;
