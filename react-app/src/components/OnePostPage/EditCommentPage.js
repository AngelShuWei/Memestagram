import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUserComment } from "../../store/comments";

function EditCommentPage(){

    const dispatch = useDispatch();
    const history = useHistory();
    const {commentId} = useParams()

  const comment = useSelector(state => state.comments[+commentId])

  const [text, setText] = useState(comment?.text);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(updateUserComment(text,commentId))

    if(data.errors){

    }else{
      history.push(`/post/${comment.post_id}`)
    }
  }

  const updateText = (e) => {
    setText(e.target.value);

  }


  return (
    <div className='background-moda'>

      <div className='modal-containe'>
        <form onSubmit={handleSubmit}>
          <label>Caption</label>
          <input placeholder='Edit text...'
            type="text"
            value={text}
            required
            onChange={updateText}
            maxLength={500}
          />
          <button>Update</button>
        </form>
      </div>
    </div>

  )
}

export default EditCommentPage
