import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUserComment } from "../../../store/comments";
import { updateUsersPost } from "../../../store/post";


const UpdateModalComment = ({closeModal2, commentId,updateModalSomeStuff}) => {
    const dispatch = useDispatch();

    closeModal2(false)

  const comment = useSelector(state => state.comments[+commentId])

  const [text, setText] = useState(comment?.text);



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

          <textarea className='input-caption-update' placeholder='Write a caption...'
            type="textarea"
            value={text}
            required
            onChange={updateText}
          />

          <p className="some-caption">{text.length}/500</p>

        </div>
        <div className="edit-modal-button" onClick={handleSubmit}>
          <button className="update-button-blue">Edit Comment</button>
        </div>
        <div className="edit-delete-post-modal-divs" onClick={() => updateModalSomeStuff(false)}>
          Cancel
        </div>
      </div>
    </div>

  )
}

export default UpdateModalComment
