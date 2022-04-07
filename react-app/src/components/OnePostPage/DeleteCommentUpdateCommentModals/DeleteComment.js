import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { commentDelete } from "../../../store/comments";

const DeleteCommentModal = ({ closeModal2, deleteModalSomeStuff, commentId }) => {
    closeModal2(false)

    const dispatch = useDispatch()

    let menuRef = useRef()

    const comment = useSelector(state => state.comments[+commentId])


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

    const handleClick = () => {

        dispatch(commentDelete(comment?.id))
        deleteModalSomeStuff(false);
    }

    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container-edit-delete-post-modal">
                <div className="areYouSureYouwannaDelete" >
                    <div className='pareyousure'>
                        <p className='deletePostA'>Delete Comment?</p>
                        <p className='areyousuredeletepost'>Do you want to delete this comment?</p>
                    </div>
                    <div onClick={handleClick} className="yes">
                        {/* edit-delete-post-modal-divs navlink-delete */}
                        <button className="navlink-delete">Yes</button>
                    </div>

                    <div className="edit-delete-post-modal-divs" onClick={() => deleteModalSomeStuff(false)}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCommentModal
