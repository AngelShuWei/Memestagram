import './DeleteModal.css'
import { postDelete } from '../../../store/post'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const DeleteModal = ({ closeDeleteModal, postId }) => {


    const dispatch = useDispatch()
    let menuRef = useRef()

    const post = useSelector(state => state.posts[+postId])


    return (
        <div ref={menuRef} className="modal-container-edit-delete-post-modal">
            <div className="areYouSureYouwannaDelete" >
                <div className='pareyousure'>
                    <p className='deletePostA'>Delete post?</p>
                    <p className='areyousuredeletepost'>Are you sure you want to delete this post?</p>
                </div>
                <div className="yes">
                {/* edit-delete-post-modal-divs navlink-delete */}
                    <NavLink exact to={`/users/${post?.user_id}`}><button className="navlink-delete" onClick={() => dispatch(postDelete(post?.id))}>Yes</button></NavLink>

                </div>
            </div>
        </div>
    )
}


export default DeleteModal
