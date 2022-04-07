import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";



const EditDeleteCommentModal = ({ closeModal2, commentIdd, updateModalSomeStuff, deleteModalSomeStuff }) => {

    let menuRef = useRef()

    useEffect(() => {
        const handler = (event) => {
            if (!menuRef.current.contains(event.target)) {

                closeModal2(false);
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });
    const handleDeleteModal = () => {
        deleteModalSomeStuff([true, commentIdd])
    }
    const handleUpdateModal = () => {

        updateModalSomeStuff([true, commentIdd])
    }
    const userId = useSelector(state => state.session.user.id);
    const comments = useSelector(state => Object.values(state.comments));
    const theComment = comments.filter(ls => ls.id === commentIdd)[0];


    console.log(theComment?.user_id === userId);

    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container-edit-delete-post">
                <div className="edit-delete-post-modal-divs navlink-delete" onClick={handleDeleteModal} >
                    <button className="navlink-delete" >Delete Comment</button>
                </div>
                {theComment?.user_id === userId &&
                    <div className="edit-delete-post-modal-divs edit-caption" onClick={handleUpdateModal} >
                        <button className="navlink-update">Edit Comment</button>

                    </div>
                }
                <div className="edit-delete-post-modal-divs" onClick={() => closeModal2(false)}>
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default EditDeleteCommentModal
