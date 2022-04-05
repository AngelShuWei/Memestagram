import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory, useParams } from "react-router-dom";
import { updateUsersPost } from "../../store/post";

function EditPostForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {postId} = useParams()

  const post = useSelector(state => state.posts[+postId])

  const [caption, setCaption] = useState(post?.caption);
  const [imageUrl, setImageUrl] = useState(post?.image_url);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(updateUsersPost(caption,imageUrl,post.id))

    if(data.errors){

    }else{
      history.push(`/users/${post?.user_id}`)
    }
  }


  const updateCaption = (e) => {
    setCaption(e.target.value);

  }



  return (
    <div className='background-moda'>

      <div className='modal-containe'>
        <form onSubmit={handleSubmit}>
          <label>Caption</label>
          <input placeholder='Write a caption...'
            type="text"
            value={caption}
            required
            onChange={updateCaption}
          />
          <button>Update</button>
        </form>
      </div>
    </div>

  )
}

export default EditPostForm;
