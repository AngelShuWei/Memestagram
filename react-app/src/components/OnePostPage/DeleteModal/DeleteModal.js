import './DeleteModal.css'
import { postDelete } from '../../../store/post'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const DeleteModal = ({ closeModal, deleteModalSomeStuff, postId }) => {

    closeModal(false)
    const dispatch = useDispatch()
    let menuRef = useRef()

    const post = useSelector(state => state.posts[+postId])

    useEffect(() => {
        const handler = (event) => {
            if (!menuRef.current.contains(event.target)) {

                deleteModalSomeStuff(false);
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });

    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container-edit-delete-post-modal">
                <div className="areYouSureYouwannaDelete" >
                    <div className='pareyousure'>
                        <p className='deletePostA'>Delete post?</p>
                        <p className='areyousuredeletepost'>Are you sure you want to delete this post?</p>
                    </div>
                    <NavLink exact to={`/users/${post?.user_id}`}><div onClick={() => dispatch(postDelete(post?.id))} className="yes">
                        {/* edit-delete-post-modal-divs navlink-delete */}
                        <button className="navlink-delete">Yes</button>
                    </div>
                    </NavLink>
                    <div className="edit-delete-post-modal-divs" onClick={() => deleteModalSomeStuff(false)}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DeleteModal
