import './PostFormPage.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory } from "react-router-dom";

function PostFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

  }

  return (
    <div className='page-container'>
      <form onSubmit={handleSubmit}>
        <label>Caption</label>
        <input placeholder='Write a caption...'
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <label>imageUrl</label>
        <input placeholder='Drag photos here'
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button>Share</button>
      </form>
    </div>
  )
}

export default PostFormPage;
