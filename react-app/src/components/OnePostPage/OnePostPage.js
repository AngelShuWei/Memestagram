import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './OnePostPage.css'
import { postDelete } from '../../store/post';
import { createCommentThunk, commentDelete} from '../../store/comments';

function OnePostPage() {

  const dispatch = useDispatch();
  const { postId } = useParams();

  const [text, setText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(createCommentThunk(text, user.id, postId))

  }

  const user = useSelector(state => state.session.user)

  const post = useSelector(state => state.posts[+postId])

  const allComments = useSelector(state => Object.values(state.comments))

  const comments = allComments.filter(comment => comment.post_id === +postId)


  return (
    <>
      <div className="main-div-big-one">
        <div className="medium-div-normal-size" >
          {/* <img className="the-image" src={post?.image_url}></img> */}
          <p>{post?.caption}</p>

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
                    </ul>
                  ))}
                </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default OnePostPage;
