import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postDelete } from "../../store/post";
import DeleteModal from "./DeleteModal/DeleteModal";
import './EditDeletePostModal.css'
const EditDeletePostModal = ({ closeModal, postId }) => {

    const [deleteModalOn, setDeleteModalOn] = useState(false)
    const [updateModalOn, setUpdateModalOn] = useState(false)

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

    const handleDeleteModal = () =>{
        setDeleteModalOn(true)
    }

    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container-edit-delete-post">
                <div className="edit-delete-post-modal-divs navlink-delete" onClick={handleDeleteModal} >
                    <NavLink exact to={`/users/${post?.user_id}`}><button className="navlink-delete" onClick={() => dispatch(postDelete(post?.id))}>Delete Post</button></NavLink>
                </div>
                <div className="edit-delete-post-modal-divs edit-caption" >
                <NavLink exact to={`/post/${post?.id}/edit`}><button className="navlink-update">Edit caption</button></NavLink>

                </div>
                <div className="edit-delete-post-modal-divs" onClick={() => closeModal(false)}>
                    Cancel
                </div>
            </div>
            {/* {deleteModalOn && <DeleteModal ref={menuRef} postId={postId}/>} */}
        </div>
    )
}

export default EditDeletePostModal
