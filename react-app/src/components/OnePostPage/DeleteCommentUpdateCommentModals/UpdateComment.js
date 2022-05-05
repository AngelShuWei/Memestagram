import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUserComment } from "../../../store/comments";
import { updateUsersPost } from "../../../store/post";
import Picker from 'emoji-picker-react';
import happyFace from '../../IconPics/ig-happy-face.png';


const UpdateModalComment = ({closeModal2, commentId,updateModalSomeStuff}) => {
    const dispatch = useDispatch();

    closeModal2(false)

  const comment = useSelector(state => state.comments[+commentId])

  const [text, setText] = useState(comment?.text);
  const [showPicker, setShowPicker] = useState(false);

  const emojiClick = (e, emojiObject) => {
    setText(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(updateUserComment(text,commentId))

    updateModalSomeStuff(false);

  }
  let menuRef = useRef();

  const updateText = (e) => {
    setText(e.target.value);
  }
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
          <div className="text-area-div">

            <textarea className='input-caption-update' placeholder='Write a comment...'
              type="textarea"
              value={text}
              required
              onChange={updateText}
              maxLength={500}
            />
            <div>
              <img
                className="adding-emoji-post"
                src={happyFace}
                onClick={() => setShowPicker(val => !val)} />
                {showPicker && <Picker
                  pickerStyle={{ width: '100%' }}
                  onEmojiClick={emojiClick} />}
                <p className="some-caption">{text.length}/500</p>
            </div>

          </div>

        </div>
          <div className="emoji-edit-btn-container">
            <div className="edit-modal-button" onClick={handleSubmit}>
              <button className="update-button-blue">Edit Comment</button>
            </div>

          </div>
        <div className="edit-delete-post-modal-divs" onClick={() => updateModalSomeStuff(false)}>
          Cancel
        </div>
      </div>
    </div>

  )
}

export default UpdateModalComment
