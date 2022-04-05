import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postDelete } from "../../store/post";

const EditDeletePostModal = ({ closeModal, postId }) => {

    let menuRef = useRef()
    const dispatch = useDispatch()

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

    const user = useSelector(state => state.session.user)

    const post = useSelector(state => state.posts[+postId])


    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container">
                <div>
                    {user?.id == post?.user_id &&
                        (<NavLink exact to={`/users/${post?.user_id}`}><button onClick={() => dispatch(postDelete(post?.id))}>Delete Post</button></NavLink>)
                    }
                </div>
                <div>
                    Edit
                </div>
                <div onClick={()=>closeModal(false)}>
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default EditDeletePostModal
