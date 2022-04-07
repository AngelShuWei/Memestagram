import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory, useParams } from "react-router-dom";
import { updateUsersPost } from "../../store/post";

const  EditPostForm = ({ updateModalSomeStuff, closeModal, postId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  closeModal(false)

  const post = useSelector(state => state.posts[+postId])

  const [caption, setCaption] = useState(post?.caption);
  const [imageUrl, setImageUrl] = useState(post?.image_url);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(updateUsersPost(caption, imageUrl, post.id))

    updateModalSomeStuff(false);


  }


  const updateCaption = (e) => {
    setCaption(e.target.value);
  }
  
  let menuRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) {

        updateModalSomeStuff(false);
      }
    }
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  });

  return (
    <div className='background-modal'>

      <div ref={menuRef} className='modal-container-edit-delete-post-modal'>
        <div className="edit-modal-input-caption">

          <textarea className='input-caption-update' placeholder='Write a caption...'
            type="textarea"
            value={caption}
            required
            onChange={updateCaption}
          />

          <p className="some-caption">{caption.length}/500</p>

        </div>
        <div className="edit-modal-button" onClick={handleSubmit}>
          <button className="update-button-blue">Update</button>
        </div>
        <div className="edit-delete-post-modal-divs" onClick={() => updateModalSomeStuff(false)}>
          Cancel
        </div>
      </div>
    </div>

  )
}

export default EditPostForm;
