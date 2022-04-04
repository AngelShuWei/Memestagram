import './PostFormPage.css';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { postCreate } from '../../store/post'

function PostFormPage({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const userId = useSelector(state => state.session.user.id)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(postCreate(caption, imageUrl, userId))

    closeModal(false)
  }


  const updateCaption = (e) => {
    setCaption(e.target.value);

  }

  const updateImage = (e) => {
    setImageUrl(e.target.value);

  }

  let menuRef = useRef()

  useEffect(() => {

    const handler = (event) => {

      if (!menuRef.current.contains(event.target)) {

        closeModal(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler)
    }


  });

  return (
    <div className='background-modal'>

      <div ref={menuRef} className='modal-container'>
        <button onClick={() => closeModal(false)}> X </button>
        <form onSubmit={handleSubmit}>
          <label>Caption</label>
          <input placeholder='Write a caption...'
            type="text"
            value={caption}
            required
            onChange={updateCaption}
          />
          <label>imageUrl</label>
          <input placeholder='Drag photos here'
            type="text"
            value={imageUrl}
            required
            onChange={updateImage}
          />
          <button>Share</button>
        </form>
      </div>
    </div>

  )
}

export default PostFormPage;
