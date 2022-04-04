import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './OnePostPage.css'
import { postDelete } from '../../store/post';
function OnePostPage() {

  const dispatch = useDispatch();
  const { postId } = useParams();

  const user = useSelector(state => state.session.user)

  const post = useSelector(state => state.posts[+postId])


  return (
    <>
      <div className="main-div-big-one">
        <div className="medium-div-normal-size" >
          <img className="the-image" src={post?.image_url}></img>
          <p>{post?.caption}</p>

          {user?.id == post?.user_id &&
            (<NavLink exact to={`/users/${post?.user_id}`}><button onClick={() => dispatch(postDelete(post?.id))}>Delete Post</button></NavLink>)
          }
          {user?.id == post?.user_id &&

            (<NavLink exact to={`/post/${post?.id}/edit`}><button>Update Caption</button></NavLink>)
          }
        </div>

      </div>
    </>
  )
}

export default OnePostPage;
