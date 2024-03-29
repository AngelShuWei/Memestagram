import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postDelete } from "../../store/post";
import './EditDeletePostModal.css'
const EditDeletePostModal = ({ deleteModalSomeStuff, updateModalSomeStuff, closeModal, postId }) => {


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



    const handleDeleteModal = () => {
        deleteModalSomeStuff(true)
    }
    const handleUpdateModal = () => {

        updateModalSomeStuff(true)
    }
    // onClick={() => dispatch(postDelete(post?.id))}
    // <NavLink exact to={`/users/${post?.user_id}`}><button className="navlink-delete" >Delete Post</button></NavLink>

    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container-edit-delete-post">
                <div className="edit-delete-post-modal-divs navlink-delete" onClick={handleDeleteModal} >
                    <button className="navlink-delete" >Delete Post</button>
                </div>
                <div className="edit-delete-post-modal-divs edit-caption" onClick={handleUpdateModal} >
                    <button className="navlink-update">Edit caption</button>

                </div>
                <div className="edit-delete-post-modal-divs" onClick={() => closeModal(false)}>
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default EditDeletePostModal
